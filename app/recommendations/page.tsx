import { getSavedSongs } from '@/lib/saved-songs';
import Recommendations from './_components/recommendations';
import { LoginPrompt } from '@/components/login-prompt';

const Page = async () => {
    const data = await getSavedSongs();

    if (!data) {
        return <LoginPrompt />;
    }

    return (
        <div className='pt-24 lg:px-12 px-8 flex justify-center items-center'>
            <Recommendations recommendations={data} />
        </div>
    )
}

export default Page
