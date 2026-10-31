"use client";

import React from "react";
import { X, ShieldCheck, FileText, RotateCcw } from "lucide-react";

interface PolicyModalProps {
  type: "privacy" | "terms" | "refund" | null;
  onClose: () => void;
}

export function PolicyModal({ type, onClose }: PolicyModalProps) {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 my-8 overflow-hidden"
        data-lenis-prevent
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {type === "privacy" && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg pb-2 border-b border-slate-100">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <span>Privacy Policy</span>
            </div>
            <p>
              At <strong>National Shopping Mall</strong> (&ldquo;NSM&rdquo;), we value and respect your personal privacy. We collect basic details like customer name, phone number, and delivery address solely for the purpose of fulfilling your daily grocery orders and communicating live dispatch status.
            </p>
            <h4 className="font-bold text-slate-900 text-sm">1. Information Collection</h4>
            <p>
              We only collect information you voluntarily provide during checkout or when reaching customer support via WhatsApp, phone, or website contact forms. We never sell or share your contact data with third-party advertisers.
            </p>
            <h4 className="font-bold text-slate-900 text-sm">2. Payment Security</h4>
            <p>
              All online payment transactions (UPI, Debit/Credit Cards, Net Banking) are encrypted and processed through certified bank payment gateways. We never store complete credit card or CVV details on our servers.
            </p>
          </div>
        )}

        {type === "terms" && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg pb-2 border-b border-slate-100">
              <FileText className="h-5 w-5 text-emerald-600" />
              <span>Terms & Conditions</span>
            </div>
            <p>
              Welcome to <strong>National Shopping Mall</strong>. By browsing, placing orders, or scheduling deliveries through our platform, you agree to comply with our standard terms of service.
            </p>
            <h4 className="font-bold text-slate-900 text-sm">1. Pricing & Weights</h4>
            <p>
              We ensure accurate electronic weighing for all fresh vegetables, fruits, and dairy products. If weight marginally varies due to natural farm sizing, pricing is calculated transparently.
            </p>
            <h4 className="font-bold text-slate-900 text-sm">2. Delivery Windows</h4>
            <p>
              Our standard delivery window is 30 to 45 minutes for local orders. In cases of torrential rains or traffic disruptions, our team will inform you via call or WhatsApp.
            </p>
          </div>
        )}

        {type === "refund" && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg pb-2 border-b border-slate-100">
              <RotateCcw className="h-5 w-5 text-emerald-600" />
              <span>Refund & Cancellation Policy</span>
            </div>
            <p>
              Our <strong>100% Freshness Guarantee</strong> covers every grocery and dairy item you purchase at National Shopping Mall.
            </p>
            <h4 className="font-bold text-slate-900 text-sm">1. Instant Doorstep Replacement</h4>
            <p>
              If any fruit, vegetable, or dairy pack does not meet your quality standards upon delivery, notify our delivery executive immediately for an on-the-spot replacement or billing deduction.
            </p>
            <h4 className="font-bold text-slate-900 text-sm">2. Cancellations</h4>
            <p>
              Orders can be canceled free of charge anytime before our delivery executive leaves the local store. Simply call our customer care hotline at +91 98765 43210.
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}

