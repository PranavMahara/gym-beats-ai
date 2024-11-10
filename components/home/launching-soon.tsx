"use client"
import React from 'react'
import { WavyBackground } from './support/wavy-curve'
import { Source_Code_Pro } from "next/font/google";

const scp_font = Source_Code_Pro({
    weight: "800",
    subsets: []
})

const LaunchingSoon = () => {
    return (
        <div className='relative py-20'>
            <WavyBackground>
                <div className={`flex justify-center items-center h-full my-24 py-4 text-5xl sm:text-7xl lg:text-8xl ${scp_font.className}`}>
                    Coming Soon!
                </div>
            </WavyBackground>

            <div className="absolute z-[999] top-0 left-5 w-[1px] h-full bg-gray-200 bg-opacity-15 pointer-events-none md:block lg:left-7 xl:left-10" />
            <div className="absolute z-[999] top-0 right-5 w-[1px] h-full bg-gray-200 bg-opacity-15 pointer-events-none md:block lg:right-7 xl:right-10" />
        </div>
    )
}

export default LaunchingSoon