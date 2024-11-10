"use client"

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { useState } from "react";
import { Caveat } from "next/font/google";

const caveat_text = Caveat({
    weight: "500",
    subsets: []
})


import { Source_Code_Pro } from "next/font/google";
const scp_font = Source_Code_Pro({
    weight: "800",
    subsets: [],
});

export const HoverEffect = ({
    items,
    className,
}: {
    items: {
        song: string;
        artist: string;
        liked?: boolean;
    }[];
    className?: string;
}) => {
    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div
            className={cn(
                "flex flex-wrap py-8 px-5",
                className
            )}
        >
            {items.map((item, idx) => (
                <div
                    key={item?.song}
                    className="relative group p-2 w-full sm:w-[300px] h-[200px] md:h-[300px]"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                className="absolute inset-0 border-white h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                                layoutId="hoverBackground"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: { duration: 0.15 },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.15, delay: 0.2 },
                                }}
                            />
                        )}
                    </AnimatePresence>
                    <Card className="border border-white border-opacity-15">
                        <CardTitle className={`h-[160px] border-b-2 w-full border-gray-500 border-opacity-15 ${scp_font.className} text-2xl`}>{item.song}</CardTitle>
                        <div className="flex items-center space-x-2 h-[10%] justify-between">
                            <CardDescription className="flex justify-center items-center text-[16px]"><div className={`${caveat_text.className} mr-2`}>BY</div> {item.artist}</CardDescription>
                            {item.liked ? <div className="flex justify-center items-center mt-16"><ThumbsDownIcon /></div> : <div className="flex justify-center items-center mt-6"><ThumbsUpIcon /></div>}

                        </div>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export const Card = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "rounded-2xl h-full w-full p-2 overflow-hidden bg-[#121212] border border-transparent dark:border-white group-hover:border-slate-700 relative z-20",
                className
            )}
        >
            <div className="relative z-50 border-white">
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
};
export const CardTitle = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <h4 className={cn("text-zinc-100 font-bold h- tracking-wide mt-4", className)}>
            {children}
        </h4>
    );
};
export const CardDescription = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <p
            className={cn(
                "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
                className
            )}
        >
            {children}
        </p>
    );
};
