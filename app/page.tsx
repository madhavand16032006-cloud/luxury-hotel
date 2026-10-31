import { Navbar } from "@/components/navigation/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Hero } from "@/components/hero/Hero";
import { HotelFacilities } from "@/components/facilities/HotelFacilities";
import { HotelAmenities } from "@/components/amenities/HotelAmenities";
import { HotelGallery } from "@/components/gallery/HotelGallery";
import { HotelAboutSection } from "@/components/about/HotelAboutSection";
import { RoomShowcase } from "@/components/rooms/RoomShowcase";
import { HotelReviewsSection } from "@/components/reviews/HotelReviewsSection";
import { HotelContactSection } from "@/components/contact/HotelContactSection";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        {/* 1. Hero: Resort Video Background & Floating Destination Booking Bar */}
        <Hero />

        {/* 2. Hotel Facilities: 6-Cell Boutique Grid (Luxury Stay, Prime Location, Parking, 24x7) */}
        <HotelFacilities />

        {/* 3. Amenities: Comprehensive 12-Service Resort & In-Room Comfort Matrix */}
        <HotelAmenities />

        {/* 4. The Gallery: Visual Sanctuary Showcase with Category Filters & Interactive Lightbox */}
        <HotelGallery />

        {/* 5. About Section: Chettinad Royal Heritage & Virunthombal Standards */}
        <HotelAboutSection />

        {/* 6. Luxury Accommodation: 4 Room Tiers (Normal AC, Deluxe, Chettinad Suite, Penthouse) */}
        <RoomShowcase />

        {/* 7. Live Reviews: 4.8★ Rating & Verified Guest Testimonials Showcase */}
        <HotelReviewsSection />

        {/* 8. Contact & 24/7 Concierge Desk: WhatsApp, Phone Desk & Direct Assistance */}
        <HotelContactSection />

        {/* 9. Hotel Footer: Destination Branch Reservation Engine with Guest Memory */}
        <Footer />
      </main>
    </>
  );
}
