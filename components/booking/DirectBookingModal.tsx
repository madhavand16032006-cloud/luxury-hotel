"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Calendar,
  Users,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Phone,
  BedDouble,
  Sparkles,
  Car,
  Wifi,
  Wind,
} from "lucide-react";
import { HOTEL_BRANCHES } from "@/lib/branches";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface BookingRoomDetails {
  id: string;
  title: string;
  rate: string;
  image?: string;
  acType?: string;
}

export function DirectBookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [room, setRoom] = useState<BookingRoomDetails>({
    id: "deluxe",
    title: "Deluxe Luxury AC Room",
    rate: "₹4,499",
    image: "/images/room-deluxe-ac.jpg",
    acType: "Split Inverter AC (100% Climate Control)",
  });

  const [branchId, setBranchId] = useState("chennai");
  const [checkIn, setCheckIn] = useState("Tomorrow");
  const [nights, setNights] = useState("2 Nights");
  const [guests, setGuests] = useState("2 Guests");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        if (customEvent.detail.title) {
          setRoom({
            id: customEvent.detail.id || "deluxe",
            title: customEvent.detail.title,
            rate: customEvent.detail.rate || "₹4,499",
            image: customEvent.detail.image || "/images/room-deluxe-ac.jpg",
            acType: customEvent.detail.acType || "Split Inverter AC",
          });
        }
        if (customEvent.detail.branchId) {
          setBranchId(customEvent.detail.branchId);
        }
      }
      setIsConfirmed(false);
      setIsOpen(true);
    };

    window.addEventListener("open-direct-booking", handleOpen);
    window.addEventListener("select-hotel-room", handleOpen);

    return () => {
      window.removeEventListener("open-direct-booking", handleOpen);
      window.removeEventListener("select-hotel-room", handleOpen);
    };
  }, []);

  const selectedBranch =
    HOTEL_BRANCHES.find((b) => b.id === branchId) || HOTEL_BRANCHES[0];

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestPhone.trim()) {
      alert("Please enter your name and contact phone number.");
      return;
    }

    const randomRef = `BRV-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(randomRef);
    setIsConfirmed(true);

    // Also send instant WhatsApp message to Front Desk Concierge
    const whatsappMsg = `*Direct Booking Request [Ref: ${randomRef}]*%0A` +
      `*Guest:* ${guestName}%0A` +
      `*Phone:* ${guestPhone}%0A` +
      `*Room:* ${room.title} (${room.rate})%0A` +
      `*Branch:* ${selectedBranch.name}%0A` +
      `*Check-in:* ${checkIn}%0A` +
      `*Duration:* ${nights}%0A` +
      `*Guests:* ${guests}%0A` +
      `*Notes:* ${specialRequest || "None"}%0A` +
      `*Payment:* Pay at Hotel Check-in`;

    // Open WhatsApp in background/new tab
    window.open(`https://wa.me/919444012345?text=${whatsappMsg}`, "_blank");
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsConfirmed(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-md overflow-y-auto"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 15 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative w-full max-w-2xl rounded-none border border-gold/40 bg-[#160f0b] p-6 sm:p-8 shadow-2xl text-warm-white my-8 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-5 right-5 z-20 h-9 w-9 rounded-none bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-gold hover:text-[#1a120b] transition-colors cursor-pointer"
              aria-label="Close Reservation Modal"
            >
              <X className="h-4 w-4" />
            </button>

            {!isConfirmed ? (
              <div>
                {/* Header */}
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-gold font-semibold mb-2">
                  <Sparkles className="h-3.5 w-3.5 text-gold" />
                  <span>Instant Direct Reservation</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-white">
                  Reserve Your Stay
                </h3>
                <p className="mt-1 text-xs text-white/70 font-light">
                  Direct guaranteed reservation · Pay at hotel check-in · Zero advance fee required
                </p>

                {/* Selected Room Banner */}
                <div className="mt-6 rounded-none bg-black/50 border border-white/15 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    {room.image && (
                      <div className="relative h-14 w-20 rounded-none overflow-hidden border border-white/20 shrink-0">
                        <Image
                          src={room.image}
                          alt={room.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-display text-base text-white font-medium">
                        {room.title}
                      </h4>
                      <p className="text-[11px] text-white/60">
                        {room.acType || "100% Split Inverter AC"} · Free Parking Included
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-display text-xl text-gold font-bold">
                      {room.rate}
                    </span>
                    <span className="text-[10px] text-white/50 block">/ night</span>
                  </div>
                </div>

                {/* Booking Form */}
                <form onSubmit={handleConfirmBooking} className="mt-6 space-y-4">
                  {/* Branch Selector */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gold/90 font-semibold mb-1.5">
                      Destination Branch
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {HOTEL_BRANCHES.map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setBranchId(b.id)}
                          className={`p-2.5 text-left border rounded-none transition-all cursor-pointer ${
                            branchId === b.id
                              ? "bg-gold/20 border-gold text-gold font-semibold"
                              : "bg-black/30 border-white/15 text-white/70 hover:bg-white/5"
                          }`}
                        >
                          <p className="text-xs font-medium text-white">{b.name.split(" ")[0]} Resort</p>
                          <p className="text-[10px] text-white/50">{b.city}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dates & Guests */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-white/70 font-medium mb-1">
                        Check-in
                      </label>
                      <select
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full bg-black/60 border border-white/20 px-3 py-2.5 text-xs text-white rounded-none focus:outline-none focus:border-gold"
                      >
                        <option value="Tomorrow">Tomorrow</option>
                        <option value="This Weekend">This Weekend</option>
                        <option value="Next Week">Next Week</option>
                        <option value="Flexible Dates">Flexible Dates</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-white/70 font-medium mb-1">
                        Duration
                      </label>
                      <select
                        value={nights}
                        onChange={(e) => setNights(e.target.value)}
                        className="w-full bg-black/60 border border-white/20 px-3 py-2.5 text-xs text-white rounded-none focus:outline-none focus:border-gold"
                      >
                        <option value="1 Night">1 Night</option>
                        <option value="2 Nights (Recommended)">2 Nights (Recommended)</option>
                        <option value="3 Nights Stay">3 Nights Stay</option>
                        <option value="5 Nights Retreat">5 Nights Retreat</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-white/70 font-medium mb-1">
                        Guests
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full bg-black/60 border border-white/20 px-3 py-2.5 text-xs text-white rounded-none focus:outline-none focus:border-gold"
                      >
                        <option value="1 Guest">1 Guest</option>
                        <option value="2 Guests">2 Guests</option>
                        <option value="3 Guests">3 Guests</option>
                        <option value="4+ Family Guests">4+ Family Guests</option>
                      </select>
                    </div>
                  </div>

                  {/* Guest Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-white/70 font-medium mb-1">
                        Guest Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="e.g. S. Ramanathan"
                        className="w-full bg-black/60 border border-white/20 px-3 py-2.5 text-xs text-white rounded-none focus:outline-none focus:border-gold placeholder:text-white/30"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-white/70 font-medium mb-1">
                        WhatsApp / Mobile *
                      </label>
                      <input
                        type="tel"
                        required
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-black/60 border border-white/20 px-3 py-2.5 text-xs text-white rounded-none focus:outline-none focus:border-gold placeholder:text-white/30"
                      />
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-white/70 font-medium mb-1">
                      Special Requests (Optional)
                    </label>
                    <input
                      type="text"
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      placeholder="e.g. Early check-in, ground floor preference, airport cab"
                      className="w-full bg-black/60 border border-white/20 px-3 py-2 text-xs text-white rounded-none focus:outline-none focus:border-gold placeholder:text-white/30"
                    />
                  </div>

                  {/* Included Perks Summary */}
                  <div className="rounded-none bg-white/5 border border-white/10 p-3 flex items-center justify-between text-xs text-white/75">
                    <span className="flex items-center gap-1.5">
                      <Car className="h-3.5 w-3.5 text-gold" />
                      <span>Free Covered Parking</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1.5">
                      <Wifi className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Free High-Speed Wi-Fi</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-sky-400" />
                      <span>Zero Advance Required</span>
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-xs text-white/50 font-light">
                      Instant reservation hold confirmed via WhatsApp
                    </span>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-none bg-gradient-to-r from-[#dfba73] via-[#fae4b2] to-[#c79a4d] hover:brightness-105 py-3.5 px-8 text-xs font-bold uppercase tracking-[0.18em] text-[#1a120b] shadow-[0_4px_25px_rgba(223,186,115,0.4)] transition-all cursor-pointer active:scale-95"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Confirm Reservation</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* Booking Success Confirmation View */
              <div className="text-center py-6">
                <div className="mx-auto h-16 w-16 rounded-full bg-emerald-500/20 border border-emerald-500/60 flex items-center justify-center text-emerald-400 mb-5">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <span className="text-xs uppercase tracking-[0.25em] text-gold font-semibold">
                  Reservation Confirmed
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-white mt-1">
                  Vanakkam, {guestName}!
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-white/70 max-w-md mx-auto">
                  Your reservation for the <strong className="text-white">{room.title}</strong> at our{" "}
                  <strong className="text-gold">{selectedBranch.name}</strong> has been secured.
                </p>

                {/* Booking Summary Box */}
                <div className="mt-6 mx-auto max-w-md rounded-none bg-black/60 border border-gold/40 p-5 text-left text-xs space-y-2.5">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/60">Booking Reference:</span>
                    <span className="font-mono text-gold font-bold">{bookingRef}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Check-in:</span>
                    <span className="text-white font-medium">{checkIn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Duration:</span>
                    <span className="text-white font-medium">{nights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Guests:</span>
                    <span className="text-white font-medium">{guests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Rate:</span>
                    <span className="text-gold font-bold">{room.rate} / night</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-2 text-emerald-400 font-semibold">
                    <span>Payment Mode:</span>
                    <span>Pay at Hotel Check-in</span>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-none bg-gradient-to-r from-[#dfba73] via-[#fae4b2] to-[#c79a4d] text-[#1a120b] font-bold px-8 py-3 text-xs uppercase tracking-[0.16em] hover:scale-105 transition-transform"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

