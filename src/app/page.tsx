'use client'; // Required for framer-motion
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import HeroSection from '../../components/HeroSection';
import ProductRangeSection from '../../components/ProductRangeSection';
import ServicesSection from '../../components/ServicesSection';

// Animation wrapper component
function ScrollAnimatedSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }} // Start 50px below, fully transparent
      animate={isInView ? { opacity: 1, y: 0 } : {}} // Slide up and fade in
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 10,
        duration: 0.6, // Fast for "dashing" effect
      }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow container mx-auto p-4">
          <ScrollAnimatedSection>
            <HeroSection />
          </ScrollAnimatedSection>
          <ScrollAnimatedSection>
            <ServicesSection />
          </ScrollAnimatedSection>
          <ScrollAnimatedSection>
            <ProductRangeSection />
          </ScrollAnimatedSection>
        </main>
      </div>
    </div>
  );
}