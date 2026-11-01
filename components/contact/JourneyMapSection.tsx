"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  ExternalLink,
  Navigation,
  Car,
  Clock,
  Sparkles,
} from "lucide-react";
import { BRANCH_LOCATIONS, LocationBranch } from "./locationsData";

interface JourneyMapSectionProps {
  id?: string;
  defaultBranchId?: string;
  showBranchTabs?: boolean;
}

export function JourneyMapSection({
  id = "journey-map",
  defaultBranchId = "puducherry",
  showBranchTabs = true,
}: JourneyMapSectionProps) {
  const [selectedBranchId, setSelectedBranchId] = useState(defaultBranchId);

  const activeBranch: LocationBranch =
    BRANCH_LOCATIONS.find((b) => b.id === selectedBranchId) ||
    BRANCH_LOCATIONS[0];

  return (
    <section id={id} className="relative bg-[#faf8f5] py-20 sm:py-28 border-t border-[#e8dfd6]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-none bg-gold/15 border border-gold/30 px-3.5 py-1 text-[11px] uppercase tracking-[0.25em] text-[#c2593f] font-semibold mb-3">
            <Sparkles className="h-3 w-3 text-[#c2593f]" />
            <span>Interactive Location Guide</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1a120b] tracking-tight">
            Your Journey Starts Here
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-stone-600 leading-relaxed font-light max-w-xl mx-auto">
            Find {activeBranch.hotelTitle} and plan your arrival with ease.
          </p>

          {/* Optional Branch Switcher Tabs */}
          {showBranchTabs && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {BRANCH_LOCATIONS.map((branch) => {
                const isActive = branch.id === selectedBranchId;
                return (
                  <button
                    key={branch.id}
                    type="button"
                    onClick={() => setSelectedBranchId(branch.id)}
                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#1a120b] text-[#fae4b2] shadow-md border border-[#1a120b]"
                        : "bg-white text-stone-600 hover:text-stone-900 border border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <span>{branch.city}</span>
                    <span
                      className={`ml-1.5 text-[10px] opacity-75 font-normal ${
                        isActive ? "text-[#dfba73]" : "text-stone-400"
                      }`}
                    >
                      ({branch.badge})
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Interactive Split Card matching Reference */}
        <div className="overflow-hidden rounded-3xl border border-stone-200/90 bg-white shadow-[0_25px_60px_rgba(0,0,0,0.08)] grid grid-cols-1 lg:grid-cols-12">
          {/* Left Info Panel */}
          <div className="lg:col-span-5 bg-[#faf7f2] p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stone-200/80">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1a120b]">
                {activeBranch.hotelTitle}
              </h3>
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#c2593f] font-semibold block mt-1">
                {activeBranch.city.toUpperCase()}
              </span>

              {/* Multiline Address */}
              <div className="mt-8 flex items-start gap-3.5 text-xs sm:text-sm text-stone-700">
                <MapPin className="h-5 w-5 text-stone-400 shrink-0 mt-0.5" />
                <div className="space-y-1 font-normal leading-relaxed">
                  {activeBranch.addressShort.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>

              {/* Phone */}
              <div className="mt-6 flex items-center gap-3.5 text-xs sm:text-sm">
                <Phone className="h-5 w-5 text-stone-400 shrink-0" />
                <a
                  href={`tel:${activeBranch.mobile.replace(/[^0-9+]/g, "")}`}
                  className="text-stone-800 font-semibold hover:text-[#c2593f] transition-colors"
                >
                  {activeBranch.mobile}
                </a>
              </div>

              {/* Amenities Badges */}
              <div className="mt-8 pt-6 border-t border-stone-200/80 flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-stone-700 border border-stone-200 font-medium shadow-xs">
                  <Car className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Free Covered Parking</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-stone-700 border border-stone-200 font-medium shadow-xs">
                  <Clock className="h-3.5 w-3.5 text-[#c2593f]" />
                  <span>24/7 Concierge</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 space-y-3">
              <a
                href={activeBranch.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#1a120b] hover:bg-black text-white font-bold py-3.5 px-6 text-xs uppercase tracking-[0.16em] shadow-md transition-all active:scale-95 cursor-pointer text-center"
              >
                <ExternalLink className="h-4 w-4" />
                <span>OPEN GOOGLE MAPS</span>
              </a>

              <a
                href={activeBranch.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 font-semibold py-3.5 px-6 text-xs uppercase tracking-[0.16em] transition-all active:scale-95 cursor-pointer text-center"
              >
                <Navigation className="h-4 w-4 text-[#c2593f]" />
                <span>GET DIRECTIONS</span>
              </a>
            </div>
          </div>

          {/* Right Map Embed Panel */}
          <div className="lg:col-span-7 relative min-h-[360px] sm:min-h-[460px] lg:min-h-[520px] bg-stone-100">
            <iframe
              title={`Map of ${activeBranch.hotelTitle} - ${activeBranch.city}`}
              src={activeBranch.mapEmbedUrl}
              className="w-full h-full min-h-[360px] sm:min-h-[460px] lg:min-h-[520px] border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Top Overlay Badge matching Reference */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg border border-stone-200/90 text-xs max-w-xs hidden sm:block">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-stone-900">
                  {activeBranch.hotelTitle}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5 truncate">
                {activeBranch.addressFull}
              </p>
              <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                <span className="text-amber-600 font-semibold">4.8 ★★★★★</span>
                <a
                  href={activeBranch.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium hover:underline flex items-center gap-1"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
