import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = auth();

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API as string);
        const { message, history } = await req.json();

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const formattedMessage = `
        ### User Fitness Activity Information:
        1. **Activity Type:** ${message.activityType || 'Not specified'}
        2. **Duration:** ${message.duration || 'Not specified'}
        3. **Intensity:** ${message.intensity || 'Not specified'}
        4. **Frequency:** ${message.frequency || 'Not specified'}
        5. **Distance:** ${message.distance || 'Not specified'}
        6. **Location:** ${message.location || 'Not specified'}
        7. **Mood:** ${message.mood || 'Not specified'}
        8. **Time of Day:** ${message.timeOfDay || 'Not specified'}
        9. **Equipment Used:** ${message.equipment || 'Not specified'}
        10. **Additional Comments:** ${message.additionalComments || 'None'}

        ### User Music Preferences:
        1. **Favorite Genres:** ${message.favouriteGenres || 'Not specified'}
        2. **Favorite Artists/Brands:** ${message.favouriteArtists || 'Not specified'}
        3. **Favorite Songs:** ${message.favouriteSongs || 'Not specified'}
        4. **Mood:** ${message.mood || 'Not specified'}
        5. **Language Preference:** ${message.languageOfMusic || 'Not specified'}

        Based on the above information, please provide a detailed recommendation including:

        1. **Songs:** A list of recommended song names that match the user's fitness activities and music preferences in the specified language: ${message.languageOfMusic || 'Not specified'}.
        `;

        const prompt = `
        You are an AI music assistant in a chatbot, designed to generate personalized music recommendations for fitness activities. I have collected detailed information about a user's fitness activities and their music preferences. Use this information to create a set of recommended songs that align with their activities and music taste. Ensure the response is conversational and focused on providing song recommendations.

        ### Important:
        - Do not repeat the example response.
        - Always respect the user's language preferences when suggesting songs.
        - Provide all song recommendations in the specified language if mentioned.
        - Number of songs should match duration of the activity (in ${message.duration} minutes)

        ### Example Response (for reference only):

        Sure! Based on your fitness activities and music preferences, here are some songs that would be perfect for your workout:

        1. **Blinding Lights** - The Weeknd
        2. **Feel So Close** - Calvin Harris
        3. **Into You** - Ariana Grande
        4. **Levitating** - Dua Lipa
        5. **Shape of You** - Ed Sheeran
        ...... (Depends on duration)

        Enjoy your workout with these tracks!

        ### If the user asks about any other topic, respond with:
        I am a music assistant and I can only provide information related to music recommendations.
        `;

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: formattedMessage }],
                },
                {
                    role: "user",
                    parts: [{ text: prompt }],
                }
            ],
            generationConfig: {
                maxOutputTokens: 500,
            },
        });

        const result = await chat.sendMessage("");
        const response = await result.response;
        const text = await response.text();

        // Calculate number of songs based on activity duration
        const activityDuration = parseInt(message.duration) || 0; // Duration in minutes
        let numSongs = Math.ceil(activityDuration / 5); // Adjust based on the desired length of each song or other criteria

        const pattern = /\d+\.\s+\*\*(.*?)\*\*\s+-\s+(.*?)\n/g;
        let match;
        const songs = [];

        // Loop through matches until reaching the desired number of songs
        while (songs.length < numSongs && (match = pattern.exec(text)) !== null) {
            const songTitle = match[1];
            const artist = match[2];
            songs.push({ song: songTitle, artist: artist });
        }

        if (userId) {
            for (const song of songs) {
                await db.recommendation.create({
                    data: {
                        song: song.song,
                        artist: song.artist,
                        liked: false,
                        userId: userId,
                        activityType: message.activityType
                    },
                });
            }
        }

        let responseText = "Sure! Based on your fitness activities and music preferences, here are some songs that would be perfect for your workout:\n\n";
        songs.forEach((song, index) => {
            responseText += `${index + 1}. **${song.song}** - ${song.artist}\n`;
        });
        responseText += "\nEnjoy your workout with these tracks!";

        return new NextResponse(responseText);

    } catch (error) {
        console.error("Error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
