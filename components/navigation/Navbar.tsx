"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, ArrowRight, Menu, X, MapPin } from "lucide-react";
import { GoldenLotus } from "@/components/ui/GoldenLotus";

const EASE = [0.22, 1, 0.36, 1] as const;

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Rooms & Suites", href: "/rooms" },
  { label: "Facilities", href: "/facilities" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roomsDropdownOpen, setRoomsDropdownOpen] = useState(false);

  useEffect(() => {
    setRoomsDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 sm:py-5 px-4 sm:px-8 transition-all duration-300">
      <div className="mx-auto max-w-6xl">
        {/* Luxury Glass Capsule */}
        <div
          className={`relative mx-auto flex items-center justify-between rounded-full px-4 sm:px-7 py-2 sm:py-3 transition-all duration-300 ${
            scrolled
              ? "bg-[#0a0e17]/95 border border-gold/45 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
              : "bg-[#090d15]/80 border border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl hover:border-gold/50"
          }`}
        >
          {/* 1. Brand Logo: [BR VASANTHAM] with Golden Lotus */}
          <Link
            href="/"
            className="group flex items-center gap-2 sm:gap-3 transition-transform cursor-pointer select-none"
            aria-label="BR Vasantham Home"
          >
            <GoldenLotus className="h-6 w-6 sm:h-8 sm:w-8 transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_8px_rgba(223,186,115,0.5)] shrink-0" />
            <div className="flex flex-col">
              <span className="font-display font-medium text-[11px] sm:text-sm tracking-[0.22em] sm:tracking-[0.26em] text-white group-hover:text-gold transition-colors leading-tight">
                BR<span className="hidden sm:inline"> </span><span className="sm:inline block">VASANTHAM</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-gold/75 font-sans font-light hidden sm:block">
                Luxury Resort &amp; Suites
              </span>
            </div>
          </Link>

          {/* 2. Desktop Navigation Menu: Flow-Type Smooth Scroll on Home + Dedicated Subpages */}
          <nav className="hidden lg:flex items-center gap-1">
            <ul className="flex items-center gap-0.5">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = pathname === item.href;

                if (item.href === "/rooms") {
                  return (
                    <React.Fragment key={item.label}>
                      <li
                        className="relative"
                        onMouseEnter={() => setRoomsDropdownOpen(true)}
                        onMouseLeave={() => setRoomsDropdownOpen(false)}
                      >
                        <button
                          type="button"
                          onClick={() => setRoomsDropdownOpen((prev) => !prev)}
                          className={`relative flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-[0.18em] font-medium transition-all duration-200 cursor-pointer ${
                            isActive || roomsDropdownOpen
                              ? "text-gold font-semibold"
                              : "text-white/80 hover:text-white hover:text-gold"
                          }`}
                        >
                          <span>{item.label}</span>
                          <span className="text-[9px] text-gold/80 transition-transform duration-200">
                            {roomsDropdownOpen ? "▲" : "▼"}
                          </span>
                          {/* Subtle Underline for Active Section */}
                          {isActive && (
                            <motion.span
                              layoutId="activeNavIndicator"
                              className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"
                              transition={{ duration: 0.3, ease: EASE }}
                            />
                          )}
                        </button>

                        {/* Floating Dropdown: Branch Selection matching Reference */}
                        <AnimatePresence>
                          {roomsDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.96 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.96 }}
                              transition={{ duration: 0.2, ease: EASE }}
                              className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[480px] sm:w-[520px] rounded-3xl bg-[#0a0e17]/98 border border-gold/45 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl text-center z-50 pointer-events-auto"
                            >
                              <div className="text-[11px] uppercase tracking-[0.35em] text-gold font-semibold mb-3">
                                ROOMS &amp; SUITES
                              </div>

                              <div className="border-y border-white/10 py-5 grid grid-cols-2 divide-x divide-white/10">
                                <Link
                                  href="/rooms?branch=puducherry"
                                  onClick={() => setRoomsDropdownOpen(false)}
                                  className="group px-4 py-2 flex flex-col items-center justify-center hover:bg-white/5 transition-all rounded-xl cursor-pointer"
                                >
                                  <div className="flex items-center gap-2 text-warm-white group-hover:text-gold transition-colors font-serif text-sm tracking-[0.2em] uppercase font-medium">
                                    <MapPin className="h-4 w-4 text-gold shrink-0 transition-transform group-hover:scale-110" />
                                    <span>PONDICHERRY</span>
                                  </div>
                                  <span className="text-[10px] text-white/50 tracking-wider mt-1 group-hover:text-white/75">
                                    Main Residency Branch
                                  </span>
                                </Link>

                                <Link
                                  href="/rooms?branch=tindivanam"
                                  onClick={() => setRoomsDropdownOpen(false)}
                                  className="group px-4 py-2 flex flex-col items-center justify-center hover:bg-white/5 transition-all rounded-xl cursor-pointer"
                                >
                                  <div className="flex items-center gap-2 text-warm-white group-hover:text-gold transition-colors font-serif text-sm tracking-[0.2em] uppercase font-medium">
                                    <MapPin className="h-4 w-4 text-gold shrink-0 transition-transform group-hover:scale-110" />
                                    <span>TINDIVANAM</span>
                                  </div>
                                  <span className="text-[10px] text-white/50 tracking-wider mt-1 group-hover:text-white/75">
                                    Second Branch
                                  </span>
                                </Link>
                              </div>

                              <p className="mt-4 text-[11px] text-white/65 font-light tracking-wide">
                                Select a location to explore curated luxury rooms &amp; suites
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>

                      {/* Subtle divider between items */}
                      {idx < NAV_ITEMS.length - 1 && (
                        <span className="h-3 w-px bg-white/15" aria-hidden="true" />
                      )}
                    </React.Fragment>
                  );
                }

                return (
                  <React.Fragment key={item.label}>
                    <li>
                      <Link
                        href={item.href}
                        className={`relative px-4 py-2 text-xs uppercase tracking-[0.18em] font-medium transition-all duration-200 cursor-pointer ${
                          isActive
                            ? "text-gold font-semibold"
                            : "text-white/80 hover:text-white hover:text-gold"
                        }`}
                      >
                        <span>{item.label}</span>
                        {/* Subtle Underline for Active Section */}
                        {isActive && (
                          <motion.span
                            layoutId="activeNavIndicator"
                            className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"
                            transition={{ duration: 0.3, ease: EASE }}
                          />
                        )}
                      </Link>
                    </li>

                    {/* Subtle divider between items */}
                    {idx < NAV_ITEMS.length - 1 && (
                      <span className="h-3 w-px bg-white/15" aria-hidden="true" />
                    )}
                  </React.Fragment>
                );
              })}
            </ul>
          </nav>

          {/* 3. CTA: [Reserve Room] with Light Gold Button - Opens Direct Booking */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("open-direct-booking"));
                }
              }}
              className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-gradient-to-r from-[#dfba73] via-[#fae4b2] to-[#c79a4d] text-[#1a120b] px-3.5 sm:px-6 py-2 sm:py-2.5 text-[10px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.16em] font-bold shadow-[0_4px_20px_rgba(223,186,115,0.4)] hover:shadow-[0_6px_25px_rgba(223,186,115,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <Calendar className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>Reserve Room</span>
              <ArrowRight className="hidden sm:inline-block h-3.5 w-3.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-9 w-9 rounded-full border border-white/20 bg-white/5 text-warm-white flex items-center justify-center hover:bg-white/10 hover:border-gold transition-colors cursor-pointer shrink-0"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-x-4 top-20 z-40 rounded-2xl bg-[#0a0e17]/98 border border-gold/40 p-6 shadow-2xl backdrop-blur-2xl lg:hidden text-warm-white"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <GoldenLotus className="h-6 w-6" />
                <span className="font-display font-medium text-xs tracking-[0.24em] text-gold">
                  BR VASANTHAM
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <nav className="mt-4 flex flex-col divide-y divide-white/5">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;

                if (item.href === "/rooms") {
                  return (
                    <div key={item.label} className="py-2.5">
                      <div className="flex items-center justify-between text-sm font-display tracking-wider text-gold font-semibold mb-2">
                        <span>{item.label}</span>
                        <span className="text-[10px] uppercase tracking-wider text-gold/75">Select Branch</span>
                      </div>
                      <div className="pl-3 space-y-2 border-l border-gold/40 my-1">
                        <Link
                          href="/rooms?branch=puducherry"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between text-xs text-white/80 hover:text-gold transition-colors font-serif tracking-wider"
                        >
                          <span className="flex items-center gap-2">
                            <MapPin className="h-3.5 w-3.5 text-gold" />
                            <span>PONDICHERRY</span>
                          </span>
                          <span className="text-[10px] text-white/40">Main Branch →</span>
                        </Link>
                        <Link
                          href="/rooms?branch=tindivanam"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between text-xs text-white/80 hover:text-gold transition-colors font-serif tracking-wider"
                        >
                          <span className="flex items-center gap-2">
                            <MapPin className="h-3.5 w-3.5 text-gold" />
                            <span>TINDIVANAM</span>
                          </span>
                          <span className="text-[10px] text-white/40">Second Branch →</span>
                        </Link>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-3 text-sm font-display tracking-wider transition-colors flex items-center justify-between ${
                      isActive
                        ? "text-gold font-semibold"
                        : "text-warm-white hover:text-gold"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-gold/50">→</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-direct-booking"));
                  }
                }}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#dfba73] via-[#fae4b2] to-[#c79a4d] py-3 text-xs uppercase tracking-[0.18em] font-bold text-[#1a120b] shadow-lg cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                <span>Reserve Room</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
