"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Calendar,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface GalleryItem {
  id: string;
  title: string;
  category: "all" | "suites" | "heritage" | "pool" | "grounds";
  categoryLabel: string;
  description: string;
  src: string;
  aspect?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Heritage Palace Courtyard",
    category: "heritage",
    categoryLabel: "Courtyard & Heritage",
    description:
      "Sunlit central quadrangle framed by century-old Burmese teakwood pillars, Athangudi handmade floor tiles, and cascading jasmine garlands.",
    src: "/images/hotel-hero.jpg",
  },
  {
    id: "gal-2",
    title: "Emerald Courtyard Swimming Pool",
    category: "pool",
    categoryLabel: "Pool & Relaxation",
    description:
      "Crystal-clear outdoor swimming pool bordered by carved granite pavilions, private relaxation cabanas, and lush tropical greenery.",
    src: "/images/facility-pool.jpg",
  },
  {
    id: "gal-3",
    title: "Royal Chettinad Heritage Suite",
    category: "suites",
    categoryLabel: "Suites & Rooms",
    description:
      "Spacious 750 sq. ft. suite featuring authentic hand-cast Athangudi tiles, teak four-poster bed, and separate palatial sitting salon.",
    src: "/images/room-chettinad-suite.jpg",
  },
  {
    id: "gal-4",
    title: "Dakshin Dining Pavilion",
    category: "grounds",
    categoryLabel: "Dining & Grounds",
    description:
      "Traditional South Indian dining pavilion serving authentic Chettinad feasts on bronze thalis alongside fresh morning filter coffee.",
    src: "/images/facility-dining.jpg",
  },
  {
    id: "gal-5",
    title: "Presidential Grand Penthouse Suite",
    category: "suites",
    categoryLabel: "Suites & Rooms",
    description:
      "Top-floor 1,200 sq. ft. sanctuary with panoramic city views, private balcony lounge, 55\" Smart TV, and dedicated butler service.",
    src: "/images/room-presidential.jpg",
  },
  {
    id: "gal-6",
    title: "Secured Covered Parking Bay",
    category: "grounds",
    categoryLabel: "Facilities & Grounds",
    description:
      "Complimentary dedicated covered parking with 24/7 CCTV surveillance, courteous valet, and clean EV charging access.",
    src: "/images/facility-parking.jpg",
  },
  {
    id: "gal-7",
    title: "Deluxe Inverter AC Suite",
    category: "suites",
    categoryLabel: "Suites & Rooms",
    description:
      "450 sq. ft. serene room with whisper-quiet split inverter AC, ergonomic work desk, high-speed Wi-Fi, and plush Queen bedding.",
    src: "/images/room-deluxe-ac.jpg",
  },
  {
    id: "gal-8",
    title: "Courtyard Garden Villa Suite",
    category: "suites",
    categoryLabel: "Suites & Rooms",
    description:
      "Private veranda opening directly into flowering jasmine gardens, equipped with luxury rain shower and handcrafted brass lamps.",
    src: "/images/suite-villa.jpg",
  },
  {
    id: "gal-9",
    title: "High-Speed Fiber Connectivity Lounge",
    category: "grounds",
    categoryLabel: "Facilities & Grounds",
    description:
      "High-speed optical fiber Wi-Fi throughout all rooms and courtyards, ideal for digital executives and peaceful work retreats.",
    src: "/images/facility-wifi.jpg",
  },
];

const CATEGORIES = [
  { key: "all", label: "All Photos" },
  { key: "suites", label: "Suites & Rooms" },
  { key: "heritage", label: "Courtyard & Heritage" },
  { key: "pool", label: "Pool & Relaxation" },
  { key: "grounds", label: "Facilities & Grounds" },
] as const;

export function HotelGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => ((prev ?? 0) + 1) % filteredItems.length);
    }
  };

  const prevPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => ((prev ?? 0) - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section id="gallery" className="relative bg-[#0d0907] py-28 sm:py-36 border-t border-white/10 text-warm-white">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(223,186,115,0.08),transparent_60%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-none bg-gold/15 border border-gold/30 px-3.5 py-1 text-[11px] uppercase tracking-[0.25em] text-gold font-semibold mb-3">
            <Sparkles className="h-3 w-3 text-gold" />
            <span>Visual Splendor</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
            The Gallery
          </h2>

          <p className="mt-4 text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
            A visual journey through our sunlit Chettinad courtyards, hand-carved Burma teakwood pillars, emerald swimming pool, and opulent guest suites.
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.key);
                  setLightboxIndex(null);
                }}
                className={`rounded-none px-4 py-2 text-xs uppercase tracking-[0.16em] font-semibold transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.key
                    ? "bg-gradient-to-r from-[#dfba73] via-[#fae4b2] to-[#c79a4d] text-[#1a120b] shadow-[0_4px_15px_rgba(223,186,115,0.35)]"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="group relative aspect-4/3 overflow-hidden rounded-none border border-white/15 bg-black/40 shadow-xl cursor-pointer"
                onClick={() => openLightbox(idx)}
              >
                {/* Image */}
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Top Badge: Category */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="rounded-none bg-black/60 backdrop-blur-md border border-white/20 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold text-gold">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Top Right: Zoom Button */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="h-8 w-8 rounded-none bg-gold text-[#1a120b] flex items-center justify-center shadow-lg">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                </div>

                {/* Bottom Content Bar */}
                <div className="absolute inset-x-0 bottom-0 p-5 z-10">
                  <h3 className="font-display text-lg sm:text-xl text-white group-hover:text-gold transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-white/70 line-clamp-2 font-light">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Gallery Bottom CTA */}
        <div className="mt-14 sm:mt-16 text-center">
          <a
            href="#visit"
            className="group inline-flex items-center gap-2.5 rounded-none bg-gradient-to-r from-[#dfba73] via-[#fae4b2] to-[#c79a4d] text-[#1a120b] px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-bold shadow-[0_10px_30px_rgba(223,186,115,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Calendar className="h-4 w-4" />
            <span>Reserve Your Sanctuary Experience</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Full-Screen Interactive Lightbox Modal */}
      <AnimatePresence>
        {currentItem && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-xl"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative w-full max-w-5xl rounded-none border border-gold/40 bg-[#160f0b] p-4 sm:p-6 shadow-2xl text-warm-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-20 h-9 w-9 rounded-none bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-gold hover:text-[#1a120b] transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Main Photo View */}
              <div className="relative aspect-16/10 sm:aspect-16/9 w-full overflow-hidden rounded-none border border-white/10 bg-black">
                <Image
                  src={currentItem.src}
                  alt={currentItem.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />

                {/* Prev Photo Arrow */}
                <button
                  type="button"
                  onClick={prevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-none bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-gold hover:text-[#1a120b] transition-colors cursor-pointer"
                  aria-label="Previous Photo"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                {/* Next Photo Arrow */}
                <button
                  type="button"
                  onClick={nextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-none bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-gold hover:text-[#1a120b] transition-colors cursor-pointer"
                  aria-label="Next Photo"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              {/* Photo Caption & Counter */}
              <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-white/10 pt-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold">
                    {currentItem.categoryLabel}
                  </span>
                  <h3 className="font-display text-xl text-white">
                    {currentItem.title}
                  </h3>
                  <p className="mt-1 text-xs text-white/70 max-w-xl font-light">
                    {currentItem.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-white/50 tracking-wider">
                    {lightboxIndex + 1} / {filteredItems.length}
                  </span>
                  <a
                    href="#visit"
                    onClick={closeLightbox}
                    className="rounded-none bg-gradient-to-r from-[#dfba73] via-[#fae4b2] to-[#c79a4d] text-[#1a120b] font-bold px-5 py-2 text-xs uppercase tracking-wider hover:scale-105 transition-transform"
                  >
                    Book Room
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
