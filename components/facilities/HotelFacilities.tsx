"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Star,
  MapPin,
  Building2,
  Car,
  Clock,
  Heart,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const LUXURY_PILLARS = [
  {
    icon: Star,
    title: "Luxury Stay",
    description:
      "Meticulously designed rooms that blend Chettinad royal aesthetics with uncompromising five-star comfort.",
  },
  {
    icon: MapPin,
    title: "Prime Location",
    description:
      "Centrally located in Tamil Nadu's historic corridor, minutes from cultural landmarks, beach promenades, and central transit.",
  },
  {
    icon: Building2,
    title: "Boutique Rooms",
    description:
      "Intimate and curated — generous 320 to 1,200 sq. ft. suites with 100% inverter AC, ensuring every guest receives personal attention.",
  },
  {
    icon: Car,
    title: "Free Parking",
    description:
      "Complimentary secure covered car parking and valet service available for all guests throughout their stay.",
  },
  {
    icon: Clock,
    title: "24×7 Reception",
    description:
      "Round-the-clock front desk concierge assistance to ensure your every need is met, day or night.",
  },
  {
    icon: Heart,
    title: "Premium Hospitality",
    description:
      "Warm, professional service inspired by the finest South Indian boutique hotel and Virunthombal traditions.",
  },
];

export function HotelFacilities() {
  return (
    <section id="facilities" className="relative bg-[#f8f5ef] py-28 sm:py-36 border-t border-[#e8dfd6]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Subtle Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-none bg-gold/15 border border-gold/30 px-3.5 py-1 text-[11px] uppercase tracking-[0.25em] text-warm-brown font-semibold mb-3">
            <Sparkles className="h-3 w-3 text-gold" />
            <span>The Luxury Hotel Standard</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-warm-brown tracking-tight">
            Crafted for Unmatched Serenity &amp; Comfort
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
            Every element of your stay has been carefully considered to provide genuine peace, effortless convenience, and royal Tamil hospitality.
          </p>
        </div>

        {/* 6-Cell Grid with Razor-Sharp Corners & Terracotta Line Icons Matching Reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#e5ded6] bg-[#e5ded6] gap-[1px] shadow-sm">
          {LUXURY_PILLARS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.6, ease: EASE }}
                className="group relative flex flex-col justify-between bg-white p-8 sm:p-10 transition-colors duration-300 hover:bg-[#fffdfa]"
              >
                <div>
                  {/* Terracotta/Rust Outline Icon */}
                  <div className="text-[#c2593f] transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" strokeWidth={1.4} />
                  </div>

                  {/* Title */}
                  <h3 className="mt-8 font-display text-2xl text-[#221610] tracking-tight group-hover:text-[#c9a65b] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#594d45]">
                    {item.description}
                  </p>
                </div>

                {/* Subtle Bottom Accent Indicator */}
                <div className="mt-6 pt-4 border-t border-[#f4ede6] flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#998b82]">
                  <span>Pillar 0{idx + 1}</span>
                  <span className="text-[#c2593f] opacity-0 group-hover:opacity-100 transition-opacity">
                    Guaranteed ✓
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Reassurance Action Footer */}
        <div className="mt-12 text-center">
          <a
            href="#rooms"
            className="inline-flex items-center gap-2 rounded-none border border-warm-brown/30 bg-white hover:bg-warm-brown hover:text-warm-white px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-warm-brown transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <span>Explore Our Boutique Rooms &amp; Suites</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
