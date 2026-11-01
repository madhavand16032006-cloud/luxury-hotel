"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Sparkles,
  ShieldCheck,
  Award,
  CheckCircle2,
  Clock,
  Car,
  Wind,
  Maximize2,
  ArrowRight,
  MapPin,
  Calendar,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HotelAboutSection() {
  return (
    <section id="about" className="relative bg-[#f8f5ef] py-28 sm:py-36 border-t border-[#e8dfd6]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Dual Layered Heritage Architectural Photography */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="lg:col-span-5 relative"
          >
            {/* Primary Large Image */}
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-none border border-[#e0d6cb] shadow-[0_30px_70px_-20px_rgba(34,22,16,0.15)]">
              <Image
                src="/images/hotel-hero.jpg"
                alt="BR Vasantham Grand heritage palace courtyard"
                fill
                className="object-cover transition-transform duration-1000 ease-[var(--ease-cinematic)] hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent" />

              {/* Bottom Badge inside photo */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/80 backdrop-blur-md border border-gold/40 text-warm-white rounded-none">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#dfba73] font-semibold flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-[#dfba73]" />
                  <span>Tamil Nadu Heritage Sanctuaries</span>
                </p>
                <p className="font-display text-lg sm:text-xl text-warm-white mt-0.5">
                  Centuries-Old Architectural Majesty
                </p>
                <p className="text-[11px] text-white/60 mt-1">
                  Chennai · Madurai · Puducherry
                </p>
              </div>
            </div>

            {/* Overlapping Floating Secondary Image Badge */}
            <div className="hidden sm:block absolute -bottom-8 -right-8 w-48 aspect-square overflow-hidden rounded-none border-4 border-white shadow-2xl">
              <Image
                src="/images/facility-pool.jpg"
                alt="Courtyard Swimming Pool"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Right Column: Editorial Narrative with Light Gold Accents & Light Gold Button */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Eyebrow in Light Gold */}
            <div className="inline-flex items-center gap-2 rounded-none bg-gold/15 border border-gold/35 px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] text-[#8c6b2d] font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-[#c9a65b]" />
              <span>About Luxury Hotel</span>
            </div>

            {/* Main Headline with Light Gold Accent */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#221610] tracking-tight leading-tight">
              A Legacy of Royal Comfort, Carved in{" "}
              <span className="text-[#c9a65b] font-medium">Teak &amp; Stone.</span>
            </h2>

            {/* Lead Narrative with Light Gold Emphasis */}
            <p className="text-sm sm:text-base leading-relaxed text-[#594d45]">
              At Luxury Hotel, hospitality is the sacred Tamil tradition of{" "}
              <strong className="text-[#8c6b2d] font-semibold">Virunthombal</strong>. Born from the architectural grandeur of historic Chettinad palaces, our sanctuaries across <span className="text-[#8c6b2d] font-medium">Pondicherry, Tindivanam, and Chennai</span> blend royal heritage craftsmanship with modern five-star comfort.
            </p>

            <p className="text-xs sm:text-sm leading-relaxed text-[#594d45]">
              Every room features whisper-quiet 100% inverter air conditioning, hand-cast Athangudi geometric tiles naturally cool underfoot, and expansive space ranging from 320 to 1,200 sq. ft. Whether you are visiting for cultural leisure, a family retreat, or business, we welcome you with warmth and unhurried peace.
            </p>

            {/* 4 Feature Highlights Grid (Light Gold Accents, Sharp Zero-Radius) */}
            <div className="grid grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 bg-white border border-[#e5ded6] rounded-none shadow-2xs hover:border-gold/50 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <Wind className="h-4 w-4 text-[#c9a65b]" />
                  <span className="font-display text-sm sm:text-base font-semibold text-[#221610]">
                    100% Inverter AC
                  </span>
                </div>
                <p className="text-[11px] text-[#6b5e55] leading-normal">
                  Whisper-quiet climate control in every Normal &amp; Deluxe room.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#e5ded6] rounded-none shadow-2xs hover:border-gold/50 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <Car className="h-4 w-4 text-[#c9a65b]" />
                  <span className="font-display text-sm sm:text-base font-semibold text-[#221610]">
                    Free Car Parking
                  </span>
                </div>
                <p className="text-[11px] text-[#6b5e55] leading-normal">
                  Covered, 24/7 guarded bays with complimentary valet assistance.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#e5ded6] rounded-none shadow-2xs hover:border-gold/50 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <Maximize2 className="h-4 w-4 text-[#c9a65b]" />
                  <span className="font-display text-sm sm:text-base font-semibold text-[#221610]">
                    320 – 1,200 Sq. Ft.
                  </span>
                </div>
                <p className="text-[11px] text-[#6b5e55] leading-normal">
                  Spacious rooms &amp; suites with private sit-out balconies.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#e5ded6] rounded-none shadow-2xs hover:border-gold/50 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-[#c9a65b]" />
                  <span className="font-display text-sm sm:text-base font-semibold text-[#221610]">
                    24×7 Front Desk
                  </span>
                </div>
                <p className="text-[11px] text-[#6b5e55] leading-normal">
                  Round-the-clock concierge, room dining, and travel guidance.
                </p>
              </div>
            </div>

            {/* Direct Action Button with Light Gold Background Color */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#visit"
                className="inline-flex items-center gap-2.5 rounded-none bg-gradient-to-r from-[#dfba73] via-[#fae4b2] to-[#c79a4d] hover:brightness-105 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-[#1a120b] shadow-[0_4px_20px_rgba(223,186,115,0.45)] transition-all active:scale-95 cursor-pointer"
              >
                <Calendar className="h-4 w-4 text-[#1a120b]" />
                <span>Reserve Your Stay</span>
                <ArrowRight className="h-4 w-4 text-[#1a120b]" />
              </a>

              <a
                href="#rooms"
                className="inline-flex items-center gap-2 rounded-none border border-gold/40 bg-white/60 hover:bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#221610] hover:text-[#8c6b2d] transition-all cursor-pointer"
              >
                <span>Explore Suites</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#c9a65b]" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
