"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Star,
  CheckCircle2,
  Send,
  Sparkles,
  Plus,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  rating: number;
  roomStayed?: string;
  date?: string;
  verified?: boolean;
}

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "rev-1",
    quote:
      "A truly exceptional stay. The rooms are beautifully designed and the staff goes above and beyond. Will definitely return.",
    author: "Priya M.",
    location: "Chennai",
    rating: 5,
    roomStayed: "Deluxe AC Room (450 sq. ft.)",
    date: "Verified Stay",
    verified: true,
  },
  {
    id: "rev-2",
    quote:
      "Staying in the Chettinad Heritage Suite was like living in a royal palace. Authentic Athangudi tiles stayed naturally cool, and the morning Kumbakonam brass filter coffee was unforgettable.",
    author: "Meenakshi & Rajesh K.",
    location: "Bengaluru",
    rating: 5,
    roomStayed: "Royal Chettinad Heritage Suite",
    date: "Verified Stay",
    verified: true,
  },
  {
    id: "rev-3",
    quote:
      "The 100% inverter AC in the Deluxe Room was whisper-quiet, ensuring sound sleep. Having dedicated free covered parking with courteous valet made our family trip completely stress-free.",
    author: "Dr. S. Sundararajan",
    location: "Madurai",
    rating: 5,
    roomStayed: "Deluxe Luxury AC",
    date: "Verified Stay",
    verified: true,
  },
  {
    id: "rev-4",
    quote:
      "Best value for luxury in Tamil Nadu. The rooms are over 320 sq. ft., Wi-Fi is super fast for remote work, and check-in was completed in under two minutes. Highly recommended.",
    author: "Anand Natarajan",
    location: "Coimbatore",
    rating: 5,
    roomStayed: "Standard Normal AC Room",
    date: "Verified Stay",
    verified: true,
  },
];

export function HotelReviewsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Form & Drawer State
  const [showForm, setShowForm] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestLocation, setGuestLocation] = useState("");
  const [roomStayed, setRoomStayed] = useState("Deluxe AC Room");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [submittedToast, setSubmittedToast] = useState<string | null>(null);

  // Auto-advance testimonials every 7 seconds when not paused
  useEffect(() => {
    if (isPaused || showForm || showAllReviews) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused, showForm, showAllReviews, testimonials.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !feedbackText.trim()) return;

    const newRev: Testimonial = {
      id: `rev-${Date.now()}`,
      author: guestName.trim(),
      location: guestLocation.trim() || "Tamil Nadu",
      rating: rating,
      roomStayed: roomStayed,
      quote: feedbackText.trim(),
      date: "Just now",
      verified: true,
    };

    setTestimonials([newRev, ...testimonials]);
    setActiveIndex(0);
    setGuestName("");
    setGuestLocation("");
    setFeedbackText("");
    setRating(5);
    setShowForm(false);
    setSubmittedToast(
      `Vanakkam ${newRev.author}! Your 5.0★ review has been published to our live feed.`
    );
    setTimeout(() => setSubmittedToast(null), 7000);
  };

  const current = testimonials[activeIndex] || testimonials[0];

  return (
    <section
      id="reviews"
      className="relative bg-[#faf7f2] py-24 sm:py-32 border-t border-[#ece4da] text-[#241814]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Toast Alert on Submit */}
        <AnimatePresence>
          {submittedToast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs sm:text-sm flex items-center justify-between rounded-none shadow-sm"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{submittedToast}</span>
              </div>
              <button
                type="button"
                onClick={() => setSubmittedToast(null)}
                className="text-stone-400 hover:text-stone-700 ml-4 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main 2-Column Showcase matching Reference Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Testimonial & Title */}
          <div className="lg:col-span-7 flex flex-col justify-between min-h-[380px]">
            <div>
              {/* Eyebrow Label */}
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] font-semibold text-[#c2593f] block">
                GUEST REVIEWS
              </span>

              {/* Main Headline */}
              <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-[3.25rem] leading-[1.12] text-[#241814] tracking-tight">
                What Our Guests Say
              </h2>

              {/* Terracotta Star Rating */}
              <div className="mt-7 flex items-center gap-1.5 text-[#c2593f]">
                {Array.from({ length: current.rating || 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-[#c2593f] text-[#c2593f]"
                    strokeWidth={0}
                  />
                ))}
              </div>

              {/* Animated Testimonial Quote */}
              <div className="relative mt-6 min-h-[110px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <p className="font-display italic text-lg sm:text-xl md:text-[1.35rem] leading-[1.65] text-[#3d2e26] font-normal">
                      &ldquo;{current.quote}&rdquo;
                    </p>

                    {/* Author & Location */}
                    <div className="mt-6">
                      <h4 className="font-sans font-semibold text-sm sm:text-base text-[#241814]">
                        {current.author}
                      </h4>
                      <p className="text-stone-500 text-xs sm:text-sm mt-0.5 font-light">
                        {current.location}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Carousel Navigation Indicators */}
            <div className="mt-8 pt-4 flex items-center justify-between">
              {/* Dots / Pills */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className="transition-all duration-300 cursor-pointer p-1"
                  >
                    {idx === activeIndex ? (
                      <span className="block h-1.5 w-7 rounded-full bg-[#c2593f] transition-all" />
                    ) : (
                      <span className="block h-2 w-2 rounded-full bg-[#d8cfc5] hover:bg-stone-400 transition-all" />
                    )}
                  </button>
                ))}
              </div>

              {/* Subtle Next / Prev Controls */}
              <div className="flex items-center gap-1.5 text-stone-400">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous Testimonial"
                  className="h-8 w-8 rounded-none border border-stone-300/80 hover:border-[#c2593f] hover:text-[#c2593f] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next Testimonial"
                  className="h-8 w-8 rounded-none border border-stone-300/80 hover:border-[#c2593f] hover:text-[#c2593f] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: 4-Metric Grid in Warm Box matching Reference */}
          <div className="lg:col-span-5">
            <div className="rounded-none bg-[#f4efe8] border border-[#e5ddd3] shadow-xs">
              <div className="grid grid-cols-2 divide-x divide-y divide-[#e5ddd3]">
                {/* Quadrant 1: Google Rating */}
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                  <div className="font-display text-4xl sm:text-5xl text-[#241814] flex items-center leading-none">
                    <span>4.8</span>
                    <span className="text-[#c2593f] ml-1 text-2xl sm:text-3xl leading-none">
                      ★
                    </span>
                  </div>
                  <p className="mt-3 text-stone-600 text-xs sm:text-sm font-light">
                    Google Rating
                  </p>
                </div>

                {/* Quadrant 2: Happy Guests */}
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                  <div className="font-display text-4xl sm:text-5xl text-[#241814] flex items-center leading-none">
                    <span>500</span>
                    <span className="text-[#c2593f] ml-0.5 text-3xl sm:text-4xl font-light">
                      +
                    </span>
                  </div>
                  <p className="mt-3 text-stone-600 text-xs sm:text-sm font-light">
                    Happy Guests
                  </p>
                </div>

                {/* Quadrant 3: Luxury Rooms */}
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                  <div className="font-display text-4xl sm:text-5xl text-[#241814] leading-none">
                    <span>22</span>
                  </div>
                  <p className="mt-3 text-stone-600 text-xs sm:text-sm font-light">
                    Luxury Rooms
                  </p>
                </div>

                {/* Quadrant 4: Repeat Guests */}
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                  <div className="font-display text-4xl sm:text-5xl text-[#241814] flex items-center leading-none">
                    <span>95</span>
                    <span className="text-[#c2593f] ml-0.5 text-2xl sm:text-3xl font-light">
                      %
                    </span>
                  </div>
                  <p className="mt-3 text-stone-600 text-xs sm:text-sm font-light">
                    Repeat Guests
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Interactive Action Bar below showcase */}
        <div className="mt-14 pt-8 border-t border-[#ece4da] flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-stone-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Verified Tamil Nadu Hospitality · 100% Transparent Guest Voices</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 rounded-none border border-[#c2593f] text-[#c2593f] hover:bg-[#c2593f] hover:text-white transition-colors uppercase tracking-[0.15em] font-semibold text-[11px] cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>{showForm ? "Close Form" : "Share Your Experience"}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="px-4 py-2 rounded-none border border-stone-300 text-stone-700 hover:border-stone-500 transition-colors uppercase tracking-[0.15em] font-medium text-[11px] cursor-pointer flex items-center gap-1.5"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>{showAllReviews ? "Hide Reviews" : `View All (${testimonials.length})`}</span>
            </button>
          </div>
        </div>

        {/* Collapsible Write a Review Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="overflow-hidden mt-8"
            >
              <div className="bg-white border border-[#e5ddd3] p-6 sm:p-8 rounded-none shadow-sm max-w-2xl mx-auto">
                <div className="border-b border-[#f0e9e1] pb-3 mb-5">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#c2593f] font-semibold">
                    Guest Transparency
                  </span>
                  <h3 className="font-display text-2xl text-[#241814] mt-0.5">
                    Write Your Guest Review
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Your feedback publishes directly to the guest testimonial feed.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {/* Star Selector */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">
                      Your Rating <span className="text-[#c2593f]">*</span>
                    </label>
                    <div className="flex items-center gap-1 py-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                          className="p-1 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`h-5 w-5 transition-colors ${
                              (hoverRating || rating) >= star
                                ? "fill-[#c2593f] text-[#c2593f]"
                                : "text-stone-300"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 font-mono text-xs font-semibold text-stone-700">
                        {rating}.0 / 5.0
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">
                        Your Name <span className="text-[#c2593f]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="e.g. S. Ramanathan"
                        className="w-full border border-stone-300 bg-[#faf8f5] px-3.5 py-2.5 text-xs text-[#241814] outline-none focus:border-[#c2593f] rounded-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">
                        City / Location
                      </label>
                      <input
                        type="text"
                        value={guestLocation}
                        onChange={(e) => setGuestLocation(e.target.value)}
                        placeholder="e.g. Chennai"
                        className="w-full border border-stone-300 bg-[#faf8f5] px-3.5 py-2.5 text-xs text-[#241814] outline-none focus:border-[#c2593f] rounded-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">
                      Room Category
                    </label>
                    <select
                      value={roomStayed}
                      onChange={(e) => setRoomStayed(e.target.value)}
                      className="w-full border border-stone-300 bg-[#faf8f5] px-3.5 py-2.5 text-xs text-[#241814] outline-none focus:border-[#c2593f] rounded-none cursor-pointer"
                    >
                      <option value="Deluxe AC Room">Deluxe AC Room (450 sq. ft.)</option>
                      <option value="Standard Normal AC Room">Standard Normal AC Room (320 sq. ft.)</option>
                      <option value="Royal Chettinad Heritage Suite">Royal Chettinad Heritage Suite (750 sq. ft.)</option>
                      <option value="Presidential Grand Penthouse">Presidential Grand Penthouse (1,200 sq. ft.)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">
                      Your Review <span className="text-[#c2593f]">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Share your stay experience, AC cooling, parking convenience, and hospitality..."
                      className="w-full border border-stone-300 bg-[#faf8f5] px-3.5 py-2.5 text-xs text-[#241814] outline-none focus:border-[#c2593f] rounded-none resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2.5 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-[#dfba73] via-[#fae4b2] to-[#c79a4d] hover:brightness-105 text-[#1a120b] px-6 py-2.5 text-xs font-bold uppercase tracking-[0.18em] transition-all flex items-center gap-2 cursor-pointer rounded-none active:scale-95 shadow-[0_4px_15px_rgba(223,186,115,0.4)]"
                    >
                      <span>Publish Live Review</span>
                      <Send className="h-3.5 w-3.5 text-[#1a120b]" />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsible View All Reviews Grid */}
        <AnimatePresence>
          {showAllReviews && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="overflow-hidden mt-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-[#e5ddd3] p-6 rounded-none shadow-2xs hover:border-[#c2593f]/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1 text-[#c2593f]">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-[#c2593f] text-[#c2593f]" strokeWidth={0} />
                        ))}
                      </div>
                      <span className="text-[10px] text-stone-400 font-mono">
                        {item.date || "Verified Stay"}
                      </span>
                    </div>

                    <p className="font-display italic text-sm text-[#3d2e26] leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </p>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-[#241814]">{item.author}</span>
                        <span className="text-stone-500 ml-1.5 font-light">· {item.location}</span>
                      </div>
                      {item.roomStayed && (
                        <span className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded-none">
                          {item.roomStayed.split(" ")[0]}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
