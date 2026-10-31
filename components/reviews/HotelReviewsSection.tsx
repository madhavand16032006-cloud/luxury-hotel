"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Star,
  CheckCircle2,
  Send,
  Sparkles,
  UserCheck,
  ShieldCheck,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface HotelReview {
  id: string;
  name: string;
  location: string;
  roomStayed: string;
  rating: number;
  date: string;
  verified: boolean;
  comment: string;
  helpfulCount: number;
}

const INITIAL_REVIEWS: HotelReview[] = [
  {
    id: "rev-1",
    name: "Dr. S. Sundararajan",
    location: "Chennai, Tamil Nadu",
    roomStayed: "Deluxe AC Room (450 sq. ft.)",
    rating: 5,
    date: "Yesterday",
    verified: true,
    comment:
      "Exceptional luxury experience. The 100% inverter AC in the Deluxe Room was completely silent, ensuring deep peaceful sleep. Covered car parking was spacious with a very courteous valet driver. The Kumbakonam degree filter coffee in the morning was heavenly.",
    helpfulCount: 28,
  },
  {
    id: "rev-2",
    name: "Meenakshi & Rajesh K.",
    location: "Bengaluru, Karnataka",
    roomStayed: "Royal Chettinad Heritage Suite",
    rating: 5,
    date: "4 days ago",
    verified: true,
    comment:
      "Staying in the Chettinad Suite felt like living inside a royal palace! The original Athangudi tiles stayed naturally cool even during mid-day heat. Staff treated us with genuine South Indian Virunthombal hospitality. Will return every year.",
    helpfulCount: 42,
  },
  {
    id: "rev-3",
    name: "Anand Natarajan",
    location: "Coimbatore, Tamil Nadu",
    roomStayed: "Standard Normal AC Room (320 sq. ft.)",
    rating: 5,
    date: "1 week ago",
    verified: true,
    comment:
      "Best value for luxury in Tamil Nadu! Even the Normal AC room is very large (over 300 sq. ft.) with high-speed Wi-Fi 6 and a dedicated work desk. Check-in was done in under 2 minutes. Highly recommend to all travelers.",
    helpfulCount: 19,
  },
  {
    id: "rev-4",
    name: "Vikram & Priya Malhotra",
    location: "Mumbai, Maharashtra",
    roomStayed: "Presidential Grand Penthouse",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    comment:
      "The private plunge pool on the penthouse terrace looking out over Tamil Nadu's horizon is unforgettable. 24/7 concierge took care of our car, airport transfers, and customized vegetarian dinners flawlessly.",
    helpfulCount: 35,
  },
];

export function HotelReviewsSection() {
  const [reviews, setReviews] = useState<HotelReview[]>(INITIAL_REVIEWS);

  // Form State
  const [guestName, setGuestName] = useState("");
  const [guestLocation, setGuestLocation] = useState("");
  const [roomStayed, setRoomStayed] = useState("Deluxe AC Room");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [submittedAlert, setSubmittedAlert] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !feedbackText.trim()) return;

    const newRev: HotelReview = {
      id: `rev-${Date.now()}`,
      name: guestName.trim(),
      location: guestLocation.trim() || "Tamil Nadu, India",
      roomStayed: roomStayed,
      rating: rating,
      date: "Just now",
      verified: true,
      comment: feedbackText.trim(),
      helpfulCount: 1,
    };

    setReviews([newRev, ...reviews]);
    setGuestName("");
    setGuestLocation("");
    setFeedbackText("");
    setRating(5);
    setSubmittedAlert(
      `Vanakkam ${newRev.name}! Your ${newRev.rating}.0★ live feedback has been published successfully.`
    );
    setTimeout(() => setSubmittedAlert(null), 8000);
  };

  return (
    <section id="reviews" className="relative bg-[#f8f5ef] py-28 sm:py-36 border-t border-[#e8dfd6]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-none bg-gold/15 border border-gold/30 px-3.5 py-1 text-[11px] uppercase tracking-[0.25em] text-warm-brown font-semibold mb-3">
            <Sparkles className="h-3 w-3 text-gold" />
            <span>Verified Guest Experiences</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#221610] tracking-tight">
            What Our Guests Say About BR Vasantham
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
            Authentic live feedback from guests who have stayed in our Deluxe, Normal AC, and Royal Chettinad Suites across Tamil Nadu.
          </p>
        </div>

        {/* Rating Summary Scorecard Bar (Sharp Zero Radius) */}
        <div className="bg-white border border-[#e5ded6] p-8 sm:p-10 rounded-none mb-14 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Score Block */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#ece5dd] pb-6 lg:pb-0 lg:pr-8 text-center lg:text-left">
              <span className="text-[11px] uppercase tracking-[0.25em] text-stone-500 font-semibold">
                Overall Guest Score
              </span>
              <div className="mt-2 flex items-center justify-center lg:justify-start gap-3">
                <span className="font-display text-5xl sm:text-6xl text-[#221610] font-bold">
                  4.9
                </span>
                <div>
                  <div className="flex items-center text-amber-500 gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-500 mt-1 font-medium">
                    1,480+ Verified Reviews
                  </p>
                </div>
              </div>
              <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>99.4% Recommended by Guests</span>
              </div>
            </div>

            {/* Right Detailed Rating Categories */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <div className="flex justify-between text-stone-700 font-medium mb-1">
                  <span>100% Inverter AC &amp; Sleep Quality</span>
                  <span className="font-semibold text-warm-brown">5.0 ★</span>
                </div>
                <div className="h-2 w-full bg-[#f0e9e1] rounded-none overflow-hidden">
                  <div className="h-full bg-[#c2593f] w-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-stone-700 font-medium mb-1">
                  <span>Cleanliness &amp; Carrara Marble Baths</span>
                  <span className="font-semibold text-warm-brown">4.9 ★</span>
                </div>
                <div className="h-2 w-full bg-[#f0e9e1] rounded-none overflow-hidden">
                  <div className="h-full bg-[#c2593f] w-[98%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-stone-700 font-medium mb-1">
                  <span>Free Parking &amp; Valet Service</span>
                  <span className="font-semibold text-warm-brown">4.9 ★</span>
                </div>
                <div className="h-2 w-full bg-[#f0e9e1] rounded-none overflow-hidden">
                  <div className="h-full bg-[#c2593f] w-[98%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-stone-700 font-medium mb-1">
                  <span>Hospitality &amp; Front Desk Care</span>
                  <span className="font-semibold text-warm-brown">4.9 ★</span>
                </div>
                <div className="h-2 w-full bg-[#f0e9e1] rounded-none overflow-hidden">
                  <div className="h-full bg-[#c2593f] w-[99%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Section: Left Live Reviews Grid, Right Submit Feedback Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Live Reviews Feed */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#e5ded6]">
              <h3 className="font-display text-xl text-[#221610]">
                Recent Guest Testimonials ({reviews.length})
              </h3>
              <span className="text-xs text-emerald-700 flex items-center gap-1 font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Feed Active</span>
              </span>
            </div>

            <div className="space-y-4">
              {reviews.map((rev) => (
                <motion.div
                  key={rev.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="bg-white border border-[#e5ded6] p-6 rounded-none shadow-2xs hover:border-gold/60 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f4ede6] pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-display text-base font-semibold text-[#221610]">
                          {rev.name}
                        </h4>
                        {rev.verified && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-none font-semibold">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>Verified Stay</span>
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        {rev.location} · {rev.roomStayed}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <span className="text-[11px] text-stone-400 font-mono">
                        {rev.date}
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#594d45]">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Submit Live Feedback Form */}
          <div className="lg:col-span-5 bg-white border border-gold/40 p-6 sm:p-8 rounded-none shadow-sm sticky top-24">
            <div className="border-b border-[#f0e9e1] pb-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c2593f] font-semibold">
                Guest Voice &amp; Transparency
              </span>
              <h3 className="font-display text-2xl text-[#221610] mt-1">
                Submit Your Live Feedback
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Stayed with us? Share your rating and review to appear live on our website.
              </p>
            </div>

            {submittedAlert && (
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in rounded-none">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>{submittedAlert}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
              {/* Star Rating Selector */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1.5 font-medium">
                  Your Overall Rating <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center gap-1.5 py-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-115 transition-transform cursor-pointer"
                      aria-label={`Rate ${star} Stars`}
                    >
                      <Star
                        className={`h-6 w-6 transition-colors ${
                          (hoverRating || rating) >= star
                            ? "fill-amber-500 text-amber-500"
                            : "text-stone-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 font-mono text-sm font-semibold text-warm-brown">
                    {rating}.0 / 5.0
                  </span>
                </div>
              </div>

              {/* Guest Name */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. R. Venkatesh"
                  className="w-full border border-[#d8cfc5] bg-[#faf8f5] px-3.5 py-2.5 text-xs text-[#221610] outline-none focus:border-gold rounded-none"
                />
              </div>

              {/* City / Location */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">
                  Your City / Origin
                </label>
                <input
                  type="text"
                  value={guestLocation}
                  onChange={(e) => setGuestLocation(e.target.value)}
                  placeholder="e.g. Chennai, Tamil Nadu"
                  className="w-full border border-[#d8cfc5] bg-[#faf8f5] px-3.5 py-2.5 text-xs text-[#221610] outline-none focus:border-gold rounded-none"
                />
              </div>

              {/* Room Stayed in */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">
                  Room Category Stayed In
                </label>
                <select
                  value={roomStayed}
                  onChange={(e) => setRoomStayed(e.target.value)}
                  className="w-full border border-[#d8cfc5] bg-[#faf8f5] px-3.5 py-2.5 text-xs text-[#221610] outline-none focus:border-gold rounded-none cursor-pointer"
                >
                  <option value="Deluxe AC Room">Deluxe AC Room (450 sq. ft.)</option>
                  <option value="Standard Normal AC Room">Standard Normal AC Room (320 sq. ft.)</option>
                  <option value="Royal Chettinad Heritage Suite">Royal Chettinad Heritage Suite (750 sq. ft.)</option>
                  <option value="Presidential Grand Penthouse">Presidential Grand Penthouse (1,200 sq. ft.)</option>
                </select>
              </div>

              {/* Feedback Comment */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">
                  Your Review &amp; Experience <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Describe your AC comfort, car parking, cleanliness, and stay experience..."
                  className="w-full border border-[#d8cfc5] bg-[#faf8f5] px-3.5 py-2.5 text-xs text-[#221610] outline-none focus:border-gold rounded-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#221610] hover:bg-[#38241b] text-warm-white py-3 px-4 font-semibold uppercase tracking-[0.2em] text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer rounded-none active:scale-95 shadow-md"
              >
                <span>Submit Live Feedback</span>
                <Send className="h-3.5 w-3.5 text-gold" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

