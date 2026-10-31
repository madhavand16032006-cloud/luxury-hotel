"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-5 z-40 flex items-center gap-3">
      {/* Tooltip Bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl shadow-xl border border-slate-200/80 text-xs font-semibold text-slate-800 animate-in fade-in slide-in-from-right-4 duration-300">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Need help? Chat on WhatsApp</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 ml-1 p-0.5"
            aria-label="Dismiss tooltip"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* WhatsApp Action Button */}
      <a
        href={`https://wa.me/919876543210?text=${encodeURIComponent(
          "Hello National Shopping Mall! I would like to order fresh groceries & dairy."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-xl shadow-emerald-900/20 hover:scale-105 active:scale-95 transition-all group"
      >
        <MessageCircle className="h-7 w-7 fill-white text-white" />
        <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-white animate-pulse" />
      </a>
    </div>
  );
}

