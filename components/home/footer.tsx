"use client"
import { IconBrandDiscord, IconBrandInstagram, IconBrandTwitter } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react'

import { Source_Code_Pro } from "next/font/google";
const scp_font = Source_Code_Pro({
    weight: "500",
    subsets: []
})

const socials = [
    {
        id: "0",
        title: "Discord",
        iconUrl: <IconBrandDiscord />,
        url: "#",
    },
    {
        id: "1",
        title: "Twitter",
        iconUrl: <IconBrandTwitter />,
        url: "#",
    },
    {
        id: "2",
        title: "Instagram",
        iconUrl: <IconBrandInstagram />,
        url: "#",
    }
];


const Footer = () => {
    return (
        <div className={`py-8 pt-24 relative z-[999] ${scp_font.className}`}>

            <div className='w-full h-[1px] border-gray-400 border-opacity-20 border-[1px]   '></div>
            <div className="!px-0 !py-10">
                <div className="container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col">
                    <p className="caption text-n-4 lg:block">
                        © {new Date().getFullYear()}. All rights reserved.
                    </p>

                    <ul className="flex gap-5 flex-wrap">
                        {socials.map((item) => (
                            <Link
                                key={item.id}
                                href={item.url}
                                target="_blank"
                                className="flex items-center justify-center w-10 h-10 bg-n-7 rounded-full transition-colors hover:bg-n-6"
                            >
                                {item.iconUrl}
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="absolute z-[999] top-0 left-5 w-[1px] h-full bg-gray-200 bg-opacity-15 pointer-events-none md:block lg:left-7 xl:left-10" />
            <div className="absolute z-[999] top-0 right-5 w-[1px] h-full bg-gray-200 bg-opacity-15 pointer-events-none md:block lg:right-7 xl:right-10" />

        </div >
    )
}

export default Footer