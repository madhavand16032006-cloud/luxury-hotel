import { Header } from "@/components/header/Header";
import { Hero } from "@/components/hero/Hero";
import { HomeCategories } from "@/components/categories/HomeCategories";
import { ProductSection } from "@/components/products/ProductSection";
import { AboutSection } from "@/components/about/AboutSection";
import { CartSection } from "@/components/cart/CartSection";
import { ReviewsSection } from "@/components/reviews/ReviewsSection";
import { FaqSection } from "@/components/faq/FaqSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf5] text-[#0f172a]">
      {/* Sticky Header with Search, Category Filter Strip & Cart Icon */}
      <Header />

      <main className="flex-1">
        {/* Section 1: Hero Section */}
        <Hero />

        {/* Section 2: Home Section (Categories) */}
        <HomeCategories />

        {/* Section 3: Product Section with Interactive Filters & Quick View */}
        <ProductSection />

        {/* Section 4: About Section & 4 Commitments */}
        <AboutSection />

        {/* Section 6: Shopping Cart and Order Review */}
        <CartSection />

        {/* Section 8: Reviews and Feedback */}
        <ReviewsSection />

        {/* Section 9: FAQ Section */}
        <FaqSection />

        {/* Section 5: Contact Section, Editable Cards & Direct Form */}
        <ContactSection />
      </main>

      {/* Section 10: Footer */}
      <Footer />
    </div>
  );
}
