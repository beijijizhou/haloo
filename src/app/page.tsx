import HeroSection from "../../components/HeroSection";
import ProductRangeSection from "../../components/ProductRangeSection";
import ServicesSection from "../../components/ServicesSection";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow container mx-auto p-4">
          <HeroSection />
          <ServicesSection></ServicesSection>
          <ProductRangeSection></ProductRangeSection>
        </main>
    
      </div>
    </div>
  );
}
