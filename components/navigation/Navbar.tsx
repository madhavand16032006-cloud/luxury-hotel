"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  Sparkles,
  BedDouble,
  Coffee,
  Heart,
  Compass,
  PartyPopper,
  Image as ImageIcon,
  Phone,
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
        desc: "320 sq. ft. · 100% Inverter AC · Queen Bed",
        href: "#rooms",
        badge: "₹2,999",
      },
      {
        title: "Deluxe Luxury AC Room",
        desc: "450 sq. ft. · Carrara Marble · Private Balcony",
        href: "#rooms",
        badge: "₹4,499",
      },
      {
        title: "Royal Chettinad Heritage Suite",
        desc: "750 sq. ft. · Athangudi Patterned Tiles · Butler Service",
        href: "#rooms",
        badge: "₹7,999",
      },
      {
        title: "Presidential Grand Penthouse",
        desc: "1,200 sq. ft. · Private Rooftop Plunge Pool · Jacuzzi",
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
        desc: "Brewed fresh with pure plantation chicory in brass davarah",
        href: "#dining",
      },
      {
        title: "Dakshin Royal Chettinad Feasts",
        desc: "Heritage slow-cooked recipes with cold-pressed sesame oil",
        href: "#dining",
      },
      {
        title: "In-Room Heritage Dining",
        desc: "Complimentary South Indian breakfast served to your suite",
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
        desc: "Deep soaking baths with soothing herbal essences",
        href: "#facilities",
      },
      {
        title: "Private Rooftop Plunge Pool",
        desc: "Sunset panoramic dip in our penthouse suites",
        href: "#rooms",
      },
      {
        title: "24×7 Reception & Care Concierge",
        desc: "Personal assistance anytime for wellness & comfort",
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
        desc: "Heritage palace with handcrafted Athangudi tiles",
        href: "#visit",
      },
      {
        title: "Puducherry French Quarter",
        desc: "Colonial coastal retreat minutes from the promenade",
        href: "#visit",
      },
      {
        title: "The Chettinad Heritage Story",
        desc: "Authentic woodwork, brass craftsmanship & Virunthombal",
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
        desc: "Courtyard ceremonies with traditional mangala vadhyam",
        href: "#contact",
      },
      {
        title: "Executive Corporate Retreats",
        desc: "High-speed Wi-Fi 6, boardrooms & airport transfers",
        href: "#contact",
      },
      {
        title: "Private Banquet Feasts",
        desc: "Curated multi-course South Indian gastronomic salon",
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

/* Realistic 8-Point Diffraction Star Flare with Rotating Rays and Halo */
function RealisticStarFlare({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dim = size === "sm" ? "h-5 w-5" : size === "lg" ? "h-9 w-9" : "h-7 w-7";
  const halo = size === "sm" ? "h-9 w-9" : size === "lg" ? "h-16 w-16" : "h-12 w-12";

  return (
    <div className={`pointer-events-none relative flex items-center justify-center ${className}`}>
      {/* Ambient Pulsing Warm Gold Glow */}
      <div
        className={`absolute ${halo} rounded-full bg-amber-300/40 blur-xs animate-flare-pulse`}
      />

      {/* Rotating 8-Point Diffraction Beams */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        className={`absolute ${dim} animate-ray-spin opacity-80`}
      >
        {/* Diagonal Soft Beams */}
        <line
          x1="22"
          y1="22"
          x2="78"
          y2="78"
          stroke="#fae4b2"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <line
          x1="78"
          y1="22"
          x2="22"
          y2="78"
          stroke="#fae4b2"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>

      {/* Primary 4-Point Star Core */}
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className={`${dim} drop-shadow-[0_0_12px_rgba(255,235,160,1)] animate-flare-pulse`}
      >
        <path
          d="M20 0 C20 11.5 12 20 0 20 C12 20 20 28.5 20 40 C20 28.5 28 20 40 20 C28 20 20 11.5 20 0 Z"
          fill="#ffffff"
        />
        <path
          d="M20 3 C20 12 13 20 3 20 C13 20 20 27 20 37 C20 27 27 20 37 20 C27 20 20 12 20 3 Z"
          fill="#fae4b2"
        />
        {/* Core Hotspot */}
        <circle cx="20" cy="20" r="2.2" fill="#ffffff" />
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
      <div className="mx-auto max-w-[1400px] relative">
        {/* The Realistic Liquid Gold Wave Glass Ribbon Capsule */}
        <div
          className={`relative w-full transition-all duration-500 rounded-[38px] ${
            scrolled
              ? "shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
              : "shadow-[0_20px_50px_rgba(0,0,0,0.75)]"
          }`}
          onMouseLeave={handleMouseLeave}
        >
          {/* SVG Frame with Realistic Molten Gold Wave Silhouette matching Reference Image */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rounded-[38px]"
            viewBox="0 0 1280 74"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              {/* Molten Gold Ribbon Multi-stop Specular Gradient */}
              <linearGradient id="realisticLiquidGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#c59844" />
                <stop offset="8%" stopColor="#fae4b2" />
                <stop offset="16%" stopColor="#fff8db" />
                <stop offset="28%" stopColor="#dfba73" />
                <stop offset="48%" stopColor="#be8e46" />
                <stop offset="68%" stopColor="#fae4b2" />
                <stop offset="78%" stopColor="#fff8db" />
                <stop offset="88%" stopColor="#ffd987" />
                <stop offset="100%" stopColor="#b8893c" />
              </linearGradient>

              {/* Obsidian Glass Depth Fill */}
              <linearGradient id="obsidianGlassFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#080e18" stopOpacity="0.94" />
                <stop offset="50%" stopColor="#0a1222" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#050810" stopOpacity="0.96" />
              </linearGradient>

              {/* Specular Inner Rim Glow Filter */}
              <filter id="goldGlow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Organic Molten Wave Glass Capsule Path:
                Left: Semicircular cap (37px radius)
                Top: Horizontal with realistic organic crest near right (X: 860 -> 1100, Y: -6)
                Right: Semicircular cap holding the CTA button
                Bottom: Horizontal with realistic liquid swell near right (X: 780 -> 1060, Y: 82)
            */}
            <path
              d="M 37,2 
                 H 760 
                 C 820,2 860,1 920,-5 
                 C 970,-9 1040,-7 1110,2 
                 H 1243 
                 C 1263,2 1278,17 1278,37 
                 C 1278,57 1263,72 1243,72 
                 H 1110 
                 C 1050,72 1010,79 950,81 
                 C 890,83 830,76 760,72 
                 H 37 
                 C 17,72 2,57 2,37 
                 C 2,17 17,2 37,2 Z"
              fill="url(#obsidianGlassFill)"
              stroke="url(#realisticLiquidGoldGrad)"
              strokeWidth="2.5"
              filter="url(#goldGlow)"
            />

            {/* Subtle Inner Glass Specular Edge Line */}
            <path
              d="M 37,4 
                 H 760 
                 C 820,4 860,3 920,-3 
                 C 970,-7 1040,-5 1110,4 
                 H 1243 
                 C 1261,4 1276,18 1276,37 
                 C 1276,55 1261,70 1243,70 
                 H 1110 
                 C 1050,70 1010,77 950,79 
                 C 890,81 830,74 760,70 
                 H 37 
                 C 19,70 4,55 4,37 
                 C 4,18 19,4 37,4 Z"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.8"
              strokeOpacity="0.22"
            />
          </svg>

          {/* Frosted Glass Backdrop Blur Layer */}
          <div className="absolute inset-0 rounded-[38px] backdrop-blur-2xl pointer-events-none" />

          {/* Traveling Golden Light Shimmer Sweep Animation */}
          <div className="absolute inset-0 rounded-[38px] overflow-hidden pointer-events-none">
            <div className="h-full w-48 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer-sweep" />
          </div>

          {/* 3 Realistically Placed Diffraction Star Flares */}
          {/* Flare 1: Directly under the "Home" button on the bottom golden rim */}
          <div className="absolute left-[16.8%] -bottom-[8px] z-30">
            <RealisticStarFlare size="sm" />
          </div>

          {/* Flare 2: On the top wave crest above Celebrations / The Gallery */}
          <div className="absolute right-[14.5%] -top-[12px] z-30">
            <RealisticStarFlare size="lg" />
          </div>

          {/* Flare 3: On the bottom wave rise beneath the Reserve Your Stay CTA */}
          <div className="absolute right-[8.5%] -bottom-[8px] z-30">
            <RealisticStarFlare size="md" />
          </div>

          {/* Main Interactive Capsule Contents */}
          <div className="relative z-20 flex items-center justify-between px-5 sm:px-7 h-[68px] sm:h-[74px]">
            {/* LEFT: Golden Lotus Brand Identity */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero", "home")}
              className="flex items-center gap-3 shrink-0 group cursor-pointer select-none"
              aria-label="BR Vasantham Home"
            >
              {/* Golden Lotus SVG Emblem with 3D scale hover */}
              <div className="transition-transform duration-300 group-hover:scale-110 shrink-0">
                <GoldenLotus className="h-8 w-8 sm:h-9 sm:w-9 drop-shadow-[0_0_10px_rgba(223,186,115,0.7)]" />
              </div>

              {/* Stacked Luxury Brand Typography matching Reference */}
              <div className="flex flex-col text-left">
                <span className="font-display font-medium text-[11px] sm:text-xs tracking-[0.26em] text-[#fae4b2] leading-none drop-shadow-sm">
                  BR
                </span>
                <span className="font-display font-medium text-[11px] sm:text-xs tracking-[0.28em] text-[#dfba73] leading-none mt-1 drop-shadow-sm">
                  VASANTHAM
                </span>
              </div>
            </a>

            {/* Crisp Glass Vertical Divider */}
            <div className="hidden xl:block h-8 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent mx-4 shrink-0" />

            {/* CENTER: Desktop Navigation Menu */}
            <nav className="hidden xl:flex items-center gap-1 flex-1 justify-center">
              {NAV_ITEMS.map((item, index) => {
                const isHome = item.id === "home";
                const isActive = activeMenu === item.id;
                const isDropdownOpen = openDropdown === item.id;

                return (
                  <React.Fragment key={item.id}>
                    <div
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(item.id, item.hasDropdown)}
                    >
                      {isHome ? (
                        /* "Home" Active Golden Dome Pill matching reference image */
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href, item.id)}
                          className="relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#dfba73] via-[#fae4b2] to-[#c79a4d] px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#1a120b] border-t border-white/60 animate-home-breathe hover:brightness-110 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(223,186,115,0.6)]"
                        >
                          <span>{item.label}</span>
                        </a>
                      ) : (
                        /* Standard Navigation Link */
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href, item.id)}
                          className={`group/link relative inline-flex items-center gap-1 text-xs tracking-[0.14em] font-medium transition-all duration-200 py-1.5 px-2 hover:text-[#fae4b2] cursor-pointer whitespace-nowrap ${
                            isActive
                              ? "text-gold font-semibold"
                              : "text-white/85 hover:text-white"
                          }`}
                        >
                          <span>{item.label}</span>
                          {item.hasDropdown && (
                            <ChevronDown
                              className={`h-3 w-3 text-white/50 transition-transform duration-300 group-hover/link:text-gold ${
                                isDropdownOpen ? "rotate-180 text-gold" : ""
                              }`}
                            />
                          )}

                          {/* Subtle golden hover underline glow */}
                          <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-center" />
                        </a>
                      )}

                      {/* Dropdown Menu for Items with Sub-links */}
                      <AnimatePresence>
                        {item.hasDropdown && isDropdownOpen && item.subItems && (
                          <motion.div
                            initial={{ opacity: 0, y: 14, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.24, ease: EASE }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-3.5 w-84 rounded-2xl bg-[#090f1a]/98 border border-gold/50 p-3 shadow-[0_30px_70px_rgba(0,0,0,0.95)] backdrop-blur-2xl z-50"
                          >
                            <div className="px-3 py-1.5 border-b border-white/10 mb-1 flex items-center justify-between">
                              <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold flex items-center gap-1.5">
                                <Sparkles className="h-3 w-3 text-gold" />
                                <span>{item.label}</span>
                              </span>
                              <span className="text-[10px] text-white/40 font-mono">BR Vasantham</span>
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

                    {/* Thin Glass Divider between Items */}
                    {index < NAV_ITEMS.length - 1 && (
                      <span
                        className="h-3.5 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent mx-1.5"
                        aria-hidden="true"
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </nav>

            {/* RIGHT: "Reserve Your Stay" CTA Pill */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Divider before CTA */}
              <div className="hidden xl:block h-8 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent mx-3" />

              {/* Reserve Your Stay CTA Pill */}
              <a
                href="#visit"
                onClick={(e) => handleNavClick(e, "#visit", "visit")}
                className="group relative inline-flex items-center gap-3 rounded-full border border-gold/80 bg-black/65 hover:bg-black/90 pl-4 pr-1.5 py-1.5 text-xs font-semibold tracking-wider text-warm-white shadow-[0_0_22px_rgba(223,186,115,0.35)] hover:shadow-[0_0_35px_rgba(223,186,115,0.65)] hover:border-gold transition-all duration-300 cursor-pointer"
                data-cursor-text="BOOK"
              >
                {/* Gold Outline Calendar Icon */}
                <Calendar className="h-4 w-4 text-gold shrink-0 transition-transform duration-300 group-hover:scale-115" />

                {/* Button Label */}
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.18em] font-medium text-warm-white drop-shadow-sm">
                  Reserve Your Stay
                </span>

                {/* Solid Gold Circular Arrow Button */}
                <span className="h-7 w-7 rounded-full bg-gradient-to-r from-[#dfba73] via-[#fae4b2] to-[#c79a4d] text-[#1a120b] flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 group-hover:translate-x-0.5 shrink-0">
                  <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </span>
              </a>

              {/* Mobile Hamburger Menu Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden h-10 w-10 rounded-full border border-gold/60 bg-black/60 text-gold flex items-center justify-center hover:bg-gold/20 transition-all cursor-pointer shadow-md"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation with Glassmorphism */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-x-4 top-20 z-40 rounded-3xl bg-[#080e18]/98 border border-gold/50 p-6 shadow-2xl backdrop-blur-2xl xl:hidden text-warm-white max-h-[85vh] overflow-y-auto"
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
