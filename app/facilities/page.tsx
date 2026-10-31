import { Navbar } from "@/components/navigation/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PageHero } from "@/components/ui/PageHero";
import { HotelFacilities } from "@/components/facilities/HotelFacilities";
import { Footer } from "@/components/footer/Footer";

export const metadata = {
  title: "Facilities & Amenities — BR Vasantham Grand | Luxury Resort & Suites",
  description:
    "Explore BR Vasantham Grand facilities: 100% inverter AC in every room, free covered car parking with valet, 24x7 front desk concierge, and boutique Tamil hospitality.",
};

export default function FacilitiesPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        {/* Top Motion Video Hero Banner */}
        <PageHero
          videoSrc="/videos/resort.mp4"
          imageSrc="/images/facility-pool.jpg"
          eyebrow="RESORT FACILITIES & EXCELLENCE"
          title="Curated Facilities &"
          highlightTitle="Royal Amenities."
          subtitle="Designed for complete serenity. Explore our 6 pillars of comfort, 100% inverter air-conditioned suites, guarded covered car parking bays, and round-the-clock front desk care."
          breadcrumb="Facilities"
          ctaText="Reserve Room"
          ctaHref="/#visit"
        />

        {/* 6-Cell Boutique Facilities Grid */}
        <HotelFacilities />

        {/* Hotel Footer with Multi-Branch Booking Engine */}
        <Footer />
      </main>
    </>
  );
}

