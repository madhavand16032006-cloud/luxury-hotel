"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  Phone,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Clock,
  Car,
  Wifi,
} from "lucide-react";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: "booking" | "amenities" | "location" | "policies";
}

const HOTEL_FAQS: FaqItem[] = [
  {
    id: 1,
    question: "What are the standard check-in and check-out timings?",
    answer:
      "Standard check-in is from 12:00 PM onwards, and check-out is by 11:00 AM. Early check-in or late check-out is available upon request subject to room availability; please inform our 24/7 concierge in advance.",
    category: "policies",
  },
  {
    id: 2,
    question: "Is car parking free, secure, and available on site?",
    answer:
      "Yes, 100% complimentary covered car parking is guaranteed for all registered guests across our Puducherry, Tindivanam, and Chennai properties. Valet assistance and 24/7 CCTV surveillance are provided.",
    category: "amenities",
  },
  {
    id: 3,
    question: "Do I need to pay an advance deposit to confirm my room?",
    answer:
      "No advance deposit is required for direct website reservations. You receive an instant digital booking confirmation reference and can settle your bill conveniently during check-in via UPI, Card, or Cash.",
    category: "booking",
  },
  {
    id: 4,
    question: "Are all rooms equipped with split inverter AC?",
    answer:
      "Yes. Every single room tier—from Normal AC rooms to Presidential Penthouse suites—is equipped with dedicated whisper-quiet split inverter air conditioning with independent digital remote climate control.",
    category: "amenities",
  },
  {
    id: 5,
    question: "Is high-speed Wi-Fi provided in rooms and public spaces?",
    answer:
      "Yes, high-speed optical fiber Wi-Fi is provided complimentary throughout the entire property, including inside suites, courtyard lounges, and restaurant spaces, suitable for 4K streaming and remote work.",
    category: "amenities",
  },
  {
    id: 6,
    question: "How close are your properties to the beach and major transit hubs?",
    answer:
      "Our Puducherry property on Villianur Main Road provides seamless 10-15 minute access to the Promenade Beach, French White Town, Auroville, and Puducherry Railway Station. Our Tindivanam property on Marakanam Road sits right off the highway junction with direct expressway connectivity.",
    category: "location",
  },
  {
    id: 7,
    question: "What is your cancellation and date modification policy?",
    answer:
      "We offer flexible, guest-friendly cancellation. You may modify your travel dates or cancel your reservation up to 24 hours prior to check-in with zero cancellation fee. Simply message our WhatsApp concierge desk.",
    category: "booking",
  },
  {
    id: 8,
    question: "Are food, breakfast, and 24/7 room dining available?",
    answer:
      "Yes. We serve authentic South Indian breakfast and round-the-clock room dining featuring fresh Chettinad specialties, Continental selections, and vegetarian options prepared fresh to order.",
    category: "amenities",
  },
];

export function HotelFaqSection() {
  const [openId, setOpenId] = useState<number | null>(1); // 1st FAQ open by default
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const toggleFaq = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs =
    activeCategory === "all"
      ? HOTEL_FAQS
      : HOTEL_FAQS.filter((f) => f.category === activeCategory);

  return (
    <section id="faq" className="relative bg-white py-24 sm:py-32 border-t border-[#e8dfd6]">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#c2593f] font-semibold block mb-2">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1a120b] tracking-tight">
            Everything You Need to Know
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
            Essential information regarding check-in times, complimentary car parking, direct reservations, and guest policies.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All Questions" },
              { id: "booking", label: "Booking & Payment" },
              { id: "amenities", label: "Amenities & Parking" },
              { id: "policies", label: "Timings & Policies" },
              { id: "location", label: "Location & Travel" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#1a120b] text-white shadow-sm"
                    : "bg-[#faf7f2] text-stone-600 hover:text-black border border-stone-200/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Expandable Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                  isOpen
                    ? "bg-[#faf7f2] border-[#c2593f]/40 shadow-md ring-1 ring-[#c2593f]/10"
                    : "bg-white hover:bg-stone-50/70 border-stone-200/80 shadow-xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg text-[#1a120b] font-medium flex items-center gap-3.5">
                    <span
                      className={`flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold shrink-0 transition-colors ${
                        isOpen
                          ? "bg-[#c2593f] text-white"
                          : "bg-stone-100 text-stone-600"
                      }`}
                    >
                      {faq.id}
                    </span>
                    <span>{faq.question}</span>
                  </span>

                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-[#c2593f]/15 text-[#c2593f] rotate-180"
                        : "bg-stone-100 text-stone-500"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200/50">
                    <p className="pl-9.5">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA Banner */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-[#222426] via-[#1a1b1d] to-[#141517] text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#dfba73] font-semibold block mb-1">
              24/7 GUEST SUPPORT
            </span>
            <h4 className="font-serif text-xl sm:text-2xl text-white">
              Still Have Questions or Custom Requests?
            </h4>
            <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-lg leading-relaxed font-light">
              Our front desk supervisor is on standby right now. Send an instant WhatsApp or telephone call for personal assistance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="tel:+919677751329"
              className="inline-flex items-center gap-2 rounded-xl bg-white text-[#1a120b] hover:bg-stone-100 px-5 py-3 text-xs font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <Phone className="h-3.5 w-3.5 text-[#c2593f]" />
              <span>Call Front Desk</span>
            </a>

            <a
              href="https://wa.me/919677751329?text=Vanakkam!%20I%20have%20a%20question%20regarding%20Le%20Prestige%20Residency%20booking."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-3 text-xs font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

