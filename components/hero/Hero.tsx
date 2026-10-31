"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import { ArrowDown, Play, Pause, Sparkles, Sliders } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;
const HEADLINE = "Poured with intention.";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [enhancedClarity, setEnhancedClarity] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="relative h-svh min-h-160 overflow-hidden bg-[#18110c]">
      {/* 8K Film Sharpening Filter Definition */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <filter id="clarity-8k-filter">
          <feConvolveMatrix
            order="3"
            preserveAlpha="true"
            kernelMatrix="0 -0.25 0 -0.25 2.0 -0.25 0 -0.25 0"
          />
        </filter>
      </svg>

      {/* Image / video reveal: opens from an inset rounded frame to full bleed */}
      <motion.div
        initial={{ clipPath: "inset(12% 8% 12% 8% round 28px)", scale: 1.08 }}
        animate={{ clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1 }}
        transition={{ duration: 2, ease: EASE }}
        className="absolute inset-0"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/cafe-poster.jpg"
          className="h-full w-full object-cover transition-all duration-700"
          style={{
            transform: "translate3d(0, 0, 0)",
            WebkitBackfaceVisibility: "hidden",
            filter: enhancedClarity
              ? "contrast(1.1) brightness(1.03) saturate(1.12)"
              : "none",
          }}
          aria-hidden="true"
        >
          <source src="/videos/cafe.mp4" type="video/mp4" />
          <source src="/videos/cafe.webm" type="video/webm" />
        </video>

        {/* Ultra-Fine Organic Micro-Texture Film Grain: boosts perceived acuity to 8K */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-overlay transition-opacity duration-500"
          style={{
            opacity: enhancedClarity ? 0.08 : 0,
            backgroundImage: `radial-gradient(rgba(255,255,255,0.9) 1px, transparent 0)`,
            backgroundSize: "3px 3px",
          }}
        />

        {/* Cinematic Vignette & Color Gradients */}
        <div className="absolute inset-0 bg-linear-to-b from-black/35 via-transparent to-warm-white/95" />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: "radial-gradient(circle at center, transparent 40%, rgba(20, 14, 10, 0.6) 100%)",
          }}
        />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 md:px-12 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: EASE }}
          className="mb-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.4em] text-warm-white/90"
        >
          <span>Italian café</span>
          <span className="h-1 w-1 rounded-full bg-warm-white/60" />
          <span>Est. Milano 1984</span>
          <span className="h-1 w-1 rounded-full bg-warm-white/60" />
          <span className="flex items-center gap-1.5 rounded-full bg-warm-white/90 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-italian-red shadow-md">
            <Sparkles className="h-3 w-3 text-italian-red animate-spin" style={{ animationDuration: "6s" }} />
            8K Experience
          </span>
        </motion.div>

        {/* Headline with word-level grouping to prevent mid-word wrapping */}
        <h1 className="font-display text-[clamp(3.5rem,10.5vw,9.5rem)] leading-[0.93] text-warm-white drop-shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
          {["Poured", "with", "intention."].map((word, wordIdx) => (
            <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.22em] last:mr-0">
              {word.split("").map((char, charIdx) => {
                const totalIdx = wordIdx * 7 + charIdx;
                return (
                  <motion.span
                    key={`${char}-${charIdx}`}
                    initial={{ opacity: 0, y: "0.6em", filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 1.1 + totalIdx * 0.035, duration: 1, ease: EASE }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#coffee"
            data-cursor-text="MENU"
            className="group relative overflow-hidden rounded-full bg-italian-red px-8 py-4 text-sm font-medium tracking-wide text-warm-white shadow-[0_20px_45px_-15px_rgba(142,44,37,0.7)] transition-all duration-500 ease-[var(--ease-cinematic)] hover:-translate-y-0.5 hover:shadow-[0_25px_50px_-15px_rgba(142,44,37,0.85)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore the menu
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          </a>
          <a
            href="#visit"
            data-cursor-text="VISIT"
            className="rounded-full border border-warm-white/60 bg-warm-white/10 px-8 py-4 text-sm font-medium tracking-wide text-warm-white backdrop-blur-md transition-all duration-500 hover:bg-warm-white/20 hover:border-warm-white hover:-translate-y-0.5"
          >
            Plan your visit
          </a>
        </motion.div>
      </div>

      {/* Floating 8K Clarity & Playback Controls Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 right-6 z-20 hidden sm:flex items-center gap-3 md:right-12"
      >
        <button
          onClick={() => setEnhancedClarity(!enhancedClarity)}
          className="group flex items-center gap-2 rounded-full border border-white/25 bg-black/50 px-4 py-2 text-[11px] font-mono tracking-wider text-warm-white backdrop-blur-md transition-all hover:border-gold hover:text-gold cursor-pointer"
          data-cursor-text="QUALITY"
          title="Toggle 8K Enhanced Clarity"
        >
          <span
            className={`h-2 w-2 rounded-full transition-all ${
              enhancedClarity
                ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]"
                : "bg-white/40"
            }`}
          />
          <span>{enhancedClarity ? "8K CLARITY · ACTIVE" : "STANDARD 1080P"}</span>
          <Sliders className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-45" />
        </button>

        <button
          onClick={togglePlay}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/50 text-warm-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 cursor-pointer"
          aria-label={isPlaying ? "Pause Video" : "Play Video"}
          data-cursor-text="PLAY"
        >
          {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current ml-0.5" />}
        </button>
      </motion.div>

      {/* Center Scroll Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-warm-white"
        aria-label="Scroll to continue"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="h-5 w-5" strokeWidth={1.25} />
        </motion.div>
      </motion.div>
    </section>
  );
}
