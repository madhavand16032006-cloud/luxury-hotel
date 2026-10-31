"use client";

import { useCart } from "@/context/CartContext";
import { CheckCircle2, ShoppingBag } from "lucide-react";

export function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 md:bottom-8 md:left-8 md:translate-x-0 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-3 bg-slate-900/95 text-white px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-md border border-slate-700/60 max-w-sm">
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <p className="text-sm font-medium leading-snug">{toastMessage}</p>
      </div>
    </div>
  );
}

