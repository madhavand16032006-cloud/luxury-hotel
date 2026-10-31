import { Navbar } from "@/components/navigation/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PageHero } from "@/components/ui/PageHero";
import { HotelReviewsSection } from "@/components/reviews/HotelReviewsSection";
import { Footer } from "@/components/footer/Footer";

export const metadata = {
  title: "Guest Reviews & Ratings — BR Vasantham Grand | Luxury Resort & Suites",
  description:
    "Read 500+ verified guest reviews and 4.8★ Google ratings for BR Vasantham Grand in Chennai, Madurai, and Puducherry. Transparent live feedback from real travelers.",
};

export default function ReviewsPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        {/* Top Motion Video Hero Banner */}
        <PageHero
          videoSrc="/videos/resort-8k.mp4"
          imageSrc="/images/hotel-hero.jpg"
          eyebrow="GUEST EXPERIENCES & REPUTATION"
          title="What Our Guests Say About"
          highlightTitle="BR Vasantham."
          subtitle="Verified experiences from travelers across Tamil Nadu. Celebrating our 4.8★ Google rating, whisper-quiet 100% inverter AC, complimentary covered car parking, and genuine royal hospitality."
          breadcrumb="Reviews"
          ctaText="Share Your Review"
          ctaHref="#reviews"
        />

        {/* 2x2 Metric Scorecard & Testimonial Carousel */}
        <HotelReviewsSection />

        {/* Hotel Footer with Multi-Branch Booking Engine */}
        <Footer />
      </main>
    </>
  );
}
