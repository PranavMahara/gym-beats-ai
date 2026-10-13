import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const LoginPrompt = () => (
    <div className="pt-32 px-8 flex flex-col items-center gap-4 text-center">
        <p className="text-xl">Log in to see the playlists you&apos;ve saved.</p>
        <Button asChild className="bg-[#121212] border">
            <SignInButton />
        </Button>
    </div>
);

export const EmptyState = () => (
    <div className="text-center py-12 flex flex-col items-center gap-4">
        <p className="text-2xl">No saved playlists yet.</p>
        <Button asChild className="bg-[#121212] border">
            <a href="/activity">Create your first playlist</a>
        </Button>
    </div>
);
