"use client"
import React from "react";
import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { spotifySearchUrl } from "@/lib/activities";
import {
  IconBrandSpotify,
  IconMusic,
} from "@tabler/icons-react";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function BentoGrid2({ recommendations }: { recommendations: { name: string; artist: string }[] }) {
  const icon = <IconMusic className="h-4 w-4 text-neutral-500" />;

  return (
    <BentoGrid className="w-full max-w-[750px] mx-auto dark">
      {recommendations.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.name}
          description={`Artist: ${item.artist}`}
          header={
            <motion.div
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="flex flex-1 justify-end p-3 w-full h-[200px] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800"
            >
              <a href={spotifySearchUrl(item.name, item.artist)} target="_blank" rel="noopener noreferrer" aria-label={`Search ${item.name} on Spotify`}>
                <IconBrandSpotify className="text-[#1DB954]" size={30}/>
              </a>
            </motion.div>
          }
          icon={
            <motion.div
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              {icon}
            </motion.div>
          }
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}
