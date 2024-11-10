"use client"
import { useRouter } from "next/navigation";
import React from "react";

const MagicButton = ({ title, icon, position, handleClick, otherClasses }: {
    title: string;
    icon: React.ReactNode;
    position: string;
    handleClick?: () => void;
    otherClasses?: string;
}) => {

    const router = useRouter();

    return (
        <button
            className="relative inline-flex h-12 w-full md:w-60 md:mt-10 overflow-hidden rounded-lg p-[1px] focus:outline-none"
            onClick={() => { router.push("/activity") }}
        >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#22D3EE_50%,#E2CBFF_100%)]" />

            <span
                className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg
                bg-[#121212] hover:scale-125 transition-all duration-500 px-7 text-sm text-gray-400 font-bold backdrop-blur-3xl gap-2 ${otherClasses}`}
            >
                {position === "left" && icon}
                {title}
                {icon}
                {position === "right" && icon}
            </span>
        </button>
    );
};

export default MagicButton;
