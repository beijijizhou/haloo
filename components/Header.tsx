import Link from "next/link";

// app/components/Header.tsx
export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Haloo</Link>
        <div>
          <Link href="/shop" className="mr-4 hover:text-gray-300">Shop</Link>
          <Link href="/about" className="hover:text-gray-300">About</Link>
          <Link href="/contact" className="ml-4 hover:text-gray-300">Contact</Link>
        </div>
      </nav>
    </header>
  );
}





