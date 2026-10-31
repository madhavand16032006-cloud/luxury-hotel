"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
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
  Phone,
  Mail,
  CheckCircle2,
  BedDouble,
  Car,
  Wifi,
  Wind,
  Maximize2,
  Calendar,
  MessageSquare,
  ShieldCheck,
  Printer,
  UserCheck,
  Trash2,
} from "lucide-react";
import { HOTEL_BRANCHES, type HotelBranch } from "@/lib/branches";

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
    id: "normal",
    title: "Standard Normal AC Room",
    category: "Normal AC",
    rate: "₹2,999 / night",
    rawRate: 2999,
    sqft: "320 sq. ft.",
    ac: "100% Split Inverter AC",
    parking: "Free Covered Car Parking",
    wifi: "Free High-Speed Wi-Fi",
    specs: "320 sq. ft. · Queen Bed · Work Desk",
    desc: "Cozy Queen bed, 100% split AC, ergonomic work desk, 43\" 4K Smart TV, rain shower, and morning Kumbakonam brass filter coffee.",
    image: "/images/room-normal-ac.jpg",
  },
  {
    id: "deluxe",
    title: "Deluxe AC Room",
    category: "Deluxe Luxury",
    rate: "₹4,499 / night",
    rawRate: 4499,
    sqft: "450 sq. ft.",
    ac: "100% Silent Inverter AC",
    parking: "Free Valet & Covered Parking",
    wifi: "Free High-Speed Wi-Fi 6",
    specs: "450 sq. ft. · King Plush Bed · Private Balcony",
    desc: "King plush mattress, Carrara marble bath, courtyard balcony view, 100% whisper-quiet AC, and complimentary South Indian breakfast.",
    image: "/images/room-deluxe-ac.jpg",
  },
  {
    id: "chettinad",
    title: "Royal Chettinad Heritage Suite",
    category: "Heritage Royal",
    rate: "₹7,999 / night",
    rawRate: 7999,
    sqft: "750 sq. ft.",
    ac: "Centralized Climate Control AC",
    parking: "Reserved VIP Parking Bay",
    wifi: "Gigabit Executive Wi-Fi",
    specs: "750 sq. ft. · Teakwood King · Athangudi Foyer",
    desc: "Handcrafted Burmese teakwood bed, authentic Athangudi patterned tiles, Tanjore gold foil art, deep soaking bathtub, and personal butler.",
    image: "/images/room-chettinad-suite.jpg",
  },
  {
    id: "presidential",
    title: "Presidential Grand Penthouse",
    category: "Presidential Luxury",
    rate: "₹14,999 / night",
    rawRate: 14999,
    sqft: "1,200 sq. ft.",
    ac: "Dual-Zone Central AC",
    parking: "2 VIP Covered Bays + Airport Chauffeur",
    wifi: "Dedicated Gigabit Fiber",
    specs: "1,200 sq. ft. · Master King · Private Plunge Pool",
    desc: "Expansive duplex penthouse with private rooftop plunge pool, living salon, dining room for 6, whirlpool jacuzzi, and airport transfers.",
    image: "/images/room-presidential.jpg",
  },
];

export function Footer() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [chennaiTime, setChennaiTime] = useState("");

  // Branch Booking State
  const [selectedBranchId, setSelectedBranchId] = useState("chennai");

  // User Memory State (LocalStorage)
  const [rememberUser, setRememberUser] = useState(true);
  const [savedUserRecognized, setSavedUserRecognized] = useState(false);

  // Room Booking Form State
  const [selectedSuite, setSelectedSuite] = useState("deluxe");
  const [selectedGuests, setSelectedGuests] = useState(2);
  const [selectedDate, setSelectedDate] = useState("Tomorrow");
  const [selectedDuration, setSelectedDuration] = useState("2 Nights (Recommended)");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestNotes, setGuestNotes] = useState("");
  const [selectionNotice, setSelectionNotice] = useState<string | null>(null);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState<{
    id: string;
    branchName: string;
    branchCity: string;
    branchAddress: string;
    branchPhone: string;
    branchWhatsapp: string;
    name: string;
    phone: string;
    suite: string;
    category: string;
    sqft: string;
    ac: string;
    parking: string;
    wifi: string;
    rate: string;
    date: string;
    duration: string;
    guests: number;
    totalAmount: string;
  } | null>(null);

  // Newsletter State
  const [email, setEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Load Saved User Profile from LocalStorage (Remember User)
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("brv_remembered_guest");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.name) setGuestName(parsed.name);
          if (parsed.phone) setGuestPhone(parsed.phone);
          if (parsed.branchId) setSelectedBranchId(parsed.branchId);
          setSavedUserRecognized(true);
        }
      } catch (err) {
        // ignore
      }
    }
  }, []);

  // Live Chennai Time (IST) & Room / Hero Sync Event Listeners
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setChennaiTime(new Intl.DateTimeFormat("en-IN", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    const onSelectRoom = (e: Event) => {
      const custom = e as CustomEvent<{ id: string; title: string; rate: string }>;
      if (custom.detail?.id) {
        setSelectedSuite(custom.detail.id);
        setSelectionNotice(
          `✓ Selected from Room Showcase: ${custom.detail.title} (${custom.detail.rate}) — complete your branch details below`
        );
        setTimeout(() => setSelectionNotice(null), 8000);
      }
    };

    const onHeroSync = (e: Event) => {
      const custom = e as CustomEvent<{
        branchId?: string;
        checkIn: string;
        duration: string;
        guests: number;
      }>;
      if (custom.detail) {
        if (custom.detail.branchId) {
          setSelectedBranchId(custom.detail.branchId);
        }
        if (custom.detail.checkIn && custom.detail.checkIn !== "Select Date") {
          setSelectedDate(custom.detail.checkIn);
        }
        if (custom.detail.duration && custom.detail.duration !== "Select Date") {
          setSelectedDuration(custom.detail.duration);
        }
        if (custom.detail.guests) {
          setSelectedGuests(custom.detail.guests);
        }
        const branch =
          HOTEL_BRANCHES.find((b) => b.id === custom.detail.branchId) || HOTEL_BRANCHES[0];
        setSelectionNotice(
          `✓ Branch Selected: ${branch.name} · Check-in: ${custom.detail.checkIn} · ${custom.detail.duration} · ${custom.detail.guests} Guests`
        );
        setTimeout(() => setSelectionNotice(null), 8000);
      }
    };

    window.addEventListener("select-hotel-room", onSelectRoom);
    window.addEventListener("hero-booking-sync", onHeroSync);

    return () => {
      clearInterval(interval);
      window.removeEventListener("select-hotel-room", onSelectRoom);
      window.removeEventListener("hero-booking-sync", onHeroSync);
    };
  }, []);

  const copyAddress = (address: string, index: number) => {
    navigator.clipboard.writeText(address);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestPhone.trim()) return;

    const chosenBranch =
      HOTEL_BRANCHES.find((b) => b.id === selectedBranchId) || HOTEL_BRANCHES[0];

    const chosenSuite =
      ROOM_SUITES.find((room) => room.id === selectedSuite) || ROOM_SUITES[0];

    // Save profile to localStorage if Remember User is checked
    if (typeof window !== "undefined" && rememberUser) {
      try {
        localStorage.setItem(
          "brv_remembered_guest",
          JSON.stringify({
            name: guestName.trim(),
            phone: guestPhone.trim(),
            branchId: selectedBranchId,
          })
        );
        setSavedUserRecognized(true);
      } catch (err) {}
    }

    let nights = 1;
    if (selectedDuration.includes("2 Nights")) nights = 2;
    else if (selectedDuration.includes("3 Nights")) nights = 3;
    else if (selectedDuration.includes("5 Nights")) nights = 5;
    else if (selectedDuration.includes("7 Nights")) nights = 7;

    const totalEst = (chosenSuite.rawRate * nights).toLocaleString("en-IN");

    const confirmation = {
      id: `BRV-${chosenBranch.code}-${Math.floor(10000 + Math.random() * 90000)}`,
      branchName: chosenBranch.name,
      branchCity: chosenBranch.city,
      branchAddress: chosenBranch.address,
      branchPhone: chosenBranch.phone,
      branchWhatsapp: chosenBranch.whatsapp,
      name: guestName.trim(),
      phone: guestPhone.trim(),
      suite: chosenSuite.title,
      category: chosenSuite.category,
      sqft: chosenSuite.sqft,
      ac: chosenSuite.ac,
      parking: "Free Valet & Covered Parking Reserved",
      wifi: chosenSuite.wifi,
      rate: chosenSuite.rate,
      date: selectedDate,
      duration: selectedDuration,
      guests: selectedGuests,
      totalAmount: `₹${totalEst} (Taxes included)`,
    };

    setBookingConfirmation(confirmation);
    setIsBooked(true);
  };

  const handleResetBooking = () => {
    setIsBooked(false);
    setBookingConfirmation(null);
  };

  const forgetUserProfile = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("brv_remembered_guest");
      } catch (err) {}
    }
    setGuestName("");
    setGuestPhone("");
    setSavedUserRecognized(false);
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

  const currentBranch =
    HOTEL_BRANCHES.find((b) => b.id === selectedBranchId) || HOTEL_BRANCHES[0];

  return (
    <footer
      id="visit"
      className="relative w-full rounded-none border-t border-gold/30 bg-linear-to-b from-[#1b120c] via-[#140c08] to-[#0c0704] text-warm-white pt-24 pb-14 px-6 sm:px-10 lg:px-16"
    >
      <div className="relative mx-auto max-w-7xl">
        {/* 1. Header: Tagline & Live Chennai Clock (IST) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/10 pb-12">
          <div>
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-gold font-medium">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              Tamil Nadu Multi-Branch Luxury Heritage
            </span>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl md:text-6xl text-warm-white">
              The Sanctuaries of BR Vasantham.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-white/65 max-w-xl leading-relaxed">
              Select your preferred branch across Chennai, Madurai Chettinad, and Puducherry. Experience 100% AC comfort, complimentary covered car parking, and authentic South Indian breakfast.
            </p>
          </div>

          {/* Live Chennai Clock Badge with Straight Corners */}
          <div className="flex items-center gap-4 rounded-none border border-gold/30 bg-black/40 px-6 py-3.5 backdrop-blur-md">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)] animate-pulse" />
            <div className="text-left text-xs">
              <p className="uppercase tracking-[0.2em] text-white/50 text-[10px] font-semibold">
                Chennai Local Time (IST)
              </p>
              <p className="font-mono text-sm tracking-wider font-bold text-white mt-0.5">
                {chennaiTime ? `${chennaiTime} IST` : "12:00:00 IST"}
              </p>
            </div>
          </div>
        </div>

        {/* 2. Multi-Branch Reservation Engine (Branch Booking UI with User Memory) */}
        <div className="mt-14 rounded-none border border-gold/30 bg-[#160e0a] p-6 sm:p-10 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium">
                Branch Booking Engine · Instant Digital Key Pass
              </span>
              <h3 className="mt-2 font-display text-3xl sm:text-4xl text-warm-white">
                Reserve Your Stay by Destination Branch
              </h3>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-white/65">
              Select your hotel branch, room type, and dates. Your contact information is remembered securely on this device so you never have to re-type it.
            </p>
          </div>

          {/* Welcome Back Notification for Remembered Users */}
          {savedUserRecognized && guestName && !isBooked && (
            <div className="mt-6 p-4 rounded-none bg-gold/15 border border-gold/40 text-gold text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in">
              <div className="flex items-center gap-2.5">
                <UserCheck className="h-4 w-4 text-gold shrink-0" />
                <span>
                  <strong>Welcome back, {guestName}!</strong> Your name, mobile number ({guestPhone}), and booking preferences are remembered.
                </span>
              </div>
              <button
                type="button"
                onClick={forgetUserProfile}
                className="text-[11px] text-white/60 hover:text-white underline shrink-0 cursor-pointer flex items-center gap-1"
              >
                <Trash2 className="h-3 w-3" />
                <span>Change / Forget Profile</span>
              </button>
            </div>
          )}

          {/* Conditional: Booking Digital Pass vs Booking Form */}
          {isBooked && bookingConfirmation ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="py-8 text-center space-y-5 max-w-xl mx-auto"
            >
              <div className="h-16 w-16 mx-auto rounded-none bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                <CheckCircle2 className="h-9 w-9" />
              </div>

              <div>
                <span className="px-3.5 py-1 rounded-none bg-white/10 text-gold text-[10px] font-mono tracking-widest uppercase border border-gold/40">
                  Confirmed Pass #{bookingConfirmation.id}
                </span>
                <h4 className="mt-3 font-display text-2xl sm:text-3xl text-warm-white">
                  Stay Reserved for {bookingConfirmation.name}
                </h4>
                <p className="mt-1 text-xs text-emerald-400 font-medium">
                  {bookingConfirmation.branchName} · {bookingConfirmation.suite}
                </p>
              </div>

              {/* Digital Pass Receipt Table with Branch Details */}
              <div className="p-6 rounded-none bg-black/50 border border-gold/30 text-xs text-white/80 space-y-2.5 text-left shadow-2xl">
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-white/50">Destination Branch:</span>
                  <span className="font-semibold text-gold">{bookingConfirmation.branchName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-white/50">Branch Address:</span>
                  <span className="font-medium text-white/90 text-[11px] max-w-xs text-right">
                    {bookingConfirmation.branchAddress}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-white/50">Room Category:</span>
                  <span className="font-semibold text-white">{bookingConfirmation.suite}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-white/50">Room Dimensions:</span>
                  <span className="font-semibold text-white">{bookingConfirmation.sqft}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-white/50">Air Conditioning:</span>
                  <span className="font-semibold text-sky-400">{bookingConfirmation.ac}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-white/50">Car Parking Bay:</span>
                  <span className="font-semibold text-emerald-400">{bookingConfirmation.parking}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-white/50">Check-in &amp; Duration:</span>
                  <span className="font-semibold text-white">
                    {bookingConfirmation.date} · {bookingConfirmation.duration} ({bookingConfirmation.guests} Guests)
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-white/50">Total Tariff (Pay at Check-in):</span>
                  <span className="font-semibold text-gold text-sm font-mono">{bookingConfirmation.totalAmount}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-white/50">Branch Concierge Desk:</span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Instant Confirmed · {bookingConfirmation.branchPhone}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons for Guest */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${bookingConfirmation.branchWhatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Vanakkam ${bookingConfirmation.branchName}! I have reserved ${bookingConfirmation.suite} (Ref #${bookingConfirmation.id}) for ${bookingConfirmation.name}. Check-in: ${bookingConfirmation.date}, Duration: ${bookingConfirmation.duration}. Please send digital key pass.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-none bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold uppercase tracking-wider text-white transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Send Pass to {bookingConfirmation.branchName.split(" ")[0]} WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-6 py-3 rounded-none border border-gold/40 bg-gold/15 hover:bg-gold/25 text-xs uppercase tracking-wider text-gold transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Printer className="h-4 w-4" />
                  <span>Print / Save Digital Pass</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetBooking}
                  className="px-6 py-3 rounded-none border border-white/20 bg-white/5 hover:bg-white/15 text-xs uppercase tracking-wider text-white transition-colors cursor-pointer"
                >
                  Book Another Branch / Room
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleBooking} className="mt-8 space-y-8">
              {selectionNotice && (
                <div className="p-3.5 rounded-none border border-emerald-400/50 bg-emerald-950/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{selectionNotice}</span>
                </div>
              )}

              {/* STEP 1: Branch Booking Selector (3 Interactive Branch Cards) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[11px] uppercase tracking-[0.2em] text-white/70 font-semibold flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-gold text-black flex items-center justify-center text-[10px] font-bold">1</span>
                    <span>Select Your Destination Branch</span>
                  </label>
                  <span className="text-[11px] text-gold font-medium">
                    Current: {currentBranch.name}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {HOTEL_BRANCHES.map((branch) => {
                    const isSelected = selectedBranchId === branch.id;
                    return (
                      <button
                        key={branch.id}
                        type="button"
                        onClick={() => setSelectedBranchId(branch.id)}
                        className={`group relative p-4 rounded-none border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden ${
                          isSelected
                            ? "bg-gold/15 border-gold shadow-[0_0_25px_rgba(201,166,91,0.3)] text-warm-white ring-1 ring-gold"
                            : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/25 text-white/70"
                        }`}
                      >
                        {/* Branch Photo */}
                        <div className="relative h-28 w-full overflow-hidden rounded-none mb-3">
                          <Image
                            src={branch.image}
                            alt={branch.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent" />
                          <div className="absolute top-2 right-2 rounded-none bg-black/80 px-2 py-0.5 text-[10px] font-mono text-gold border border-gold/40">
                            From {branch.startingRate}
                          </div>
                          <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] text-white font-medium">
                            <MapPin className="h-3 w-3 text-gold" />
                            <span>{branch.city}</span>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-display text-base font-semibold text-warm-white">
                              {branch.name}
                            </h4>
                            {isSelected && (
                              <span className="text-xs text-gold font-bold">✓ Selected</span>
                            )}
                          </div>
                          <p className="text-[11px] text-white/60 leading-relaxed line-clamp-1">
                            {branch.tagline}
                          </p>
                        </div>

                        {/* Branch Amenities Pills */}
                        <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between text-[10px] text-white/60">
                          <span className="text-emerald-400 font-medium">{branch.rating}</span>
                          <span className={isSelected ? "text-gold font-semibold" : "text-white/40"}>
                            {isSelected ? "Branch Active" : "Click to Select"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: Select Room Type (4 Tiers, Straight Corners, Real Photos) */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.2em] text-white/70 mb-3 font-semibold flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full bg-gold text-black flex items-center justify-center text-[10px] font-bold">2</span>
                  <span>Select Room Type at {currentBranch.name.split(" ")[0]}</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {ROOM_SUITES.map((suite) => (
                    <button
                      key={suite.id}
                      type="button"
                      onClick={() => setSelectedSuite(suite.id)}
                      className={`group relative p-4 rounded-none border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden ${
                        selectedSuite === suite.id
                          ? "bg-gold/15 border-gold shadow-[0_0_20px_rgba(201,166,91,0.25)] text-warm-white ring-1 ring-gold"
                          : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/25 text-white/70"
                      }`}
                    >
                      {/* Photo Thumbnail */}
                      <div className="relative h-32 w-full overflow-hidden rounded-none mb-3">
                        <Image
                          src={suite.image}
                          alt={suite.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />

                        {/* Nightly Tariff */}
                        <div className="absolute top-2 right-2 rounded-none bg-black/80 px-2 py-0.5 text-[11px] font-mono font-semibold text-gold border border-gold/40">
                          {suite.rate}
                        </div>

                        {/* Sq. Ft. Badge */}
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-none bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white border border-white/20">
                          <Maximize2 className="h-3 w-3 text-gold" />
                          <span>{suite.sqft}</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-display text-base font-semibold text-warm-white">
                            {suite.title}
                          </span>
                          <BedDouble className={`h-4 w-4 shrink-0 ${selectedSuite === suite.id ? "text-gold" : "opacity-40"}`} />
                        </div>
                        <p className="text-[11px] text-white/60 leading-relaxed line-clamp-2">
                          {suite.desc}
                        </p>
                      </div>

                      {/* Room Amenities Pills (Straight Corners) */}
                      <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between text-[10px] text-white/60 gap-1">
                        <span className="flex items-center gap-1 text-sky-300">
                          <Wind className="h-2.5 w-2.5" />
                          <span>{suite.ac.split(" ")[1] || "AC"}</span>
                        </span>
                        <span className="flex items-center gap-1 text-emerald-300">
                          <Car className="h-2.5 w-2.5" />
                          <span>Free Parking</span>
                        </span>
                        <span className={`font-semibold ml-auto ${selectedSuite === suite.id ? "text-gold" : "text-white/40"}`}>
                          {selectedSuite === suite.id ? "Selected" : "Select"}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 3: Check-in Date, Duration of Stay & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Check-in Date */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-white/70 mb-2 font-semibold flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-gold text-black flex items-center justify-center text-[10px] font-bold">3</span>
                    <span>Check-in Date</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {["Today", "Tomorrow", "This Weekend"].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setSelectedDate(d)}
                        className={`flex-1 py-2.5 px-2 rounded-none text-xs font-medium transition-all cursor-pointer ${
                          selectedDate === d
                            ? "bg-gold text-warm-brown font-semibold shadow-sm"
                            : "border border-white/15 bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration of Stay */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-white/70 mb-2 font-semibold flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-gold text-black flex items-center justify-center text-[10px] font-bold">4</span>
                    <span>Duration of Stay</span>
                  </label>
                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="w-full rounded-none border border-white/20 bg-black/40 px-4 py-2.5 text-xs text-warm-white outline-none focus:border-gold transition-colors cursor-pointer"
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
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-white/70 mb-2 font-semibold flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-gold text-black flex items-center justify-center text-[10px] font-bold">5</span>
                    <span>Guests</span>
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setSelectedGuests(num)}
                        className={`flex-1 py-2.5 rounded-none text-xs font-medium transition-all cursor-pointer ${
                          selectedGuests === num
                            ? "bg-gold text-warm-brown font-semibold shadow-sm"
                            : "border border-white/15 bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                      >
                        {num} {num === 5 ? "+" : ""}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* STEP 4: Guest Contact & User Remember Preference */}
              <div className="pt-2 border-t border-white/10 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                  <div className="sm:col-span-4">
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-white/70 mb-1.5 font-medium">
                      Guest Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. S. Ramanathan"
                      className="w-full rounded-none border border-white/20 bg-black/40 px-4 py-3 text-xs text-warm-white placeholder-white/35 outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-white/70 mb-1.5 font-medium">
                      Mobile / WhatsApp <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="e.g. +91 94440 12345"
                      className="w-full rounded-none border border-white/20 bg-black/40 px-4 py-3 text-xs text-warm-white placeholder-white/35 outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <button
                      type="submit"
                      className="w-full rounded-none bg-italian-red hover:bg-[#b5372e] py-3 px-4 text-xs font-semibold uppercase tracking-[0.16em] text-warm-white shadow-xl transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 active:scale-95"
                    >
                      <span className="flex items-center gap-2 text-[12px]">
                        <span>Confirm at {currentBranch.name.split(" ")[0]} · Pay at Check-in</span>
                        <Sparkles className="h-3.5 w-3.5 text-gold" />
                      </span>
                      <span className="text-[10px] font-normal opacity-85 lowercase tracking-normal text-rose-100">
                        Zero advance required · Instant digital pass
                      </span>
                    </button>
                  </div>
                </div>

                {/* Remember My Information Checkbox */}
                <div className="flex items-center gap-2.5 pt-1">
                  <input
                    id="remember-me-checkbox"
                    type="checkbox"
                    checked={rememberUser}
                    onChange={(e) => setRememberUser(e.target.checked)}
                    className="h-4 w-4 accent-gold rounded-none cursor-pointer"
                  />
                  <label htmlFor="remember-me-checkbox" className="text-xs text-white/80 cursor-pointer select-none">
                    Remember my name and mobile number on this device for instant 1-click rebooking
                  </label>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* 3. Newsletter Bar (Straight Corners) */}
        <div className="mt-14 rounded-none border border-white/10 bg-white/[0.02] p-8 sm:p-10 backdrop-blur-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium">
                Vasantham Heritage Newsletter
              </span>
              <h3 className="mt-1 font-display text-2xl text-warm-white">
                Receive royal festival offers &amp; seasonal privileges.
              </h3>
              <p className="mt-1 text-xs text-white/60 max-w-lg leading-relaxed">
                Stay updated on Chettinad culinary feasts, seasonal Chennai holiday suites, and VIP guest privileges across Tamil Nadu.
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
                  className="flex-1 rounded-none border border-white/20 bg-black/40 px-4 py-3 text-xs text-warm-white placeholder-white/40 outline-none focus:border-gold transition-colors"
                />
                <button
                  type="submit"
                  className="rounded-none bg-gold hover:bg-[#d6b46b] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-warm-brown transition-all cursor-pointer shrink-0 active:scale-95 shadow-md"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              {newsletterSubscribed && (
                <p className="mt-2 text-xs text-gold flex items-center gap-1.5 animate-in fade-in">
                  <Check className="h-3.5 w-3.5 text-gold" />
                  <span>Vanakkam! You are now subscribed to BR Vasantham Privileges.</span>
                </p>
              )}
            </form>
          </div>
        </div>

        {/* 4. Brand Lettering Banner with Straight Architectural Line */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center overflow-hidden">
          <div className="flex items-center justify-center gap-1 sm:gap-3 py-4 select-none">
            {"BR VASANTHAM".split("").map((char, charIdx) => {
              if (char === " ") {
                return <span key={charIdx} className="w-4 sm:w-8" />;
              }
              return (
                <span
                  key={charIdx}
                  className="inline-block font-display text-[clamp(2.5rem,7.5vw,7.5rem)] leading-none tracking-tight text-white/15 cursor-default hover:text-gold transition-colors duration-300"
                >
                  {char}
                </span>
              );
            })}
          </div>
        </div>

        {/* 5. Bottom Bar: Copyright, Links & Back to Top (Sharp Clean Corners) */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            <p>© {new Date().getFullYear()} BR Vasantham Grand — Luxury Heritage Hotel &amp; Suites.</p>
            <p className="text-[11px] text-white/35 mt-0.5">
              13.0827° N, 80.2707° E · Anna Salai (Chennai), Madurai &amp; Puducherry, Tamil Nadu, India
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <a href="#about" className="hover:text-gold transition-colors">About</a>
            <a href="#facilities" className="hover:text-gold transition-colors">Facilities</a>
            <a href="#rooms" className="hover:text-gold transition-colors">Rooms &amp; Suites</a>
            <a href="#dining" className="hover:text-gold transition-colors">Dining</a>
            <a href="#reviews" className="hover:text-gold transition-colors">Reviews</a>
            <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 rounded-none border border-white/20 bg-white/5 px-4 py-2 hover:bg-white/15 text-white transition-all cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
