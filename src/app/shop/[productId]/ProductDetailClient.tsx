// app/shop/[productId]/ProductDetailClient.tsx
'use client'; // This marks it as a Client Component

import Image from 'next/image';
import { useState } from 'react';
import { PRODUCT_SIZES } from '../../../../lib/constants';
import { useRouter } from 'next/navigation'; // Import useRouter

// Assuming this is defined in lib/constants

// Define the type for product data passed as props
interface ProductDetailClientProps {
  product: {
    id: string;
    name: string;
    price: string;
    description: string;
    longDescription?: string;
    images: string[];
    alt: string;
  };
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  // State to manage the quantity
  const [quantity, setQuantity] = useState(1);
  // You might also want state for selected size, if that's dynamic
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const router = useRouter(); // Initialize useRouter

 
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    } else if (event.target.value === '') {
      setQuantity(0);
    }
  };
  const handleCheckout = () => {
    // In a real application, you'd likely:
    // 1. Add the product to a global cart state or a session/local storage
    // 2. Pass relevant product/quantity/size info to the checkout page if needed
    // For now, we'll just redirect.
    router.push('/checkout'); // Redirects to the /checkout page
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Product Images */}
        <div className="flex flex-col gap-4">
          {product.images.map((imgSrc, index) => (
            <div key={index} className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <Image
                src={imgSrc}
                alt={`${product.name} - Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-3xl font-bold text-blue-600 mb-6">
            ${product.price}
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Description
          </h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            {product.longDescription || product.description}
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Available Sizes
          </h3>
          <div className="flex flex-wrap gap-3 mb-8">
            {PRODUCT_SIZES.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-5 py-2 border rounded-full text-gray-700 hover:bg-orange-100 hover:border-orange-500 transition-colors duration-200
                          ${selectedSize === size ? 'bg-orange-200 border-orange-600 text-orange-800 font-medium' : 'bg-white border-gray-300'}`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Quantity Selector */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Quantity
            </h3>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                className="w-20 text-center border border-gray-300 rounded-md py-2 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleCheckout} // Add onClick handler

            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors duration-300 shadow-lg">
            {/* Add to Cart (Static) */}
            Check out
          </button>
        </div>
      </div>
    </div>
  );
}