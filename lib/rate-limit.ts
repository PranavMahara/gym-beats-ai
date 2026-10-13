import { db } from "@/lib/db";

// Fixed-window counter stored in MongoDB (serverless instances share no memory).
// Returns true if the call is allowed. On any database error it returns false,
// so a failure here can never cause unmetered use of the AI quota.
export const consume = async (key: string, limit: number, windowSeconds: number) => {
    try {
        const windowMs = windowSeconds * 1000;
        const bucket = Math.floor(Date.now() / windowMs);
        const record = await db.rateLimit.upsert({
            where: { id: `${key}:${bucket}` },
            create: { id: `${key}:${bucket}`, count: 1, expiresAt: new Date((bucket + 2) * windowMs) },
            update: { count: { increment: 1 } },
        });

        // Occasionally remove old windows so the collection stays small.
        if (Math.random() < 0.02) {
            await db.rateLimit.deleteMany({ where: { expiresAt: { lt: new Date() } } });
        }

        return record.count <= limit;
    } catch (error) {
        console.error("Rate limit check failed:", error);
        return false;
    }
};
