import type { Metadata, Viewport } from "next";
import { inter, playfair } from "@/lib/fonts";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { DirectBookingModal } from "@/components/booking/DirectBookingModal";
import { AdminPanelModal } from "@/components/admin/AdminPanelModal";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luxury Hotel — Premier Luxury Hotel & Suites",
  description:
    "Premier luxury hotel & suites across Pondicherry, Tindivanam, and Chennai. 100% AC Deluxe & Normal rooms, free covered car parking & valet, ultra-fast Wi-Fi, and authentic hospitality.",
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
          <ScrollProgressBar />
          {children}
          <DirectBookingModal />
          <AdminPanelModal />
        </SmoothScroll>
      </body>
    </html>
  );
}
