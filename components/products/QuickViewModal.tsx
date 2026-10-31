"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { SafeImage } from "@/components/ui/SafeImage";
import {
  X,
  Star,
  CheckCircle2,
  Truck,
  ShieldCheck,
  Plus,
  Minus,
  ShoppingCart,
  Zap,
} from "lucide-react";

export function QuickViewModal() {
  const { quickViewProduct, closeQuickView, addToCart, buyNow } = useCart();
  const [modalQuantity, setModalQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const savings = Math.max(0, product.originalPrice - product.price);

  const handleAddToCart = () => {
    addToCart(product, modalQuantity);
    closeQuickView();
  };

  const handleBuyNow = () => {
    addToCart(product, modalQuantity);
    closeQuickView();
    buyNow(product);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={closeQuickView}
    >
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Product Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
            <SafeImage
              src={product.image}
              alt={product.name}
              fill
              fallbackCategory={product.category}
            />
            {product.badge && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-xs shadow-xs">
                {product.badge}
              </span>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                {product.category}
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-1 leading-snug">
                {product.name}
              </h3>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                Unit Pack: <span className="text-slate-800">{product.quantity}</span>
              </p>
            </div>

            {/* Rating and Availability */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200/60">
                <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                <span>{product.rating}</span>
                <span className="text-amber-700/60 font-normal">({product.reviewsCount})</span>
              </div>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/60">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>{product.availability}</span>
              </span>
            </div>

            {/* Price Box */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100/80">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-emerald-900">
                  ₹{product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-base text-slate-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
                {savings > 0 && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    Save ₹{savings}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Inclusive of all taxes • Free delivery above ₹499
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <ul className="space-y-1.5 text-xs text-slate-700">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-bold text-slate-700">Quantity:</span>
              <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
                <button
                  type="button"
                  onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                  className="h-8 w-8 rounded-lg bg-white hover:bg-slate-100 flex items-center justify-center text-slate-700 shadow-xs transition-colors"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 text-center font-bold text-sm text-slate-800">
                  {modalQuantity}
                </span>
                <button
                  type="button"
                  onClick={() => setModalQuantity(modalQuantity + 1)}
                  className="h-8 w-8 rounded-lg bg-white hover:bg-slate-100 flex items-center justify-center text-slate-700 shadow-xs transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Actions: Add to Cart and Buy Now */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-emerald-700 hover:bg-emerald-50 text-emerald-800 font-bold text-xs sm:text-sm transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-700/20 transition-colors"
              >
                <Zap className="h-4 w-4 fill-amber-300 text-amber-300" />
                <span>Buy Now</span>
              </button>
            </div>

            {/* Delivery Assurance */}
            <div className="flex items-center gap-4 pt-2 text-[11px] text-slate-500 border-t border-slate-100">
              <div className="flex items-center gap-1">
                <Truck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Fast 30-min delivery</span>
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Hygienic fresh packing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

