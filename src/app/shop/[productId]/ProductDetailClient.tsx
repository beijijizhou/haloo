// app/shop/[productId]/ProductDetailClient.tsx
'use client'; // This marks it as a Client Component

import Image from 'next/image';
import { useState } from 'react'; // Keep useEffect for potential future use, though not strictly needed for this specific change
import { useRouter } from 'next/navigation';
import { PRODUCT_SIZES } from '../../../../lib/constants';

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
  // State to manage the quantity, defaults to 1
  const [quantity, setQuantity] = useState(1);

  // State for selected size, defaults to 'Medium'
  const [selectedSize, setSelectedSize] = useState<string>('Medium'); // Default to 'Medium'

  const router = useRouter();

  // Event handler for quantity input field
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    // Ensure it's a number and at least 1. If empty string, set to 0 to allow user to clear.
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    } else if (event.target.value === '') {
      setQuantity(0); // Allows user to delete input before typing a new number
    } else {
      setQuantity(1); // Fallback if invalid input less than 1
    }
  };

  // Event handler for size dropdown change
  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
  };

  const handleCheckout = () => {
    // In a real application, you'd collect selectedSize and quantity here
    // and pass them to your cart/checkout logic.
    console.log(`Checking out ${quantity} of ${product.name} in size ${selectedSize}`);
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

          {/* Size Dropdown */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Select Size
            </h3>
            <div className="relative inline-block w-full max-w-xs">
              <select
                value={selectedSize}
                onChange={handleSizeChange}
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-orange-500 shadow-sm"
              >
                {PRODUCT_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              {/* Custom arrow for select input */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Quantity Input (manual only) */}
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

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors duration-300 shadow-lg"
          >
            Check out
          </button>
        </div>
      </div>
    </div>
  );
}
