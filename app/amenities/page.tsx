import { Navbar } from "@/components/navigation/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PageHero } from "@/components/ui/PageHero";
import { HotelAmenities } from "@/components/amenities/HotelAmenities";
import { Footer } from "@/components/footer/Footer";

export const metadata = {
  title: "Resort Amenities — Luxury Hotel",
  description:
    "Discover the 5-star amenities at Luxury Hotel: 100% inverter AC in every suite, free covered parking with valet, emerald swimming pool, high-speed Wi-Fi, and 24/7 concierge.",
};

export default function AmenitiesPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        {/* Top Motion Video Hero Banner */}
        <PageHero
          videoSrc="/videos/resort.mp4"
          imageSrc="/images/facility-pool.jpg"
          eyebrow="COMFORT & HOSPITALITY STANDARDS"
          title="Curated Luxuries for"
          highlightTitle="Every Guest."
          subtitle="From 100% inverter air-conditioned suites and guaranteed covered parking to our courtyard swimming pool and 24/7 front desk care."
          breadcrumb="Amenities"
          ctaText="Check Availability"
          ctaHref="/#visit"
        />

        {/* 12-Item Luxury Amenities Matrix */}
        <HotelAmenities />

        {/* Hotel Footer with Multi-Branch Booking Engine */}
        <Footer />
      </main>
    </>
  );
}

