import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { activityLabel } from "@/lib/activities";

export type SavedGroup = {
    activityType: string;
    songs: { name: string; artist: string }[];
};

// The user's saved songs grouped by activity, newest first, without duplicates.
export const getSavedSongs = async (): Promise<SavedGroup[] | null> => {
    const { userId } = auth();

    if (!userId) {
        return null;
    }

    const rows = await db.recommendation.findMany({
        where: { userId },
        orderBy: { id: "desc" },
    });

    const groups = new Map<string, SavedGroup>();
    const seen = new Set<string>();

    for (const row of rows) {
        const key = `${row.activityType}|${row.song}|${row.artist}`.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);

        const group = groups.get(row.activityType) ?? {
            activityType: activityLabel(row.activityType),
            songs: [],
        };
        group.songs.push({ name: row.song, artist: row.artist });
        groups.set(row.activityType, group);
    }

    return Array.from(groups.values());
};
