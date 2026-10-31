"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import {
  Car,
  Wifi,
  Wind,
  Maximize2,
  UtensilsCrossed,
  Waves,
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const FACILITIES = [
  {
    id: "parking",
    icon: Car,
    tag: "Complimentary · 24/7 Secured",
    title: "Free Covered Car Parking & Valet",
    description:
      "Wide-bay covered parking with round-the-clock CCTV surveillance and security staff. Complimentary valet service on arrival with fast EV charging docks.",
    perks: ["Zero parking fees", "Valet driver on standby", "EV charging stations"],
    image: "/images/facility-parking.jpg",
  },
  {
    id: "wifi",
    icon: Wifi,
    tag: "Gigabit Fiber · Unlimited",
    title: "Free High-Speed Wi-Fi 6",
    description:
      "Enterprise-grade fiber optic network providing unbroken connectivity across all suites, balconies, lobby, and dining pavilions with zero lag.",
    perks: ["Up to 300 Mbps speed", "Work-from-hotel desk", "Unlimited device pairing"],
    image: "/images/facility-wifi.jpg",
  },
  {
    id: "ac",
    icon: Wind,
    tag: "Whisper Inverter · 100% AC",
    title: "Deluxe & Normal AC Climate Control",
    description:
      "Every single room—from our Normal AC rooms to Deluxe Suites—is equipped with whisper-quiet, eco-inverter air conditioning and air purification filters.",
    perks: ["Individual digital thermostat", "Silent sleep mode", "Filtered cool air 24/7"],
    image: "/images/room-deluxe-ac.jpg",
  },
  {
    id: "sqft",
    icon: Maximize2,
    tag: "Expansive Space · High Ceilings",
    title: "Spacious Rooms: 320 to 1,200 Sq. Ft.",
    description:
      "Unmatched room proportions designed for true rest. Standard AC starts at an expansive 320 sq. ft., Deluxe at 450 sq. ft., and Suites up to 1,200 sq. ft.",
    perks: ["Private sit-out balconies", "Living area & work desks", "Spacious Italian marble baths"],
    image: "/images/room-presidential.jpg",
  },
  {
    id: "dining",
    icon: UtensilsCrossed,
    tag: "Chettinad & Continental · 24/7 Service",
    title: "Dakshin Royal Dining & Filter Coffee",
    description:
      "Authentic Kumbakonam degree filter coffee served in brass davarah-tumbler, accompanied by Chettinad royal specialties and 24-hour room service dining.",
    perks: ["Complimentary breakfast", "24/7 in-room dining", "Separate pure veg preparation"],
    image: "/images/facility-dining.jpg",
  },
  {
    id: "pool",
    icon: Waves,
    tag: "Emerald Lap Pool · Relaxation",
    title: "Royal Courtyard Swimming Pool",
    description:
      "A tranquil emerald swimming pool set amidst heritage Chettinad stone pillars, tropical greenery, and secluded poolside lounge cabanas.",
    perks: ["Fresh towels & loungers", "Kids splash zone", "Open 06:00 to 20:00"],
    image: "/images/facility-pool.jpg",
  },
];

export function HotelFacilities() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      id="facilities"
      className="relative overflow-hidden bg-warm-white py-32 md:py-40 border-t border-cream"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.35em] text-italian-red font-medium"
          >
            <Sparkles className="h-3.5 w-3.5 text-italian-red" />
            <span>World-Class Hospitality</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, ease: EASE }}
            className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl text-warm-brown"
          >
            Hotel Facilities &amp; Amenities
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
            className="mt-5 text-sm sm:text-base leading-relaxed text-warm-brown/75"
          >
            Designed to offer complete peace of mind. Every guest enjoys complimentary covered car parking,
            free high-speed Wi-Fi 6, 100% climate-controlled AC living, and generous room square footage.
          </motion.p>
        </div>

        {/* 6 Facilities Cards in 3x2 Grid with Interactive Hover Animation */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {FACILITIES.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: EASE }}
                whileHover={{ y: -8, scale: 1.015 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[2.25rem] border border-warm-brown/15 bg-white p-6 shadow-[0_25px_50px_-20px_rgba(90,70,54,0.12)] transition-all duration-500 hover:border-gold/60 hover:shadow-[0_35px_70px_-20px_rgba(90,70,54,0.22)]"
                data-cursor-text="AMENITY"
              >
                <div>
                  {/* Photo Preview with Subtle Linear Gradient */}
                  <div className="relative h-48 w-full overflow-hidden rounded-2xl mb-5">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-[var(--ease-cinematic)] group-hover:scale-108"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Floating Pill Tag */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-wider text-gold font-medium border border-gold/30">
                      <Icon className="h-3 w-3 text-gold" />
                      <span>{item.tag}</span>
                    </div>
                  </div>

                  <h3 className="font-display text-2xl text-warm-brown group-hover:text-italian-red transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-warm-brown/75">
                    {item.description}
                  </p>
                </div>

                {/* Bulleted Perks */}
                <div className="mt-6 border-t border-cream pt-4 space-y-2">
                  {item.perks.map((perk) => (
                    <div key={perk} className="flex items-center gap-2 text-xs text-warm-brown/80 font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Reassurance Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 rounded-3xl border border-gold/30 bg-linear-to-r from-cream/90 via-warm-white to-cream/90 p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gold/20 text-gold flex items-center justify-center border border-gold/40 shrink-0">
              <ShieldCheck className="h-6 w-6 text-warm-brown" />
            </div>
            <div>
              <h4 className="font-display text-xl text-warm-brown">
                Guaranteed Satisfaction &amp; 24/7 Power Backup
              </h4>
              <p className="text-xs text-warm-brown/70 mt-0.5">
                Heavy-duty generator redundancy ensures zero interruption in AC cooling, Wi-Fi, and elevators.
              </p>
            </div>
          </div>

          <a
            href="#visit"
            className="rounded-full bg-warm-brown hover:bg-warm-brown/90 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-warm-white shadow-md transition-all shrink-0 active:scale-95"
            data-cursor-text="BOOK"
          >
            Reserve 100% AC Room (From ₹2,999)
          </a>
        </motion.div>
      </div>
    </section>
  );
}

