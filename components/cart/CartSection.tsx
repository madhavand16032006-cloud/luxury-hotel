"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { SafeImage } from "@/components/ui/SafeImage";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Truck,
  ArrowRight,
  ShieldCheck,
  User,
  Phone,
  MapPin,
  FileText,
  Sparkles,
} from "lucide-react";

export function CartSection() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    subtotal,
    deliveryFee,
    total,
    amountNeededForFreeDelivery,
    deliveryDetails,
    setDeliveryDetails,
    openCheckout,
    showToast,
  } = useCart();

  const handleProceedToCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast("Your shopping cart is empty! Add items first.");
      return;
    }
    if (!deliveryDetails.customerName || !deliveryDetails.mobileNumber || !deliveryDetails.deliveryAddress) {
      showToast("Please fill in your name, mobile number, and delivery address.");
      return;
    }
    openCheckout();
  };

  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / 499) * 100));

  return (
    <section id="cart" className="py-20 sm:py-28 bg-white border-t border-emerald-100/60 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3 border border-emerald-200/60">
            <ShoppingCart className="h-3.5 w-3.5 text-emerald-600" />
            <span>Shopping Cart & Order Review</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Your Cart, <span className="text-emerald-700">Your Choices</span>
          </h2>

          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Found what you need? Add your favourite products to your cart, review your selections, and place your order in just a few simple steps.
          </p>
        </div>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="max-w-lg mx-auto text-center py-16 px-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-emerald-100/70 text-emerald-700 flex items-center justify-center text-3xl">
              🛒
            </div>
            <h3 className="text-xl font-bold text-slate-800">Your cart is currently empty</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Browse our fresh vegetables, pure farm milk, and daily essentials to start adding items.
            </p>
            <a
              href="#products"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-700 text-white font-bold text-xs tracking-wide shadow-md hover:bg-emerald-800 transition-colors"
            >
              <span>Explore Products</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-7 space-y-4">
              {/* Free Delivery Meter */}
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-950 mb-2">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-emerald-700" />
                    <span>
                      {amountNeededForFreeDelivery === 0
                        ? "🎉 Congratulations! You have unlocked FREE Express Delivery!"
                        : `Add ₹${amountNeededForFreeDelivery.toFixed(0)} more for FREE Delivery`}
                    </span>
                  </div>
                  <span>{freeDeliveryProgress}%</span>
                </div>
                <div className="h-2 w-full bg-emerald-200/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                    style={{ width: `${freeDeliveryProgress}%` }}
                  />
                </div>
              </div>

              {/* Items Card */}
              <div className="bg-[#f8faf5] rounded-3xl border border-slate-200/80 p-5 divide-y divide-slate-200/70 shadow-xs">
                <div className="flex items-center justify-between pb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {cartCount} Items Selected
                  </span>
                  <button
                    onClick={clearCart}
                    className="text-xs font-bold text-rose-600 hover:text-rose-800 transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {cart.map((item) => (
                  <div key={item.product.id} className="py-4 flex items-center gap-3 sm:gap-4">
                    {/* Item Image */}
                    <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden bg-white shrink-0 border border-slate-200">
                      <SafeImage
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        fallbackCategory={item.product.category}
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-emerald-700 uppercase">
                        {item.product.category}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        {item.product.quantity} • ₹{item.product.price} each
                      </p>
                      <div className="text-xs font-black text-slate-900 sm:hidden mt-1">
                        Total: ₹{(item.product.price * item.quantity).toFixed(0)}
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 shrink-0">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="h-7 w-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-700 text-xs"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-extrabold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="h-7 w-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-700 text-xs"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Line Total (Desktop) */}
                    <div className="hidden sm:block text-right shrink-0 min-w-16">
                      <div className="font-black text-sm text-slate-900">
                        ₹{(item.product.price * item.quantity).toFixed(0)}
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 transition-colors shrink-0"
                      title="Remove product"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Delivery Details Form & Order Summary */}
            <div className="lg:col-span-5">
              <form
                onSubmit={handleProceedToCheckout}
                className="bg-[#f8faf5] rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-lg space-y-5"
              >
                <div>
                  <h3 className="text-lg font-black text-slate-900">Delivery Information</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Enter your delivery location for fast 30-min doorstep arrival.
                  </p>
                </div>

                <div className="space-y-3.5">
                  {/* Customer Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Customer Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={deliveryDetails.customerName}
                        onChange={(e) =>
                          setDeliveryDetails((prev) => ({ ...prev, customerName: e.target.value }))
                        }
                        placeholder="e.g. Anjali Sharma"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-emerald-600 text-xs sm:text-sm text-slate-800 outline-none"
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={deliveryDetails.mobileNumber}
                        onChange={(e) =>
                          setDeliveryDetails((prev) => ({ ...prev, mobileNumber: e.target.value }))
                        }
                        placeholder="e.g. 9876543210 (for SMS & tracking updates)"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-emerald-600 text-xs sm:text-sm text-slate-800 outline-none"
                      />
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Delivery Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        required
                        rows={2}
                        value={deliveryDetails.deliveryAddress}
                        onChange={(e) =>
                          setDeliveryDetails((prev) => ({ ...prev, deliveryAddress: e.target.value }))
                        }
                        placeholder="Flat / House No., Apartment, Street, Landmark, Pincode"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-emerald-600 text-xs sm:text-sm text-slate-800 outline-none resize-none"
                      />
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    </div>
                  </div>

                  {/* Delivery Instructions */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Delivery Instructions (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={deliveryDetails.deliveryInstructions}
                        onChange={(e) =>
                          setDeliveryDetails((prev) => ({
                            ...prev,
                            deliveryInstructions: e.target.value,
                          }))
                        }
                        placeholder="e.g. Ring doorbell once / Leave with security guard"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-emerald-600 text-xs sm:text-sm text-slate-800 outline-none"
                      />
                      <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="pt-4 border-t border-slate-200/80 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Items Subtotal:</span>
                    <span className="font-semibold text-slate-800">₹{subtotal.toFixed(0)}</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span className="flex items-center gap-1">
                      Delivery Fee:
                      {deliveryFee === 0 && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                          FREE
                        </span>
                      )}
                    </span>
                    <span className="font-semibold text-slate-800">
                      {deliveryFee === 0 ? "₹0" : `₹${deliveryFee}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Packaging & Sanitization:</span>
                    <span className="font-semibold text-emerald-700">FREE</span>
                  </div>

                  <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                    <span>Total Amount:</span>
                    <span className="text-emerald-800 text-lg">₹{total.toFixed(0)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-extrabold text-sm shadow-xl shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>100% Safe & Secure Checkout • UPI, Cards & Cash on Delivery</span>
                </p>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

