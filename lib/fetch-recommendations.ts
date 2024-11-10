import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const fetchRecommendations = async () => {
    const { userId } = auth();

    if (!userId) {
        return null;
    }

    const activityTypes = await db.recommendation.findMany({
        where: { userId: userId },
        distinct: ['activityType'],
        select: { activityType: true }
    });

    if (!activityTypes.length) {
        return "No activity types found.";
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API as string);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const recommendations = [];

    for (const activity of activityTypes) {
        const { activityType } = activity;

        const songsData = await db.recommendation.findMany({
            where: { userId: userId, activityType: activityType }
        });

        if (!songsData.length) {
            continue;
        }

        const formattedSongs = songsData.map(song => `${song.song} by ${song.artist}`).join("\n");

        const prompt = `
        You are an AI music assistant. Based on the activity type "${activityType}", please provide top song recommendations from the list below.

        ### List of Songs:
        ${formattedSongs}

        Provide your top suggestions from the above list specifically for the activity type "${activityType}".
        `;

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: prompt }],
                }
            ],
            generationConfig: {
                maxOutputTokens: 500,
            },
        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        const text = await response.text();

        const lines = text.split("\n").map(line => line.trim()).filter(line => line && /^\d+\.\s*\*\*(.*?)\*\*\s*by\s*(.*?)$/.test(line));
        const recommendedSongs = lines.map(line => {
            const match = line.match(/^\d+\.\s*\*\*(.*?)\*\*\s*by\s*(.*?)$/);
            return match ? {
                name: match[1],
                artist: match[2]
            } : null;
        }).filter(song => song !== null);

        recommendations.push({
            activityType: activityType,
            songs: recommendedSongs
        });
    }

    return recommendations;
}
