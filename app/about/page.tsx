import { Navbar } from "@/components/navigation/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PageHero } from "@/components/ui/PageHero";
import { HotelAboutSection } from "@/components/about/HotelAboutSection";
import { HotelStorySection } from "@/components/about/HotelStorySection";
import { HotelHospitalityPromise } from "@/components/about/HotelHospitalityPromise";
import { HotelContactSection } from "@/components/contact/HotelContactSection";
import { Footer } from "@/components/footer/Footer";

export const metadata = {
  title: "About Us & Our Story — Le Prestige Residency | BR Vasantham",
  description:
    "Learn about Le Prestige Residency: our story, our founding vision, genuine South Indian Virunthombal hospitality, whisper-quiet inverter AC suites, and 24/7 concierge across Puducherry, Tindivanam, and Chennai.",
};

export default function AboutPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        {/* Top Motion Video Hero Banner */}
        <PageHero
          videoSrc="/videos/resort-8k.mp4"
          imageSrc="/images/hotel-hero.jpg"
          eyebrow="OUR ROYAL HERITAGE STORY"
          title="Centuries of Comfort, Carved in"
          highlightTitle="Teak & Stone."
          subtitle="Discover the architectural majesty of Chettinad palace courtyards, authentic Athangudi craftsmanship, and the sacred Tamil tradition of Virunthombal across Puducherry, Tindivanam, and Chennai."
          breadcrumb="About"
          ctaText="Explore Sanctuaries"
          ctaHref="/#visit"
        />

        {/* 1. Heritage Architecture & Craftsmanship Standards */}
        <HotelAboutSection />

        {/* 2. Our Story: Founding Vision, Ethics & The Journey */}
        <HotelStorySection />

        {/* 3. Contact & 24/7 Concierge Desk (Next After Our Story) */}
        <HotelContactSection
          eyebrow="GET IN TOUCH"
          title="24/7 Concierge & Reception"
          subtitle="Planning your stay or have special requests? Reach out to our front desk team anytime via WhatsApp or telephone call."
        />

        {/* 4. Bottom Top Feature: Every Stay. Every Guest. Every Time. (Matching Reference Image) */}
        <HotelHospitalityPromise />

        {/* 5. Hotel Footer with Multi-Branch Booking Engine */}
        <Footer />
      </main>
    </>
  );
}
