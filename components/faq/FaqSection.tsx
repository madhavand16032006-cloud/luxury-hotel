"use client";

import React, { useState } from "react";
import { FAQS_DATA } from "@/data/products";
import { ChevronDown, HelpCircle, Phone, MessageCircle } from "lucide-react";

export function FaqSection() {
  const [openFaqId, setOpenFaqId] = useState<number | null>(1); // 1st open by default

  const toggleFaq = (id: number) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#f8faf5] border-t border-emerald-100/60 relative scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="h-3.5 w-3.5 text-emerald-700" />
            <span>Got Questions? We Have Answers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked <span className="text-emerald-700">Questions</span>
          </h2>

          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Find everything you need to know about placing orders, milk freshness, deliveries, and payment methods.
          </p>
        </div>

        {/* 8 Expandable Accordion Items */}
        <div className="space-y-3.5">
          {FAQS_DATA.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all duration-200 border ${
                  isOpen
                    ? "bg-white border-emerald-400 shadow-md ring-1 ring-emerald-500/10"
                    : "bg-white/80 hover:bg-white border-slate-200/90 shadow-2xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full py-4.5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-3">
                    <span className="flex items-center justify-center h-6 w-6 rounded-full bg-emerald-50 text-emerald-800 text-xs font-extrabold shrink-0">
                      {faq.id}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-emerald-100 text-emerald-800 rotate-180"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
                    <p className="pl-9">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-linear-to-r from-emerald-800 to-green-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="text-center sm:text-left">
            <h4 className="text-base font-bold">Have more questions or custom requirements?</h4>
            <p className="text-xs text-emerald-100 mt-0.5">
              Our store supervisor is available right now on phone and WhatsApp.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+919876543210"
              className="px-4 py-2 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-emerald-700" />
              <span>Call Helpline</span>
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

