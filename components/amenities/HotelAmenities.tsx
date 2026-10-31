"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Wind,
  Car,
  Wifi,
  Waves,
  Tv,
  Clock,
  Coffee,
  Sparkles,
  ShieldCheck,
  Shirt,
  UtensilsCrossed,
  PhoneCall,
  BedDouble,
  CheckCircle2,
  Calendar,
  ArrowRight,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Amenity {
  id: string;
  icon: React.ElementType;
  title: string;
  category: "all" | "room" | "resort" | "services";
  categoryLabel: string;
  highlight: string;
  description: string;
}

const AMENITIES_LIST: Amenity[] = [
  {
    id: "amenity-ac",
    icon: Wind,
    title: "100% Inverter Climate AC",
    category: "room",
    categoryLabel: "In-Room Comfort",
    highlight: "Whisper-Quiet · Inverter Tech",
    description:
      "Every suite is equipped with independent dual-split inverter climate control, ensuring silent and customizable cooling even in peak Tamil summer.",
  },
  {
    id: "amenity-parking",
    icon: Car,
    title: "Free Covered Parking & Valet",
    category: "resort",
    categoryLabel: "Resort Facilities",
    highlight: "24/7 CCTV · Covered Bays",
    description:
      "Guarded on-site covered car parking with round-the-clock security cameras, courteous valet service, and EV charging stations.",
  },
  {
    id: "amenity-wifi",
    icon: Wifi,
    title: "High-Speed Optical Fiber Wi-Fi",
    category: "room",
    categoryLabel: "In-Room Comfort",
    highlight: "Uncapped · 150+ Mbps",
    description:
      "Ultra-fast enterprise Wi-Fi blankets all suites, courtyards, and common areas, perfect for seamless video calls, streaming, and business needs.",
  },
  {
    id: "amenity-pool",
    icon: Waves,
    title: "Emerald Courtyard Swimming Pool",
    category: "resort",
    categoryLabel: "Resort Facilities",
    highlight: "06:00 - 20:00 · Sun Cabanas",
    description:
      "Pristine outdoor courtyard pool flanked by teakwood sun-loungers, shaded cabanas, and fragrant garden flora for refreshing morning dips.",
  },
  {
    id: "amenity-tv",
    icon: Tv,
    title: "4K Ultra HD Smart TV",
    category: "room",
    categoryLabel: "In-Room Comfort",
    highlight: "43\" to 55\" · OTT Ready",
    description:
      "Large-screen smart television pre-configured with YouTube, Netflix, Hotstar, and premium satellite channels for family entertainment.",
  },
  {
    id: "amenity-concierge",
    icon: Clock,
    title: "24/7 Front Desk & Concierge",
    category: "services",
    categoryLabel: "Guest Services",
    highlight: "Round-the-Clock · Multi-lingual",
    description:
      "Our attentive front desk team is on standby 24 hours a day for seamless midnight check-ins, local temple itineraries, and travel bookings.",
  },
  {
    id: "amenity-coffee",
    icon: Coffee,
    title: "Fresh Filter Coffee & Tea Station",
    category: "room",
    categoryLabel: "In-Room Comfort",
    highlight: "Kumbakonam Degree Brew",
    description:
      "Complimentary in-room electric kettle, premium roasted Chikmagalur coffee blends, Nilgiri teas, and freshly boiled farm milk on request.",
  },
  {
    id: "amenity-bedding",
    icon: BedDouble,
    title: "Plush Royal Bedding",
    category: "room",
    categoryLabel: "In-Room Comfort",
    highlight: "400-Thread Cotton · Orthopedic",
    description:
      "Custom multi-layered pocket spring mattresses, sanitized duvets, and hypoallergenic down pillows designed for deep, restorative sleep.",
  },
  {
    id: "amenity-dining",
    icon: UtensilsCrossed,
    title: "Authentic In-Room Dining",
    category: "services",
    categoryLabel: "Guest Services",
    highlight: "Chettinad & Pure Veg",
    description:
      "Savor traditional crisp dosas, steaming idlis, and royal Chettinad specialties served piping hot right in the privacy of your suite.",
  },
  {
    id: "amenity-housekeeping",
    icon: Sparkles,
    title: "Daily Housekeeping & Turndown",
    category: "services",
    categoryLabel: "Guest Services",
    highlight: "Hospital-Grade Hygiene",
    description:
      "Meticulous daily room sanitization, crisp linen change, aromatic herbal room fresheners, and evening turndown service.",
  },
  {
    id: "amenity-security",
    icon: ShieldCheck,
    title: "24/7 Perimeter Security & Safety",
    category: "resort",
    categoryLabel: "Resort Facilities",
    highlight: "Electronic Keycards · CCTV",
    description:
      "Advanced RFID smart keycard room entry, 24/7 CCTV surveillance throughout all corridors, in-room digital safe, and trained security personnel.",
  },
  {
    id: "amenity-whatsapp",
    icon: PhoneCall,
    title: "Direct WhatsApp Front Desk",
    category: "services",
    categoryLabel: "Guest Services",
    highlight: "Instant Mobile Assistance",
    description:
      "Request extra pillows, room service, or late checkout with a single tap via our dedicated WhatsApp concierge line without waiting on hold.",
  },
];

const AMENITY_CATEGORIES = [
  { key: "all", label: "All Amenities (12)" },
  { key: "room", label: "In-Room Comfort" },
  { key: "resort", label: "Resort Facilities" },
  { key: "services", label: "Guest Services" },
] as const;

export function HotelAmenities() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredAmenities =
    activeCategory === "all"
      ? AMENITIES_LIST
      : AMENITIES_LIST.filter((item) => item.category === activeCategory);

  return (
    <section id="amenities" className="relative bg-[#fbf9f5] py-28 sm:py-36 border-t border-[#e8dfd6]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Subtle Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-none bg-gold/15 border border-gold/30 px-3.5 py-1 text-[11px] uppercase tracking-[0.25em] text-warm-brown font-semibold mb-3">
            <Sparkles className="h-3 w-3 text-gold" />
            <span>Refined Hospitality</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-warm-brown tracking-tight">
            Resort Amenities
          </h2>

          <p className="mt-4 text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Every room and common space at BR Vasantham Grand is thoughtfully curated with modern comforts, 100% inverter air-conditioning, free covered parking, and attentive round-the-clock service.
          </p>

          {/* Filter Categories */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {AMENITY_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`rounded-none px-4 py-2 text-xs uppercase tracking-[0.16em] font-semibold transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.key
                    ? "bg-gradient-to-r from-[#dfba73] via-[#fae4b2] to-[#c79a4d] text-[#1a120b] shadow-[0_4px_15px_rgba(223,186,115,0.35)]"
                    : "bg-white text-stone-700 hover:bg-[#fff9ef] border border-[#e5ded6]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 12-Card Grid with Sharp Luxury Edges & Terracotta / Gold Accents */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredAmenities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5, ease: EASE }}
                className="group relative flex flex-col justify-between bg-white p-7 sm:p-8 rounded-none border border-[#e5ded6] shadow-sm hover:shadow-xl hover:border-gold/60 transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  {/* Top Bar with Icon & Highlight Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-12 w-12 rounded-none bg-[#fbf7f0] border border-[#ece3d8] flex items-center justify-center text-[#c2593f] group-hover:bg-gold/20 group-hover:border-gold/50 group-hover:text-warm-brown transition-colors duration-300">
                      <Icon className="h-6 w-6 stroke-[1.8]" />
                    </div>
                    <span className="rounded-none bg-[#f4efe8] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] font-medium text-stone-600 border border-[#e8dfd6]">
                      {item.highlight}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg sm:text-xl text-warm-brown group-hover:text-[#c2593f] transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Category Tag */}
                <div className="mt-6 pt-4 border-t border-[#f0e9e1] flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-stone-400">
                    {item.categoryLabel}
                  </span>
                  <span className="text-xs text-gold group-hover:translate-x-1 transition-transform duration-300">
                    ✓ Included
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Complimentary Guarantee Bar */}
        <div className="mt-14 sm:mt-16 rounded-none bg-gradient-to-r from-[#1b120c] via-[#241812] to-[#1b120c] border border-gold/30 p-6 sm:p-8 text-warm-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-none bg-gold/20 border border-gold/50 flex items-center justify-center text-gold shrink-0">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display text-base sm:text-lg text-white">
                Guaranteed with Every Reservation
              </h4>
              <p className="text-xs text-white/70 font-light mt-0.5">
                Free covered car parking, 100% inverter climate AC, ultra-fast fiber Wi-Fi, and 24/7 concierge assistance at no extra surcharge.
              </p>
            </div>
          </div>

          <a
            href="#visit"
            className="rounded-none bg-gradient-to-r from-[#dfba73] via-[#fae4b2] to-[#c79a4d] text-[#1a120b] font-bold px-7 py-3.5 text-xs uppercase tracking-[0.18em] shadow-[0_8px_20px_rgba(223,186,115,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="h-4 w-4" />
            <span>Check Availability</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
