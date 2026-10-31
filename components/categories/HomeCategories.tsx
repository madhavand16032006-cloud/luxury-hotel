"use client";

import React from "react";
import { CATEGORIES, CategoryName } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { SafeImage } from "@/components/ui/SafeImage";
import { ArrowRight, Sparkles } from "lucide-react";

export function HomeCategories() {
  const { setSelectedCategory } = useCart();

  const handleSelectCategory = (catName: CategoryName) => {
    setSelectedCategory(catName);
    const element = document.getElementById("products");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="categories" className="py-16 sm:py-20 bg-white border-y border-emerald-100/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3 border border-emerald-200/60">
            <Sparkles className="h-3 w-3 text-emerald-600" />
            <span>Curated Everyday Aisles</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Welcome to <span className="text-emerald-700">National Shopping Mall</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Your daily shopping just got easier! Discover a wide range of groceries, dairy products, snacks, beverages, and household essentials — all in one convenient place.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleSelectCategory(cat.name)}
              className="group relative rounded-3xl bg-linear-to-b from-[#f8faf5] to-white border border-slate-200/80 hover:border-emerald-500/50 p-5 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col overflow-hidden"
            >
              {/* Category Image Box */}
              <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-slate-100 mb-4">
                <SafeImage
                  src={cat.image}
                  alt={cat.name}
                  fill
                  fallbackCategory={cat.name}
                  className="group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                {/* Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold text-emerald-800 shadow-xs border border-white/60">
                  {cat.badge}
                </div>

                {/* Items Available Count */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/70 text-white text-[11px] font-semibold backdrop-blur-xs">
                  {cat.itemCount}+ items
                </div>
              </div>

              {/* Category Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center justify-between">
                    <span>{cat.name}</span>
                    <ArrowRight className="h-4 w-4 text-emerald-600 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700 group-hover:text-emerald-800">
                  <span>Explore Products</span>
                  <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

