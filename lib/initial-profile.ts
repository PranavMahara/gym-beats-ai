import { currentUser } from "@clerk/nextjs/server"
import { db } from "./db";

export const initalProfile = async () => {
    // This runs in the root layout, so it must never throw: a failure here
    // (auth, database) would otherwise take down every page, including 404s.
    try {
        const user = await currentUser();

        if (!user) {
            return null;
        }

        const profile = await db.profile.findUnique({
            where: {
                userId: user.id
            }
        })

        if (profile) {
            return profile
        }

        const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || user.username || "User";

        const newProfile = await db.profile.create({
            data: {
                userId: user.id,
                name,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0]?.emailAddress ?? ""
            }
        })

        return newProfile
    } catch (error) {
        // Let Next.js's own control-flow errors (dynamic rendering) through.
        if ((error as { digest?: string })?.digest === "DYNAMIC_SERVER_USAGE") {
            throw error;
        }
        console.error("initalProfile failed:", error);
        return null;
    }
}
