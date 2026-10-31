"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, ArrowRight, Menu, X, BedDouble } from "lucide-react";
import { GoldenLotus } from "@/components/ui/GoldenLotus";

const EASE = [0.22, 1, 0.36, 1] as const;

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Facilities", href: "#facilities" },
  { label: "About", href: "#about" },
  { label: "Rooms & Suites", href: "#rooms" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sectionIds = ["contact", "reviews", "rooms", "about", "facilities"];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240) {
            setActiveSection(id);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 sm:py-5 px-4 sm:px-8 transition-all duration-300">
      <div className="mx-auto max-w-6xl">
        {/* Luxury Glass Capsule */}
        <div
          className={`relative mx-auto flex items-center justify-between rounded-full px-5 sm:px-7 py-3 transition-all duration-300 ${
            scrolled
              ? "bg-[#0a0e17]/95 border border-gold/45 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
              : "bg-[#090d15]/80 border border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl hover:border-gold/50"
          }`}
        >
          {/* 1. Brand Logo: [BR VASANTHAM] with Golden Lotus */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="group flex items-center gap-3 transition-transform cursor-pointer select-none"
            aria-label="BR Vasantham Home"
          >
            <GoldenLotus className="h-7 w-7 sm:h-8 sm:w-8 transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_8px_rgba(223,186,115,0.5)]" />
            <div className="flex flex-col">
              <span className="font-display font-medium text-xs sm:text-sm tracking-[0.26em] text-white group-hover:text-gold transition-colors">
                BR VASANTHAM
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-gold/75 font-sans font-light hidden sm:block">
                Luxury Resort &amp; Suites
              </span>
            </div>
          </a>

          {/* 2. Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-1">
            <ul className="flex items-center gap-0.5">
              {NAV_ITEMS.map((item, idx) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <React.Fragment key={item.label}>
                    <li>
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
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
                      </a>
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

          {/* 3. CTA: [Reserve Room] */}
          <div className="flex items-center gap-3">
            <a
              href="#visit"
              onClick={(e) => handleNavClick(e, "#visit")}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#dfba73] via-[#fae4b2] to-[#c79a4d] text-[#1a120c] px-5 sm:px-6 py-2.5 text-xs uppercase tracking-[0.16em] font-bold shadow-[0_4px_20px_rgba(223,186,115,0.4)] hover:shadow-[0_6px_25px_rgba(223,186,115,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <Calendar className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>Reserve Room</span>
              <ArrowRight className="h-3.5 w-3.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-9 w-9 rounded-full border border-white/20 bg-white/5 text-warm-white flex items-center justify-center hover:bg-white/10 hover:border-gold transition-colors cursor-pointer"
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
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="py-3 text-sm font-display tracking-wider text-warm-white hover:text-gold transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-gold/50">→</span>
                </a>
              ))}
            </nav>

            <div className="mt-6 pt-4 border-t border-white/10">
              <a
                href="#visit"
                onClick={(e) => handleNavClick(e, "#visit")}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#dfba73] via-[#fae4b2] to-[#c79a4d] py-3 text-xs uppercase tracking-[0.18em] font-bold text-[#1a120b] shadow-lg"
              >
                <Calendar className="h-4 w-4" />
                <span>Reserve Room</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
