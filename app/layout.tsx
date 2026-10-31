import type { Metadata, Viewport } from "next";
import { inter, playfair } from "@/lib/fonts";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { DirectBookingModal } from "@/components/booking/DirectBookingModal";
import "./globals.css";

export const metadata: Metadata = {
  title: "BR Vasantham Grand — Luxury Heritage Hotel & Suites | Tamil Nadu",
  description:
    "Tamil Nadu's premier luxury heritage hotel & suites. 100% AC Deluxe & Normal rooms (320 to 1,200 sq. ft.), free covered car parking & valet, ultra-fast Wi-Fi, and authentic royal hospitality in Chennai & Madurai.",
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
        <SmoothScroll>
          {children}
          <DirectBookingModal />
        </SmoothScroll>
      </body>
    </html>
  );
}
