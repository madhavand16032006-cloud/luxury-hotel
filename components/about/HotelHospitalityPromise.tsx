"use client";

import React from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface PromisePillar {
  title: string;
}

const PILLARS: PromisePillar[] = [
  { title: "Premium Comfort" },
  { title: "Personalized Hospitality" },
  { title: "Exceptional Cleanliness" },
  { title: "Peaceful Environment" },
  { title: "Professional Service" },
  { title: "Memorable Experiences" },
];

export function HotelHospitalityPromise() {
  return (
    <section className="relative bg-[#1c1d1e] py-24 sm:py-32 text-white border-t border-white/10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: 3-Line Serif Headline & Promise Paragraph (Matching Reference Image) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="lg:col-span-5"
          >
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white leading-[1.12] tracking-tight">
              <span className="block text-white font-normal">Every Stay.</span>
              <span className="block text-white font-normal mt-1">Every Guest.</span>
              <span className="block font-serif italic text-[#dfba73] mt-1 font-normal">
                Every Time.
              </span>
            </h2>

            <p className="mt-8 text-xs sm:text-sm text-stone-300 leading-relaxed font-light max-w-xl">
              At Le Prestige Residency, hospitality is more than a service—it&apos;s our promise.
              From your arrival to your departure, we are committed to delivering exceptional comfort,
              thoughtful attention, genuine care, and memorable experiences that make every guest feel at home.
            </p>
          </motion.div>

          {/* Right Column: 2-Column Grid of 6 Rounded Feature Pill Cards (Matching Reference Image) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="lg:col-span-7"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {PILLARS.map((pillar, idx) => (
                <div
                  key={pillar.title}
                  className="flex items-center gap-4 p-5 sm:p-6 rounded-2xl bg-[#27282b]/90 border border-white/10 hover:border-[#dfba73]/50 transition-all duration-300 shadow-lg group"
                >
                  {/* Star Badge Icon */}
                  <div className="h-10 w-10 rounded-full bg-[#3d382d] border border-[#dfba73]/30 flex items-center justify-center shrink-0 text-[#dfba73] group-hover:scale-105 transition-transform">
                    <Star className="h-4 w-4 fill-[#dfba73]" />
                  </div>

                  {/* Title */}
                  <span className="text-xs sm:text-sm font-medium text-white/95 tracking-wide">
                    {pillar.title}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
