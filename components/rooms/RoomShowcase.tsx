"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
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
  Eye,
  Calendar,
  X,
  MapPin,
} from "lucide-react";
import { useSiteMedia } from "@/lib/useSiteMedia";

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
  const searchParams = useSearchParams();
  const media = useSiteMedia();
  const branchParam = searchParams?.get("branch");

  const roomImages: Record<string, string> = {
    normal: media.roomNormal || "/images/room-normal-ac.jpg",
    deluxe: media.roomDeluxe || "/images/room-deluxe-ac.jpg",
    chettinad: media.roomChettinad || "/images/room-chettinad-suite.jpg",
    penthouse: media.roomPenthouse || "/images/room-presidential.jpg",
  };
  const [selectedBranch, setSelectedBranch] = useState(
    branchParam === "tindivanam"
      ? "tindivanam"
      : branchParam === "chennai"
      ? "chennai"
      : "puducherry"
  );

  useEffect(() => {
    if (
      branchParam === "tindivanam" ||
      branchParam === "chennai" ||
      branchParam === "puducherry"
    ) {
      setSelectedBranch(branchParam);
    }
  }, [branchParam]);

  const [activeTab, setActiveTab] = useState("all");
  const [viewingRoom, setViewingRoom] = useState<(typeof ROOM_TIERS)[0] | null>(null);

  const handleSelectRoom = (
    roomId: string,
    roomTitle: string,
    roomRate: string,
    roomObj?: (typeof ROOM_TIERS)[0]
  ) => {
    setViewingRoom(null);
    if (typeof window !== "undefined") {
      const branchLabel =
        selectedBranch === "tindivanam"
          ? "Tindivanam"
          : selectedBranch === "chennai"
          ? "Chennai"
          : "Puducherry";
      window.dispatchEvent(
        new CustomEvent("open-direct-booking", {
          detail: {
            id: roomId,
            title: `${roomTitle} (${branchLabel})`,
            rate: roomRate,
            branchId: selectedBranch,
            image: roomObj?.image,
            acType: roomObj?.acType,
          },
        })
      );
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

          {/* Branch Selector Card matching Reference Image */}
          <div className="mx-auto max-w-3xl mt-10 mb-8 overflow-hidden rounded-3xl border border-stone-200/90 bg-[#faf8f5] shadow-xs text-center p-6 sm:p-8">
            <div className="text-[11px] uppercase tracking-[0.35em] text-[#c79a4d] font-bold mb-3">
              ROOMS
            </div>

            <div className="border-y border-stone-200/90 py-5 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-stone-200/90 gap-2 sm:gap-0">
              <button
                type="button"
                onClick={() => setSelectedBranch("puducherry")}
                className={`group px-3 py-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                  selectedBranch === "puducherry"
                    ? "text-[#1a120b] font-semibold"
                    : "text-stone-500 hover:text-stone-900"
                }`}
              >
                <div className="flex items-center gap-2 font-serif text-sm sm:text-base tracking-[0.16em] uppercase">
                  <MapPin
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      selectedBranch === "puducherry"
                        ? "text-[#c79a4d]"
                        : "text-stone-400 group-hover:text-stone-600"
                    }`}
                  />
                  <span
                    className={
                      selectedBranch === "puducherry"
                        ? "underline underline-offset-8 decoration-2 decoration-[#c79a4d] font-bold text-[#1a120b]"
                        : ""
                    }
                  >
                    PONDICHERRY
                  </span>
                </div>
                <span className="text-[10px] text-stone-400 tracking-wider mt-1.5 font-normal">
                  Main Residency Branch
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedBranch("tindivanam")}
                className={`group px-3 py-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                  selectedBranch === "tindivanam"
                    ? "text-[#1a120b] font-semibold"
                    : "text-stone-500 hover:text-stone-900"
                }`}
              >
                <div className="flex items-center gap-2 font-serif text-sm sm:text-base tracking-[0.16em] uppercase">
                  <MapPin
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      selectedBranch === "tindivanam"
                        ? "text-[#c79a4d]"
                        : "text-stone-400 group-hover:text-stone-600"
                    }`}
                  />
                  <span
                    className={
                      selectedBranch === "tindivanam"
                        ? "underline underline-offset-8 decoration-2 decoration-[#c79a4d] font-bold text-[#1a120b]"
                        : ""
                    }
                  >
                    TINDIVANAM
                  </span>
                </div>
                <span className="text-[10px] text-stone-400 tracking-wider mt-1.5 font-normal">
                  Second Branch &amp; Suites
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedBranch("chennai")}
                className={`group px-3 py-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                  selectedBranch === "chennai"
                    ? "text-[#1a120b] font-semibold"
                    : "text-stone-500 hover:text-stone-900"
                }`}
              >
                <div className="flex items-center gap-2 font-serif text-sm sm:text-base tracking-[0.16em] uppercase">
                  <MapPin
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      selectedBranch === "chennai"
                        ? "text-[#c79a4d]"
                        : "text-stone-400 group-hover:text-stone-600"
                    }`}
                  />
                  <span
                    className={
                      selectedBranch === "chennai"
                        ? "underline underline-offset-8 decoration-2 decoration-[#c79a4d] font-bold text-[#1a120b]"
                        : ""
                    }
                  >
                    CHENNAI
                  </span>
                </div>
                <span className="text-[10px] text-stone-400 tracking-wider mt-1.5 font-normal">
                  Flagship Metro Sanctuary
                </span>
              </button>
            </div>

            <p className="mt-4 text-xs text-stone-600 font-light tracking-wide">
              Select a location to explore curated luxury rooms &amp; suites
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="mt-8 inline-flex rounded-full border border-warm-brown/20 bg-cream/60 p-1.5 shadow-inner">
            <button
              onClick={() => setActiveTab("all")}
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-gradient-to-r from-[#dfba73] via-[#fae4b2] to-[#c79a4d] text-[#1a120b] font-bold shadow-sm"
                  : "text-warm-brown/70 hover:text-warm-brown"
              }`}
            >
              All Rooms &amp; Suites (4)
            </button>
            <button
              onClick={() => setActiveTab("ac")}
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "ac"
                  ? "bg-gradient-to-r from-[#dfba73] via-[#fae4b2] to-[#c79a4d] text-[#1a120b] font-bold shadow-sm"
                  : "text-warm-brown/70 hover:text-warm-brown"
              }`}
            >
              Deluxe &amp; Normal AC
            </button>
            <button
              onClick={() => setActiveTab("suites")}
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "suites"
                  ? "bg-gradient-to-r from-[#dfba73] via-[#fae4b2] to-[#c79a4d] text-[#1a120b] font-bold shadow-sm"
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
                    src={roomImages[room.id] || room.image}
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
                  <h3 className="font-display text-2xl sm:text-3xl text-warm-brown group-hover:text-[#c9a65b] transition-colors">
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

              {/* Bottom Reservation Action Bar: Perfectly Aligned 2-Button Grid */}
              <div className="border-t border-[#e8dfd6] bg-[#faf7f2] p-5 sm:p-6 flex flex-col gap-3.5">
                {/* Row 1: Key Inclusions & Booking Guarantee */}
                <div className="flex items-center justify-between text-xs text-warm-brown/75">
                  <div className="flex items-center gap-2.5">
                    <span className="flex items-center gap-1 font-medium">
                      <Car className="h-3.5 w-3.5 text-[#c79a4d]" />
                      <span>Free Parking</span>
                    </span>
                    <span className="text-stone-300">·</span>
                    <span className="flex items-center gap-1 font-medium">
                      <Wifi className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Free Wi-Fi</span>
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-500 font-medium">
                    Pay at Check-In
                  </span>
                </div>

                {/* Row 2: Perfectly Aligned Dual Action Buttons */}
                <div className="grid grid-cols-2 gap-3 w-full">
                  {/* View Room Button */}
                  <button
                    type="button"
                    onClick={() => setViewingRoom(room)}
                    className="h-11 inline-flex items-center justify-center gap-1.5 px-3 border border-gold/60 bg-white hover:bg-gold/15 text-[11px] sm:text-xs uppercase tracking-[0.14em] font-semibold text-warm-brown hover:text-[#8c6b2d] transition-all cursor-pointer shadow-xs active:scale-95 rounded-none"
                  >
                    <Eye className="h-3.5 w-3.5 text-gold shrink-0" />
                    <span>View Room</span>
                  </button>

                  {/* Reserve Room Button */}
                  <button
                    type="button"
                    onClick={() => handleSelectRoom(room.id, room.title, room.rate, room)}
                    className="h-11 inline-flex items-center justify-center gap-1.5 rounded-none bg-gradient-to-r from-[#dfba73] via-[#fae4b2] to-[#c79a4d] hover:brightness-105 px-3 text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-[#1a120b] shadow-[0_4px_18px_rgba(223,186,115,0.4)] transition-all active:scale-95 cursor-pointer truncate"
                    data-cursor-text="BOOK"
                  >
                    <Calendar className="h-3.5 w-3.5 text-[#1a120b] shrink-0" />
                    <span className="truncate">Reserve ({room.rate})</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#1a120b] shrink-0" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Room Quick View Modal */}
        <AnimatePresence>
          {viewingRoom && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-md overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="relative w-full max-w-3xl rounded-none border border-gold/50 bg-[#160f0b] text-warm-white p-6 sm:p-8 shadow-2xl my-auto"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setViewingRoom(null)}
                  className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/10 hover:bg-gold hover:text-black flex items-center justify-center text-white/80 transition-colors cursor-pointer z-10"
                  aria-label="Close Room View"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Modal Photo */}
                <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-none mb-6 border border-white/10">
                  <Image
                    src={viewingRoom.image}
                    alt={viewingRoom.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 rounded-none bg-gold/90 px-3 py-1 text-xs font-semibold text-warm-brown uppercase tracking-wider">
                    {viewingRoom.badge}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl text-warm-white">
                        {viewingRoom.title}
                      </h3>
                      <p className="text-xs text-white/70 mt-0.5">{viewingRoom.sqft} · {viewingRoom.bedType}</p>
                    </div>
                    <span className="font-mono text-xl sm:text-2xl font-bold text-gold">
                      {viewingRoom.rate} <span className="text-xs font-normal text-white/70">{viewingRoom.period}</span>
                    </span>
                  </div>
                </div>

                {/* Modal Description & Specifications */}
                <div className="space-y-4 text-xs sm:text-sm text-white/80">
                  <p className="leading-relaxed">
                    {viewingRoom.description}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-white/10 text-xs">
                    <div>
                      <span className="text-white/50 block text-[10px] uppercase tracking-wider">Dimensions</span>
                      <span className="font-semibold text-warm-white mt-0.5 block">{viewingRoom.sqft}</span>
                    </div>
                    <div>
                      <span className="text-white/50 block text-[10px] uppercase tracking-wider">Climate Control</span>
                      <span className="font-semibold text-sky-400 mt-0.5 block">{viewingRoom.acType.split(" ")[0]} Inverter AC</span>
                    </div>
                    <div>
                      <span className="text-white/50 block text-[10px] uppercase tracking-wider">Car Parking</span>
                      <span className="font-semibold text-emerald-400 mt-0.5 block">Free Valet Included</span>
                    </div>
                    <div>
                      <span className="text-white/50 block text-[10px] uppercase tracking-wider">Guest Capacity</span>
                      <span className="font-semibold text-warm-white mt-0.5 block">{viewingRoom.maxGuests}</span>
                    </div>
                  </div>

                  {/* Amenities Checklist */}
                  <div>
                    <h4 className="text-[11px] uppercase tracking-[0.2em] text-gold font-semibold mb-2">
                      Included Suite Amenities
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {viewingRoom.amenities.map((am) => (
                        <div key={am} className="flex items-center gap-2 text-white/80">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                          <span>{am}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Action CTA */}
                <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-white/50">
                    Pay at check-in · Zero advance fee required
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      handleSelectRoom(
                        viewingRoom.id,
                        viewingRoom.title,
                        viewingRoom.rate,
                        viewingRoom
                      )
                    }
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-none bg-gradient-to-r from-[#dfba73] via-[#fae4b2] to-[#c79a4d] hover:brightness-105 py-3.5 px-8 text-xs font-bold uppercase tracking-[0.18em] text-[#1a120b] shadow-xl transition-all active:scale-95 cursor-pointer"
                  >
                    <Calendar className="h-4 w-4 text-[#1a120b]" />
                    <span>Reserve {viewingRoom.title.split(" ")[0]} Now ({viewingRoom.rate})</span>
                    <ArrowRight className="h-4 w-4 text-[#1a120b]" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

