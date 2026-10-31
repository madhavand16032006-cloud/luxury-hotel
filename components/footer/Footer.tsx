"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Clock,
  Calendar,
  Check,
  Copy,
  ArrowUp,
  Sparkles,
  ArrowUpRight,
  Send,
  Phone,
  Mail,
  Users,
  Coffee,
  CheckCircle2,
  CalendarDays,
  BedDouble,
  Key,
  Hotel,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const STAY_DURATIONS = [
  "1 Night",
  "2 Nights (Recommended)",
  "3 Nights (Weekend Stay)",
  "5 Nights (Midweek Retreat)",
  "7 Nights (Weekly Residence)",
];

const ROOM_SUITES = [
  {
    id: "courtyard",
    title: "Deluxe Courtyard Suite",
    rate: "€380 / night",
    specs: "45 m² · Private Terrace",
    desc: "King linen bed, Carrara marble bath, courtyard garden views, and morning in-suite espresso ritual.",
    image: "/images/suite-courtyard.jpg",
  },
  {
    id: "penthouse",
    title: "Executive Lombard Penthouse",
    rate: "€620 / night",
    specs: "72 m² · Duomo Skyline",
    desc: "Private rooftop terrace, antique oak beams, open fireplace, and personal butler coffee service.",
    image: "/images/suite-penthouse.jpg",
  },
  {
    id: "roastery",
    title: "Master Roastery Suite",
    rate: "€490 / night",
    specs: "58 m² · Roastery Heritage",
    desc: "Bespoke walnut furnishings, custom brass La Marzocco bar, and private cellar access.",
    image: "/images/suite-roastery.jpg",
  },
  {
    id: "villa",
    title: "San Frediano Tuscan Villa",
    rate: "€750 / night",
    specs: "95 m² · Oltrarno Firenze",
    desc: "Renaissance vaulted ceilings, private culinary courtyard, wood-fired oven, and sommelier cellar.",
    image: "/images/suite-villa.jpg",
  },
];

export function Footer() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [milanTime, setMilanTime] = useState("");
  const [isMilanOpen, setIsMilanOpen] = useState(true);
  const [isFirenzeOpen, setIsFirenzeOpen] = useState(true);

  // Room Booking Form State
  const [selectedSuite, setSelectedSuite] = useState("courtyard");
  const [selectedGuests, setSelectedGuests] = useState(2);
  const [selectedDate, setSelectedDate] = useState("Tomorrow");
  const [selectedDuration, setSelectedDuration] = useState("2 Nights (Recommended)");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialNote, setSpecialNote] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState<{
    id: string;
    name: string;
    suite: string;
    rate: string;
    date: string;
    duration: string;
    guests: number;
  } | null>(null);

  // Newsletter State
  const [email, setEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Dynamic Milan & Florence Real-Time Clock & Dynamic Open/Closed Status
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Europe/Rome",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeStr = new Intl.DateTimeFormat("en-GB", options).format(now);
      setMilanTime(timeStr);

      // Check current hour in Europe/Rome
      const hourOptions: Intl.DateTimeFormatOptions = {
        timeZone: "Europe/Rome",
        hour: "numeric",
        hour12: false,
      };
      const currentHour = parseInt(
        new Intl.DateTimeFormat("en-GB", hourOptions).format(now),
        10
      );

      // Milan: Open 07:00 to 20:00
      setIsMilanOpen(currentHour >= 7 && currentHour < 20);

      // Firenze: Open 07:30 to 19:30
      setIsFirenzeOpen(currentHour >= 7 && currentHour < 19);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyAddress = (address: string, index: number) => {
    navigator.clipboard.writeText(address);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestPhone.trim()) return;

    const chosenSuite =
      ROOM_SUITES.find((room) => room.id === selectedSuite) || ROOM_SUITES[0];

    const confirmation = {
      id: `VR-SUITE-${Math.floor(1000 + Math.random() * 9000)}`,
      name: guestName.trim(),
      suite: chosenSuite.title,
      rate: chosenSuite.rate,
      date: selectedDate,
      duration: selectedDuration,
      guests: selectedGuests,
    };

    setBookingConfirmation(confirmation);
    setIsBooked(true);
  };

  const handleResetBooking = () => {
    setIsBooked(false);
    setBookingConfirmation(null);
    setGuestName("");
    setGuestPhone("");
    setSpecialNote("");
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterSubscribed(false);
      setEmail("");
    }, 5000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="visit" className="relative px-4 pb-16 pt-24 sm:px-8 md:px-12 bg-warm-white">
      {/* Floating Hover Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: EASE }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] sm:rounded-[3.5rem] border border-warm-brown/25 bg-linear-to-b from-[#261b14] via-[#1d140e] to-[#120b08] p-6 sm:p-12 md:p-16 text-warm-white shadow-[0_50px_110px_-25px_rgba(25,16,11,0.85)] hover:border-gold/40 transition-colors duration-500"
      >
        {/* Ambient Top Glow Orbs with Floating Motion */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-italian-red/25 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.12, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-gold/20 blur-[130px]"
        />

        {/* 1. Header: Tagline & Live Milan Clock (with accurate CET calculation) */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/10 pb-12">
          <div>
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-gold font-medium">
              <Sparkles className="h-3.5 w-3.5 text-gold animate-spin" style={{ animationDuration: "8s" }} />
              Plan Your Visit & Boutique Suites
            </span>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl md:text-6xl text-warm-white">
              The sanctuaries of Velluto.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-white/60 max-w-lg leading-relaxed">
              Two historic sanctuaries of Italian craftsmanship. Walk in for counter service, or reserve your boutique suite stay below.
            </p>
          </div>

          {/* Live Milan Clock Badge */}
          <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 backdrop-blur-md shadow-inner">
            <span
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                isMilanOpen
                  ? "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)] animate-pulse"
                  : "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]"
              }`}
            />
            <div className="text-left text-xs">
              <p className="uppercase tracking-[0.2em] text-white/50 text-[10px] font-semibold">
                Milan Local Time (CET)
              </p>
              <p className="font-mono text-sm tracking-wider font-bold text-white mt-0.5">
                {milanTime ? `${milanTime} CET` : "12:00:00 CET"}
              </p>
            </div>
          </div>
        </div>

        {/* 2. Interactive Location Cards with Dynamic Open Status & 1-Click Copy */}
        <div className="relative z-10 mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Location 1: Milano */}
          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all hover:border-gold/50 hover:bg-white/[0.08] shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-italian-red/30 border border-italian-red/50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-rose-200 font-semibold">
                  Flagship Roastery
                </span>
                <span
                  className={`flex items-center gap-1.5 text-xs font-medium ${
                    isMilanOpen ? "text-emerald-400" : "text-amber-300"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isMilanOpen ? "bg-emerald-400 animate-ping" : "bg-amber-400"
                    }`}
                  />
                  <span>{isMilanOpen ? "Open Now · Closes 20:00" : "Closed Now · Opens 07:00"}</span>
                </span>
              </div>

              <h3 className="mt-6 font-display text-3xl text-warm-white group-hover:text-gold transition-colors">
                Milano Quadrilatero
              </h3>
              <p className="mt-3 flex items-start gap-2.5 text-sm text-white/80">
                <MapPin className="h-4 w-4 shrink-0 text-gold mt-0.5" />
                <span>Via Montenapoleone 18, 20121 Milano (Metro M3 Montenapoleone)</span>
              </p>

              <div className="mt-4 space-y-2 text-xs text-white/60">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-white/40" />
                  <span>Mon – Sun: 07:00 – 20:00 · Standing counter & Garden salon</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-white/40" />
                  <a href="tel:+390289451984" className="hover:text-gold transition-colors">
                    +39 02 8945 1984 (Direct Concierge)
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
              <button
                type="button"
                onClick={() => copyAddress("Via Montenapoleone 18, 20121 Milano", 0)}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.15em] text-white/90 hover:bg-white/15 hover:border-gold/50 transition-all cursor-pointer active:scale-95"
                data-cursor-text="COPY"
              >
                {copiedIndex === 0 ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Address Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 opacity-60" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
              <a
                href="https://maps.google.com/?q=Via+Montenapoleone+18+Milano"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-gold hover:underline transition-all"
              >
                <span>Google Maps</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Location 2: Firenze */}
          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all hover:border-gold/50 hover:bg-white/[0.08] shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-olive/40 border border-olive/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-emerald-200 font-semibold">
                  Bottega & Pasticceria
                </span>
                <span
                  className={`flex items-center gap-1.5 text-xs font-medium ${
                    isFirenzeOpen ? "text-emerald-400" : "text-amber-300"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isFirenzeOpen ? "bg-emerald-400 animate-ping" : "bg-amber-400"
                    }`}
                  />
                  <span>{isFirenzeOpen ? "Open Now · Closes 19:30" : "Closed Now · Opens 07:30"}</span>
                </span>
              </div>

              <h3 className="mt-6 font-display text-3xl text-warm-white group-hover:text-gold transition-colors">
                Firenze San Frediano
              </h3>
              <p className="mt-3 flex items-start gap-2.5 text-sm text-white/80">
                <MapPin className="h-4 w-4 shrink-0 text-gold mt-0.5" />
                <span>Piazza del Carmine 4, 50124 Firenze (Oltrarno Quarter)</span>
              </p>

              <div className="mt-4 space-y-2 text-xs text-white/60">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-white/40" />
                  <span>Mon – Sat: 07:30 – 19:30 · Wood-fired oven pasticceria</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-white/40" />
                  <a href="tel:+390552411984" className="hover:text-gold transition-colors">
                    +39 055 241 1984 (Direct Concierge)
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
              <button
                type="button"
                onClick={() => copyAddress("Piazza del Carmine 4, 50124 Firenze", 1)}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.15em] text-white/90 hover:bg-white/15 hover:border-gold/50 transition-all cursor-pointer active:scale-95"
                data-cursor-text="COPY"
              >
                {copiedIndex === 1 ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Address Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 opacity-60" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
              <a
                href="https://maps.google.com/?q=Piazza+del+Carmine+4+Firenze"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-gold hover:underline transition-all"
              >
                <span>Google Maps</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* 3. Interactive Room & Boutique Suite Booking Module */}
        <div className="relative z-10 mt-14 overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/[0.04] p-6 sm:p-10 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium">
                Boutique Suites & Room Booking
              </span>
              <h3 className="mt-2 font-display text-3xl sm:text-4xl text-warm-white">
                Reserve your stay at Velluto.
              </h3>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-white/65">
              Historic Milanese residences and Tuscan vineyard suites. Experience restful Italian luxury overlooking private courtyards with morning in-suite rituals.
            </p>
          </div>

          {/* Conditional View: Booking Confirmation Screen vs Interactive Form */}
          {isBooked && bookingConfirmation ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="py-10 text-center space-y-4 max-w-lg mx-auto"
            >
              <div className="h-16 w-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                <CheckCircle2 className="h-9 w-9" />
              </div>
              <div>
                <span className="px-3 py-1 rounded-full bg-white/10 text-gold text-[10px] font-mono tracking-widest uppercase border border-gold/30">
                  Confirmation #{bookingConfirmation.id}
                </span>
                <h4 className="mt-3 font-display text-2xl sm:text-3xl text-warm-white">
                  Suite Reserved for {bookingConfirmation.name}
                </h4>
                <p className="mt-1 text-xs text-white/70">
                  {bookingConfirmation.suite} · {bookingConfirmation.guests} {bookingConfirmation.guests === 1 ? "Guest" : "Guests"}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/80 space-y-1 text-left max-w-sm mx-auto">
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-white/50">Suite Type:</span>
                  <span className="font-semibold text-gold">{bookingConfirmation.suite}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-white/50">Check-in:</span>
                  <span className="font-semibold text-white">{bookingConfirmation.date}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-white/50">Stay Duration:</span>
                  <span className="font-semibold text-white">{bookingConfirmation.duration}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-white/50">Nightly Rate:</span>
                  <span className="font-semibold text-gold">{bookingConfirmation.rate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-white/50">Guest Mobile:</span>
                  <span className="font-semibold">{guestPhone}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-white/50">Concierge Status:</span>
                  <span className="font-semibold text-emerald-400">Confirmed · Digital Key via WhatsApp</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleResetBooking}
                className="mt-4 px-6 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-xs uppercase tracking-wider text-white transition-colors cursor-pointer"
              >
                Book Another Suite
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleBooking} className="mt-8 space-y-6">
              {/* Row 1: Boutique Suite Selection Cards with Realistic Photography & Details */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.2em] text-white/60 mb-3 font-medium">
                  1. Select Boutique Suite
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {ROOM_SUITES.map((suite) => (
                    <button
                      key={suite.id}
                      type="button"
                      onClick={() => setSelectedSuite(suite.id)}
                      className={`group relative p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden ${
                        selectedSuite === suite.id
                          ? "bg-gold/15 border-gold shadow-[0_0_20px_rgba(201,166,91,0.3)] text-warm-white ring-1 ring-gold"
                          : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white/70"
                      }`}
                    >
                      {/* Realistic Suite Photography Banner */}
                      <div className="relative h-28 w-full overflow-hidden rounded-xl mb-3">
                        <Image
                          src={suite.image}
                          alt={suite.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent" />
                        <div className="absolute top-2 right-2 rounded-full bg-black/60 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-mono text-gold border border-gold/30">
                          {suite.rate}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-display text-base font-semibold text-warm-white">
                            {suite.title}
                          </span>
                          <BedDouble className={`h-4 w-4 shrink-0 ${selectedSuite === suite.id ? "text-gold" : "opacity-40"}`} />
                        </div>
                        <p className="text-[11px] text-white/60 leading-relaxed line-clamp-2">
                          {suite.desc}
                        </p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] text-white/50">
                        <span>{suite.specs}</span>
                        <span className={`font-semibold ${selectedSuite === suite.id ? "text-gold" : "text-white/60"}`}>
                          {selectedSuite === suite.id ? "Selected" : "Select Room"}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 2: Check-in Date, Duration of Stay & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Date Selection */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-white/60 mb-2 font-medium">
                    2. Check-in Date
                  </label>
                  <div className="flex items-center gap-2">
                    {["Tomorrow", "This Weekend", "Next Week"].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setSelectedDate(d)}
                        className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          selectedDate === d
                            ? "bg-gold text-warm-brown font-semibold shadow-md"
                            : "border border-white/15 bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration of Stay Picker */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-white/60 mb-2 font-medium">
                    3. Duration of Stay
                  </label>
                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs text-warm-white outline-none focus:border-gold transition-colors cursor-pointer"
                  >
                    {STAY_DURATIONS.map((dur) => (
                      <option key={dur} value={dur} className="bg-[#1f1610] text-white">
                        {dur}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-white/60 mb-2 font-medium">
                    4. Guests
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setSelectedGuests(num)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          selectedGuests === num
                            ? "bg-gold text-warm-brown font-semibold shadow-md"
                            : "border border-white/15 bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                      >
                        {num} {num === 5 ? "+" : ""}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 3: Guest Contact & Submit Button */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end pt-2">
                <div className="sm:col-span-4">
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-white/60 mb-1.5">
                    Guest Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Alessandro Rossi"
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs text-warm-white placeholder-white/35 outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-white/60 mb-1.5">
                    Mobile / WhatsApp <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="e.g. +39 340 123 4567"
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs text-warm-white placeholder-white/35 outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div className="sm:col-span-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full rounded-xl bg-italian-red hover:bg-[#a3322a] py-3.5 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-warm-white shadow-xl shadow-italian-red/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                    data-cursor-text="BOOK"
                  >
                    <span>Book Suite Stay</span>
                    <Sparkles className="h-3.5 w-3.5" />
                  </motion.button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* 4. Newsletter & Morning Dispatch Subscription Bar */}
        <div className="relative z-10 mt-14 rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10 backdrop-blur-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium">
                Il Bollettino del Mattino
              </span>
              <h3 className="mt-1 font-display text-2xl text-warm-white">
                Receive the seasonal roast notes.
              </h3>
              <p className="mt-1 text-xs text-white/60 max-w-lg leading-relaxed">
                A bi-weekly epistolary on rare green bean arrivals, heritage pasticceria bakes, and private tasting dates in Milan & Florence.
              </p>
            </div>

            <form onSubmit={handleNewsletter} className="flex-1 max-w-md w-full">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-xs text-warm-white placeholder-white/40 outline-none focus:border-gold transition-colors"
                />
                <button
                  type="submit"
                  className="rounded-2xl bg-gold hover:bg-[#d6b46b] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-warm-brown transition-all cursor-pointer shrink-0 active:scale-95 shadow-md"
                  data-cursor-text="JOIN"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              {newsletterSubscribed && (
                <p className="mt-2 text-xs text-gold flex items-center gap-1.5 animate-in fade-in">
                  <Check className="h-3.5 w-3.5 text-gold" />
                  <span>Benvenuto! You are now subscribed to Il Bollettino.</span>
                </p>
              )}
            </form>
          </div>
        </div>

        {/* 5. Giant Kinetic Magnetic Brand Typography Banner with Letter-by-Letter Hovering Animation */}
        <div className="relative z-10 mt-16 pt-8 border-t border-white/10 text-center overflow-hidden">
          <div className="flex items-center justify-center gap-1 sm:gap-3 py-4 select-none">
            {"BR VELLUTO".split("").map((char, charIdx) => {
              if (char === " ") {
                return <span key={charIdx} className="w-4 sm:w-8" />;
              }
              return (
                <motion.span
                  key={charIdx}
                  whileHover={{
                    y: -14,
                    scale: 1.15,
                    color: "#c9a65b",
                    transition: { type: "spring", stiffness: 400, damping: 14 },
                  }}
                  className="inline-block font-display text-[clamp(2.5rem,8.5vw,8.5rem)] leading-none tracking-tight text-white/15 cursor-default transition-colors duration-300"
                >
                  {char}
                </motion.span>
              );
            })}
          </div>
        </div>

        {/* 6. Bottom Bar: Copyright, Coordinates & Floating Back to Top */}
        <div className="relative z-10 mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            <p>© {new Date().getFullYear()} BR Velluto. Poured with intention.</p>
            <p className="text-[11px] text-white/35 mt-0.5">
              45.4642° N, 9.1900° E · Milano, Italia
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <a href="#story" className="hover:text-gold transition-colors">Story</a>
            <a href="#coffee" className="hover:text-gold transition-colors">Coffee</a>
            <a href="#pasticceria" className="hover:text-gold transition-colors">Pasticceria</a>
            <a href="#atmosphere" className="hover:text-gold transition-colors">Atmosphere</a>
            <a href="#ingredients" className="hover:text-gold transition-colors">Ingredients</a>
          </div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 hover:bg-white/10 text-white transition-all cursor-pointer shadow-xs"
            data-cursor-text="TOP"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </motion.button>
        </div>
      </motion.div>
    </footer>
  );
}
