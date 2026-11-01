"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Sparkles, HeartHandshake, ShieldCheck, Car, Award, Compass } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HotelStorySection() {
  return (
    <section className="relative bg-white py-24 sm:py-32 border-t border-[#e8dfd6] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#c2593f] font-semibold block mb-2">
            OUR STORY &amp; PHILOSOPHY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1a120b] tracking-tight">
            The Story Behind Le Prestige
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
            Founded on the simple belief that true hospitality is quiet, personal, and profoundly caring.
          </p>
        </div>

        {/* Narrative & Visual Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Story Mosaic */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="relative aspect-16/10 w-full overflow-hidden rounded-3xl border border-stone-200 shadow-[0_25px_60px_rgba(0,0,0,0.08)]">
              <Image
                src="/images/room-chettinad-suite.jpg"
                alt="Le Prestige Residency Heritage Suite"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold block mb-1">
                  PUDUCHERRY FLAGSHIP
                </span>
                <p className="font-serif text-lg sm:text-xl text-white">
                  Where Quiet Luxury Meets Personal Care
                </p>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-5 rounded-2xl bg-[#faf7f2] border border-stone-200/80">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#c2593f] block">
                  4.8★
                </span>
                <span className="text-[10px] uppercase tracking-wider text-stone-500 font-medium mt-1 block">
                  Guest Rating
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-[#faf7f2] border border-stone-200/80">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1a120b] block">
                  100%
                </span>
                <span className="text-[10px] uppercase tracking-wider text-stone-500 font-medium mt-1 block">
                  Inverter AC
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-[#faf7f2] border border-stone-200/80">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-700 block">
                  Free
                </span>
                <span className="text-[10px] uppercase tracking-wider text-stone-500 font-medium mt-1 block">
                  Covered Parking
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative Storytelling */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="lg:col-span-6 space-y-6 text-stone-700 leading-relaxed font-light text-xs sm:text-sm"
          >
            <div className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1a120b] leading-tight font-normal">
                Born From a Passion for Genuine Warmth
              </h3>

              <p className="text-stone-600 leading-relaxed">
                Le Prestige Residency was born from a singular conviction: luxury is not about loud grandeur,
                but about the quiet feeling of being truly taken care of. While modern corporate hospitality
                became increasingly transactional, we chose to return to the sacred South Indian ethos
                of <em>Virunthombal</em>—treating every arriving guest as divine family.
              </p>

              <p className="text-stone-600 leading-relaxed">
                Starting with our flagship property on Villianur Main Road in Puducherry, we designed our rooms
                with generous proportions, whisper-quiet split inverter air conditioning, and guaranteed free
                covered parking so that families, business executives, and spiritual travelers can arrive with complete peace of mind.
              </p>

              <p className="text-stone-600 leading-relaxed">
                Today, as we expand across Tindivanam and Chennai, our foundational promise remains unchanged:
                zero advance deposit required, transparent pricing, impeccably sanitized rooms, and 24/7 personal front desk concierge assistance.
              </p>
            </div>

            {/* 3 Core Pillars List */}
            <div className="pt-4 border-t border-stone-200/80 space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-[#fbeee6] flex items-center justify-center shrink-0 mt-0.5 text-[#c2593f]">
                  <HeartHandshake className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="font-medium text-[#1a120b] text-xs sm:text-sm">Human-Centered Service</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">Always a helpful voice on WhatsApp and front desk, never automated delays.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-[#fbeee6] flex items-center justify-center shrink-0 mt-0.5 text-[#c2593f]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="font-medium text-[#1a120b] text-xs sm:text-sm">Pay at Check-In Guarantee</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">Direct reservations require no upfront advance, with flexible cancellation.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-[#fbeee6] flex items-center justify-center shrink-0 mt-0.5 text-[#c2593f]">
                  <Car className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="font-medium text-[#1a120b] text-xs sm:text-sm">Worry-Free Vehicle Security</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">100% covered valet and self-parking on site with 24/7 CCTV surveillance.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

