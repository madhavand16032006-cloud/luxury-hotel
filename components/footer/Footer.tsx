"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import {
  MapPin,
  Clock,
  Sparkles,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  ArrowUp,
  Send,
  Check,
  Car,
  Wifi,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { HOTEL_BRANCHES } from "@/lib/branches";
import { GoldenLotus } from "@/components/ui/GoldenLotus";

export function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [chennaiTime, setChennaiTime] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        };
        setChennaiTime(new Intl.DateTimeFormat("en-IN", options).format(now));
      } catch (err) {
        setChennaiTime("12:00:00 PM");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenBooking = (branchId?: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-direct-booking", {
          detail: { branchId: branchId || "chennai" },
        })
      );
    }
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes("@")) return;
    setNewsletterDone(true);
    setTimeout(() => {
      setNewsletterDone(false);
      setNewsletterEmail("");
    }, 4500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="visit"
      className="relative w-full border-t border-gold/30 bg-gradient-to-b from-[#222426] via-[#161210] to-[#0a0503] text-warm-white pt-20 pb-12 px-6 sm:px-10 lg:px-16"
    >
      <div className="relative mx-auto max-w-7xl">
        {/* Top Feature: "Book Your Luxury Stay" matching Reference Image (Shown ONLY on Home Page) */}
        {isHome && (
          <div className="border-b border-white/10 pb-20 pt-4 text-center">
            <div className="mx-auto max-w-2xl">
              {/* Eyebrow Label matching Reference Image */}
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-white/55 font-medium block">
                BR VASANTHAM BOUTIQUE HOTEL
              </span>

              {/* Serif Headline with Italic Warm Terracotta Accent matching Reference */}
              <h2 className="mt-5 text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.12]">
                <span className="block font-serif font-normal text-white">Book Your</span>
                <span className="block font-serif italic text-[#c2593f] mt-1 sm:mt-1.5 font-normal">
                  Luxury Stay
                </span>
              </h2>

              {/* Subtitle matching Reference Image */}
              <p className="mt-5 text-xs sm:text-sm text-white/70 max-w-xl mx-auto leading-relaxed font-light">
                Reserve today and experience the BR Vasantham difference — where luxury is quiet and service is personal.
              </p>

              {/* Centered Dual Action Buttons matching Reference Image */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => handleOpenBooking()}
                  className="rounded-none bg-[#c2593f] hover:bg-[#a84c35] text-white font-bold px-8 py-3.5 text-xs uppercase tracking-[0.2em] shadow-lg transition-all active:scale-95 cursor-pointer"
                  data-cursor-text="BOOK"
                >
                  RESERVE NOW
                </button>

                <Link
                  href="/rooms"
                  className="rounded-none border border-white/30 bg-[#2b2c2e]/40 hover:bg-white/10 hover:border-white text-white font-semibold px-8 py-3.5 text-xs uppercase tracking-[0.2em] transition-all active:scale-95 cursor-pointer"
                  data-cursor-text="ROOMS"
                >
                  EXPLORE ROOMS
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Middle Section: 4-Column Directory */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-white/10">
          {/* Column 1: Brand & Royal Heritage */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <GoldenLotus className="h-8 w-8 drop-shadow-[0_0_10px_rgba(223,186,115,0.4)]" />
              <div>
                <span className="font-display font-medium text-sm tracking-[0.24em] text-white block">
                  BR VASANTHAM
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-gold/80 font-light block">
                  Luxury Resort &amp; Suites
                </span>
              </div>
            </Link>

            <p className="text-xs text-white/65 leading-relaxed font-light">
              Tamil Nadu’s premier luxury heritage sanctuaries. Blending authentic Chettinad palace architecture, Athangudi craftsmanship, and royal Virunthombal hospitality.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-white/80">
              <span className="flex items-center gap-2">
                <Car className="h-3.5 w-3.5 text-gold shrink-0" />
                <span>100% Free Covered Parking in all branches</span>
              </span>
              <span className="flex items-center gap-2">
                <Wifi className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>High-Speed Optical Fiber Wi-Fi</span>
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                <span>Zero advance deposit · Pay at check-in</span>
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.24em] text-gold font-semibold mb-4">
              Explore Our Resort
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <Link href="/" className="hover:text-gold transition-colors">
                  Home Sanctuary
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold transition-colors">
                  About Our Heritage
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="hover:text-gold transition-colors">
                  Rooms &amp; Suites (4 Tiers)
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="hover:text-gold transition-colors">
                  Resort Facilities &amp; Pool
                </Link>
              </li>
              <li>
                <Link href="/amenities" className="hover:text-gold transition-colors">
                  Comprehensive Amenities
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gold transition-colors">
                  The Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-gold transition-colors">
                  Guest Reviews &amp; Ratings (4.8★)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold transition-colors">
                  Contact &amp; Directions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Sanctuaries & Locations */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.24em] text-gold font-semibold mb-4">
              Our Destinations
            </h4>
            <ul className="space-y-3.5 text-xs text-white/70">
              <li>
                <p className="font-semibold text-white">BR Vasantham Grand (Chennai)</p>
                <p className="text-[11px] text-white/50">OMR Expressway, Sholinganallur</p>
                <p className="text-[11px] text-gold">Tel: +91 94440 12345</p>
              </li>
              <li>
                <p className="font-semibold text-white">BR Vasantham Heritage (Madurai)</p>
                <p className="text-[11px] text-white/50">West Perumal Maistry St (Near Meenakshi Temple)</p>
                <p className="text-[11px] text-gold">Tel: +91 94440 23456</p>
              </li>
              <li>
                <p className="font-semibold text-white">BR Vasantham Villa (Puducherry)</p>
                <p className="text-[11px] text-white/50">Rue Dumas, French White Town Promenade</p>
                <p className="text-[11px] text-gold">Tel: +91 94440 34567</p>
              </li>
            </ul>
          </div>

          {/* Column 4: 24/7 Front Desk & Newsletter */}
          <div className="space-y-5">
            <div>
              <h4 className="text-xs uppercase tracking-[0.24em] text-gold font-semibold mb-2">
                24/7 Concierge Hotline
              </h4>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Our front desk team is on standby 24 hours a day for reservations and assistance:
              </p>
              <a
                href="tel:+919444012345"
                className="mt-2 inline-flex items-center gap-2 text-gold font-semibold text-sm hover:underline"
              >
                <Phone className="h-4 w-4" />
                <span>+91 94440 12345</span>
              </a>
            </div>

            {/* Quick Newsletter */}
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider text-white/80 font-medium block mb-2">
                Exclusive Guest Privileges
              </span>
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="flex-1 bg-black/50 border border-white/20 px-3 py-2 text-xs text-white rounded-none outline-none focus:border-gold placeholder:text-white/40"
                />
                <button
                  type="submit"
                  className="bg-gold text-[#1a120b] px-4 py-2 text-xs font-bold uppercase rounded-none hover:bg-gold/90 transition-colors shrink-0"
                  aria-label="Subscribe to newsletter"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
              {newsletterDone && (
                <p className="mt-1.5 text-[11px] text-emerald-400 flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  <span>Subscribed successfully!</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            <p>© {new Date().getFullYear()} BR Vasantham Grand — Luxury Heritage Hotel &amp; Suites.</p>
            <p className="text-[11px] text-white/35 mt-0.5">
              Tamil Nadu, India · Chennai · Madurai · Puducherry
            </p>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => handleOpenBooking()}
              className="text-gold font-semibold hover:underline cursor-pointer"
            >
              Reserve Room
            </button>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
