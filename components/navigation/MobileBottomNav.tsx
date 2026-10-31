"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { Home, Grid, Search, ShoppingBag, PhoneCall } from "lucide-react";

export function MobileBottomNav() {
  const { cartCount, openCart } = useCart();

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-2 sm:hidden shadow-2xl">
      <div className="flex items-center justify-around text-[10px] font-bold text-slate-600">
        <button
          onClick={() => handleScrollTo("hero")}
          className="flex flex-col items-center gap-1 p-1 hover:text-emerald-700 transition-colors"
        >
          <Home className="h-5 w-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => handleScrollTo("categories")}
          className="flex flex-col items-center gap-1 p-1 hover:text-emerald-700 transition-colors"
        >
          <Grid className="h-5 w-5" />
          <span>Categories</span>
        </button>

        <button
          onClick={() => handleScrollTo("products")}
          className="flex flex-col items-center gap-1 p-1 hover:text-emerald-700 transition-colors"
        >
          <Search className="h-5 w-5" />
          <span>Search</span>
        </button>

        <button
          onClick={openCart}
          className="flex flex-col items-center gap-1 p-1 text-emerald-800 relative"
        >
          <div className="relative">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 h-4 min-w-4 px-1 rounded-full bg-amber-400 text-slate-900 font-extrabold text-[9px] flex items-center justify-center border border-white">
                {cartCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>

        <button
          onClick={() => handleScrollTo("contact")}
          className="flex flex-col items-center gap-1 p-1 hover:text-emerald-700 transition-colors"
        >
          <PhoneCall className="h-5 w-5" />
          <span>Support</span>
        </button>
      </div>
    </nav>
  );
}

