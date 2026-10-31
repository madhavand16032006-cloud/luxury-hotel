"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  Phone,
  MessageCircle,
  MapPin,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Navigation,
  ExternalLink,
} from "lucide-react";

export function ContactSection() {
  const { showToast } = useCart();

  // Contact details placeholders (editable state)
  const [phoneNumber, setPhoneNumber] = useState("+91 98765 43210");
  const [whatsappNumber, setWhatsappNumber] = useState("+91 98765 43210");
  const [emailAddress, setEmailAddress] = useState("support@nationalshoppingmall.com");
  const [storeAddress, setStoreAddress] = useState(
    "National Shopping Mall, Main Market Road, Near Gandhi Chowk, City Center - 400001"
  );
  const [storeHours, setStoreHours] = useState("Monday – Sunday: 7:00 AM – 10:30 PM");

  // Contact Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Order Inquiry",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      showToast("Please fill in your name, phone number, and message.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast("Message sent successfully! Our team will contact you shortly.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "Order Inquiry",
        message: "",
      });
    }, 1000);
  };

  const handleGetDirections = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        "National Shopping Mall City Center"
      )}`,
      "_blank"
    );
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#f8faf5] border-t border-emerald-100/60 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
            <span>Customer Care & Helpdesk</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            We&apos;re Always <span className="text-emerald-700">Happy to Help</span>
          </h2>

          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Have a question about a product, price, or order? Our team is ready to assist you.
          </p>
        </div>

        {/* Action Buttons: Call Us | WhatsApp Us | Get Directions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12 sm:mb-16">
          <a
            href={`tel:${phoneNumber.replace(/[^0-9+]/g, "")}`}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-700/20 transition-all active:scale-95"
          >
            <Phone className="h-4 w-4" />
            <span>Call Us</span>
          </a>

          <a
            href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
              "Hello National Shopping Mall, I would like to inquire about everyday grocery delivery."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all active:scale-95"
          >
            <MessageCircle className="h-4 w-4 fill-white" />
            <span>WhatsApp Us</span>
          </a>

          <button
            onClick={handleGetDirections}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-800 font-bold text-sm shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <Navigation className="h-4 w-4 text-emerald-700" />
            <span>Get Directions</span>
          </button>
        </div>

        {/* Grid: Contact Cards (Left) & Interactive Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Phone Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-colors flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Phone className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Customer Hotline
                </span>
                <a
                  href={`tel:${phoneNumber.replace(/[^0-9+]/g, "")}`}
                  className="text-lg font-black text-slate-900 hover:text-emerald-700 transition-colors block mt-0.5"
                >
                  {phoneNumber}
                </a>
                <p className="text-xs text-slate-500 mt-1">
                  Instant phone orders & dispatch queries
                </p>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-colors flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  WhatsApp Support
                </span>
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-black text-slate-900 hover:text-emerald-700 transition-colors block mt-0.5"
                >
                  {whatsappNumber}
                </a>
                <p className="text-xs text-slate-500 mt-1">
                  Chat directly with our store manager
                </p>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-colors flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Retail Store Address
                </span>
                <p className="text-sm font-bold text-slate-900 mt-0.5 leading-snug">
                  {storeAddress}
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-emerald-700">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{storeHours}</span>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-colors flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Mail className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Official Email
                </span>
                <a
                  href={`mailto:${emailAddress}`}
                  className="text-sm font-bold text-slate-900 hover:text-emerald-700 transition-colors block mt-0.5 truncate"
                >
                  {emailAddress}
                </a>
                <p className="text-xs text-slate-500 mt-1">
                  Average response time under 1 hour
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl">
            <div className="mb-6">
              <h3 className="text-xl font-black text-slate-900">Send Us a Direct Message</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Fill out the form below and our store supervisor will get in touch with you right away.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 animate-in zoom-in-95">
                <div className="h-14 w-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h4 className="text-lg font-bold text-emerald-900">Thank You!</h4>
                <p className="text-xs sm:text-sm text-emerald-700 mt-1 max-w-md mx-auto">
                  Your message has been received. Our team will contact you at your provided phone number shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-bold shadow-xs hover:bg-emerald-800 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Patel"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-600 focus:bg-white text-xs sm:text-sm text-slate-800 outline-none transition-all"
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 98765 43210"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-600 focus:bg-white text-xs sm:text-sm text-slate-800 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. ramesh@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-600 focus:bg-white text-xs sm:text-sm text-slate-800 outline-none transition-all"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Inquiry Type
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-600 focus:bg-white text-xs sm:text-sm text-slate-800 outline-none transition-all"
                    >
                      <option value="Order Inquiry">Order Status & Delivery</option>
                      <option value="Product Request">Request Fresh Dairy / Vegetable</option>
                      <option value="Price & Bulk Order">Bulk / Family Grocery Order</option>
                      <option value="Customer Feedback">Feedback & Suggestions</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Your Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the products you need or any questions regarding our service..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-600 focus:bg-white text-xs sm:text-sm text-slate-800 outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold text-sm shadow-lg shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message to Store</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

