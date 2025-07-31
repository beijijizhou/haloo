import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[400px] flex items-center justify-center text-center text-white overflow-hidden bg-gradient-to-r from-orange-500 to-blue-500">
      {/* Optional subtle overlay for text readability */}
      <div className="absolute inset-0 bg-black opacity-20 z-10"></div>

      <div className="relative z-20 p-4 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up font-h5">
          Create with <span className="text-orange-400">Haloo</span>!
          <br />
          Your Print-on-Demand Partner
        </h1>
        <p className="text-xl md:text-2xl mb-8 animate-fade-in-up delay-200 font-h5">
          Bring your imagination to life with custom prints on items you choose, crafted with high-quality precision.
        </p>
        <Link
          href="/shop"
          aria-label="Explore our print-on-demand products"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 animate-fade-in-up delay-400"
        >
          Design Your Products
        </Link>
      </div>
    </section>
  );
}