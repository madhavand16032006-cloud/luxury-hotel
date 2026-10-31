import type { Metadata, Viewport } from "next";
import { inter, playfair } from "@/lib/fonts";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "BR Velluto — Italian Café & Artisan Roastery",
  description: "An Italian café built around ritual, craft and patience. Milano · Firenze.",
};

export const viewport: Viewport = {
  themeColor: "#18110c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-warm-white text-warm-brown antialiased selection:bg-cream selection:text-italian-red">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
