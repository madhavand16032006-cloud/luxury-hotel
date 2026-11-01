"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Calendar,
  Eye,
} from "lucide-react";
import { RotatingDiamond } from "@/components/ui/RotatingDiamond";

const EASE = [0.22, 1, 0.36, 1] as const;

interface HeroSlide {
  id: string;
  navLabel: string;
  badge: string;
  titleLine1: string;
  titleGold: string;
  tagline: string;
  videoSrc: string;
  posterSrc: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  branchId: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "puducherry",
    navLabel: "Puducherry",
    badge: "LUXURY RESORT & SPA · PUDUCHERRY",
    titleLine1: "Experience",
    titleGold: "True Luxury",
    tagline: "RELAX · UNWIND · REJUVENATE",
    videoSrc: "/videos/resort-8k.mp4",
    posterSrc: "/images/hotel-hero.jpg",
    primaryCtaText: "Reserve Room",
    secondaryCtaText: "View Rooms",
    secondaryCtaHref: "/rooms?branch=puducherry",
    branchId: "puducherry",
  },
  {
    id: "tindivanam",
    navLabel: "Tindivanam Restaurant",
    badge: "CULINARY SANCTUARY & RESTAURANT · TINDIVANAM",
    titleLine1: "Exquisite Flavors &",
    titleGold: "Royal Comfort",
    tagline: "DINE · CELEBRATE · UNWIND",
    videoSrc: "/videos/cafe-8k.mp4",
    posterSrc: "/images/facility-dining.jpg",
    primaryCtaText: "Reserve Table / Room",
    secondaryCtaText: "View Tindivanam",
    secondaryCtaHref: "/rooms?branch=tindivanam",
    branchId: "tindivanam",
  },
  {
    id: "chennai",
    navLabel: "Chennai Flagship",
    badge: "METRO GRANDEUR & BEACHFRONT · CHENNAI",
    titleLine1: "Palatial Living &",
    titleGold: "Heritage Suites",
    tagline: "PRESTIGE · TIMELESS · SECLUDED",
    videoSrc: "/videos/resort.mp4",
    posterSrc: "/images/room-chettinad-suite.jpg",
    primaryCtaText: "Reserve Suite",
    secondaryCtaText: "View Chennai Suites",
    secondaryCtaHref: "/rooms?branch=chennai",
    branchId: "chennai",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Listen for branch selection from Navbar menu
  useEffect(() => {
    const handleSwitch = (e: Event) => {
      const customEvent = e as CustomEvent<{ branchId: string }>;
      const branchId = customEvent.detail?.branchId;
      const idx = HERO_SLIDES.findIndex((s) => s.branchId === branchId);
      if (idx !== -1) {
        setCurrentSlide(idx);
      }
    };

    window.addEventListener("switch-hero-branch", handleSwitch);
    return () => window.removeEventListener("switch-hero-branch", handleSwitch);
  }, []);

  const activeSlide = HERO_SLIDES[currentSlide];

  const handleOpenBooking = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-direct-booking", {
          detail: { branchId: activeSlide.branchId },
        })
      );
    }
  };

  return (
    <section id="hero" className="relative h-svh min-h-[720px] overflow-hidden bg-[#0d0806]">
      {/* Cinematic Full-Bleed Video Backgrounds with 60fps Cross-fade */}
      <div className="absolute inset-0">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = currentSlide === idx;
          return (
            <motion.div
              key={slide.id}
              initial={false}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 1.0, ease: EASE }}
              className="absolute inset-0"
              style={{ pointerEvents: "none" }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={slide.posterSrc}
                className="h-full w-full object-cover"
                style={{
                  transform: "translate3d(0, 0, 0)",
                  WebkitBackfaceVisibility: "hidden",
                  filter: "contrast(1.06) brightness(1.02) saturate(1.1)",
                }}
                aria-hidden="true"
              >
                <source src={slide.videoSrc} type="video/mp4" />
              </video>
            </motion.div>
          );
        })}

        {/* Atmospheric Dusk / Sunset Overlays */}
        <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/40 to-black/25" />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/85" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-6 pt-28 sm:pt-32 pb-8 sm:pb-16 md:px-12">
        {/* Editorial Header: Centered on Mobile, Left-Aligned on Desktop */}
        <div className="max-w-3xl my-auto w-full flex flex-col items-center md:items-start text-center md:text-left">
          {/* Dynamic Content Transitions with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex flex-col items-center md:items-start w-full"
            >
              {/* Eyebrow Label with Golden Accent Rule Line(s) */}
              <div className="flex items-center justify-center md:justify-start gap-2.5 sm:gap-3 text-[11px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] font-semibold text-warm-white/90 mb-3 sm:mb-4">
                <span className="h-px w-6 sm:w-8 md:hidden bg-gradient-to-l from-gold to-transparent" />
                <span>{activeSlide.badge}</span>
                <span className="h-px w-6 sm:w-8 md:w-20 bg-gradient-to-r from-gold via-gold/80 to-transparent" />
              </div>

              {/* Main Title */}
              <h1 className="font-display text-[clamp(2.4rem,7vw,6.5rem)] leading-[1.08] sm:leading-[1.0] tracking-tight text-white drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
                {activeSlide.titleLine1}
                <br />
                <span className="bg-gradient-to-r from-[#dfba73] via-[#fae4b2] to-[#c79a4d] bg-clip-text text-transparent">
                  {activeSlide.titleGold}
                </span>
              </h1>

              {/* Tagline */}
              <p className="mt-3.5 sm:mt-4 text-xs sm:text-sm md:text-base tracking-[0.22em] uppercase font-light text-warm-white/90 drop-shadow-md flex items-center justify-center md:justify-start gap-2 sm:gap-2.5">
                {activeSlide.tagline}
              </p>

              {/* Action Buttons: Stacked on Mobile matching reference, side-by-side on laptop */}
              <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-5 w-full sm:w-auto max-w-[280px] sm:max-w-none">
                {/* Primary Button */}
                <button
                  type="button"
                  onClick={handleOpenBooking}
                  className="w-full sm:w-auto group rounded-full bg-gradient-to-r from-[#dfba73] via-[#fae4b2] to-[#c79a4d] text-[#1b120c] font-bold px-7 sm:px-8 py-3.5 text-xs uppercase tracking-[0.18em] shadow-[0_15px_30px_-5px_rgba(223,186,115,0.4)] flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  data-cursor-text="BOOK"
                >
                  <Calendar className="h-4 w-4 text-[#1b120c]" />
                  <span>{activeSlide.primaryCtaText}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Secondary Button */}
                <Link
                  href={activeSlide.secondaryCtaHref}
                  className="w-full sm:w-auto group rounded-full border border-gold/85 bg-black/60 backdrop-blur-md text-warm-white hover:bg-gradient-to-r hover:from-[#dfba73] hover:via-[#fae4b2] hover:to-[#c79a4d] hover:text-[#1a120b] hover:border-transparent px-7 sm:px-8 py-3.5 text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                  data-cursor-text="VIEW"
                >
                  <Eye className="h-4 w-4 text-gold group-hover:text-[#1a120b] transition-colors" />
                  <span>{activeSlide.secondaryCtaText}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile View: Scroll Indicator (Matching Reference Image) & Dots */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8, ease: EASE }}
          className="md:hidden flex flex-col items-center gap-2.5 pb-2"
        >
          {/* Scroll Line Indicator matching Reference Image */}
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex flex-col items-center gap-2 text-white/80 hover:text-gold transition-colors cursor-pointer group"
            aria-label="Scroll to explore"
          >
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-medium text-white/90 group-hover:text-gold transition-colors">
              SCROLL
            </span>
            <div className="relative w-[1.5px] h-10 bg-white/25 overflow-hidden rounded-full">
              <motion.div
                animate={{
                  y: [-16, 42],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: [0.45, 0, 0.55, 1],
                }}
                className="w-full h-4 bg-gradient-to-b from-white via-white to-transparent shadow-[0_0_8px_rgba(255,255,255,0.9)]"
              />
            </div>
          </a>

          {/* Centered Slider Dots: Clickable to switch branch slides */}
          <div className="flex items-center justify-center gap-2.5 pt-1">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = currentSlide === idx;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Switch to ${slide.navLabel}`}
                  className={`transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "h-2 w-7 rounded-full bg-gradient-to-r from-gold to-[#be8e46] shadow-[0_0_8px_rgba(223,186,115,0.8)]"
                      : "h-2 w-2 rounded-full bg-white/40 hover:bg-white/80"
                  }`}
                />
              );
            })}
          </div>
        </motion.div>

        {/* Laptop View: Left Dots & Center Rotating 3D Diamond */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9, ease: EASE }}
          className="hidden md:block w-full pt-4 pb-2"
        >
          <div className="mx-auto w-full max-w-6xl flex items-center justify-between px-3 sm:px-6">
            {/* Left: Slider Dash & Dots Indicator (Clickable to switch slides) */}
            <div className="flex items-center gap-2 select-none shrink-0">
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = currentSlide === idx;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Switch to ${slide.navLabel}`}
                    className={`transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "h-1.5 w-8 rounded-full bg-gradient-to-r from-gold to-[#be8e46] shadow-[0_0_8px_rgba(223,186,115,0.8)]"
                        : "h-1.5 w-2 rounded-full bg-white/40 hover:bg-white/80"
                    }`}
                  />
                );
              })}
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
