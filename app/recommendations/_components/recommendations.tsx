"use client";

import React from "react";
import { BentoGrid2 } from "@/components/ui/bento-grid-2";
import { MovingBorder } from "@/components/ui/moving-border";
import { Source_Code_Pro } from "next/font/google";

const scp_font = Source_Code_Pro({
  weight: "800",
  subsets: [],
});

const Recommendations = ({
  recommendations,
}: {
  recommendations:
    | "No activity types found."
    | {
        activityType: string;
        songs: ({ name: string; artist: string } | null)[];
      }[]
    | null;
}) => {
  if (
    !recommendations ||
    recommendations === "No activity types found." ||
    recommendations.length === 0
  ) {
    return (
      <div className={`text-center py-12 text-3xl ${scp_font.className}`}>
        No recommendations available.
      </div>
    );
  }

  return (
    <div>
      <div className={`text-center py-12 text-3xl ${scp_font.className}`}>
        Your Recommendations
      </div>
      <div>
        <div className="flex flex-col gap-8">
          {Array.isArray(recommendations) &&
            recommendations.map((rec, i) => (
              <div
                key={i}
                className="p-4 bg-[#121212] border-white border border-opacity-15 rounded-lg shadow-md relative"
              >
                <div
                  className="absolute inset-0 z-0"
                  style={{ borderRadius: `calc(1.75rem * 0.96)` }}
                >
                  <MovingBorder>
                    <div className={"h-[3px] w-[3px] opacity-[0.8] bg-white relative z-[0]"} />
                  </MovingBorder>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  {rec.activityType}
                </h3>
                <BentoGrid2 recommendations={rec.songs} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
