"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  MapPin,
  Sparkles,
  Phone,
  BedDouble,
  UtensilsCrossed,
  Heart,
} from "lucide-react";
import { GoldenLotus } from "@/components/ui/GoldenLotus";

const EASE = [0.22, 1, 0.36, 1] as const;

interface SubMenuItem {
  title: string;
  desc?: string;
  href: string;
  badge?: string;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  hasDropdown?: boolean;
  subItems?: SubMenuItem[];
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    label: "Home",
    href: "#hero",
  },
  {
    id: "residences",
    label: "The Residences",
    href: "#rooms",
    hasDropdown: true,
    subItems: [
      {
        title: "Standard Normal AC Room",
        desc: "320 sq. ft. · 100% Split AC · Queen Bed",
        href: "#rooms",
        badge: "₹2,999",
      },
      {
        title: "Deluxe Luxury AC Room",
        desc: "450 sq. ft. · Carrara Marble · Courtyard Balcony",
        href: "#rooms",
        badge: "₹4,499",
      },
      {
        title: "Royal Chettinad Heritage Suite",
        desc: "750 sq. ft. · Athangudi Tiles · Teakwood Foyer",
        href: "#rooms",
        badge: "₹7,999",
      },
      {
        title: "Presidential Grand Penthouse",
        desc: "1,200 sq. ft. · Rooftop Plunge Pool · Jacuzzi",
        href: "#rooms",
        badge: "₹14,999",
      },
    ],
  },
  {
    id: "culinary",
    label: "Culinary",
    href: "#dining",
    hasDropdown: true,
    subItems: [
      {
        title: "Kumbakonam Degree Filter Coffee",
        desc: "Freshly roasted plantation peaberry in pure brass davarah",
        href: "#dining",
      },
      {
        title: "Dakshin Royal Chettinad Feasts",
        desc: "Heritage slow-cooked recipes with cold-pressed sesame oil",
        href: "#dining",
      },
      {
        title: "In-Room Heritage Breakfast Service",
        desc: "Steamed tiffin & brass filter coffee served to your suite",
        href: "#dining",
      },
    ],
  },
  {
    id: "wellness",
    label: "Spa & Wellness",
    href: "#facilities",
    hasDropdown: true,
    subItems: [
      {
        title: "Carrara Marble Hydrotherapy",
        desc: "Deep soaking tubs and rainfall mist relaxation",
        href: "#facilities",
      },
      {
        title: "Private Rooftop Plunge Pool",
        desc: "Sunset panoramic dip in our penthouse suites",
        href: "#rooms",
      },
      {
        title: "24×7 Reception & Care Concierge",
        desc: "Personal assistance anytime for wellness requests",
        href: "#facilities",
      },
    ],
  },
  {
    id: "discover",
    label: "Discover",
    href: "#about",
    hasDropdown: true,
    subItems: [
      {
        title: "Chennai Flagship Sanctuary",
        desc: "Anna Salai luxury corridor in the heart of Chennai",
        href: "#visit",
      },
      {
        title: "Madurai & Chettinad Palace",
        desc: "Grand heritage palace with handcrafted Athangudi tiles",
        href: "#visit",
      },
      {
        title: "Puducherry French Quarter",
        desc: "Heritage sanctuary minutes from the seaside promenade",
        href: "#visit",
      },
      {
        title: "The Chettinad Heritage Story",
        desc: "Handmade tiles, teakwood craft & authentic hospitality",
        href: "#about",
      },
    ],
  },
  {
    id: "celebrations",
    label: "Celebrations",
    href: "#contact",
    hasDropdown: true,
    subItems: [
      {
        title: "Royal Heritage Weddings",
        desc: "Authentic Chettinad courtyard banquets & ceremonies",
        href: "#contact",
      },
      {
        title: "Executive Corporate Retreats",
        desc: "High-speed Wi-Fi 6, boardrooms & private chauffeur",
        href: "#contact",
      },
      {
        title: "Private Dining Salon",
        desc: "Curated multi-course South Indian gastronomic feast",
        href: "#contact",
      },
    ],
  },
  {
    id: "gallery",
    label: "The Gallery",
    href: "#rooms",
  },
  {
    id: "contact",
    label: "Get in Touch",
    href: "#contact",
  },
];

/* 4-Point Luminous Lens Flare Component */
function FlareSparkle({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <div className={`pointer-events-none relative flex items-center justify-center ${className}`}>
      {/* Outer Halo */}
      <div className="absolute h-7 w-7 rounded-full bg-amber-300/45 blur-xs animate-pulse" />
      {/* 4-Point Star Core */}
      <svg viewBox="0 0 24 24" fill="none" className="h-full w-full drop-shadow-[0_0_8px_#fae4b2]">
        <path
          d="M12 0 C12 7.2 16.8 12 24 12 C16.8 12 12 16.8 12 24 C12 16.8 7.2 12 0 12 C7.2 12 12 7.2 12 0 Z"
          fill="#ffffff"
        />
        <path
          d="M12 3 C12 8 16 12 21 12 C16 12 12 16 12 21 C12 16 8 12 3 12 C8 12 12 8 12 3 Z"
          fill="#fae4b2"
        />
      </svg>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string>("home");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setActiveMenu(id);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMouseEnter = (itemId: string, hasDropdown?: boolean) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    if (hasDropdown) {
      setOpenDropdown(itemId);
    } else {
      setOpenDropdown(null);
    }
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 220);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 sm:py-5 px-3 sm:px-6 transition-all duration-300">
      <div className="mx-auto max-w-[1380px] relative">
        {/* Main Ribbon Capsule Container */}
        <div
          className={`relative w-full rounded-full transition-all duration-500 ${
            scrolled
              ? "bg-[#0a0f18]/92 shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-[#cda24e]/50 backdrop-blur-2xl"
              : "bg-[#090e17]/85 shadow-[0_15px_45px_rgba(0,0,0,0.7)] border border-[#dfba73]/60 backdrop-blur-xl"
          }`}
          onMouseLeave={handleMouseLeave}
        >
          {/* Luminous Liquid Gold Wave Border Overlays (SVG) */}
          <div className="pointer-events-none absolute inset-0 rounded-full overflow-visible">
            {/* Top Wave Golden Ribbon with Swell near the right */}
            <svg
              className="absolute -top-[3px] left-0 right-0 w-full h-[6px] overflow-visible"
              preserveAspectRatio="none"
              viewBox="0 0 1200 6"
              fill="none"
            >
              <defs>
                <linearGradient id="goldTopWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#c59844" stopOpacity="0.4" />
                  <stop offset="15%" stopColor="#fae4b2" stopOpacity="0.95" />
                  <stop offset="45%" stopColor="#dfba73" stopOpacity="0.8" />
                  <stop offset="72%" stopColor="#fff2c7" stopOpacity="1" />
                  <stop offset="85%" stopColor="#fae4b2" stopOpacity="1" />
                  <stop offset="100%" stopColor="#be8e46" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <path
                d="M 20,3 Q 250,3 550,3 T 850,1 Q 950,-2 1050,4 T 1180,3"
                stroke="url(#goldTopWaveGrad)"
                strokeWidth="2.5"
                fill="none"
              />
            </svg>

            {/* Bottom Wave Golden Ribbon with Swell near the right */}
            <svg
              className="absolute -bottom-[3px] left-0 right-0 w-full h-[8px] overflow-visible"
              preserveAspectRatio="none"
              viewBox="0 0 1200 8"
              fill="none"
            >
              <defs>
                <linearGradient id="goldBottomWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#c59844" stopOpacity="0.5" />
                  <stop offset="18%" stopColor="#fff2c7" stopOpacity="1" />
                  <stop offset="50%" stopColor="#dfba73" stopOpacity="0.75" />
                  <stop offset="75%" stopColor="#fae4b2" stopOpacity="1" />
                  <stop offset="88%" stopColor="#ffd885" stopOpacity="1" />
                  <stop offset="100%" stopColor="#be8e46" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              <path
                d="M 20,4 Q 200,4 450,4 T 800,6 Q 920,8 1030,2 T 1180,4"
                stroke="url(#goldBottomWaveGrad)"
                strokeWidth="2.5"
                fill="none"
              />
            </svg>

            {/* Radiant Flare 1: Under "Home" pill on bottom ribbon */}
            <div className="absolute left-[16.5%] -bottom-[6px]">
              <FlareSparkle className="h-3.5 w-3.5" />
            </div>

            {/* Radiant Flare 2: Top wave crest above Celebrations / Gallery */}
            <div className="absolute right-[11.5%] -top-[7px]">
              <FlareSparkle className="h-4.5 w-4.5" />
            </div>

            {/* Radiant Flare 3: Bottom wave rise under Reserve Your Stay CTA */}
            <div className="absolute right-[7.5%] -bottom-[6px]">
              <FlareSparkle className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Capsule Content Container */}
          <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3">
            {/* LEFT: Golden Lotus Brand Identity */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero", "home")}
              className="flex items-center gap-3 shrink-0 group cursor-pointer"
              aria-label="BR Vasantham Home"
            >
              {/* Golden Lotus SVG Emblem */}
              <div className="transition-transform duration-300 group-hover:scale-105 shrink-0">
                <GoldenLotus className="h-8 w-8 sm:h-9 sm:w-9" />
              </div>

              {/* Stacked Luxury Brand Typography */}
              <div className="flex flex-col text-left">
                <span className="font-display font-medium text-[11px] sm:text-xs tracking-[0.24em] text-[#fae4b2] leading-none">
                  BR
                </span>
                <span className="font-display font-medium text-[11px] sm:text-xs tracking-[0.26em] text-[#dfba73] leading-none mt-1">
                  VASANTHAM
                </span>
              </div>
            </a>

            {/* Brand Hairline Divider */}
            <div className="hidden xl:block h-7 w-px bg-white/20 mx-3 shrink-0" />

            {/* CENTER: Desktop Navigation Menu */}
            <nav className="hidden xl:flex items-center gap-1.5 flex-1 justify-center">
              {NAV_ITEMS.map((item, index) => {
                const isHome = item.id === "home";
                const isActive = activeMenu === item.id;
                const isDropdownOpen = openDropdown === item.id;

                return (
                  <React.Fragment key={item.id}>
                    {/* Menu Item */}
                    <div
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(item.id, item.hasDropdown)}
                    >
                      {isHome ? (
                        /* "Home" Active Golden Glowing Pill matching reference */
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href, item.id)}
                          className="relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#dfba73] via-[#fae4b2] to-[#c79a4d] px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#1a120b] shadow-[0_0_20px_rgba(223,186,115,0.6)] hover:brightness-105 transition-all duration-300 cursor-pointer"
                        >
                          <span>{item.label}</span>
                        </a>
                      ) : (
                        /* Standard Menu Link with Optional Dropdown Chevron */
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href, item.id)}
                          className={`group/link inline-flex items-center gap-1 text-xs tracking-[0.14em] font-medium transition-colors duration-200 py-1.5 px-2 hover:text-gold cursor-pointer whitespace-nowrap ${
                            isActive
                              ? "text-gold font-semibold"
                              : "text-white/85 hover:text-white"
                          }`}
                        >
                          <span>{item.label}</span>
                          {item.hasDropdown && (
                            <ChevronDown
                              className={`h-3 w-3 text-white/50 transition-transform duration-200 group-hover/link:text-gold ${
                                isDropdownOpen ? "rotate-180 text-gold" : ""
                              }`}
                            />
                          )}
                        </a>
                      )}

                      {/* Dropdown Menu for Items with Sub-links */}
                      <AnimatePresence>
                        {item.hasDropdown && isDropdownOpen && item.subItems && (
                          <motion.div
                            initial={{ opacity: 0, y: 12, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.22, ease: EASE }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 rounded-2xl bg-[#0c1424]/98 border border-gold/45 p-3 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl z-50"
                          >
                            <div className="px-3 py-1.5 border-b border-white/10 mb-1 flex items-center justify-between">
                              <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold">
                                {item.label}
                              </span>
                              <span className="text-[10px] text-white/40">BR Vasantham</span>
                            </div>

                            <div className="space-y-1">
                              {item.subItems.map((sub, sIdx) => (
                                <a
                                  key={sIdx}
                                  href={sub.href}
                                  onClick={(e) => handleNavClick(e, sub.href, item.id)}
                                  className="group/sub block p-2.5 rounded-xl hover:bg-white/10 transition-colors text-left"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-warm-white group-hover/sub:text-gold transition-colors">
                                      {sub.title}
                                    </span>
                                    {sub.badge && (
                                      <span className="text-[10px] font-mono font-semibold text-gold bg-gold/15 px-2 py-0.5 rounded-md border border-gold/30">
                                        {sub.badge}
                                      </span>
                                    )}
                                  </div>
                                  {sub.desc && (
                                    <p className="text-[11px] text-white/55 mt-0.5 line-clamp-1 group-hover/sub:text-white/80 transition-colors">
                                      {sub.desc}
                                    </p>
                                  )}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Subtle Thin Divider between Nav Items */}
                    {index < NAV_ITEMS.length - 1 && (
                      <span className="h-3.5 w-px bg-white/15 mx-1" aria-hidden="true" />
                    )}
                  </React.Fragment>
                );
              })}
            </nav>

            {/* RIGHT: "Reserve Your Stay" Luxury Pill Button */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Divider before CTA */}
              <div className="hidden xl:block h-7 w-px bg-white/20 mx-2" />

              {/* Reserve Your Stay CTA Pill */}
              <a
                href="#visit"
                onClick={(e) => handleNavClick(e, "#visit", "visit")}
                className="group relative inline-flex items-center gap-3 rounded-full border border-gold/75 bg-black/60 hover:bg-black/85 pl-4 pr-1.5 py-1.5 text-xs font-semibold tracking-wider text-warm-white shadow-[0_0_20px_rgba(223,186,115,0.3)] hover:shadow-[0_0_30px_rgba(223,186,115,0.55)] hover:border-gold transition-all duration-300 cursor-pointer"
                data-cursor-text="BOOK"
              >
                {/* Gold Calendar Icon */}
                <Calendar className="h-4 w-4 text-gold shrink-0 transition-transform group-hover:scale-110" />

                {/* Button Label */}
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.18em] font-medium text-warm-white">
                  Reserve Your Stay
                </span>

                {/* Solid Gold Circular Arrow Button */}
                <span className="h-7 w-7 rounded-full bg-gradient-to-r from-[#dfba73] via-[#fae4b2] to-[#c79a4d] text-[#1a120c] flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-0.5 shrink-0">
                  <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </span>
              </a>

              {/* Mobile Hamburger Menu Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden h-9 w-9 rounded-full border border-gold/50 bg-black/50 text-gold flex items-center justify-center hover:bg-gold/20 transition-colors cursor-pointer"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-x-4 top-20 z-40 rounded-3xl bg-[#090e17]/98 border border-gold/45 p-6 shadow-2xl backdrop-blur-2xl xl:hidden text-warm-white max-h-[85vh] overflow-y-auto"
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <GoldenLotus className="h-7 w-7" />
                <span className="font-display font-medium text-xs tracking-[0.24em] text-gold">
                  BR VASANTHAM
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Mobile Links */}
            <div className="mt-4 space-y-2">
              {NAV_ITEMS.map((item) => (
                <div key={item.id} className="border-b border-white/5 pb-2">
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.id)}
                    className="flex items-center justify-between py-2 text-sm font-display tracking-wider text-warm-white hover:text-gold"
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && <ChevronDown className="h-3.5 w-3.5 text-gold/70" />}
                  </a>

                  {/* Sub-items in mobile */}
                  {item.subItems && (
                    <div className="pl-3 mt-1 space-y-1">
                      {item.subItems.map((sub, sIdx) => (
                        <a
                          key={sIdx}
                          href={sub.href}
                          onClick={(e) => handleNavClick(e, sub.href, item.id)}
                          className="block py-1 text-xs text-white/60 hover:text-gold"
                        >
                          {sub.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <a
                href="#visit"
                onClick={(e) => handleNavClick(e, "#visit", "visit")}
                className="w-full flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#dfba73] via-[#fae4b2] to-[#c79a4d] py-3 text-xs uppercase tracking-[0.2em] font-bold text-[#1a120b] shadow-xl"
              >
                <Calendar className="h-4 w-4" />
                <span>Reserve Your Stay</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
