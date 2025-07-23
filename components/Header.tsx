'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ShopDropdownMenu from './ShopDropdownMenu';

export default function Header() {
  const pathname = usePathname();
  const [isShopHovered, setIsShopHovered] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white text-gray-800 p-4 shadow">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-1">
          <Image
            src="/images/logo.jpg"
            alt="Haloo Logo"
            width={120}
            height={120}
            className="rounded-full"
          />
          <span className="text-4xl font-extrabold tracking-wide text-orange-500 font-h5">
            Haloo
          </span>
        </Link>

        <div className="text-base space-x-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href === '/shop' && pathname.startsWith('/shop/'));
            const isShopLink = link.href === '/shop';

            return (
              <div
                key={link.href}
                className="relative inline-block group"
                onMouseEnter={() => isShopLink && setIsShopHovered(true)}
                onMouseLeave={() => isShopLink && setIsShopHovered(false)}
              >
                <Link
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative inline-block transition-colors duration-300 font-h5 ${isActive ? 'text-orange-500' : 'text-gray-800 hover:text-orange-500'
                    }`}
                >
                  {link.label}
                  <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gray-400 group-hover:w-full group-hover:bg-orange-500 transition-all duration-300 ease-in-out" />
                </Link>
                {isShopLink && <ShopDropdownMenu isOpen={isShopHovered} />}
              </div>
            );
          })}
        </div>
      </nav>
    </header>
  );
}