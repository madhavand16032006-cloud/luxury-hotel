import { Navbar } from "@/components/navigation/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PageHero } from "@/components/ui/PageHero";
import { HotelGallery } from "@/components/gallery/HotelGallery";
import { Footer } from "@/components/footer/Footer";

export const metadata = {
  title: "The Gallery — Luxury Hotel",
  description:
    "Explore the visual gallery of Luxury Hotel: palatial Chettinad architecture, Burmese teakwood courtyards, emerald swimming pool, and luxury suites.",
};

export default function GalleryPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        {/* Top Motion Video Hero Banner */}
        <PageHero
          videoSrc="/videos/resort-8k.mp4"
          imageSrc="/images/hotel-hero.jpg"
          eyebrow="RESORT PHOTOGRAPHY & ARCHITECTURE"
          title="The Sanctuary in"
          highlightTitle="Living Color."
          subtitle="A curated visual chronicle of our royal courtyards, emerald poolside cabanas, artisanal Athangudi tilework, and heritage suite sanctuaries."
          breadcrumb="The Gallery"
          ctaText="Reserve Suite"
          ctaHref="/#visit"
        />

        {/* The Gallery Section with Category Filters & Lightbox */}
        <HotelGallery />

        {/* Hotel Footer with Multi-Branch Booking Engine */}
        <Footer />
      </main>
    </>
  );
}

