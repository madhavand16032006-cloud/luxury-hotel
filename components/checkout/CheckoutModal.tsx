"use client";

import React, { useState } from "react";
import { useCart, ConfirmedOrder } from "@/context/CartContext";
import {
  X,
  CreditCard,
  QrCode,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  Truck,
  ArrowRight,
  User,
  Phone,
  MapPin,
  Lock,
  Download,
  MessageCircle,
  Sparkles,
} from "lucide-react";

export function CheckoutModal() {
  const {
    isCheckoutOpen,
    closeCheckout,
    cart,
    subtotal,
    deliveryFee,
    total,
    deliveryDetails,
    setDeliveryDetails,
    clearCart,
    confirmedOrder,
    setConfirmedOrder,
    showToast,
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<
    "upi" | "gpay" | "phonepe" | "card" | "cod"
  >("upi");

  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 8920");
  const [cardExpiry, setCardExpiry] = useState("08/29");
  const [cardCvv, setCardCvv] = useState("•••");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!deliveryDetails.customerName || !deliveryDetails.mobileNumber || !deliveryDetails.deliveryAddress) {
      showToast("Please ensure your Name, Mobile, and Delivery Address are filled.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const newOrder: ConfirmedOrder = {
        orderId: `NSM-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [...cart],
        subtotal,
        deliveryFee,
        total,
        paymentMethod:
          paymentMethod === "upi"
            ? "UPI (QR / ID)"
            : paymentMethod === "gpay"
            ? "Google Pay"
            : paymentMethod === "phonepe"
            ? "PhonePe"
            : paymentMethod === "card"
            ? "Credit / Debit Card"
            : "Cash on Delivery",
        deliveryDetails: { ...deliveryDetails },
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setConfirmedOrder(newOrder);
      clearCart();
      setIsProcessing(false);
      showToast("Order placed successfully! 🎉");
    }, 1400);
  };

  const handleFinishAndShopMore = () => {
    setConfirmedOrder(null);
    closeCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 overflow-hidden my-6"
        data-lenis-prevent
      >
        {/* Close Button */}
        {!isProcessing && (
          <button
            onClick={confirmedOrder ? handleFinishAndShopMore : closeCheckout}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors z-10"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* ===================== VIEW 1: ORDER CONFIRMED SCREEN ===================== */}
        {confirmedOrder ? (
          <div className="text-center py-4 space-y-6 animate-in zoom-in-95 duration-300">
            <div className="h-20 w-20 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/20">
              <CheckCircle2 className="h-12 w-12" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
                Order Confirmed
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                Thank You, {confirmedOrder.deliveryDetails.customerName || "Valued Shopper"}!
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Your everyday groceries and dairy are being carefully packed at our nearest local store.
              </p>
            </div>

            {/* Order Details Receipt Card */}
            <div className="bg-[#f8faf5] rounded-2xl p-5 border border-slate-200/80 text-left space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Order Number:</span>
                <span className="font-extrabold text-slate-900 text-sm">#{confirmedOrder.orderId}</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Estimated Delivery:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <Truck className="h-3.5 w-3.5" />
                  30 – 45 Minutes (Express)
                </span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Payment Mode:</span>
                <span className="font-bold text-slate-800">{confirmedOrder.paymentMethod}</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Total Amount:</span>
                <span className="font-black text-slate-900 text-sm">₹{confirmedOrder.total.toFixed(0)}</span>
              </div>

              <div>
                <span className="text-slate-500 font-medium block">Delivery Address:</span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {confirmedOrder.deliveryDetails.deliveryAddress}
                </p>
                <p className="text-slate-500 mt-0.5">
                  Mobile: {confirmedOrder.deliveryDetails.mobileNumber}
                </p>
              </div>
            </div>

            {/* Next Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`https://wa.me/919876543210?text=${encodeURIComponent(
                  `Hello National Shopping Mall, I placed Order #${confirmedOrder.orderId} for ₹${confirmedOrder.total}. Please send me live delivery updates!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Track Order on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleFinishAndShopMore}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs"
              >
                Continue Everyday Shopping
              </button>
            </div>
          </div>
        ) : (
          /* ===================== VIEW 2: CHECKOUT & PAYMENT SELECTION ===================== */
          <div className="space-y-6">
            {/* Header */}
            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
                Section 7 · Payment & Checkout
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">
                Simple & <span className="text-emerald-700">Secure Payments</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Complete your shopping with a convenient payment option.
              </p>
            </div>

            {/* Quick Delivery Summary Review */}
            <div className="bg-[#f8faf5] p-3.5 rounded-2xl border border-slate-200/80 text-xs flex items-start gap-3">
              <MapPin className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold text-slate-800">
                  Deliver to: {deliveryDetails.customerName || "Customer"} (
                  {deliveryDetails.mobileNumber || "Contact details"})
                </span>
                <p className="text-slate-500 line-clamp-1 mt-0.5">
                  {deliveryDetails.deliveryAddress || "Address will be taken during order review."}
                </p>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Choose Payment Method
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {/* 1. UPI */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between h-20 ${
                    paymentMethod === "upi"
                      ? "border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/20"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">UPI / QR</span>
                    <QrCode className="h-4 w-4 text-emerald-700" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">
                    GPay, PhonePe, Paytm
                  </span>
                </button>

                {/* 2. Google Pay */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("gpay")}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between h-20 ${
                    paymentMethod === "gpay"
                      ? "border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/20"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">Google Pay</span>
                    <Sparkles className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">1-Tap Fast Checkout</span>
                </button>

                {/* 3. PhonePe */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("phonepe")}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between h-20 ${
                    paymentMethod === "phonepe"
                      ? "border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/20"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">PhonePe</span>
                    <Sparkles className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">Instant App Pay</span>
                </button>

                {/* 4. Cards */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between h-20 ${
                    paymentMethod === "card"
                      ? "border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/20"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">Credit / Debit</span>
                    <CreditCard className="h-4 w-4 text-emerald-700" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">Visa, Master, RuPay</span>
                </button>

                {/* 5. Cash on Delivery */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between h-20 sm:col-span-2 ${
                    paymentMethod === "cod"
                      ? "border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/20"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">Cash on Delivery</span>
                    <Banknote className="h-4 w-4 text-emerald-700" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">
                    Pay cash or scan QR at your doorstep
                  </span>
                </button>
              </div>
            </div>

            {/* Selected Method Details Form */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              {paymentMethod === "upi" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">Scan & Pay via any UPI App:</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      Instant Approval
                    </span>
                  </div>
                  <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200">
                    <div className="h-16 w-16 bg-slate-900 text-white rounded-lg flex items-center justify-center shrink-0">
                      <QrCode className="h-12 w-12 text-white" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block text-xs">
                        Scan with GPay, PhonePe, Paytm, or BHIM
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        UPI ID: <strong className="text-slate-800">nationalshoppingmall@upi</strong>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "gpay" && (
                <div className="text-center py-3">
                  <p className="font-bold text-slate-800">Google Pay Instant UPI</p>
                  <p className="text-slate-500 mt-0.5">
                    Click &apos;Pay Now&apos; to trigger Google Pay on your device.
                  </p>
                </div>
              )}

              {paymentMethod === "phonepe" && (
                <div className="text-center py-3">
                  <p className="font-bold text-slate-800">PhonePe Direct UPI</p>
                  <p className="text-slate-500 mt-0.5">
                    Click &apos;Pay Now&apos; to approve the payment intent.
                  </p>
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="space-y-3">
                  <span className="font-bold text-slate-800 block">Enter Card Details:</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="Card Number"
                      className="col-span-2 px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                    />
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                    />
                    <input
                      type="password"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="CVV"
                      className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="flex items-center gap-3">
                  <Banknote className="h-6 w-6 text-emerald-700 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 block">Cash on Delivery Selected</span>
                    <p className="text-slate-500">
                      No advance payment needed. Hand over cash or scan the delivery executive&apos;s QR code when your package arrives.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Price Summary */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Final Amount:</span>
                <span className="text-2xl font-black text-slate-900">₹{total.toFixed(0)}</span>
              </div>

              {/* Primary Pay Now / Place Order Button */}
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="px-8 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-black text-sm shadow-xl shadow-emerald-700/25 transition-all flex items-center gap-2 disabled:opacity-75 cursor-pointer"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing securely...</span>
                  </span>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    <span>
                      {paymentMethod === "cod"
                        ? `Confirm Order (₹${total.toFixed(0)})`
                        : `Pay Now ₹${total.toFixed(0)}`}
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Note & Gateway Disclaimer */}
            <div className="text-[11px] text-slate-400 text-center leading-relaxed border-t border-slate-100 pt-3">
              <span className="font-semibold text-slate-500">Note:</span> This is a clean checkout and order confirmation preview. Direct payment gateway (Razorpay / Stripe / PhonePe) integration can be enabled with production keys.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

