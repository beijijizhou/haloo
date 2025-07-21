import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HeroSection from "../../components/HeroSection";
import ServicesSection from "../../components/ServicesSection";

export default function Home() {
  return (
    <div>

    
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto p-4">
              <HeroSection />
              <ServicesSection></ServicesSection>
            </main>
            <Footer />
          </div>
        

    </div>
  );
}
