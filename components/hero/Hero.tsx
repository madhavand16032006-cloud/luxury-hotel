"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import { SafeImage } from "@/components/ui/SafeImage";
import {
  Search,
  ShoppingCart,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Clock,
  Plus,
} from "lucide-react";

export function Hero() {
  const { setSearchQuery, addToCart, openCart } = useCart();
  const [heroSearchInput, setHeroSearchInput] = useState("");

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearchInput.trim()) {
      setSearchQuery(heroSearchInput.trim());
      const element = document.getElementById("products");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const quickAddMilk = () => {
    const milk = PRODUCTS.find((p) => p.id === "dry-01");
    if (milk) addToCart(milk, 1);
  };

  const quickAddSpinach = () => {
    const spinach = PRODUCTS.find((p) => p.id === "veg-02");
    if (spinach) addToCart(spinach, 1);
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-linear-to-b from-emerald-50/60 via-[#f8faf5] to-[#f8faf5] pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Decorative Background Glows */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-amber-100/60 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs font-semibold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-ping" />
              <span>National Shopping Mall · Your Everyday Shopping, Made Easy.</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Fresh Essentials. <br className="hidden sm:inline" />
              Everyday Convenience. <br />
              <span className="text-emerald-700 bg-linear-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
                All in One Place.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              From fresh groceries and dairy essentials to your daily household needs, find everything you need at <strong className="font-semibold text-slate-800">National Shopping Mall</strong>. Shop your favourites from home and enjoy a simple, convenient shopping experience.
            </p>

            {/* Prominent Hero Search Bar */}
            <div className="max-w-xl mx-auto lg:mx-0">
              <form onSubmit={handleHeroSearch} className="relative flex items-center">
                <input
                  type="text"
                  value={heroSearchInput}
                  onChange={(e) => setHeroSearchInput(e.target.value)}
                  placeholder="What are you shopping for today? (e.g. Milk, Tomatoes, Rice...)"
                  className="w-full pl-12 pr-32 py-4 rounded-2xl bg-white border-2 border-emerald-100 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-sm text-slate-800 placeholder-slate-400 outline-none shadow-lg shadow-emerald-900/5 transition-all"
                />
                <Search className="absolute left-4 h-5 w-5 text-emerald-600" />
                <button
                  type="submit"
                  className="absolute right-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs tracking-wide shadow-md shadow-emerald-900/15 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Search</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </form>

              {/* Popular tags below search */}
              <div className="flex flex-wrap items-center gap-1.5 mt-3 text-xs text-slate-500 justify-center lg:justify-start">
                <span className="font-medium text-slate-400">Popular:</span>
                {["Fresh Cow Milk", "Paneer", "Tomatoes", "Basmati Rice", "Atta"].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSearchQuery(tag);
                      const el = document.getElementById("products");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-emerald-700 hover:underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    {tag},
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#products"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-bold text-sm tracking-wide shadow-xl shadow-emerald-700/25 transition-all group"
              >
                <span>Shop Now</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#categories"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-800 hover:text-emerald-800 font-semibold text-sm shadow-xs transition-all"
              >
                <span>Explore Products</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200/60 max-w-2xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-left">
                <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Truck className="h-4 w-4" />
                </div>
                <div className="text-[11px] leading-tight">
                  <span className="block font-bold text-slate-800">30-Min Fast</span>
                  <span className="text-slate-500">Express Delivery</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div className="text-[11px] leading-tight">
                  <span className="block font-bold text-slate-800">100% Quality</span>
                  <span className="text-slate-500">Farm Inspected</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="text-[11px] leading-tight">
                  <span className="block font-bold text-slate-800">Daily Fresh</span>
                  <span className="text-slate-500">Morning Batches</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <div className="text-[11px] leading-tight">
                  <span className="block font-bold text-slate-800">7 AM – 10:30 PM</span>
                  <span className="text-slate-500">Open 7 Days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Grocery Imagery & Floating Animated Product Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Grocery Visual Showcase */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 sm:aspect-square bg-emerald-950/5">
                <SafeImage
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80"
                  alt="Fresh groceries, farm milk, fruits, and organic vegetables at National Shopping Mall"
                  fill
                  priority
                  className="scale-105 hover:scale-100 transition-transform duration-700"
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                {/* Bottom Card Inside Image */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Farm-Direct Today</span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">
                      Over 2,500+ Daily Essentials in Stock
                    </p>
                  </div>
                  <a
                    href="#products"
                    className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold shadow-xs whitespace-nowrap transition-colors"
                  >
                    View All
                  </a>
                </div>
              </div>

              {/* Floating Product Card 1: Fresh Cow Milk (Top Left) */}
              <div className="absolute -top-6 -left-6 sm:-left-8 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-emerald-100 max-w-[210px] z-20 animate-bounce duration-1000" style={{ animationDuration: "5s" }}>
                <div className="flex items-center gap-2.5">
                  <div className="h-12 w-12 rounded-xl overflow-hidden bg-blue-50 shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=120&auto=format&fit=crop&q=80"
                      alt="Farm Pure Cow Milk"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                      Milk & Dairy
                    </div>
                    <div className="text-xs font-bold text-slate-800 truncate">
                      Pure Cow Milk 1L
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-extrabold text-xs text-emerald-800">₹68</span>
                      <button
                        onClick={quickAddMilk}
                        className="h-5 w-5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center text-xs shadow-xs transition-transform active:scale-90 cursor-pointer"
                        title="Add to cart"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Product Card 2: Crisp Spinach (Bottom Right) */}
              <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-emerald-100 max-w-[220px] z-20 animate-bounce duration-1000" style={{ animationDuration: "6s", animationDelay: "1s" }}>
                <div className="flex items-center gap-2.5">
                  <div className="h-12 w-12 rounded-xl overflow-hidden bg-emerald-50 shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=120&auto=format&fit=crop&q=80"
                      alt="Baby Spinach"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Organics
                    </div>
                    <div className="text-xs font-bold text-slate-800 truncate">
                      Baby Spinach 250g
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-baseline gap-1">
                        <span className="font-extrabold text-xs text-emerald-800">₹24</span>
                        <span className="text-[10px] text-slate-400 line-through">₹32</span>
                      </div>
                      <button
                        onClick={quickAddSpinach}
                        className="h-5 w-5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center text-xs shadow-xs transition-transform active:scale-90 cursor-pointer"
                        title="Add to cart"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cart Animation Trigger */}
              <button
                onClick={openCart}
                className="absolute top-1/2 -right-4 sm:-right-6 -translate-y-1/2 p-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 shadow-xl border-2 border-white flex items-center gap-2 text-xs font-bold transition-all hover:scale-105 cursor-pointer z-30"
                title="Open Shopping Cart"
              >
                <div className="relative">
                  <ShoppingCart className="h-4 w-4 animate-bounce" />
                </div>
                <span className="hidden sm:inline">Quick Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
