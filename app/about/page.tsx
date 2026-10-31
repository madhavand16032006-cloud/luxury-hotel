import { Navbar } from "@/components/navigation/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PageHero } from "@/components/ui/PageHero";
import { HotelAboutSection } from "@/components/about/HotelAboutSection";
import { Footer } from "@/components/footer/Footer";

export const metadata = {
  title: "About Us & Heritage — BR Vasantham Grand | Luxury Resort & Suites",
  description:
    "Learn about BR Vasantham Grand: the sacred Tamil hospitality tradition of Virunthombal, Chettinad palace craftsmanship, Athangudi handmade tiles, and luxury suites.",
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
          subtitle="Discover the architectural majesty of Chettinad palace courtyards, authentic Athangudi craftsmanship, and the sacred Tamil tradition of Virunthombal across Chennai, Madurai, and Puducherry."
          breadcrumb="About"
          ctaText="Explore Sanctuaries"
          ctaHref="/#visit"
        />

        {/* Heritage Story & Commitments */}
        <HotelAboutSection />

        {/* Hotel Footer with Multi-Branch Booking Engine */}
        <Footer />
      </main>
    </>
  );
}
