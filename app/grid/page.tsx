import { ParallaxScroll } from '@/components/ui/parallax-scroll';
import { currentProfile } from '@/lib/current-profile'
import { fetchGrid } from '@/lib/fetch-grid';
import { fetchRecommendations } from '@/lib/fetch-recommendations';
import React from 'react'

const Page = async () => {
    const profile = await currentProfile();

    if (!profile) {
        return (
            <div className='pt-24 lg:px-12 px-8'>
                Please Login in to continue
            </div>
        )
    }

    const data = await fetchGrid();
    return (
        <div>
          <ParallaxScroll recommendations={data} />
        </div>
    )
}

export default Page
