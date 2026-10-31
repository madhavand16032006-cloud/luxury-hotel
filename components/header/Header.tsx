"use client";

import React, { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { CATEGORIES, CategoryName } from "@/data/products";
import {
  Search,
  ShoppingCart,
  Phone,
  User,
  Heart,
  ChevronDown,
  Sparkles,
  MapPin,
  Clock,
  Menu,
  X,
  Check,
} from "lucide-react";

const POPULAR_SEARCHES = [
  "Milk",
  "Tomatoes",
  "Paneer",
  "Basmati Rice",
  "Spinach",
  "Desi Ghee",
  "Apples",
];

export function Header() {
  const {
    cartCount,
    subtotal,
    openCart,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useCart();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [selectedPincode, setSelectedPincode] = useState("400001 - City Center");
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchFocused(false);
    const element = document.getElementById("products");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectSearchTag = (tag: string) => {
    setSearchQuery(tag);
    setIsSearchFocused(false);
    const element = document.getElementById("products");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCategoryClick = (categoryName: CategoryName | "All") => {
    setSelectedCategory(categoryName);
    setIsMobileMenuOpen(false);
    const element = document.getElementById("products");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* 1. Top Announcement Bar */}
      <div className="bg-linear-to-r from-emerald-800 via-green-800 to-emerald-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
              FRESH MORNING
            </span>
            <span className="text-emerald-100 font-medium">
              Free Express Delivery on orders over ₹499 • 30-Min Delivery Guaranteed
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-emerald-100 text-[11px]">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="h-3 w-3 text-emerald-400" />
              <span>Call Us: +91 98765 43210</span>
            </a>
            <div className="flex items-center gap-1.5 text-emerald-200">
              <Clock className="h-3 w-3 text-emerald-400" />
              <span>7:00 AM – 10:30 PM Daily</span>
            </div>
            <a
              href="#contact"
              className="hover:text-white transition-colors underline decoration-emerald-400 underline-offset-2"
            >
              Store Locator
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 h-20">
          {/* Logo & Brand Identity */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <div className="relative flex items-center justify-center h-12 w-12 rounded-2xl bg-linear-to-br from-emerald-600 to-green-700 text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <span className="text-2xl font-black tracking-tighter">N</span>
              <div className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-amber-400 border-2 border-white animate-pulse" />
            </div>
            <div>
              <span className="block font-black text-xl sm:text-2xl tracking-tight text-emerald-950 font-sans leading-none">
                National <span className="text-emerald-600 font-extrabold">Shopping Mall</span>
              </span>
              <span className="block text-[11px] sm:text-xs text-emerald-700/80 font-medium tracking-wide mt-1">
                Your Everyday Shopping, Made Easy.
              </span>
            </div>
          </a>

          {/* Location Delivery Selector (Desktop) */}
          <div className="relative hidden xl:block">
            <button
              onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-emerald-100 hover:border-emerald-300 bg-emerald-50/40 text-left transition-colors"
            >
              <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
              <div className="text-xs">
                <span className="block text-[10px] text-slate-500 font-medium">Deliver to</span>
                <span className="block font-semibold text-emerald-950 truncate max-w-32">
                  {selectedPincode}
                </span>
              </div>
              <ChevronDown className="h-3 w-3 text-slate-400 ml-1" />
            </button>

            {isLocationDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50">
                <p className="text-[11px] font-semibold text-slate-400 px-3 py-1.5 uppercase">
                  Select Delivery Hub
                </p>
                {["400001 - City Center", "400002 - Model Town", "400003 - Green Valley"].map(
                  (hub) => (
                    <button
                      key={hub}
                      onClick={() => {
                        setSelectedPincode(hub);
                        setIsLocationDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-emerald-50 text-slate-700 flex items-center justify-between"
                    >
                      <span>{hub}</span>
                      {selectedPincode === hub && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* Search Bar with Instant Autocomplete */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-xl mx-2 sm:mx-6">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search fresh vegetables, farm milk, basmati rice, snacks..."
                className="w-full pl-11 pr-24 py-2.5 sm:py-3 rounded-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none transition-all shadow-inner"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600" />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-12 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-1"
                >
                  Clear
                </button>
              ) : null}
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 sm:px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-xs transition-colors"
              >
                Search
              </button>
            </form>

            {/* Popular Searches Dropdown Suggestion Box */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Trending Daily Staples
                  </span>
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleSelectSearchTag(item)}
                      className="px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-medium transition-colors flex items-center gap-1.5"
                    >
                      <Search className="h-3 w-3 text-emerald-600" />
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Account & Cart Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Account Profile Trigger */}
            <button
              onClick={() => setIsAccountModalOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
              title="My Account"
            >
              <div className="h-9 w-9 rounded-full bg-emerald-100/70 text-emerald-700 flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <div className="text-left text-xs">
                <span className="block text-[10px] text-slate-400 font-medium">Hello, Guest</span>
                <span className="block font-semibold text-slate-800">My Account</span>
              </div>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-3 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-medium shadow-md shadow-emerald-700/20 transition-all group"
            >
              <div className="relative">
                <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 h-5 min-w-5 px-1 rounded-full bg-amber-400 text-slate-900 font-bold text-[11px] flex items-center justify-center border-2 border-white shadow-xs animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:block text-left text-xs leading-tight">
                <span className="block text-[10px] text-emerald-200 uppercase font-semibold">My Cart</span>
                <span className="block font-bold text-sm">₹{subtotal.toFixed(0)}</span>
              </div>
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Category Strip / Quick Navigation Links */}
      <nav className="border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 overflow-x-auto py-2.5 scrollbar-none text-xs sm:text-sm font-medium">
            <button
              onClick={() => handleCategoryClick("All")}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === "All"
                  ? "bg-emerald-700 text-white font-semibold shadow-xs"
                  : "text-slate-700 hover:text-emerald-700 hover:bg-emerald-50"
              }`}
            >
              All Categories
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.name)}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  selectedCategory === cat.name
                    ? "bg-emerald-700 text-white font-semibold shadow-xs"
                    : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50"
                }`}
              >
                <span>{cat.name}</span>
              </button>
            ))}
            <a
              href="#about"
              className="ml-auto hidden md:inline-flex items-center gap-1.5 text-xs text-amber-800 font-semibold bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60 hover:bg-amber-100 transition-colors whitespace-nowrap"
            >
              <Sparkles className="h-3 w-3 text-amber-600" />
              100% Quality Guarantee
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Explore Categories
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleCategoryClick("All")}
              className={`p-2.5 text-left rounded-xl text-xs font-medium border ${
                selectedCategory === "All"
                  ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                  : "border-slate-200 text-slate-700"
              }`}
            >
              All Products
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.name)}
                className={`p-2.5 text-left rounded-xl text-xs font-medium border ${
                  selectedCategory === cat.name
                    ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                    : "border-slate-200 text-slate-700"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2 text-xs">
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="py-1 text-slate-700">
              About National Shopping Mall
            </a>
            <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)} className="py-1 text-slate-700">
              Customer Reviews
            </a>
            <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="py-1 text-slate-700">
              FAQs & Help
            </a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="py-1 text-slate-700">
              Contact & Store Location
            </a>
          </div>
        </div>
      )}

      {/* Account Info Modal */}
      {isAccountModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  NSM
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">National Shopping Mall</h3>
                  <p className="text-xs text-slate-500">Customer Account</p>
                </div>
              </div>
              <button
                onClick={() => setIsAccountModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="py-4 space-y-3 text-xs text-slate-600">
              <p className="bg-emerald-50 text-emerald-800 p-3 rounded-xl leading-relaxed">
                Welcome to National Shopping Mall! Quick 1-click checkout is enabled. No password required — simply enter your phone number during checkout to receive order updates via SMS & WhatsApp.
              </p>
              <div className="space-y-1.5">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400">Current Cart Items:</span>
                  <span className="font-semibold text-slate-800">{cartCount} items</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400">Delivery Status:</span>
                  <span className="font-semibold text-emerald-700">Ready to Dispatch</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Customer Support:</span>
                  <span className="font-semibold text-slate-800">+91 98765 43210</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsAccountModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-700 text-white font-medium text-xs hover:bg-emerald-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

