"use client";

import React from "react";
import { CartProvider } from "@/context/CartContext";
import { Toast } from "@/components/ui/Toast";
import { QuickViewModal } from "@/components/products/QuickViewModal";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { MobileBottomNav } from "@/components/navigation/MobileBottomNav";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {/* Global Interactive Overlays */}
      <Toast />
      <QuickViewModal />
      <CartDrawer />
      <CheckoutModal />

      {children}

      {/* Floating Elements */}
      <FloatingWhatsApp />
      <MobileBottomNav />
    </CartProvider>
  );
}

