"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Calendar,
  Eye,
} from "lucide-react";
import { RotatingDiamond } from "@/components/ui/RotatingDiamond";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleOpenBooking = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-direct-booking", {
          detail: { branchId: "chennai" },
        })
      );
    }
  };

  return (
    <section id="hero" className="relative h-svh min-h-[720px] overflow-hidden bg-[#0d0806]">
      {/* Cinematic Full-Bleed Resort Video Background */}
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
          className="h-full w-full object-cover"
          style={{
            transform: "translate3d(0, 0, 0)",
            WebkitBackfaceVisibility: "hidden",
            filter: "contrast(1.06) brightness(1.02) saturate(1.1)",
          }}
          aria-hidden="true"
        >
          <source src="/videos/resort-8k.mp4" type="video/mp4" />
          <source src="/videos/cafe.mp4" type="video/mp4" />
        </video>

        {/* Atmospheric Dusk / Sunset Overlays matching reference image */}
        <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/35 to-black/20" />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/85" />
      </motion.div>

      {/* Main Hero Container */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-6 pt-32 pb-14 sm:pb-16 md:px-12">
        {/* Left-Aligned Luxury Editorial Header matching Reference Image */}
        <div className="max-w-3xl my-auto">
          {/* Eyebrow Label with Golden Accent Rule Line */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
            className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] font-semibold text-warm-white/90 mb-4"
          >
            <span>LUXURY RESORT &amp; SPA</span>
            <span className="h-px w-20 bg-gradient-to-r from-gold via-gold/80 to-transparent" />
          </motion.div>

          {/* Main Title: "Experience True Luxury" */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
            className="font-display text-[clamp(3rem,7.5vw,6.5rem)] leading-[1.0] tracking-tight text-white drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
          >
            Experience
            <br />
            <span className="bg-gradient-to-r from-[#dfba73] via-[#fae4b2] to-[#c79a4d] bg-clip-text text-transparent">
              True Luxury
            </span>
          </motion.h1>

          {/* Tagline: "Relax • Unwind • Rejuvenate" */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: EASE }}
            className="mt-4 text-sm sm:text-base tracking-[0.2em] uppercase font-light text-warm-white/90 drop-shadow-md"
          >
            Relax · Unwind · Rejuvenate
          </motion.p>

          {/* Action Buttons: [Explore Our Resort] & [Reserve Room] in replace of video pause */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5"
          >
            {/* Primary Button: Reserve Room */}
            <button
              type="button"
              onClick={handleOpenBooking}
              className="group rounded-full bg-gradient-to-r from-[#dfba73] via-[#e5c483] to-[#be8e46] text-[#1b120c] font-bold px-8 py-3.5 text-xs uppercase tracking-[0.18em] shadow-[0_15px_30px_-5px_rgba(223,186,115,0.4)] flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              data-cursor-text="BOOK"
            >
              <Calendar className="h-4 w-4 text-[#1b120c]" />
              <span>Reserve Room</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* View Rooms Button */}
            <Link
              href="/rooms"
              className="group rounded-full border border-gold/75 bg-black/50 backdrop-blur-md text-warm-white hover:bg-gradient-to-r hover:from-[#dfba73] hover:via-[#fae4b2] hover:to-[#c79a4d] hover:text-[#1a120b] hover:border-transparent px-7 py-3.5 text-xs uppercase tracking-[0.18em] font-semibold flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
              data-cursor-text="VIEW"
            >
              <Eye className="h-4 w-4 text-gold group-hover:text-[#1a120b] transition-colors" />
              <span>View Rooms</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Integrated Bottom Controls Row: Left Dots & Center Rotating Realistic Diamond */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9, ease: EASE }}
          className="w-full pt-4 pb-2"
        >
          <div className="mx-auto w-full max-w-6xl flex items-center justify-between px-3 sm:px-6">
            {/* Left: Slider Dash & Dots Indicator */}
            <div className="w-24 flex items-center gap-2 select-none shrink-0">
              <span className="h-1 w-8 bg-gradient-to-r from-gold to-[#be8e46] rounded-full" />
              <span className="h-1.5 w-1.5 bg-white/45 rounded-full" />
              <span className="h-1.5 w-1.5 bg-white/45 rounded-full" />
            </div>

            {/* Center: Rotating Realistic 3D Brilliant-Cut Diamond (Quiet-Luxury Scroll Indicator to About Section) */}
            <div className="flex-1 flex items-center justify-center">
              <RotatingDiamond targetId="about" />
            </div>

            {/* Right Spacer to Ensure Perfect Mathematical Center Alignment */}
            <div className="w-24 hidden sm:block shrink-0" aria-hidden="true" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
