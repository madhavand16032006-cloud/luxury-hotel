"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  MapPin,
  Clock,
  Check,
  Copy,
  ArrowUp,
  Sparkles,
  ArrowUpRight,
  Send,
} from "lucide-react";

export function Footer() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedExperience, setSelectedExperience] = useState("espresso");
  const [selectedGuests, setSelectedGuests] = useState(2);
  const [reservationName, setReservationName] = useState("");
  const [reservationDate, setReservationDate] = useState("Tomorrow · 10:00 AM");
  const [isBooked, setIsBooked] = useState(false);
  const [email, setEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [milanTime, setMilanTime] = useState("");

  // Live Milan Time Clock (CET / UTC+1)
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
      setMilanTime(new Intl.DateTimeFormat("en-GB", options).format(now));
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
    if (!reservationName.trim()) return;
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      setReservationName("");
    }, 4500);
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterSubscribed(false);
      setEmail("");
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="visit" className="relative px-4 pb-12 pt-20 sm:px-8 md:px-12 bg-warm-white">
      {/* Floating Hover Card Container */}
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[3rem] border border-warm-brown/20 bg-linear-to-b from-[#2a1e17] via-[#1f1610] to-[#140e0a] p-8 text-warm-white shadow-[0_50px_100px_-30px_rgba(30,20,15,0.7)] sm:p-14 md:p-20">
        
        {/* Ambient Top Glow Orbs */}
        <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-italian-red/20 blur-[120px]" />
        <div className="pointer-events-none absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-gold/15 blur-[130px]" />

        {/* Header Tagline & Live Milan Clock */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/10 pb-12">
          <div>
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-gold font-medium">
              <Sparkles className="h-3.5 w-3.5 text-gold animate-spin" style={{ animationDuration: "8s" }} />
              Plan Your Visit
            </span>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl md:text-6xl text-warm-white">
              The counters of Velluto.
            </h2>
          </div>

          <div className="flex items-center gap-4 rounded-full border border-white/15 bg-white/5 px-6 py-3 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <div className="text-left text-xs">
              <p className="uppercase tracking-[0.2em] text-white/50 text-[10px]">Milan Local Time</p>
              <p className="font-mono text-sm tracking-wider font-semibold text-white">
                {milanTime ? `${milanTime} CET` : "12:00:00 CET"}
              </p>
            </div>
          </div>
        </div>

        {/* 2 Locations Grid */}
        <div className="relative z-10 mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Location 1: Milano */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all hover:border-gold/40 hover:bg-white/[0.08]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-italian-red/30 border border-italian-red/50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-rose-200">
                  Flagship Roastery
                </span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Open Now · Closes 20:00
                </span>
              </div>

              <h3 className="mt-6 font-display text-3xl text-warm-white group-hover:text-gold transition-colors">
                Milano Quadrilatero
              </h3>
              <p className="mt-3 flex items-start gap-2 text-sm text-white/75">
                <MapPin className="h-4 w-4 shrink-0 text-gold mt-0.5" />
                <span>Via Montenapoleone 18, 20121 Milano (Metro M3)</span>
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
                <Clock className="h-3.5 w-3.5 text-white/40" />
                <span>Mon – Sun: 07:00 – 20:00 · Standing counter & Garden tables</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
              <button
                onClick={() => copyAddress("Via Montenapoleone 18, 20121 Milano", 0)}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.15em] text-white/90 hover:bg-white/15 transition-all cursor-pointer"
                data-cursor-text="COPY"
              >
                {copiedIndex === 0 ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Address Copied</span>
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
                className="flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-gold hover:underline"
              >
                <span>Google Maps</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Location 2: Firenze */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all hover:border-gold/40 hover:bg-white/[0.08]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-olive/40 border border-olive/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-emerald-200">
                  Bottega & Pasticceria
                </span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Open Now · Closes 19:30
                </span>
              </div>

              <h3 className="mt-6 font-display text-3xl text-warm-white group-hover:text-gold transition-colors">
                Firenze San Frediano
              </h3>
              <p className="mt-3 flex items-start gap-2 text-sm text-white/75">
                <MapPin className="h-4 w-4 shrink-0 text-gold mt-0.5" />
                <span>Piazza del Carmine 4, 50124 Firenze</span>
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
                <Clock className="h-3.5 w-3.5 text-white/40" />
                <span>Mon – Sat: 07:30 – 19:30 · Wood-fired oven bakes</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
              <button
                onClick={() => copyAddress("Piazza del Carmine 4, 50124 Firenze", 1)}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.15em] text-white/90 hover:bg-white/15 transition-all cursor-pointer"
                data-cursor-text="COPY"
              >
                {copiedIndex === 1 ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Address Copied</span>
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
                className="flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-gold hover:underline"
              >
                <span>Google Maps</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Interactive Reservation & Table Booking Module */}
        <div className="relative z-10 mt-14 overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/[0.04] p-8 sm:p-10 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gold">Tasting & Table Reservation</span>
              <h3 className="mt-2 font-display text-3xl sm:text-4xl text-warm-white">
                Reserve your morning ritual.
              </h3>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-white/60">
              Standing counter service is always walk-in. For private banquette seating or the 5-course 
              Espresso Omakase, reserve 24 hours in advance.
            </p>
          </div>

          <form onSubmit={handleBooking} className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Experience Selector */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2">
                Experience
              </label>
              <select
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-xs text-warm-white outline-none focus:border-gold transition-colors"
              >
                <option value="espresso" className="bg-[#1f1610] text-white">Espresso Omakase (45 min)</option>
                <option value="pasticceria" className="bg-[#1f1610] text-white">Morning Pasticceria Table</option>
                <option value="tasting" className="bg-[#1f1610] text-white">Single-Origin Cupping Flight</option>
                <option value="table" className="bg-[#1f1610] text-white">Bistro Table Reservation</option>
              </select>
            </div>

            {/* Guests Selector */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2">
                Party Size
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 4, 6].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setSelectedGuests(num)}
                    className={`flex-1 rounded-xl py-3 text-xs font-medium transition-all cursor-pointer ${
                      selectedGuests === num
                        ? "bg-gold text-warm-brown font-semibold shadow-md"
                        : "border border-white/20 bg-white/5 text-white/80 hover:bg-white/10"
                    }`}
                  >
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Name Input */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2">
                Guest Name
              </label>
              <input
                type="text"
                required
                value={reservationName}
                onChange={(e) => setReservationName(e.target.value)}
                placeholder="e.g. Alessandro Rossi"
                className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-xs text-warm-white placeholder-white/40 outline-none focus:border-gold transition-colors"
              />
            </div>

            {/* Submit Action */}
            <div className="flex flex-col justify-end">
              <button
                type="submit"
                className="w-full rounded-2xl bg-italian-red hover:bg-[#a3322a] active:scale-98 py-3.5 px-6 text-xs font-medium uppercase tracking-[0.2em] text-warm-white shadow-lg transition-all cursor-pointer"
                data-cursor-text="BOOK"
              >
                {isBooked ? "Ritual Reserved ✓" : "Reserve Ritual"}
              </button>
            </div>
          </form>

          {isBooked && (
            <p className="mt-4 text-center text-xs text-emerald-400 animate-in fade-in">
              Grazie! Your reservation request for {reservationName} ({selectedGuests} guests) has been submitted to the maître d'.
            </p>
          )}
        </div>

        {/* Newsletter & Morning Dispatch Subscription */}
        <div className="relative z-10 mt-14 rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10 backdrop-blur-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gold">Il Bollettino del Mattino</span>
              <h3 className="mt-1 font-display text-2xl text-warm-white">
                Receive the seasonal roast notes.
              </h3>
              <p className="mt-1 text-xs text-white/60">
                A bi-weekly epistolary on rare green bean arrivals, heritage pastry recipes, and private tasting dates.
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
                  className="flex-1 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-xs text-warm-white placeholder-white/40 outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  className="rounded-2xl bg-gold hover:bg-[#d6b46b] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-warm-brown transition-all cursor-pointer shrink-0"
                  data-cursor-text="JOIN"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              {newsletterSubscribed && (
                <p className="mt-2 text-xs text-gold">
                  Benvenuto! You are now subscribed to Il Bollettino.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Giant Magnetic Brand Typography Banner with Hover Lift */}
        <div className="relative z-10 mt-16 pt-8 border-t border-white/10 text-center overflow-hidden">
          <div className="group cursor-default select-none">
            <span className="block font-display text-[clamp(2.5rem,9.5vw,9.5rem)] leading-none tracking-tight text-white/10 transition-all duration-700 ease-out group-hover:text-gold/40 group-hover:tracking-wider">
              BR VELLUTO
            </span>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Coordinates & Back to Top */}
        <div className="relative z-10 mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            <p>© {new Date().getFullYear()} BR Velluto. Poured with intention.</p>
            <p className="text-[11px] text-white/35 mt-0.5">
              45.4642° N, 9.1900° E · Milano, Italia
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a href="#story" className="hover:text-gold transition-colors">Story</a>
            <a href="#coffee" className="hover:text-gold transition-colors">Coffee</a>
            <a href="#pasticceria" className="hover:text-gold transition-colors">Pasticceria</a>
            <a href="#atmosphere" className="hover:text-gold transition-colors">Atmosphere</a>
            <a href="#ingredients" className="hover:text-gold transition-colors">Ingredients</a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 hover:bg-white/10 text-white transition-all cursor-pointer hover:scale-105"
            data-cursor-text="TOP"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
