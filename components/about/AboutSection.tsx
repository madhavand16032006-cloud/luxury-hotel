"use client";

import React from "react";
import {
  ShieldCheck,
  HeartHandshake,
  Smartphone,
  BadgePercent,
  CheckCircle2,
  Leaf,
  Truck,
  Award,
} from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";

const COMMITMENTS = [
  {
    icon: ShieldCheck,
    title: "Quality Products",
    tagline: "Handpicked Daily",
    description:
      "We source milk and vegetables directly from vetted regional co-operatives and farms every dawn. Every batch undergoes rigorous quality, freshness, and temperature checks before reaching our aisles.",
    badge: "100% Farm Fresh",
    color: "emerald",
  },
  {
    icon: HeartHandshake,
    title: "Customer Satisfaction",
    tagline: "Your Happiness First",
    description:
      "If you aren't 100% delighted with any apple, tomato, or dairy item, our prompt local support team replaces it immediately or provides a no-questions-asked instant refund.",
    badge: "Instant Replacement",
    color: "blue",
  },
  {
    icon: Smartphone,
    title: "Easy Shopping",
    tagline: "Designed for Simplicity",
    description:
      "Say goodbye to crowded aisles and long billing lines. Search, select, and checkout in under 60 seconds with simple mobile ordering, one-tap repeat orders, and friendly delivery drivers.",
    badge: "30-Min Delivery",
    color: "amber",
  },
  {
    icon: BadgePercent,
    title: "Great Value",
    tagline: "Wholesale-Direct Savings",
    description:
      "By eliminating multiple middlemen and procuring directly from farmers and manufacturers, we pass significant everyday savings to you through fair prices and family combo packs.",
    badge: "Best Price Promise",
    color: "green",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-white border-t border-emerald-100/60 relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 -mr-48 -mt-48 h-96 w-96 rounded-full bg-emerald-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-48 -mb-48 h-96 w-96 rounded-full bg-amber-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3 border border-emerald-200/60">
            <Leaf className="h-3.5 w-3.5 text-emerald-600" />
            <span>Our Story & Mission</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            A Better Way to Shop for <br />
            <span className="text-emerald-700">Everyday Needs</span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
            At <strong className="text-slate-800 font-semibold">National Shopping Mall</strong>, we understand how important everyday shopping is for every family. That&apos;s why we bring groceries, dairy products, and household essentials together in one convenient online shopping destination.
          </p>
        </div>

        {/* 4 Core Commitments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {COMMITMENTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-linear-to-b from-[#f8faf5] to-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Pill */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-14 w-14 rounded-2xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      {item.badge}
                    </span>
                  </div>

                  {/* Commitment Title */}
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-bold text-emerald-700/80 mt-0.5 mb-3">
                    {item.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Guaranteed by NSM</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Story Banner */}
        <div className="rounded-3xl bg-linear-to-r from-emerald-900 via-green-900 to-emerald-950 text-white p-8 sm:p-12 shadow-2xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-emerald-700">
                <Award className="h-3.5 w-3.5 text-amber-400" />
                <span>The National Shopping Mall Promise</span>
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Fresh Produce & Dairy Delivered At Its Peak Purity
              </h3>

              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl">
                We believe your family deserves wholesome nutrition without paying inflated retail markups. Every morning, our team inspects incoming dairy cans and vegetable crates to ensure that only the crispest, healthiest batches reach your home.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-emerald-800/80">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">45,000+</div>
                  <div className="text-xs text-emerald-200 mt-0.5">Families Served</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-300">30 Min</div>
                  <div className="text-xs text-emerald-200 mt-0.5">Average Delivery</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">99.8%</div>
                  <div className="text-xs text-emerald-200 mt-0.5">Freshness Rating</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <a
                href="#products"
                className="w-full text-center py-4 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-lg transition-transform active:scale-95"
              >
                Start Everyday Shopping →
              </a>
              <a
                href="#contact"
                className="w-full text-center py-4 px-6 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm backdrop-blur-md transition-colors"
              >
                Visit Our Physical Store
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

