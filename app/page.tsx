import { Navbar } from "@/components/navigation/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Hero } from "@/components/hero/Hero";
import { Manifesto } from "@/components/editorial/Manifesto";
import { ProductShowcase } from "@/components/products/ProductShowcase";
import { Atmosphere } from "@/components/atmosphere/Atmosphere";
import { IngredientCards } from "@/components/ingredients/IngredientCards";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <ProductShowcase />
        <Atmosphere />
        <IngredientCards />
        <Footer />
      </main>
    </>
  );
}
