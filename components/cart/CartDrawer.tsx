"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { SafeImage } from "@/components/ui/SafeImage";
import {
  X,
  Trash2,
  Plus,
  Minus,
  Truck,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

export function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cart,
    updateQuantity,
    removeFromCart,
    cartCount,
    subtotal,
    deliveryFee,
    total,
    amountNeededForFreeDelivery,
    openCheckout,
    deliveryDetails,
    setDeliveryDetails,
    showToast,
  } = useCart();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    if (cart.length === 0) {
      showToast("Your cart is empty! Add items first.");
      return;
    }
    // If delivery details are partially missing, open the checkout modal where user can review & complete it
    openCheckout();
  };

  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / 499) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" data-lenis-prevent>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-emerald-900 text-white">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="h-5 w-5 text-emerald-300" />
              <div>
                <h3 className="font-bold text-base">Your Shopping Cart</h3>
                <p className="text-[11px] text-emerald-200">
                  {cartCount} {cartCount === 1 ? "item" : "items"} selected
                </p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-full hover:bg-emerald-800 text-emerald-200 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Free Delivery Meter */}
          <div className="bg-emerald-50 p-3 border-b border-emerald-100 text-xs">
            <div className="flex items-center justify-between font-bold text-emerald-900 mb-1.5">
              <div className="flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5 text-emerald-700" />
                <span>
                  {amountNeededForFreeDelivery === 0
                    ? "FREE Express Delivery Unlocked!"
                    : `Add ₹${amountNeededForFreeDelivery.toFixed(0)} more for FREE Delivery`}
                </span>
              </div>
              <span className="text-[11px]">{freeDeliveryProgress}%</span>
            </div>
            <div className="h-1.5 w-full bg-emerald-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-100">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-slate-500 space-y-3">
                <div className="h-16 w-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-3xl">
                  🛒
                </div>
                <h4 className="font-bold text-slate-800">Your cart is empty</h4>
                <p className="text-xs max-w-xs mx-auto">
                  Add fresh milk, crunchy vegetables, and grocery staples to get started.
                </p>
                <button
                  onClick={closeCart}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs"
                >
                  Shop Everyday Essentials
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="pt-3 flex items-center gap-3">
                  <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-slate-200">
                    <SafeImage
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      fallbackCategory={item.product.category}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {item.product.quantity} • ₹{item.product.price}
                    </p>
                    <span className="text-xs font-extrabold text-emerald-800">
                      ₹{(item.product.price * item.quantity).toFixed(0)}
                    </span>
                  </div>

                  <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 shrink-0">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="h-6 w-6 rounded hover:bg-white flex items-center justify-center text-slate-700 text-xs"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="h-6 w-6 rounded hover:bg-white flex items-center justify-center text-slate-700 text-xs"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-slate-100 bg-slate-50/80 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-slate-900">₹{subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Delivery Fee:</span>
                  <span className="font-semibold text-slate-900">
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-1.5 border-t border-slate-200">
                  <span>Total Payable:</span>
                  <span className="text-emerald-800 text-base">₹{total.toFixed(0)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold text-xs tracking-wide shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Safe payments via UPI, Cards & Cash on Delivery</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

