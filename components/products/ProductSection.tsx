"use client";

import React, { useState, useMemo } from "react";
import { PRODUCTS, CATEGORIES, Product, CategoryName } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { SafeImage } from "@/components/ui/SafeImage";
import {
  Search,
  SlidersHorizontal,
  Star,
  CheckCircle2,
  ShoppingCart,
  Zap,
  Eye,
  Plus,
  Minus,
  Sparkles,
  ArrowUpDown,
} from "lucide-react";

export function ProductSection() {
  const {
    cart,
    addToCart,
    buyNow,
    updateQuantity,
    openQuickView,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useCart();

  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">(
    "featured"
  );

  // Filter products based on category and search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, searchQuery, sortBy]);

  // Helper to check if item is in cart
  const getItemQuantity = (productId: string) => {
    const found = cart.find((i) => i.product.id === productId);
    return found ? found.quantity : 0;
  };

  return (
    <section id="products" className="py-16 sm:py-24 bg-[#f8faf5] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            <span>Farm Fresh & Daily Supplies</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Explore Our <span className="text-emerald-700">Products</span>
          </h2>

          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Everything your home needs, all in one place. Browse our collection of everyday essentials and find your favourites at great prices.
          </p>
        </div>

        {/* Filter Bar & Controls */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-xs border border-slate-200/80 mb-8 sm:mb-10 space-y-4">
          {/* Top row: Search input & Sort dropdown */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products in this aisle..."
                className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none transition-all"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <ArrowUpDown className="h-3.5 w-3.5" />
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-emerald-600 cursor-pointer"
              >
                <option value="featured">Featured / Best Deals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Bottom row: Category filter tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === "All"
                  ? "bg-emerald-700 text-white shadow-md shadow-emerald-700/20"
                  : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/80"
              }`}
            >
              All Products ({PRODUCTS.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.name
                    ? "bg-emerald-700 text-white shadow-md shadow-emerald-700/20"
                    : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/80"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Summary */}
        {(searchQuery || selectedCategory !== "All") && (
          <div className="flex items-center justify-between mb-6 px-2 text-xs text-slate-500">
            <span>
              Showing <strong className="text-slate-800">{filteredProducts.length}</strong> items
              {selectedCategory !== "All" && ` in "${selectedCategory}"`}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-emerald-700 hover:underline font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 p-8">
            <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl">
              🥬
            </div>
            <h3 className="text-lg font-bold text-slate-800">No products found</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn&apos;t find any items matching &quot;{searchQuery}&quot;. Try adjusting your search term or exploring another category.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 px-5 py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-bold shadow-xs hover:bg-emerald-800 transition-colors"
            >
              View All Products
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const quantityInCart = getItemQuantity(product.id);
            const savings = Math.max(0, product.originalPrice - product.price);

            return (
              <div
                key={product.id}
                className="group relative bg-white rounded-3xl border border-slate-200/80 hover:border-emerald-400 p-4 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Badges & Quick View Button */}
                <div>
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 mb-3 border border-slate-100">
                    <SafeImage
                      src={product.image}
                      alt={product.name}
                      fill
                      fallbackCategory={product.category}
                      className="group-hover:scale-108 transition-transform duration-500"
                    />

                    {/* Offer / Badge Tag */}
                    {product.badge && (
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-emerald-700 text-white text-[10px] font-extrabold tracking-wide shadow-xs">
                        {product.badge}
                      </span>
                    )}

                    {/* Quick View Hover Action */}
                    <button
                      onClick={() => openQuickView(product)}
                      className="absolute top-2.5 right-2.5 h-8 w-8 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-emerald-700 hover:bg-white flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                      title="Quick preview"
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    {/* Availability Tag */}
                    <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[10px] font-semibold text-emerald-800 border border-emerald-100">
                      {product.availability}
                    </div>
                  </div>

                  {/* Category & Rating */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span className="text-emerald-700 font-semibold uppercase tracking-wider text-[10px]">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1 font-bold text-slate-700">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Title & Quantity */}
                  <h3
                    onClick={() => openQuickView(product)}
                    className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 cursor-pointer"
                    title={product.name}
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    {product.quantity}
                  </p>
                </div>

                {/* Price & Action Buttons */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-baseline justify-between mb-3">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-slate-900">
                        ₹{product.price}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-slate-400 line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    {savings > 0 && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        Save ₹{savings}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart / Quantity Selector & Buy Now buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    {quantityInCart === 0 ? (
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="w-full py-2 px-2 rounded-xl border border-emerald-600 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        <span>Add</span>
                      </button>
                    ) : (
                      <div className="flex items-center justify-between rounded-xl border border-emerald-600 bg-emerald-700 text-white px-2 py-1">
                        <button
                          onClick={() => updateQuantity(product.id, quantityInCart - 1)}
                          className="h-6 w-6 flex items-center justify-center hover:bg-emerald-800 rounded text-xs font-bold"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-extrabold">{quantityInCart}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantityInCart + 1)}
                          className="h-6 w-6 flex items-center justify-center hover:bg-emerald-800 rounded text-xs font-bold"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    )}

                    <button
                      onClick={() => buyNow(product)}
                      className="w-full py-2 px-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer"
                    >
                      <Zap className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

