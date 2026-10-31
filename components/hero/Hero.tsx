"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import {
  ArrowDown,
  Play,
  Pause,
  Sparkles,
  Sliders,
  Car,
  Wifi,
  Wind,
  Maximize2,
  Calendar,
  ArrowRight,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

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
    <section className="relative h-svh min-h-[640px] overflow-hidden bg-[#140e0a]">
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

      {/* Cinematic Full-Bleed 8K Resort Video Background */}
      <motion.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
        className="absolute inset-0"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hotel-hero.jpg"
          className="h-full w-full object-cover transition-all duration-700"
          style={{
            transform: "translate3d(0, 0, 0)",
            WebkitBackfaceVisibility: "hidden",
            filter: enhancedClarity
              ? "contrast(1.08) brightness(1.02) saturate(1.1)"
              : "none",
          }}
          aria-hidden="true"
        >
          <source src="/videos/resort-8k.mp4" type="video/mp4" />
          <source src="/videos/cafe.mp4" type="video/mp4" />
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

        {/* Cinematic Vignette & Deep Luxury Gradient Overlays */}
        <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/25 to-[#120b08]/90" />
        <div
          className="pointer-events-none absolute inset-0 opacity-45"
          style={{
            background: "radial-gradient(circle at center, transparent 35%, rgba(15, 10, 7, 0.75) 100%)",
          }}
        />
      </motion.div>

      {/* User-Friendly Clean Hero Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 sm:pb-20 md:px-12">
        {/* Eyebrow Pill Badges */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
          className="mb-4 flex flex-wrap items-center gap-2 sm:gap-3 text-xs uppercase tracking-[0.25em] text-warm-white/90"
        >
          <span className="font-semibold text-gold">BR Vasantham Grand</span>
          <span className="h-1 w-1 rounded-full bg-warm-white/50" />
          <span>Tamil Nadu Heritage</span>
          <span className="h-1 w-1 rounded-full bg-warm-white/50" />
          <span className="flex items-center gap-1.5 rounded-full bg-gold/20 border border-gold/40 px-3 py-1 text-[11px] font-semibold tracking-wider text-gold shadow-md backdrop-blur-md">
            <Sparkles className="h-3 w-3 text-gold animate-spin" style={{ animationDuration: "6s" }} />
            5-Star Luxury Resort &amp; Suites
          </span>
        </motion.div>

        {/* Majestic Headline with kinetic word grouping */}
        <h1 className="font-display text-[clamp(2.75rem,7.5vw,7.5rem)] leading-[0.95] text-warm-white drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
          {["Regal", "Heritage.", "Modern", "Luxury."].map((word, wordIdx) => (
            <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.22em] last:mr-0">
              {word.split("").map((char, charIdx) => {
                const totalIdx = wordIdx * 7 + charIdx;
                return (
                  <motion.span
                    key={`${char}-${charIdx}`}
                    initial={{ opacity: 0, y: "0.5em", filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.8 + totalIdx * 0.025, duration: 0.8, ease: EASE }}
                    className={`inline-block ${
                      word === "Heritage." || word === "Luxury."
                        ? "text-gold"
                        : "text-warm-white"
                    }`}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>

        {/* User-Friendly Subtitle Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: EASE }}
          className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-warm-white/85"
        >
          Experience Tamil Nadu&apos;s most distinguished palace resort. Immerse in authentic Chettinad architecture,
          100% climate-controlled AC suites (320 to 1,200 sq. ft.), and timeless royal hospitality.
        </motion.p>

        {/* User-Friendly Simple Amenities Bar: Free Parking, Free Wi-Fi, AC, Sq. Ft. */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8, ease: EASE }}
          className="mt-5 flex flex-wrap items-center gap-2 sm:gap-2.5"
        >
          <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/45 px-3.5 py-1.5 text-xs text-warm-white backdrop-blur-md">
            <Car className="h-3.5 w-3.5 text-gold" />
            <span className="font-medium">Free Car Parking &amp; Valet</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/45 px-3.5 py-1.5 text-xs text-warm-white backdrop-blur-md">
            <Wifi className="h-3.5 w-3.5 text-emerald-400" />
            <span className="font-medium">Free High-Speed Wi-Fi</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/45 px-3.5 py-1.5 text-xs text-warm-white backdrop-blur-md">
            <Wind className="h-3.5 w-3.5 text-sky-400" />
            <span className="font-medium">100% Inverter AC (Deluxe &amp; Normal)</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/45 px-3.5 py-1.5 text-xs text-warm-white backdrop-blur-md">
            <Maximize2 className="h-3.5 w-3.5 text-gold" />
            <span className="font-medium">320 – 1,200 Sq. Ft.</span>
          </div>
        </motion.div>

        {/* User-Friendly Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.8, ease: EASE }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href="#rooms"
            className="flex items-center gap-2 rounded-full bg-italian-red hover:bg-[#b5372e] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-warm-white shadow-xl shadow-italian-red/35 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            data-cursor-text="ROOMS"
          >
            <span>Explore Rooms &amp; Suites</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <a
            href="#visit"
            className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-warm-white backdrop-blur-md transition-all hover:border-gold hover:text-gold active:scale-95 cursor-pointer"
            data-cursor-text="BOOK"
          >
            <Calendar className="h-3.5 w-3.5 text-gold" />
            <span>Book Your Stay</span>
          </a>
        </motion.div>
      </div>

      {/* Floating 8K Clarity & Playback Controls Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.3, duration: 0.8 }}
        className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-3 md:right-12"
      >
        <button
          onClick={() => setEnhancedClarity(!enhancedClarity)}
          className="group flex items-center gap-2 rounded-full border border-white/25 bg-black/60 px-4 py-2 text-[11px] font-mono tracking-wider text-warm-white backdrop-blur-md transition-all hover:border-gold hover:text-gold cursor-pointer"
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
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/60 text-warm-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 cursor-pointer"
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
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-warm-white/70"
        aria-label="Scroll to continue"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="h-5 w-5" strokeWidth={1.25} />
        </motion.div>
      </motion.div>
    </section>
  );
}
