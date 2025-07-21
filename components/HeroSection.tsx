// app/components/HeroSection.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
      {/* Background Image - replace with your static image or placeholder */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div> {/* Overlay for text readability */}

      <div className="relative z-20 p-4 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up">
          Welcome to <span className="text-orange-400">Haloo</span>!
          <br />
          Your Creative Printing Partner
        </h1>
        <p className="text-xl md:text-2xl mb-8 animate-fade-in-up delay-200">
          Bringing your ideas to life with high-quality printing solutions.
        </p>
        <Link href="/shop" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 animate-fade-in-up delay-400">
          Explore Our Services
        </Link>
      </div>
    </section>
  );
}