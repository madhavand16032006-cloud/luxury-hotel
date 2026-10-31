"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import {
  Car,
  Wifi,
  Wind,
  Maximize2,
  BedDouble,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Tv,
  Coffee,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const ROOM_TIERS = [
  {
    id: "normal",
    title: "Standard Normal AC Room",
    badge: "Best Value · Solo / Business",
    sqft: "320 sq. ft.",
    rate: "₹2,999",
    period: "/ night",
    acType: "Split Inverter AC (100% Climate Control)",
    bedType: "Queen Plush Bed",
    maxGuests: "2 Guests",
    parking: "Free Covered Car Parking",
    wifi: "Free High-Speed Wi-Fi",
    description:
      "A serene and immaculately appointed room designed for peaceful rest. Equipped with individual remote-controlled split AC, high-speed Wi-Fi, 43\" 4K Smart TV, and ergonomic work desk.",
    amenities: [
      "100% Climate Split AC",
      "Free Covered Car Parking",
      "High-Speed Wi-Fi",
      "43\" 4K Smart TV",
      "Rain Shower & Toiletries",
      "Complimentary Filter Coffee",
    ],
    image: "/images/room-normal-ac.jpg",
  },
  {
    id: "deluxe",
    title: "Deluxe AC Room",
    badge: "Most Popular Choice",
    sqft: "450 sq. ft.",
    rate: "₹4,499",
    period: "/ night",
    acType: "Whisper-Quiet Daikin Inverter AC",
    bedType: "King Luxury Orthopedic Bed",
    maxGuests: "2 Adults + 1 Child",
    parking: "Free Covered Parking & Valet",
    wifi: "Free Gigabit Wi-Fi 6",
    description:
      "Generously proportioned luxury living with private courtyard-facing balcony. Features Carrara marble en-suite bathroom, mini-refrigerator, 55\" Smart TV, and complimentary South Indian breakfast buffet.",
    amenities: [
      "Private Courtyard Balcony",
      "Whisper Inverter AC",
      "Free Valet & Parking Bay",
      "Ultra-Fast Wi-Fi 6",
      "Marble En-suite Bath",
      "Complimentary Breakfast Buffet",
    ],
    image: "/images/room-deluxe-ac.jpg",
  },
  {
    id: "chettinad",
    title: "Royal Chettinad Heritage Suite",
    badge: "Tamil Nadu Heritage Edition",
    sqft: "750 sq. ft.",
    rate: "₹7,999",
    period: "/ night",
    acType: "Centralized Micro-Climate AC",
    bedType: "Handcrafted Teakwood King Bed",
    maxGuests: "Up to 3 Guests",
    parking: "Reserved VIP Parking Bay",
    wifi: "Gigabit Executive Wi-Fi",
    description:
      "An authentic tribute to Tamil Nadu's architectural glory. Features original Athangudi handmade floor tiles, antique Burma teak pillars, Tanjore gold foil paintings, deep soaking tub, and dedicated butler service.",
    amenities: [
      "Original Athangudi Tiled Foyer",
      "Carved Teakwood King Bed",
      "Centralized Climate Control AC",
      "VIP Reserved Car Parking",
      "Deep Soaking Luxury Tub",
      "Personal Butler Service",
    ],
    image: "/images/room-chettinad-suite.jpg",
  },
  {
    id: "presidential",
    title: "Presidential Grand Penthouse",
    badge: "Palatial Opulence",
    sqft: "1,200 sq. ft.",
    rate: "₹14,999",
    period: "/ night",
    acType: "Dual-Zone Central Inverter AC",
    bedType: "Master King + Private Lounge",
    maxGuests: "Up to 4 Guests",
    parking: "2 VIP Bays + Airport Chauffeur",
    wifi: "Dedicated Gigabit Fiber",
    description:
      "The pinnacle of Tamil luxury hospitality. A palatial 1,200 sq. ft. duplex penthouse with private rooftop plunge pool, living salon, dining room for 6, whirlpool jacuzzi, and complimentary chauffeured airport transfers.",
    amenities: [
      "1,200 Sq. Ft. Duplex Living",
      "Private Rooftop Plunge Pool",
      "Dual-Zone Central AC",
      "2 Covered VIP Parking Bays",
      "Whirlpool Jacuzzi & Dressing Room",
      "Complimentary Airport Transfers",
    ],
    image: "/images/room-presidential.jpg",
  },
];

export function RoomShowcase() {
  const [activeTab, setActiveTab] = useState("all");

  const handleSelectRoom = (roomId: string, roomTitle: string, roomRate: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("select-hotel-room", {
          detail: { id: roomId, title: roomTitle, rate: roomRate },
        })
      );
      const visitSection = document.getElementById("visit");
      if (visitSection) {
        visitSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const filteredRooms =
    activeTab === "all"
      ? ROOM_TIERS
      : ROOM_TIERS.filter((r) =>
          activeTab === "ac"
            ? r.id === "normal" || r.id === "deluxe"
            : r.id === "chettinad" || r.id === "presidential"
        );

  return (
    <section id="rooms" className="relative bg-warm-white py-32 md:py-40 border-t border-cream">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold/15 border border-gold/30 px-4 py-1 text-xs uppercase tracking-[0.3em] text-warm-brown font-medium mb-3">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            <span>Regal Accommodation</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-warm-brown">
            Luxury Rooms &amp; Heritage Suites
          </h2>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-warm-brown/75">
            Choose between our pristine <strong>Deluxe &amp; Normal AC Rooms</strong> or indulge in our palatial
            <strong> Royal Chettinad &amp; Presidential Suites</strong>. All rooms guarantee free covered car parking,
            high-speed Wi-Fi, and generous square footage.
          </p>

          {/* Filter Tabs */}
          <div className="mt-8 inline-flex rounded-full border border-warm-brown/20 bg-cream/60 p-1.5 shadow-inner">
            <button
              onClick={() => setActiveTab("all")}
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-warm-brown text-warm-white shadow-sm"
                  : "text-warm-brown/70 hover:text-warm-brown"
              }`}
            >
              All Rooms &amp; Suites (4)
            </button>
            <button
              onClick={() => setActiveTab("ac")}
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "ac"
                  ? "bg-warm-brown text-warm-white shadow-sm"
                  : "text-warm-brown/70 hover:text-warm-brown"
              }`}
            >
              Deluxe &amp; Normal AC
            </button>
            <button
              onClick={() => setActiveTab("suites")}
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "suites"
                  ? "bg-warm-brown text-warm-white shadow-sm"
                  : "text-warm-brown/70 hover:text-warm-brown"
              }`}
            >
              Heritage Suites &amp; Penthouse
            </button>
          </div>
        </div>

        {/* Room Cards Showcase */}
        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {filteredRooms.map((room, idx) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: idx * 0.12, duration: 0.8, ease: EASE }}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-warm-brown/15 bg-white shadow-[0_30px_70px_-25px_rgba(90,70,54,0.15)] transition-all duration-500 hover:border-gold/60 hover:shadow-[0_45px_90px_-25px_rgba(90,70,54,0.25)]"
              data-cursor-text="ROOM"
            >
              <div>
                {/* Real High-Resolution Room Image Banner */}
                <div className="relative aspect-16/10 w-full overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-[var(--ease-cinematic)] group-hover:scale-108"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="rounded-full bg-black/60 backdrop-blur-md border border-white/20 px-3.5 py-1 text-[11px] font-semibold tracking-wider text-warm-white uppercase">
                      {room.badge}
                    </span>

                    <span className="flex items-center gap-1.5 rounded-full bg-gold/90 backdrop-blur-md px-3.5 py-1 text-xs font-mono font-bold text-warm-brown shadow-md">
                      <span>{room.rate}</span>
                      <span className="text-[10px] font-sans font-normal opacity-80">{room.period}</span>
                    </span>
                  </div>

                  {/* Bottom Stats Overlay (Sq. Ft., AC, Bed) */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1.5 rounded-xl bg-black/70 backdrop-blur-md px-3 py-1 text-xs text-white border border-white/15">
                      <Maximize2 className="h-3.5 w-3.5 text-gold" />
                      <span className="font-semibold">{room.sqft}</span>
                    </div>

                    <div className="flex items-center gap-1.5 rounded-xl bg-black/70 backdrop-blur-md px-3 py-1 text-xs text-white border border-white/15">
                      <Wind className="h-3.5 w-3.5 text-sky-400" />
                      <span>{room.acType.split(" ")[0]} AC</span>
                    </div>

                    <div className="flex items-center gap-1.5 rounded-xl bg-black/70 backdrop-blur-md px-3 py-1 text-xs text-white border border-white/15">
                      <BedDouble className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{room.bedType.split(" ")[0]} Bed</span>
                    </div>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-7 sm:p-8">
                  <h3 className="font-display text-2xl sm:text-3xl text-warm-brown group-hover:text-italian-red transition-colors">
                    {room.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-warm-brown/75">
                    {room.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 border-t border-cream pt-5">
                    {room.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2 text-xs text-warm-brown/85 font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Reservation Action Bar */}
              <div className="border-t border-cream bg-[#faf7f2] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-xs text-warm-brown/70">
                  <span className="flex items-center gap-1">
                    <Car className="h-3.5 w-3.5 text-gold" />
                    <span>Free Parking</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Wifi className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Free Wi-Fi</span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectRoom(room.id, room.title, room.rate)}
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-none bg-italian-red hover:bg-[#b5372e] py-3 px-6 text-xs font-semibold uppercase tracking-[0.18em] text-warm-white shadow-md transition-all active:scale-95 cursor-pointer"
                  data-cursor-text="BOOK"
                >
                  <span>Select &amp; Book {room.title.split(" ")[0]} ({room.rate})</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

