import type { Metadata, Viewport } from "next";
import { inter } from "@/lib/fonts";
import { AppProviders } from "@/components/providers/AppProviders";
import "./globals.css";

export const metadata: Metadata = {
  title: "National Shopping Mall — Your Everyday Shopping, Made Easy",
  description:
    "From fresh groceries and dairy essentials to daily household needs, find everything you need at National Shopping Mall. Quality products, fast delivery, best value.",
  keywords: [
    "National Shopping Mall",
    "online grocery",
    "fresh milk and dairy",
    "fruits and vegetables",
    "household essentials",
    "everyday shopping",
    "grocery delivery",
  ],
};

export const viewport: Viewport = {
  themeColor: "#155724",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen antialiased bg-[#f8faf5] text-[#0f172a]">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
