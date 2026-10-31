"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowDown,
  BedDouble,
  Users,
  ChevronDown,
  ArrowRight,
  Calendar,
  MapPin,
  Sparkles,
  Eye,
} from "lucide-react";
import { HOTEL_BRANCHES } from "@/lib/branches";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Floating Booking Bar State
  const [selectedBranchId, setSelectedBranchId] = useState("chennai");
  const [checkInDate, setCheckInDate] = useState("Select Date");
  const [checkOutDate, setCheckOutDate] = useState("Select Date");
  const [guestsCount, setGuestsCount] = useState("2 Guests");
  const [showBranchMenu, setShowBranchMenu] = useState(false);
  const [showCheckInMenu, setShowCheckInMenu] = useState(false);
  const [showCheckOutMenu, setShowCheckOutMenu] = useState(false);
  const [showGuestsMenu, setShowGuestsMenu] = useState(false);

  const handleCheckAvailability = () => {
    // Dispatch custom event to sync with the reservation module
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("hero-booking-sync", {
          detail: {
            branchId: selectedBranchId,
            checkIn: checkInDate === "Select Date" ? "Tomorrow" : checkInDate,
            duration: checkOutDate === "Select Date" ? "2 Nights" : checkOutDate,
            guests: parseInt(guestsCount) || 2,
          },
        })
      );
      const visitSection = document.getElementById("visit") || document.getElementById("rooms");
      if (visitSection) {
        visitSection.scrollIntoView({ behavior: "smooth" });
      }
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
            <a
              href="#visit"
              className="group rounded-full bg-gradient-to-r from-[#dfba73] via-[#e5c483] to-[#be8e46] text-[#1b120c] font-bold px-8 py-3.5 text-xs uppercase tracking-[0.18em] shadow-[0_15px_30px_-5px_rgba(223,186,115,0.4)] flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              data-cursor-text="BOOK"
            >
              <Calendar className="h-4 w-4 text-[#1b120c]" />
              <span>Reserve Room</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>

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

        {/* Floating Horizontal Booking Engine Bar matching Reference Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9, ease: EASE }}
          className="w-full pt-4"
        >
          <div className="mx-auto w-full max-w-6xl rounded-full bg-black/65 backdrop-blur-2xl border border-white/20 p-2.5 sm:px-6 sm:py-3.5 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 md:gap-3">
            {/* Column 1: Destination Branch */}
            <div className="relative flex-1 px-3 py-1.5 hover:bg-white/5 rounded-full transition-colors">
              <button
                type="button"
                onClick={() => {
                  setShowBranchMenu(!showBranchMenu);
                  setShowCheckInMenu(false);
                  setShowCheckOutMenu(false);
                  setShowGuestsMenu(false);
                }}
                className="w-full flex items-center gap-2.5 text-left cursor-pointer"
              >
                <MapPin className="h-5 w-5 text-gold shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-white/50 font-semibold truncate">
                    Destination Branch
                  </span>
                  <span className="text-xs font-semibold text-warm-white flex items-center gap-1 mt-0.5 truncate">
                    {HOTEL_BRANCHES.find((b) => b.id === selectedBranchId)?.name.split(" ")[0]} Resort
                    <ChevronDown className="h-3 w-3 text-gold/70 ml-1 shrink-0" />
                  </span>
                </div>
              </button>

              {/* Branch Dropdown */}
              <AnimatePresence>
                {showBranchMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full left-0 mb-3 w-72 rounded-2xl bg-[#170f0b]/98 border border-gold/40 p-2 shadow-2xl backdrop-blur-xl z-30"
                  >
                    <span className="block px-3 py-1.5 text-[10px] uppercase tracking-wider text-gold font-semibold border-b border-white/10 mb-1">
                      Choose Hotel Branch
                    </span>
                    {HOTEL_BRANCHES.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => {
                          setSelectedBranchId(b.id);
                          setShowBranchMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-center justify-between ${
                          selectedBranchId === b.id
                            ? "bg-gold/20 text-gold font-semibold"
                            : "text-white/80 hover:bg-white/10"
                        }`}
                      >
                        <div>
                          <p className="font-medium text-warm-white">{b.name}</p>
                          <p className="text-[10px] text-white/50">{b.city} · From {b.startingRate}</p>
                        </div>
                        {selectedBranchId === b.id && <span className="text-xs text-gold">✓</span>}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div className="hidden md:block h-8 w-px bg-white/15" />

            {/* Column 2: Check In */}
            <div className="relative flex-1 px-3 py-1.5 hover:bg-white/5 rounded-full transition-colors">
              <button
                type="button"
                onClick={() => {
                  setShowCheckInMenu(!showCheckInMenu);
                  setShowCheckOutMenu(false);
                  setShowGuestsMenu(false);
                }}
                className="w-full flex items-center gap-3 text-left cursor-pointer"
              >
                <BedDouble className="h-5 w-5 text-gold shrink-0" />
                <div className="flex-1">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-white/50 font-semibold">
                    Check In
                  </span>
                  <span className="text-xs font-semibold text-warm-white flex items-center gap-1 mt-0.5">
                    {checkInDate}
                    <ChevronDown className="h-3 w-3 text-gold/70 ml-1" />
                  </span>
                </div>
              </button>

              {/* Check-In Dropdown */}
              <AnimatePresence>
                {showCheckInMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full left-0 mb-3 w-48 rounded-2xl bg-[#170f0b]/98 border border-gold/40 p-2 shadow-2xl backdrop-blur-xl z-30"
                  >
                    {["Today", "Tomorrow", "This Friday", "Next Monday"].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => {
                          setCheckInDate(d);
                          setShowCheckInMenu(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs text-white/80 hover:bg-gold/20 hover:text-gold transition-colors"
                      >
                        {d}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div className="hidden md:block h-8 w-px bg-white/15" />

            {/* Column 3: Check Out */}
            <div className="relative flex-1 px-4 py-2 hover:bg-white/5 rounded-full transition-colors">
              <button
                type="button"
                onClick={() => {
                  setShowCheckOutMenu(!showCheckOutMenu);
                  setShowCheckInMenu(false);
                  setShowGuestsMenu(false);
                }}
                className="w-full flex items-center gap-3 text-left cursor-pointer"
              >
                <BedDouble className="h-5 w-5 text-gold shrink-0" />
                <div className="flex-1">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-white/50 font-semibold">
                    Check Out
                  </span>
                  <span className="text-xs font-semibold text-warm-white flex items-center gap-1 mt-0.5">
                    {checkOutDate}
                    <ChevronDown className="h-3 w-3 text-gold/70 ml-1" />
                  </span>
                </div>
              </button>

              {/* Check-Out Dropdown */}
              <AnimatePresence>
                {showCheckOutMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full left-0 mb-3 w-48 rounded-2xl bg-[#170f0b]/98 border border-gold/40 p-2 shadow-2xl backdrop-blur-xl z-30"
                  >
                    {["1 Night Stay", "2 Nights (Recommended)", "3 Nights Stay", "5 Nights Retreat"].map(
                      (d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => {
                            setCheckOutDate(d);
                            setShowCheckOutMenu(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl text-xs text-white/80 hover:bg-gold/20 hover:text-gold transition-colors"
                        >
                          {d}
                        </button>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div className="hidden md:block h-8 w-px bg-white/15" />

            {/* Column 4: Guests */}
            <div className="relative flex-1 px-4 py-2 hover:bg-white/5 rounded-full transition-colors">
              <button
                type="button"
                onClick={() => {
                  setShowGuestsMenu(!showGuestsMenu);
                  setShowCheckInMenu(false);
                  setShowCheckOutMenu(false);
                }}
                className="w-full flex items-center gap-3 text-left cursor-pointer"
              >
                <Users className="h-5 w-5 text-gold shrink-0" />
                <div className="flex-1">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-white/50 font-semibold">
                    Guests
                  </span>
                  <span className="text-xs font-semibold text-warm-white flex items-center gap-1 mt-0.5">
                    {guestsCount}
                    <ChevronDown className="h-3 w-3 text-gold/70 ml-1" />
                  </span>
                </div>
              </button>

              {/* Guests Dropdown */}
              <AnimatePresence>
                {showGuestsMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full left-0 mb-3 w-40 rounded-2xl bg-[#170f0b]/98 border border-gold/40 p-2 shadow-2xl backdrop-blur-xl z-30"
                  >
                    {["1 Guest", "2 Guests", "3 Guests", "4+ Guests"].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => {
                          setGuestsCount(g);
                          setShowGuestsMenu(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs text-white/80 hover:bg-gold/20 hover:text-gold transition-colors"
                      >
                        {g}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Column 5: Check Availability CTA Button matching Reference Image */}
            <button
              type="button"
              onClick={handleCheckAvailability}
              className="w-full md:w-auto rounded-full bg-gradient-to-r from-[#dfba73] via-[#e5c483] to-[#be8e46] text-[#1b120c] font-bold px-7 py-3.5 text-xs uppercase tracking-[0.16em] shadow-[0_10px_25px_-5px_rgba(223,186,115,0.4)] flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shrink-0"
              data-cursor-text="SEARCH"
            >
              <span>Check Availability</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Integrated Bottom Controls Row: Slider Pagination (Left) & Redesigned Luxury Scroll Down Button (Right) */}
          <div className="mx-auto w-full max-w-6xl mt-4 sm:mt-5 flex items-center justify-between px-3 sm:px-6">
            {/* Slider Dots Indicator */}
            <div className="flex items-center gap-2 select-none">
              <span className="h-1 w-8 bg-gradient-to-r from-gold to-[#be8e46] rounded-full" />
              <span className="h-1.5 w-1.5 bg-white/45 rounded-full" />
              <span className="h-1.5 w-1.5 bg-white/45 rounded-full" />
            </div>

            {/* Ultra-Luxury Wordless Glass Discovery Button matching Reference Image */}
            <a
              href="#facilities"
              className="group relative h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-white/30 bg-black/50 hover:bg-black/75 hover:border-gold/80 flex items-center justify-center text-white/80 hover:text-gold backdrop-blur-md transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Discover Facilities"
              data-cursor-text="DISCOVER"
            >
              {/* Subtle Expanding Gold Ring on Hover */}
              <span className="absolute inset-0 rounded-full border border-gold/40 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 pointer-events-none" />
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
