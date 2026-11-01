import { Suspense } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PageHero } from "@/components/ui/PageHero";
import { RoomShowcase } from "@/components/rooms/RoomShowcase";
import { Footer } from "@/components/footer/Footer";

export const metadata = {
  title: "Rooms & Suites — Luxury Hotel",
  description:
    "Explore 4 tiers of luxury accommodation: Standard Normal AC (320 sq. ft.), Deluxe Luxury AC (450 sq. ft.), Royal Chettinad Suite (750 sq. ft.), and Presidential Penthouse (1,200 sq. ft.).",
};

export default function RoomsPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        {/* Top Motion Video Hero Banner */}
        <PageHero
          videoSrc="/videos/resort.mp4"
          imageSrc="/images/room-chettinad-suite.jpg"
          eyebrow="LUXURY ACCOMMODATION & SUITES"
          title="Spacious Sanctuaries &"
          highlightTitle="Heritage Suites."
          subtitle="From generous 320 sq. ft. Normal AC rooms to the palatial 1,200 sq. ft. Presidential Penthouse with private plunge pool. Every room features 100% inverter AC, free covered car parking, and high-speed Wi-Fi."
          breadcrumb="Rooms & Suites"
          ctaText="Reserve a Suite"
          ctaHref="/#visit"
        />

        {/* 4 Tiers of Luxury Suites */}
        <Suspense fallback={null}>
          <RoomShowcase />
        </Suspense>

        {/* Hotel Footer with Multi-Branch Booking Engine */}
        <Footer />
      </main>
    </>
  );
}

