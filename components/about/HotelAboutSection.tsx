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
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HotelAboutSection() {
  return (
    <section id="about" className="relative bg-warm-white py-28 sm:py-36 border-t border-[#e8dfd6]">
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
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

              {/* Bottom Badge inside photo */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/75 backdrop-blur-md border border-white/20 text-warm-white rounded-none">
                <p className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold">
                  Tamil Nadu Heritage Sanctuary
                </p>
                <p className="font-display text-lg mt-0.5">
                  Centuries-Old Architectural Majesty
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

          {/* Right Column: Editorial Narrative & Heritage Commitments */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-none bg-gold/15 border border-gold/30 px-3.5 py-1 text-[11px] uppercase tracking-[0.25em] text-warm-brown font-semibold">
              <Sparkles className="h-3 w-3 text-gold" />
              <span>About BR Vasantham Grand</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#221610] tracking-tight leading-tight">
              A Legacy of Royal Comfort, Carved in Teak &amp; Stone.
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-[#594d45]">
              At BR Vasantham Grand, hospitality is not merely a service—it is the sacred Tamil tradition of <strong className="text-warm-brown font-semibold">Virunthombal</strong>. Born from the architectural elegance of historic Chettinad palaces, our sanctuary unites timeless craftsmanship with contemporary five-star ease.
            </p>

            <p className="text-xs sm:text-sm leading-relaxed text-[#594d45]">
              Every room features whisper-quiet inverter air conditioning, hand-cast Athangudi geometric tiles naturally cool underfoot, and expansive space ranging from 320 to 1,200 sq. ft. Whether you are traveling with family, visiting for cultural leisure, or holding executive meetings, our doors open to welcome you with unhurried grace.
            </p>

            {/* 4 Feature Highlights Grid (Sharp Rectangular Zero-Radius) */}
            <div className="grid grid-cols-2 gap-3 pt-3">
              <div className="p-4 bg-[#f8f5ef] border border-[#e5ded6] rounded-none">
                <div className="flex items-center gap-2 text-warm-brown mb-1">
                  <Wind className="h-4 w-4 text-[#c2593f]" />
                  <span className="font-display text-sm sm:text-base font-semibold">100% Inverter AC</span>
                </div>
                <p className="text-[11px] text-[#6b5e55] leading-normal">
                  Silent climate control in every Normal &amp; Deluxe room.
                </p>
              </div>

              <div className="p-4 bg-[#f8f5ef] border border-[#e5ded6] rounded-none">
                <div className="flex items-center gap-2 text-warm-brown mb-1">
                  <Car className="h-4 w-4 text-[#c2593f]" />
                  <span className="font-display text-sm sm:text-base font-semibold">Free Car Parking</span>
                </div>
                <p className="text-[11px] text-[#6b5e55] leading-normal">
                  Covered, 24/7 guarded bays with valet assistance.
                </p>
              </div>

              <div className="p-4 bg-[#f8f5ef] border border-[#e5ded6] rounded-none">
                <div className="flex items-center gap-2 text-warm-brown mb-1">
                  <Maximize2 className="h-4 w-4 text-[#c2593f]" />
                  <span className="font-display text-sm sm:text-base font-semibold">320 – 1,200 Sq. Ft.</span>
                </div>
                <p className="text-[11px] text-[#6b5e55] leading-normal">
                  Generous suite proportions with private sit-out balconies.
                </p>
              </div>

              <div className="p-4 bg-[#f8f5ef] border border-[#e5ded6] rounded-none">
                <div className="flex items-center gap-2 text-warm-brown mb-1">
                  <Clock className="h-4 w-4 text-[#c2593f]" />
                  <span className="font-display text-sm sm:text-base font-semibold">24×7 Front Desk</span>
                </div>
                <p className="text-[11px] text-[#6b5e55] leading-normal">
                  Personal concierge, room dining, and travel guidance.
                </p>
              </div>
            </div>

            {/* Direct Action Link */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#visit"
                className="inline-flex items-center gap-2 rounded-none bg-italian-red hover:bg-[#b5372e] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-warm-white transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Reserve Your Stay</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-none border border-warm-brown/30 bg-white hover:bg-cream px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-warm-brown transition-all cursor-pointer"
              >
                <span>Contact Front Desk</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

