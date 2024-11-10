import React from 'react'
import { BentoGridThirdDemo } from './support/GridWork'
import brackets from '../ui/brackets'

const GridItems = () => {
    return (
        <div className='relative'>
            <div>
                <div className={`tagline flex items-center py-8 justify-center`}>
                    {brackets("left")}
                    <div className="mx-3 text-xl">OUR FEATURES</div>
                    {brackets("right")}
                </div>
            </div>
            <BentoGridThirdDemo />

            <div className="absolute -top-[68px] rotate-45 left-4 w-[50px] h-[50px] bg-gray-200 bg-opacity-15 pointer-events-none md:block hidden" ></div>
            <div className="absolute -top-[68px] rotate-45 right-4 w-[50px] h-[50px] bg-gray-200 bg-opacity-15 pointer-events-none md:block hidden" ></div>

            <div className="absolute top-0 left-5 w-[1px] h-full bg-gray-200 bg-opacity-15 pointer-events-none md:block lg:left-7 xl:left-10" />
            <div className="absolute top-0 right-5 w-[1px] h-full bg-gray-200 bg-opacity-15 pointer-events-none md:block lg:right-7 xl:right-10" />

        </div>
    )
}

export default GridItems