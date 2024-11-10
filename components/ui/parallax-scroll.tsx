"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const ParallaxScroll = ({ recommendations, className }: {
  recommendations: | "No activity types found."
  | {
    activityType: string;
    songs: ({ name: string; artist: string; albumArt?: string } | null)[];
  }[]
  | null,
  className?: string;
}) => {
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const [expandedSong, setExpandedSong] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  if (!recommendations || recommendations === "No activity types found.") {
    return (
      <div className="text-center py-12 text-3xl">
        No recommendations available.
      </div>
    );
  }

  const allSongs = recommendations.flatMap(rec => rec.songs.filter(Boolean)) as { name: string; artist: string; albumArt?: string }[];
  const third = Math.ceil(allSongs.length / 3);
  const firstPart = allSongs.slice(0, third);
  const secondPart = allSongs.slice(third, 2 * third);
  const thirdPart = allSongs.slice(2 * third);

  const handleCardClick = (songName: string) => {
    setExpandedSong(expandedSong === songName ? null : songName);
  };

  const handlePlayClick = (songName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(isPlaying === songName ? null : songName);
  };

  const renderSongCard = (song: { name: string; artist: string; albumArt?: string }, idx: number, translateY: any, grid: string) => (
    <motion.div
      style={{ y: translateY }}
      key={`${grid}-${idx}`}
      whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      onClick={() => handleCardClick(song.name)}
      className="cursor-pointer"
    >
      <div className={cn(
        "bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-xl overflow-hidden h-[450px] shadow-xl transition-all duration-500 relative",
        expandedSong === song.name ? "scale-105 shadow-2xl" : ""
      )}>
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <Image
          src={song.albumArt || "/default-album-art.jpg"}
          alt={`${song.name} album art`}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 transition-transform duration-500 ease-out"
          style={{ transform: expandedSong === song.name ? 'scale(1.1)' : 'scale(1)' }}
        />
        <div className="p-6 text-white border border-white border-opacity-20 relative z-20 h-full flex flex-col overflow-hidden focus:outline-none focus:ring focus:ring-slate-400 focus:ring-offset-slate-50">
          <span className="absolute inset-[-900%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center  bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            <div>
              <h3 className="text-2xl font-bold mb-2 truncate">{song.name}</h3>
              <p className="text-neutral-300 truncate">Artist: {song.artist.slice(0, 10)}</p>
            </div>
            <div className={cn("transition-opacity duration-500", expandedSong === song.name ? "opacity-100" : "opacity-0")}>
              <p className="text-sm text-neutral-400 mb-4">Click to play on Spotify</p>
              <button
                className={cn(
                  "w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-full transition-all duration-300 flex items-center justify-center",
                  isPlaying === song.name ? "bg-red-500 hover:bg-red-600" : ""
                )}
                onClick={(e) => handlePlayClick(song.name, e)}
              >
                {isPlaying === song.name ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="mr-2"
                    >◼</motion.span>
                    Stop
                  </>
                ) : (
                  <>▶ Play Now</>
                )}
              </button>
            </div>
          </span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div
      className={cn("h-screen items-start overflow-y-auto w-full", className)}
      ref={gridRef}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-6xl mx-auto gap-12 py-40 px-10">
        <div className="grid gap-12">
          {firstPart.map((song, idx) => renderSongCard(song, idx, translateFirst, "grid-1"))}
        </div>
        <div className="grid gap-12">
          {secondPart.map((song, idx) => renderSongCard(song, idx, translateSecond, "grid-2"))}
        </div>
        <div className="grid gap-12">
          {thirdPart.map((song, idx) => renderSongCard(song, idx, translateThird, "grid-3"))}
        </div>
      </div>
    </div>
  );
};