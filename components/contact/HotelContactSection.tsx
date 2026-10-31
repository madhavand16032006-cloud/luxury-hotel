"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  Car,
  Send,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export function HotelContactSection() {
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [suiteInterest, setSuiteInterest] = useState("Deluxe AC Room (450 sq. ft.)");
  const [travelDates, setTravelDates] = useState("");
  const [message, setMessage] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestPhone.trim()) return;

    // Direct WhatsApp Concierge format
    const whatsappMsg = `Vanakkam Front Desk Concierge! My name is ${guestName}. Phone: ${guestPhone}. Interested in: ${suiteInterest}. Travel Dates: ${travelDates || "Flexible"}. Note: ${message || "Please share availability & room details."}`;
    window.open(
      `https://wa.me/919444012345?text=${encodeURIComponent(whatsappMsg)}`,
      "_blank"
    );

    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setGuestName("");
      setGuestPhone("");
      setMessage("");
    }, 6000);
  };

  return (
    <section id="contact" className="relative bg-warm-white py-28 sm:py-36 border-t border-[#e8dfd6]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-none bg-gold/15 border border-gold/30 px-3.5 py-1 text-[11px] uppercase tracking-[0.25em] text-warm-brown font-semibold mb-3">
            <Sparkles className="h-3 w-3 text-gold" />
            <span>24/7 Concierge &amp; Reception</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#221610] tracking-tight">
            We Are Always Here to Welcome You
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
            Have questions about room availability, 100% AC comfort, covered valet parking, or Chettinad dining? Our front desk team is on standby 24 hours a day.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact Channels & Location Cards */}
          <div className="lg:col-span-6 space-y-6">
            {/* Phone & WhatsApp Quick Direct Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* WhatsApp Card */}
              <div className="p-6 bg-[#f8f5ef] border border-[#e5ded6] rounded-none flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="p-2 bg-emerald-100 text-emerald-800 rounded-none">
                      <MessageSquare className="h-5 w-5" />
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold uppercase tracking-wider">
                      Avg. 3 Min Reply
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg text-[#221610]">
                    WhatsApp Concierge
                  </h3>
                  <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                    Instant room booking assistance, driving directions &amp; digital passes.
                  </p>
                </div>
                <a
                  href="https://wa.me/919444012345?text=Vanakkam!%20I%20have%20an%20inquiry%20regarding%20BR%20Vasantham%20Grand%20stay."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 hover:text-emerald-950 transition-colors"
                >
                  <span>+91 94440 12345 →</span>
                </a>
              </div>

              {/* Phone Desk Card */}
              <div className="p-6 bg-[#f8f5ef] border border-[#e5ded6] rounded-none flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="p-2 bg-amber-100 text-amber-900 rounded-none">
                      <Phone className="h-5 w-5" />
                    </span>
                    <span className="text-[10px] text-amber-800 font-semibold uppercase tracking-wider">
                      24×7 Available
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg text-[#221610]">
                    Direct Telephone
                  </h3>
                  <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                    Speak directly to our duty manager for reservations &amp; inquiries.
                  </p>
                </div>
                <a
                  href="tel:+914428451984"
                  className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-warm-brown hover:text-italian-red transition-colors"
                >
                  <span>+91 44 2845 1984 →</span>
                </a>
              </div>
            </div>

            {/* Hotel Sanctuaries Address Block */}
            <div className="p-6 sm:p-8 bg-[#f8f5ef] border border-[#e5ded6] rounded-none space-y-5 text-xs text-stone-700">
              <div className="border-b border-[#e8dfd6] pb-4">
                <div className="flex items-center gap-2 text-warm-brown font-semibold mb-1">
                  <MapPin className="h-4 w-4 text-[#c2593f]" />
                  <span className="font-display text-base text-[#221610]">
                    Chennai Flagship Hotel
                  </span>
                </div>
                <p className="text-stone-600 pl-6">
                  Anna Salai (Mount Road) &amp; ECR Beachfront, Chennai 600002, Tamil Nadu (Near Central Metro)
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-warm-brown font-semibold mb-1">
                  <MapPin className="h-4 w-4 text-[#c2593f]" />
                  <span className="font-display text-base text-[#221610]">
                    Madurai &amp; Chettinad Palace
                  </span>
                </div>
                <p className="text-stone-600 pl-6">
                  West Perumal Maistry Street, Madurai &amp; Kanadukathan, Chettinad 625001, Tamil Nadu
                </p>
              </div>

              <div className="pt-2 border-t border-[#e8dfd6] flex flex-wrap items-center justify-between gap-3 text-[11px] text-stone-500">
                <span className="flex items-center gap-1.5">
                  <Car className="h-3.5 w-3.5 text-gold" />
                  <span>Free Guarded Car Parking on Site</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-stone-400" />
                  <span>stay@brvasantham.com</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Concierge Callback & Message Form */}
          <div className="lg:col-span-6 bg-white border border-[#e5ded6] p-8 sm:p-10 rounded-none shadow-xs">
            <div className="border-b border-[#f0e9e1] pb-4 mb-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c2593f] font-semibold">
                Direct Inquiry
              </span>
              <h3 className="font-display text-2xl text-[#221610] mt-1">
                Request Front Desk Assistance
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Leave your travel dates and requirements. Our concierge will contact you immediately.
              </p>
            </div>

            {sentSuccess && (
              <div className="mb-5 p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2 rounded-none">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>
                  Vanakkam! Your inquiry has been routed to our WhatsApp Concierge desk.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. S. Ramanathan"
                    className="w-full border border-[#d8cfc5] bg-[#faf8f5] px-3.5 py-2.5 text-xs text-[#221610] outline-none focus:border-gold rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">
                    Mobile / WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="e.g. +91 94440 12345"
                    className="w-full border border-[#d8cfc5] bg-[#faf8f5] px-3.5 py-2.5 text-xs text-[#221610] outline-none focus:border-gold rounded-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">
                    Room Category Interested In
                  </label>
                  <select
                    value={suiteInterest}
                    onChange={(e) => setSuiteInterest(e.target.value)}
                    className="w-full border border-[#d8cfc5] bg-[#faf8f5] px-3.5 py-2.5 text-xs text-[#221610] outline-none focus:border-gold rounded-none cursor-pointer"
                  >
                    <option value="Standard Normal AC Room (320 sq. ft.)">Standard Normal AC Room (₹2,999)</option>
                    <option value="Deluxe AC Room (450 sq. ft.)">Deluxe AC Room (₹4,499)</option>
                    <option value="Royal Chettinad Heritage Suite">Royal Chettinad Heritage Suite (₹7,999)</option>
                    <option value="Presidential Grand Penthouse">Presidential Grand Penthouse (₹14,999)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">
                    Approx. Check-in Date
                  </label>
                  <input
                    type="text"
                    value={travelDates}
                    onChange={(e) => setTravelDates(e.target.value)}
                    placeholder="e.g. Next Weekend / Nov 15"
                    className="w-full border border-[#d8cfc5] bg-[#faf8f5] px-3.5 py-2.5 text-xs text-[#221610] outline-none focus:border-gold rounded-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">
                  Special Inquiries / Parking / Airport Transfer
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Need extra bed, EV car charging, late check-in or dining reservations..."
                  className="w-full border border-[#d8cfc5] bg-[#faf8f5] px-3.5 py-2.5 text-xs text-[#221610] outline-none focus:border-gold rounded-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#c2593f] hover:bg-[#a64730] text-warm-white py-3.5 px-6 font-semibold uppercase tracking-[0.2em] text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer rounded-none active:scale-95 shadow-md"
              >
                <span>Send to WhatsApp Concierge</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

