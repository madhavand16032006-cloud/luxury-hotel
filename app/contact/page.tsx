import { Navbar } from "@/components/navigation/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PageHero } from "@/components/ui/PageHero";
import { HotelContactSection } from "@/components/contact/HotelContactSection";
import { Footer } from "@/components/footer/Footer";

export const metadata = {
  title: "Contact & 24/7 Front Desk — BR Vasantham Grand | Luxury Resort & Suites",
  description:
    "Get in touch with BR Vasantham Grand. 24/7 front desk telephone, instant WhatsApp concierge (+91 94440 12345), and sanctuary addresses across Chennai, Madurai, and Puducherry.",
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
          subtitle="Direct WhatsApp desk, 24/7 telephone reception, driving directions, covered valet parking assistance, and dedicated guest support across our Chennai, Madurai, and Puducherry sanctuaries."
          breadcrumb="Contact"
          ctaText="WhatsApp Concierge"
          ctaHref="https://wa.me/919444012345?text=Vanakkam!%20I%20have%20an%20inquiry%20regarding%20BR%20Vasantham%20Grand%20stay."
        />

        {/* Contact Desk & Location Details */}
        <HotelContactSection />

        {/* Hotel Footer with Multi-Branch Booking Engine */}
        <Footer />
      </main>
    </>
  );
}

