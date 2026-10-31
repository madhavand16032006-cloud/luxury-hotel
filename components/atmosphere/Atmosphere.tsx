"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { Volume2, VolumeX, Sparkles, Coffee } from "lucide-react";

const MATERIALS = [
  {
    name: "Antique Brass & Steam",
    description: "Lever-pulled espresso extraction maintaining traditional pressure curves.",
    tag: "Ritual",
  },
  {
    name: "Carrara Marble Counters",
    description: "Cool, honed natural stone where saucers land with a comforting resonance.",
    tag: "Tactile",
  },
  {
    name: "Aged Italian Walnut",
    description: "Centuries-old bistro seating crafted by Lombardian cabinetmakers.",
    tag: "Heritage",
  },
];

export function Atmosphere() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [soundPlaying, setSoundPlaying] = useState(false);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.05]);
  const textY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const toggleSound = () => {
    setSoundPlaying(!soundPlaying);
  };

  return (
    <section
      ref={containerRef}
      id="atmosphere"
      className="relative overflow-hidden bg-warm-white py-32 md:py-40 border-t border-cream"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-italian-red">
            L'Atmosfera · Spatial Poetry
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-tight text-warm-brown">
            A sanctuary carved from time, stone and steam.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-warm-brown/75">
            Step through the mahogany doors and leave the frantic rush behind. Here, the hum of
            the brass lever machine, the soft clatter of porcelain, and the aroma of freshly crushed
            beans create a cadence that belongs to you.
          </p>
        </div>

        {/* Ambient Visual Feature */}
        <div className="mt-16 relative aspect-16/9 sm:aspect-21/9 w-full overflow-hidden rounded-[2.5rem] shadow-[0_40px_100px_-30px_rgba(90,70,54,0.4)]">
          <motion.div style={{ scale: imageScale }} className="relative h-full w-full">
            <Image
              src="/images/cafe-poster.jpg"
              alt="BR Velluto interior atmosphere"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-warm-brown/80 via-warm-brown/20 to-transparent" />
          </motion.div>

          {/* Sound / Atmosphere Pill Button */}
          <div className="absolute top-6 right-6 z-10">
            <button
              onClick={toggleSound}
              className="group flex items-center gap-2.5 rounded-full bg-warm-white/90 px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium text-warm-brown shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-warm-white hover:scale-105"
              data-cursor-text="LISTEN"
            >
              {soundPlaying ? (
                <>
                  <Volume2 className="h-4 w-4 text-italian-red animate-pulse" />
                  <span className="text-italian-red">Milano Ambient Audio: On</span>
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 h-full bg-italian-red animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-0.5 h-2/3 bg-italian-red animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-0.5 h-4/5 bg-italian-red animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </>
              ) : (
                <>
                  <VolumeX className="h-4 w-4 opacity-60" />
                  <span>Cafe Soundscape</span>
                </>
              )}
            </button>
          </div>

          {/* Floating Interior Quote */}
          <div className="absolute bottom-8 left-8 right-8 z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 text-warm-white">
            <div className="max-w-md">
              <p className="font-display text-xl sm:text-2xl text-warm-white">
                "The finest espresso demands not just heat and grind, but stillness."
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.25em] text-warm-white/70">
                BR Velluto · Milano Roastery
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-warm-white/30 bg-warm-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] backdrop-blur-md">
              <Coffee className="h-3.5 w-3.5" />
              <span>Table Service & Standing Counter</span>
            </div>
          </div>
        </div>

        {/* 3 Material Cards with Hover Depth */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {MATERIALS.map((mat, i) => (
            <motion.div
              key={mat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-warm-brown/10 bg-warm-white p-8 shadow-[0_20px_45px_-20px_rgba(90,70,54,0.1)] transition-all duration-500 hover:shadow-[0_30px_60px_-20px_rgba(90,70,54,0.2)] hover:border-warm-brown/25"
              data-cursor-text="SPACE"
            >
              <div>
                <span className="rounded-full bg-cream/80 px-3 py-1 text-[10px] uppercase tracking-[0.25em] font-semibold text-warm-brown/70">
                  {mat.tag}
                </span>
                <h3 className="mt-5 font-display text-2xl text-warm-brown group-hover:text-italian-red transition-colors">
                  {mat.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-warm-brown/75">
                  {mat.description}
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-cream pt-4 text-xs uppercase tracking-[0.2em] text-warm-brown/50">
                <span>Element 0{i + 1}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1 text-italian-red">
                  Explore →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
