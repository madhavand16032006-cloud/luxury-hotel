import { Navbar } from "@/components/navigation/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PageHero } from "@/components/ui/PageHero";
import { ContactLocationsMap } from "@/components/contact/ContactLocationsMap";
import { HotelContactSection } from "@/components/contact/HotelContactSection";
import { HotelFaqSection } from "@/components/faq/HotelFaqSection";
import { Footer } from "@/components/footer/Footer";

export const metadata = {
  title: "Contact & Locations — Le Prestige Residency | BR Vasantham",
  description:
    "Visit Le Prestige Residency across our Puducherry, Tindivanam, and Chennai locations. Plan your arrival with Google Maps, direct telephone, instant WhatsApp concierge (+91 96777 51329), and comprehensive FAQs.",
};

export default function ContactPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        {/* Top Motion Video Hero Banner */}
        <PageHero
          videoSrc="/videos/resort.mp4"
          imageSrc="/images/facility-parking.jpg"
          eyebrow="24/7 CONCIERGE & RECEPTION"
          title="We Are Always Here to"
          highlightTitle="Welcome You."
          subtitle="Direct WhatsApp desk, 24/7 telephone reception, driving directions, covered valet parking assistance, and dedicated guest support across our Puducherry, Tindivanam, and Chennai properties."
          breadcrumb="Contact"
          ctaText="WhatsApp Concierge"
          ctaHref="https://wa.me/919677751329?text=Vanakkam!%20I%20have%20an%20inquiry%20regarding%20Le%20Prestige%20Residency%20stay."
        />

        {/* 1. Our Locations & Interactive Google Maps (Matching Reference Images 1 & 2) */}
        <ContactLocationsMap />

        {/* 2. Direct Inquiry & Concierge Desk */}
        <HotelContactSection />

        {/* 3. Frequently Asked Questions (FAQ Section) */}
        <HotelFaqSection />

        {/* 4. Hotel Footer */}
        <Footer />
      </main>
    </>
  );
}
