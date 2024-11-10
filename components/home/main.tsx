"use client"
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";

import { Source_Code_Pro, Bebas_Neue } from "next/font/google";
import MagicButton from './support/magic-button';
const scp_font = Bebas_Neue({
    weight: "400",
    subsets: []
})

const Main = () => {
    const text = "Gym Beats AI";
    const gradual = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <div className='pt-32 relative w-screen min-h-screen z-[80]'>
            <div className="pt-20 relative">
                <div className="text-center px-8">
                    <div className="mb-6" data-aos="fade-down">
                        <div className="relative inline-flex before:absolute before:inset-0">
                            <div
                                className="px-3 py-1 text-sm font-medium inline-flex items-center justify-center border rounded-full text-zinc-300 hover:text-white transition duration-150 ease-in-out w-full group border-slate-100/40"
                            >
                                <span className="relative inline-flex items-center">
                                    Fitness + Music
                                </span>
                            </div>
                        </div>
                    </div>
                    <h1 className="pb-4 font-extrabold tracking-tight text-transparent flex justify-center mb-4 mt-8 text-7xl lg:text-8xl" data-aos="fade-down">
                        <AnimatePresence>
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={gradual}
                                transition={{ duration: 1 }}
                                className={`text-center  bg-clip-text ${scp_font.className} tracking-wide bg-gradient-to-r from-cyan-400 via-blue-600 to-cyan-400 font-display z-[90] text-[80px] font-bold drop-shadow-sm md:text-[150px] pt-6 pb-2 md:leading-[5rem]`}
                            >
                                {text}
                                
                            </motion.div>
                        </AnimatePresence>
                    </h1>
                    <p className={`mb-8 text-lg text-white font-medium`} data-aos="fade-down" data-aos-delay="200">
                        AI GymBeats: Your Fitness, Your Music, Your Way.
                    </p>
                    <div className="flex flex-col items-center max-w-xs mx-auto ap-4 sm:max-w-none sm:justify-center sm:flex-row sm:inline-flex" data-aos="fade-down" data-aos-delay="400">
                        <MagicButton
                            title={"GET STARTED"}
                            icon={<ArrowRight className="w-3 h-3 tracking-normal text-primary-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1" />}
                            position='center'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main