import { currentProfile } from '@/lib/current-profile'
import { fetchRecommendations } from '@/lib/fetch-recommendations';
import React from 'react'
import Recommendations from './_components/recommendations';

const Page = async () => {
    const profile = await currentProfile();

    if (!profile) {
        return (
            <div className='pt-24 lg:px-12 px-8'>
                Please Login in to continue
            </div>
        )
    }

    const data = await fetchRecommendations();
    return (
        <div className='pt-24 lg:px-12 px-8 flex justify-center items-center'>
            <Recommendations recommendations={data} />
        </div>
    )
}

export default Page
