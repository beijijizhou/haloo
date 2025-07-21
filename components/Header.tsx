import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white text-gray-800 p-4 shadow">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo + Brand Name */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/images/logo.jpg"
            alt="Haloo Logo"
            width={60}
            height={60}
            className="rounded-full"
          />
          <span className="text-2xl font-extrabold tracking-wide">Haloo</span>
        </Link>

        {/* Navigation Links */}
        <div className="text-base space-x-6">
          <Link href="/shop" className="hover:text-orange-500 transition-colors">Shop</Link>
          <Link href="/about" className="hover:text-orange-500 transition-colors">About</Link>
          <Link href="/contact" className="hover:text-orange-500 transition-colors">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
