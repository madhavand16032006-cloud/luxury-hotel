"use client";

import React, { useState } from "react";
import { REVIEWS_DATA, CustomerReview } from "@/data/products";
import { useCart } from "@/context/CartContext";
import {
  Star,
  CheckCircle2,
  Send,
  ThumbsUp,
  Sparkles,
} from "lucide-react";

export function ReviewsSection() {
  const { showToast } = useCart();
  const [reviews, setReviews] = useState<CustomerReview[]>(REVIEWS_DATA);

  // Form state
  const [customerName, setCustomerName] = useState("");
  const [rating, setRating] = useState(5);
  const [experience, setExperience] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !experience.trim()) {
      showToast("Please provide your name and your experience.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newReview: CustomerReview = {
        id: `rev-${Date.now()}`,
        name: customerName.trim(),
        location: "Verified Local Customer",
        rating,
        date: "Just now",
        verified: true,
        comment: experience.trim(),
        itemPurchased: "Fresh Everyday Order",
      };

      setReviews([newReview, ...reviews]);
      setCustomerName("");
      setExperience("");
      setRating(5);
      setIsSubmitting(false);
      showToast("Thank you! Your review has been published.");
    }, 800);
  };

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-white border-t border-emerald-100/60 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3 border border-emerald-200/60">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Community Trust & Testimonials</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            What Our <span className="text-emerald-700">Customers Say</span>
          </h2>

          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Your trust means everything to us. Share your thoughts and help us serve you better.
          </p>
        </div>

        {/* Top Aggregate Rating Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          <div className="bg-[#f8faf5] rounded-3xl p-6 text-center border border-slate-200/80 shadow-xs">
            <div className="text-3xl sm:text-4xl font-black text-slate-900 flex items-center justify-center gap-1">
              <span>4.9</span>
              <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
            </div>
            <p className="text-xs font-bold text-slate-700 mt-1">Average Customer Rating</p>
            <p className="text-[11px] text-slate-400">Based on 12,400+ orders</p>
          </div>

          <div className="bg-[#f8faf5] rounded-3xl p-6 text-center border border-slate-200/80 shadow-xs">
            <div className="text-3xl sm:text-4xl font-black text-emerald-700">
              99.4%
            </div>
            <p className="text-xs font-bold text-slate-700 mt-1">Freshness Satisfaction</p>
            <p className="text-[11px] text-slate-400">Farm milk & crisp greens</p>
          </div>

          <div className="bg-[#f8faf5] rounded-3xl p-6 text-center border border-slate-200/80 shadow-xs">
            <div className="text-3xl sm:text-4xl font-black text-slate-900">
              28 Mins
            </div>
            <p className="text-xs font-bold text-slate-700 mt-1">Average Delivery Time</p>
            <p className="text-[11px] text-slate-400">Doorstep express dispatch</p>
          </div>
        </div>

        {/* Main Content Grid: Review Cards (Left) & Feedback Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Customer Review Cards List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Recent Reviews ({reviews.length})
              </span>
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                100% Verified Purchases
              </span>
            </div>

            <div className="space-y-4 max-h-[580px] overflow-y-auto pr-2 scrollbar-none">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-[#f8faf5] rounded-3xl p-6 border border-slate-200/80 hover:border-emerald-300 transition-all shadow-xs flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-900">{rev.name}</h4>
                          {rev.verified && (
                            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              <CheckCircle2 className="h-3 w-3" />
                              Verified Buyer
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400">{rev.location} • {rev.date}</span>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`h-3.5 w-3.5 ${
                              s <= rev.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Comment */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                      &quot;{rev.comment}&quot;
                    </p>
                  </div>

                  {/* Item badge */}
                  <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-medium">
                      Item: <strong className="text-slate-700">{rev.itemPurchased}</strong>
                    </span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      Helpful
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback Form (Right) */}
          <div className="lg:col-span-5 bg-[#f8faf5] rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-lg">
            <div className="mb-6">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                Share Your Experience
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">Leave a Review</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Tell our community and team how your grocery delivery was today!
              </p>
            </div>

            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              {/* Customer Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Customer Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-emerald-600 text-xs sm:text-sm text-slate-800 outline-none transition-all"
                />
              </div>

              {/* Star Rating Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Rating <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        key={starVal}
                        type="button"
                        onMouseEnter={() => setHoverRating(starVal)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(starVal)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`h-6 w-6 transition-colors ${
                            starVal <= (hoverRating || rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-200"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-700 ml-2">
                    {rating === 5
                      ? "5/5 - Outstanding!"
                      : rating === 4
                      ? "4/5 - Very Good"
                      : rating === 3
                      ? "3/5 - Average"
                      : "Needs Improvement"}
                  </span>
                </div>
              </div>

              {/* Experience Textarea */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Your Experience <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Tell us about the freshness of veggies, milk quality, or delivery speed..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-emerald-600 text-xs sm:text-sm text-slate-800 outline-none transition-all resize-none"
                />
              </div>

              {/* Submit Feedback Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span>Publishing your review...</span>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Submit Feedback</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
