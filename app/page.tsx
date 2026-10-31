import { Navbar } from "@/components/navigation/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Hero } from "@/components/hero/Hero";
import { HotelFacilities } from "@/components/facilities/HotelFacilities";
import { HotelAboutSection } from "@/components/about/HotelAboutSection";
import { RoomShowcase } from "@/components/rooms/RoomShowcase";
import { ProductShowcase } from "@/components/products/ProductShowcase";
import { HotelReviewsSection } from "@/components/reviews/HotelReviewsSection";
import { HotelContactSection } from "@/components/contact/HotelContactSection";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        {/* 1. Hero: 8K Resort Video & Clean Amenity Highlights */}
        <Hero />

        {/* 2. Hotel Facilities: Pristine 6-Cell Grid Matching User's Reference */}
        <HotelFacilities />

        {/* 3. About Section: Chettinad Heritage Story & Commitments */}
        <HotelAboutSection />

        {/* 4. Luxury Accommodation: 4 Room Categories (Normal AC, Deluxe, Chettinad, Penthouse) */}
        <RoomShowcase />

        {/* 5. Dakshin Dining: Kumbakonam Degree Filter Coffee & Royal Feasts */}
        <ProductShowcase />

        {/* 6. Live Reviews & Feedback: 4.9★ Plus Rating & Live Guest Feedback Form */}
        <HotelReviewsSection />

        {/* 7. Contact & 24/7 Concierge Desk: WhatsApp, Phone & Direct Inquiries */}
        <HotelContactSection />

        {/* 8. Luxury Hotel Footer: Zero Radius, Straight Corners, Instant Room Booking Pass */}
        <Footer />
      </main>
    </>
  );
}
