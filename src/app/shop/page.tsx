// app/shop/page.tsx
import Image from 'next/image';
import Link from 'next/link';

// Mock product data for static display
const products = [
  {
    id: 'space-demon-print', // Matches the example URL slug
    name: 'Space Demon Print Tee',
    price: '34.99',
    image: '/images/blueTshirt.jpg', // Use your blueTshirt.jpg from public/images
    alt: 'Blue T-shirt with Space Demon Print',
  },
  {
    id: 'cosmic-cat-hoodie',
    name: 'Cosmic Cat Hoodie',
    price: '59.99',
    image: '/images/blueTshirt.jpg',
    alt: 'Black hoodie with cosmic cat print',
  },
  // Add more mock products as needed for your shop
];

export default function ShopPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Our Amazing Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.id}`} // Link to the dynamic product page
            className="group block bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 overflow-hidden"
          >
            <div className="relative w-full h-72 bg-gray-100 flex items-center justify-center overflow-hidden">
              <Image
                src={product.image}
                alt={product.alt}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                {product.name}
              </h2>
              <p className="text-2xl font-bold text-blue-600">
                ${product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}