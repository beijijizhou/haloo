'use client'; // Mark as Client Component for usePathname
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname(); // Get current pathname

  // Define navigation links
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white text-gray-800 p-4 shadow">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo + Brand Name */}
        <Link href="/" className="flex items-center space-x-1">
          <Image
            src="/images/logo.jpg"
            alt="Haloo Logo"
            width={120}
            height={120}
            className="rounded-full"
          />
          <span className="text-4xl font-extrabold tracking-wide">Haloo</span>
        </Link>

        {/* Navigation Links */}
        <div className="text-base space-x-6">
          {navLinks.map((link) => {
            // Check if the current pathname matches the link's href
            const isActive = pathname === link.href || (link.href === '/shop' && pathname.startsWith('/shop/'));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative inline-block transition-colors duration-300 ${
                  isActive ? 'text-orange-500' : 'text-gray-800 hover:text-orange-500'
                } group`} // Added group for hover effect
              >
                {link.label}
                {/* Underline animation */}
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gray-400 group-hover:w-full group-hover:bg-orange-500 transition-all duration-300 ease-in-out" />
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}