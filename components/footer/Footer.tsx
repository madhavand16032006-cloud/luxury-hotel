"use client";

import React, { useState, useEffect } from "react";
import { PolicyModal } from "@/components/policies/PolicyModal";
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Mail,
  Check,
  Copy,
  ArrowUpRight,
  ArrowUp,
  Sparkles,
  ShieldCheck,
  Send,
  Heart,
  Truck,
  Leaf,
} from "lucide-react";

export function Footer() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activePolicy, setActivePolicy] = useState<"privacy" | "terms" | "refund" | null>(
    null
  );
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [localTime, setLocalTime] = useState("");

  // Live Clock (IST / local time)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setLocalTime(now.toLocaleTimeString([], options));
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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setNewsletterEmail("");
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="relative bg-[#f8faf5] px-4 pt-16 pb-32 sm:px-6 md:px-10 sm:pb-16 overflow-hidden">
        {/* Floating Hover Card Main Container */}
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] border border-emerald-900/40 bg-linear-to-b from-[#0a2312] via-[#0d2e18] to-[#06170a] p-6 sm:p-12 md:p-16 text-white shadow-[0_40px_90px_-25px_rgba(10,35,18,0.7)] transition-all duration-500 hover:shadow-[0_50px_110px_-25px_rgba(10,35,18,0.85)]">
          
          {/* Ambient Glowing Green & Amber Orbs */}
          <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-emerald-500/20 blur-[130px]" />
          <div className="pointer-events-none absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-amber-400/15 blur-[140px]" />
          <div className="pointer-events-none absolute bottom-0 right-10 h-72 w-72 rounded-full bg-green-500/10 blur-[100px]" />

          {/* Top Row: Brand Info & Live Store Status Clock */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-10">
            <div className="space-y-2">
              <a href="#" className="inline-flex items-center gap-3 group">
                <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-linear-to-br from-emerald-500 to-green-600 text-white font-black text-2xl shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
                  N
                </div>
                <div>
                  <span className="block font-black text-2xl tracking-tight text-white leading-none">
                    National <span className="text-emerald-400">Shopping Mall</span>
                  </span>
                  <span className="block text-xs text-emerald-300/90 font-medium tracking-wide mt-1">
                    Your Everyday Shopping, Made Easy.
                  </span>
                </div>
              </a>
              <p className="text-xs sm:text-sm text-emerald-100/70 max-w-xl leading-relaxed pt-1">
                From groceries to dairy essentials, we&apos;re here to make your everyday shopping convenient and comfortable. Farm-fresh milk, crisp seasonal produce, and pantry staples delivered in 30 minutes.
              </p>
            </div>

            {/* Live Store Status & Clock Badge */}
            <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 backdrop-blur-md shrink-0">
              <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
              <div className="text-left text-xs">
                <div className="flex items-center gap-1.5 text-emerald-300 font-bold uppercase tracking-wider text-[10px]">
                  <span>Store Open Now</span>
                  <span>•</span>
                  <span>7 AM – 10:30 PM</span>
                </div>
                <p className="font-mono text-sm tracking-wider font-semibold text-white mt-0.5">
                  {localTime ? `${localTime}` : "Open for Orders"}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Retail & Fulfillment Hub Cards (with 1-Click Address Copy) */}
          <div className="relative z-10 mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Hub 1: Flagship Retail Store */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 sm:p-7 backdrop-blur-md transition-all duration-300 hover:border-emerald-400/40 hover:bg-white/[0.08] hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-[10px] uppercase tracking-wider text-emerald-200 font-bold flex items-center gap-1.5">
                    <Leaf className="h-3 w-3 text-emerald-400" />
                    Central Retail Supermall
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Walk-in & Drive-thru Open
                  </span>
                </div>

                <h3 className="mt-4 font-bold text-xl text-white group-hover:text-emerald-300 transition-colors">
                  City Center Main Store
                </h3>
                <p className="mt-2 flex items-start gap-2 text-xs sm:text-sm text-white/80 leading-relaxed">
                  <MapPin className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>National Shopping Mall, Main Market Road, Near Gandhi Chowk, City Center - 400001</span>
                </p>

                <div className="mt-3 flex items-center gap-2 text-xs text-white/60">
                  <Clock className="h-3.5 w-3.5 text-emerald-400/70" />
                  <span>Mon – Sun: 07:00 AM – 10:30 PM · Ample Parking & Fresh Dairy Counter</span>
                </div>
              </div>

              {/* Action Buttons: 1-Click Copy & Google Maps */}
              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() =>
                    copyAddress(
                      "National Shopping Mall, Main Market Road, Near Gandhi Chowk, City Center - 400001",
                      0
                    )
                  }
                  className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/15 px-3.5 py-2 text-xs font-semibold text-white transition-all cursor-pointer"
                >
                  {copiedIndex === 0 ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Address Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 opacity-70" />
                      <span>Copy Store Address</span>
                    </>
                  )}
                </button>

                <a
                  href="https://maps.google.com/?q=National+Shopping+Mall+City+Center"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span>Google Maps</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Hub 2: Cold-Chain & Express Delivery Hub */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 sm:p-7 backdrop-blur-md transition-all duration-300 hover:border-emerald-400/40 hover:bg-white/[0.08] hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-blue-500/20 border border-blue-500/40 px-3 py-1 text-[10px] uppercase tracking-wider text-blue-200 font-bold flex items-center gap-1.5">
                    <Truck className="h-3 w-3 text-blue-400" />
                    Express Dairy & Cold-Chain Hub
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-blue-300 font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    30-Min Dispatch Active
                  </span>
                </div>

                <h3 className="mt-4 font-bold text-xl text-white group-hover:text-blue-300 transition-colors">
                  Green Valley Fulfillment Depot
                </h3>
                <p className="mt-2 flex items-start gap-2 text-xs sm:text-sm text-white/80 leading-relaxed">
                  <MapPin className="h-4 w-4 shrink-0 text-blue-400 mt-0.5" />
                  <span>Depot 4, Sector 9, Green Valley Logistics Center - 400003</span>
                </p>

                <div className="mt-3 flex items-center gap-2 text-xs text-white/60">
                  <Clock className="h-3.5 w-3.5 text-blue-400/70" />
                  <span>24/7 Temperature Controlled Chilling & Packaging Center</span>
                </div>
              </div>

              {/* Action Buttons: 1-Click Copy & Google Maps */}
              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() =>
                    copyAddress(
                      "Depot 4, Sector 9, Green Valley Logistics Center - 400003",
                      1
                    )
                  }
                  className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/15 px-3.5 py-2 text-xs font-semibold text-white transition-all cursor-pointer"
                >
                  {copiedIndex === 1 ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Address Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 opacity-70" />
                      <span>Copy Depot Address</span>
                    </>
                  )}
                </button>

                <a
                  href="https://maps.google.com/?q=Green+Valley+Logistics+Center"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold text-blue-300 hover:text-blue-200 transition-colors"
                >
                  <span>Google Maps</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter & Weekly Deals Subscription Bar */}
          <div className="relative z-10 mt-10 rounded-3xl border border-white/15 bg-white/[0.04] p-6 sm:p-8 backdrop-blur-md">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <span className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-400 font-bold">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  Stay Updated with Daily Fresh Batches
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  Get Weekly Farm Discounts & Price Drops
                </h3>
                <p className="text-xs text-emerald-100/70 mt-1 max-w-lg">
                  Subscribe to receive daily morning fresh milk arrivals, seasonal fruit specials, and exclusive member coupons straight to your inbox.
                </p>
              </div>

              {/* Subscription Form */}
              <form onSubmit={handleNewsletterSubmit} className="flex-1 max-w-md w-full">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 px-4 py-3 rounded-2xl bg-white/10 border border-white/20 focus:border-emerald-400 text-xs sm:text-sm text-white placeholder-white/40 outline-none backdrop-blur-md"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-slate-950 font-extrabold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>

                {isSubscribed && (
                  <p className="text-xs text-emerald-300 font-semibold mt-2 flex items-center gap-1.5 animate-in fade-in">
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Subscribed successfully! Welcome to National Shopping Mall family.</span>
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Links Grid: Quick Links, Policies, Business Contact */}
          <div className="relative z-10 mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-10 text-xs">
            {/* Col 1: Quick Links (Requested in prompt: Home, Products, About, Contact, Feedback) */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-2.5 text-emerald-100/70">
                <li>
                  <a href="#hero" className="hover:text-emerald-300 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#products" className="hover:text-emerald-300 transition-colors">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-emerald-300 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-emerald-300 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#reviews" className="hover:text-emerald-300 transition-colors">
                    Feedback
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 2: Categories Shortcuts */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">
                Everyday Aisles
              </h4>
              <ul className="space-y-2.5 text-emerald-100/70">
                <li>
                  <a href="#products" className="hover:text-emerald-300 transition-colors">
                    Fresh Vegetables
                  </a>
                </li>
                <li>
                  <a href="#products" className="hover:text-emerald-300 transition-colors">
                    Fruits
                  </a>
                </li>
                <li>
                  <a href="#products" className="hover:text-emerald-300 transition-colors">
                    Milk & Dairy
                  </a>
                </li>
                <li>
                  <a href="#products" className="hover:text-emerald-300 transition-colors">
                    Rice & Groceries
                  </a>
                </li>
                <li>
                  <a href="#products" className="hover:text-emerald-300 transition-colors">
                    Snacks & Household
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Trust & Legal Policies (Requested: Privacy Policy, Terms & Conditions, Refund & Cancellation) */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">
                Trust & Policies
              </h4>
              <ul className="space-y-2.5 text-emerald-100/70">
                <li>
                  <button
                    onClick={() => setActivePolicy("privacy")}
                    className="hover:text-emerald-300 transition-colors text-left cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePolicy("terms")}
                    className="hover:text-emerald-300 transition-colors text-left cursor-pointer"
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePolicy("refund")}
                    className="hover:text-emerald-300 transition-colors text-left cursor-pointer"
                  >
                    Refund & Cancellation Policy
                  </button>
                </li>
                <li>
                  <a href="#faq" className="hover:text-emerald-300 transition-colors">
                    Frequently Asked Questions
                  </a>
                </li>
                <li>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800">
                    <ShieldCheck className="h-3 w-3" />
                    100% Quality Guaranteed
                  </span>
                </li>
              </ul>
            </div>

            {/* Col 4: Business Contact Info */}
            <div className="space-y-3 col-span-2 md:col-span-1">
              <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">
                Customer Support
              </h4>
              <div className="space-y-2.5 text-emerald-100/70">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                  <a href="tel:+919876543210" className="hover:text-white font-semibold transition-colors">
                    +91 98765 43210
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white font-semibold transition-colors"
                  >
                    WhatsApp Chat
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                  <a
                    href="mailto:support@nationalshoppingmall.com"
                    className="hover:text-white transition-colors truncate"
                  >
                    support@nationalshoppingmall.com
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>7:00 AM – 10:30 PM Daily</span>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="pt-2 flex items-center gap-2.5">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="h-8 w-8 rounded-xl bg-white/10 hover:bg-emerald-500 hover:text-slate-950 text-white flex items-center justify-center transition-all hover:scale-110"
                >
                  <span className="text-xs font-bold">f</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="h-8 w-8 rounded-xl bg-white/10 hover:bg-emerald-500 hover:text-slate-950 text-white flex items-center justify-center transition-all hover:scale-110"
                >
                  <span className="text-xs font-bold">ig</span>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="h-8 w-8 rounded-xl bg-white/10 hover:bg-emerald-500 hover:text-slate-950 text-white flex items-center justify-center transition-all hover:scale-110"
                >
                  <span className="text-xs font-bold">𝕏</span>
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="h-8 w-8 rounded-xl bg-white/10 hover:bg-[#25D366] hover:text-white text-white flex items-center justify-center transition-all hover:scale-110"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Giant Magnetic Brand Typography Banner with Hover Lift */}
          <div className="relative z-10 mt-12 pt-8 border-t border-white/10 text-center overflow-hidden">
            <div className="group cursor-default select-none">
              <span className="block font-black text-[clamp(1.75rem,5.5vw,5.5rem)] tracking-tight text-white/15 transition-all duration-700 ease-out group-hover:text-emerald-400/40 group-hover:tracking-wider">
                NATIONAL SHOPPING MALL
              </span>
            </div>
          </div>

          {/* Bottom Row: Copyright, Payment Badges & Back to Top */}
          <div className="relative z-10 mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-100/60">
            <div>
              <p>
                © {new Date().getFullYear()} National Shopping Mall. All rights reserved.
              </p>
              <p className="text-[11px] text-emerald-200/50 mt-0.5">
                Brand Tagline: Your Everyday Shopping, Made Easy.
              </p>
            </div>

            {/* Payment Method Badges */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 text-[10px] font-bold text-white/90">
              <span className="px-2 py-1 bg-white/10 rounded-md border border-white/15">
                UPI
              </span>
              <span className="px-2 py-1 bg-white/10 rounded-md border border-white/15">
                Google Pay
              </span>
              <span className="px-2 py-1 bg-white/10 rounded-md border border-white/15">
                PhonePe
              </span>
              <span className="px-2 py-1 bg-white/10 rounded-md border border-white/15">
                Visa / RuPay
              </span>
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded-md border border-emerald-500/30">
                Cash on Delivery
              </span>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition-all cursor-pointer hover:scale-105"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </footer>

      {/* Policy Modals for Privacy, Terms, and Refund */}
      <PolicyModal type={activePolicy} onClose={() => setActivePolicy(null)} />
    </>
  );
}
