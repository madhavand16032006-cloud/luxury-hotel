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
  Users,
  ShieldCheck,
  Coffee,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [enhancedClarity, setEnhancedClarity] = useState(true);

  // Quick Booking State in Hero
  const [quickRoom, setQuickRoom] = useState("deluxe");
  const [quickDate, setQuickDate] = useState("Tomorrow");
  const [quickGuests, setQuickGuests] = useState("2 Guests");

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

  const handleQuickBook = (e: React.MouseEvent) => {
    e.preventDefault();
    const visitEl = document.getElementById("visit");
    if (visitEl) {
      visitEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[105svh] overflow-hidden bg-[#140e0a] pt-24 pb-16">
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
        initial={{ clipPath: "inset(8% 5% 8% 5% round 28px)", scale: 1.05 }}
        animate={{ clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1 }}
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
              ? "contrast(1.1) brightness(1.02) saturate(1.1)"
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

        {/* Cinematic Vignette & Deep Luxury Gradient Overlays */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/35 to-[#160f0b]/95" />
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background: "radial-gradient(circle at center, transparent 35%, rgba(15, 10, 7, 0.75) 100%)",
          }}
        />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex min-h-[90svh] max-w-7xl flex-col justify-end px-6 pb-12 sm:pb-16 md:px-12">
        {/* Eyebrow Pill Badges */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9, ease: EASE }}
          className="mb-5 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs uppercase tracking-[0.3em] text-warm-white/90"
        >
          <span className="font-medium text-gold">BR Vasantham Grand</span>
          <span className="h-1 w-1 rounded-full bg-warm-white/50" />
          <span>Tamil Nadu Heritage</span>
          <span className="h-1 w-1 rounded-full bg-warm-white/50" />
          <span>Est. 1984</span>
          <span className="h-1 w-1 rounded-full bg-warm-white/50" />
          <span className="flex items-center gap-1.5 rounded-full bg-gold/20 border border-gold/40 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-gold shadow-md backdrop-blur-md">
            <Sparkles className="h-3 w-3 text-gold animate-spin" style={{ animationDuration: "6s" }} />
            5-Star Luxury Sanctuary
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
                    transition={{ delay: 0.9 + totalIdx * 0.03, duration: 0.9, ease: EASE }}
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

        {/* Subtitle Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.9, ease: EASE }}
          className="mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-warm-white/80"
        >
          Welcome to Tamil Nadu&apos;s most distinguished palace sanctuary. Featuring 100% climate-controlled
          Deluxe &amp; Normal AC suites (320 to 1,200 sq. ft.), free covered car parking &amp; valet, high-speed Wi-Fi,
          and authentic Chettinad royal hospitality in Chennai &amp; Madurai.
        </motion.p>

        {/* Core Facility Feature Badges (Car Parking, Wi-Fi, AC, Sq Ft) with Motion Hover */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.9, ease: EASE }}
          className="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3"
        >
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs text-warm-white backdrop-blur-md shadow-xs hover:border-gold/60 transition-colors">
            <Car className="h-3.5 w-3.5 text-gold" />
            <span>Free Valet &amp; Covered Car Parking</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs text-warm-white backdrop-blur-md shadow-xs hover:border-gold/60 transition-colors">
            <Wifi className="h-3.5 w-3.5 text-emerald-400" />
            <span>High-Speed Free Wi-Fi 6</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs text-warm-white backdrop-blur-md shadow-xs hover:border-gold/60 transition-colors">
            <Wind className="h-3.5 w-3.5 text-sky-400" />
            <span>100% Deluxe &amp; Normal AC Available</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs text-warm-white backdrop-blur-md shadow-xs hover:border-gold/60 transition-colors">
            <Maximize2 className="h-3.5 w-3.5 text-gold" />
            <span>Spacious 320 to 1,200 Sq. Ft.</span>
          </div>
        </motion.div>

        {/* Floating Quick Reservation Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 1, ease: EASE }}
          className="mt-8 rounded-2xl sm:rounded-3xl border border-white/20 bg-black/60 p-4 sm:p-5 backdrop-blur-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] hover:border-gold/50 transition-all duration-300"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 items-center">
            {/* Field 1: Check-in Date */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition-colors">
              <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gold font-medium">
                <Calendar className="h-3 w-3" />
                <span>Check-in Date</span>
              </label>
              <select
                value={quickDate}
                onChange={(e) => setQuickDate(e.target.value)}
                className="mt-1 w-full bg-transparent text-xs font-semibold text-warm-white outline-none cursor-pointer"
              >
                <option value="Today" className="bg-[#1f1610] text-white">Today (Instant Check-in)</option>
                <option value="Tomorrow" className="bg-[#1f1610] text-white">Tomorrow</option>
                <option value="This Weekend" className="bg-[#1f1610] text-white">This Weekend (Fri - Sun)</option>
                <option value="Next Week" className="bg-[#1f1610] text-white">Next Week</option>
              </select>
            </div>

            {/* Field 2: Room Type with AC & Sq Ft Specs */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition-colors">
              <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gold font-medium">
                <Maximize2 className="h-3 w-3" />
                <span>Room Type &amp; AC</span>
              </label>
              <select
                value={quickRoom}
                onChange={(e) => setQuickRoom(e.target.value)}
                className="mt-1 w-full bg-transparent text-xs font-semibold text-warm-white outline-none cursor-pointer"
              >
                <option value="deluxe" className="bg-[#1f1610] text-white">Deluxe AC Room (450 sq. ft.) · ₹4,499</option>
                <option value="normal" className="bg-[#1f1610] text-white">Normal AC Room (320 sq. ft.) · ₹2,999</option>
                <option value="chettinad" className="bg-[#1f1610] text-white">Royal Chettinad Suite (750 sq. ft.) · ₹7,999</option>
                <option value="presidential" className="bg-[#1f1610] text-white">Presidential Penthouse (1,200 sq. ft.) · ₹14,999</option>
              </select>
            </div>

            {/* Field 3: Number of Guests */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition-colors">
              <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gold font-medium">
                <Users className="h-3 w-3" />
                <span>Guests &amp; Parking</span>
              </label>
              <select
                value={quickGuests}
                onChange={(e) => setQuickGuests(e.target.value)}
                className="mt-1 w-full bg-transparent text-xs font-semibold text-warm-white outline-none cursor-pointer"
              >
                <option value="1 Guest" className="bg-[#1f1610] text-white">1 Guest · Free Parking</option>
                <option value="2 Guests" className="bg-[#1f1610] text-white">2 Guests · Free Parking</option>
                <option value="3 Guests" className="bg-[#1f1610] text-white">3 Guests · Free Parking</option>
                <option value="4+ Family" className="bg-[#1f1610] text-white">4+ Family Guests · 2 Bays</option>
              </select>
            </div>

            {/* Field 4: Search & Book CTA Button */}
            <div>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#visit"
                onClick={handleQuickBook}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-italian-red hover:bg-[#b5372e] py-4 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-warm-white shadow-xl shadow-italian-red/35 transition-all cursor-pointer"
                data-cursor-text="BOOK"
              >
                <span>Reserve Room Now</span>
                <Sparkles className="h-4 w-4" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating 8K Clarity & Playback Controls Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
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
        transition={{ delay: 2.8, duration: 1.2 }}
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
