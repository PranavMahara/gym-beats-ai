import { ParallaxScroll } from '@/components/ui/parallax-scroll';
import { getSavedSongs } from '@/lib/saved-songs';
import { LoginPrompt } from '@/components/login-prompt';

const Page = async () => {
    const data = await getSavedSongs();

    if (!data) {
        return <LoginPrompt />;
    }

    return (
        <div>
          <ParallaxScroll recommendations={data} />
        </div>
    )
}

export default Page
