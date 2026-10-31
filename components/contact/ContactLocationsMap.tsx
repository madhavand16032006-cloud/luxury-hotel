"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  MapPin,
  Phone,
  ExternalLink,
  Navigation,
  Compass,
  CheckCircle2,
  Car,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface LocationBranch {
  id: string;
  city: string;
  hotelTitle: string;
  badge: string;
  badgeType: "main" | "second" | "metro";
  description: string;
  addressShort: string[];
  addressFull: string;
  mobile: string;
  mapEmbedUrl: string;
  googleMapsUrl: string;
  directionsUrl: string;
}

const BRANCH_LOCATIONS: LocationBranch[] = [
  {
    id: "puducherry",
    city: "Puducherry",
    hotelTitle: "Le Prestige Residency",
    badge: "MAIN BRANCH",
    badgeType: "main",
    description:
      "Our flagship property on Villianur Main Road — the original Le Prestige experience, in the heart of Puducherry.",
    addressShort: [
      "Villianur Main Road",
      "Kamban Nagar",
      "Reddiarpalayam",
      "Puducherry - 605010",
    ],
    addressFull:
      "TRENDS Building, Villianur Main Road, Kamban Nagar, Reddiarpalayam, Puducherry - 605010",
    mobile: "+91 96777 51329",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=TRENDS+Building+Villianur+Main+Road+Kamban+Nagar+Reddiarpalayam+Puducherry+605010&t=&z=15&ie=UTF8&iwloc=&output=embed",
    googleMapsUrl:
      "https://maps.google.com/?q=TRENDS+Building,+Villianur+Main+Road,+Kamban+Nagar,+Reddiarpalayam,+Puducherry+605010",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=TRENDS+Building,+Villianur+Main+Road,+Kamban+Nagar,+Reddiarpalayam,+Puducherry+605010",
  },
  {
    id: "tindivanam",
    city: "Tindivanam",
    hotelTitle: "Le Prestige Residency",
    badge: "SECOND BRANCH",
    badgeType: "second",
    description:
      "Our second branch in Tindivanam — delivering the same quiet luxury and premium stay experience.",
    addressShort: [
      "No. 15/1B, Indhra Nagar",
      "Marakanam Road",
      "Tindivanam, Villupuram",
      "Tamil Nadu - 604001",
    ],
    addressFull:
      "No. 15/1B, Indhra Nagar, Marakanam Road, Tindivanam, Villupuram, Tamil Nadu - 604001",
    mobile: "+91 72006 51329",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Marakanam+Road+Tindivanam+Villupuram+Tamil+Nadu&t=&z=15&ie=UTF8&iwloc=&output=embed",
    googleMapsUrl:
      "https://maps.google.com/?q=No.+15/1B,+Indhra+Nagar,+Marakanam+Road,+Tindivanam,+Villupuram,+Tamil+Nadu",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=No.+15/1B,+Indhra+Nagar,+Marakanam+Road,+Tindivanam,+Villupuram,+Tamil+Nadu",
  },
  {
    id: "chennai",
    city: "Chennai",
    hotelTitle: "BR Vasantham Grand",
    badge: "FLAGSHIP METRO",
    badgeType: "metro",
    description:
      "Our premier luxury sanctuary on Anna Salai & ECR Beachfront, offering authentic heritage hospitality.",
    addressShort: [
      "Anna Salai (Mount Road)",
      "ECR Beachfront",
      "Chennai",
      "Tamil Nadu - 600002",
    ],
    addressFull:
      "Anna Salai (Mount Road) & ECR Beachfront, Chennai, Tamil Nadu - 600002",
    mobile: "+91 94440 12345",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Anna+Salai+Chennai+Tamil+Nadu&t=&z=14&ie=UTF8&iwloc=&output=embed",
    googleMapsUrl: "https://maps.google.com/?q=Anna+Salai,+Chennai,+Tamil+Nadu",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Anna+Salai,+Chennai,+Tamil+Nadu",
  },
];

export function ContactLocationsMap() {
  const [activeBranchId, setActiveBranchId] = useState<string>("puducherry");

  const activeBranch =
    BRANCH_LOCATIONS.find((b) => b.id === activeBranchId) ||
    BRANCH_LOCATIONS[0];

  return (
    <section className="relative bg-[#faf7f2] py-24 sm:py-32 border-t border-[#e8dfd6]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* 1. Header matching Image 2: OUR LOCATIONS / Visit Le Prestige */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#c2593f] font-semibold block mb-2">
            OUR LOCATIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1a120b] tracking-tight">
            Visit Le Prestige
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
            Experience Le Prestige Residency across our locations.
          </p>
        </div>

        {/* 2. Branch Cards Grid matching Image 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {BRANCH_LOCATIONS.map((branch) => {
            const isSelected = activeBranchId === branch.id;
            return (
              <div
                key={branch.id}
                onClick={() => setActiveBranchId(branch.id)}
                className={`relative bg-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 border ${
                  isSelected
                    ? "border-[#c2593f] shadow-[0_20px_45px_rgba(194,89,63,0.14)] ring-2 ring-[#c2593f]/20"
                    : "border-stone-200/80 hover:border-stone-300 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)]"
                }`}
              >
                <div>
                  {/* Top Bar: Title & Circular Pin Icon */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl text-[#1a120b]">
                        {branch.city}
                      </h3>
                      <span className="inline-block mt-2 px-2.5 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-[#fbeee6] text-[#c2593f]">
                        {branch.badge}
                      </span>
                    </div>

                    <div
                      className={`h-11 w-11 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-[#c2593f] text-white"
                          : "bg-[#faf7f2] text-[#c2593f]"
                      }`}
                    >
                      <MapPin className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-4 font-light">
                    {branch.description}
                  </p>

                  {/* Details List */}
                  <div className="mt-6 space-y-4 pt-5 border-t border-stone-100 text-xs">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-400 block mb-1">
                        ADDRESS
                      </span>
                      <p className="text-stone-700 leading-relaxed font-medium">
                        {branch.addressFull}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-400 block mb-1">
                        MOBILE
                      </span>
                      <a
                        href={`tel:${branch.mobile.replace(/[^0-9+]/g, "")}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#c2593f] font-semibold text-sm hover:underline inline-flex items-center gap-1.5"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        <span>{branch.mobile}</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Bottom View on Map CTA */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span
                    className={`font-semibold transition-colors ${
                      isSelected ? "text-[#c2593f]" : "text-stone-500"
                    }`}
                  >
                    {isSelected ? "● Viewing on Map Below" : "Click to View Map"}
                  </span>
                  <ArrowRight
                    className={`h-4 w-4 transition-transform ${
                      isSelected
                        ? "text-[#c2593f] translate-x-1"
                        : "text-stone-400"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Section matching Image 1: "Your Journey Starts Here" with Interactive Map */}
        <div className="pt-6">
          <div className="text-center mb-10">
            <h3 className="font-serif text-3xl sm:text-4xl text-[#1a120b] tracking-tight">
              Your Journey Starts Here
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              Find {activeBranch.hotelTitle} and plan your arrival with ease.
            </p>
          </div>

          {/* Interactive Split Card matching Image 1 */}
          <div className="overflow-hidden rounded-3xl border border-stone-200/90 bg-white shadow-[0_25px_60px_rgba(0,0,0,0.08)] grid grid-cols-1 lg:grid-cols-12">
            {/* Left Info Panel */}
            <div className="lg:col-span-5 bg-[#faf7f2] p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stone-200/80">
              <div>
                <h4 className="font-serif text-2xl sm:text-3xl text-[#1a120b]">
                  {activeBranch.hotelTitle}
                </h4>
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
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-stone-700 border border-stone-200 font-medium">
                    <Car className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Free Covered Parking</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-stone-700 border border-stone-200 font-medium">
                    <Clock className="h-3.5 w-3.5 text-[#c2593f]" />
                    <span>24/7 Concierge</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons matching Image 1 */}
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

            {/* Right Map Embed Panel matching Image 1 */}
            <div className="lg:col-span-7 relative min-h-[360px] sm:min-h-[460px] lg:min-h-[520px] bg-stone-100">
              <iframe
                title={`Map of ${activeBranch.hotelTitle} - ${activeBranch.city}`}
                src={activeBranch.mapEmbedUrl}
                className="w-full h-full min-h-[360px] sm:min-h-[460px] lg:min-h-[520px] border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Top Overlay Badge */}
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
      </div>
    </section>
  );
}

