'use client';

import Link from 'next/link';
import { useState } from 'react';
import CustomOrderForm from '../../../components/CustomOrderForm';
import { useProductSelector } from '../hooks/useProductSelector';
import { useCartStore } from '../stores/useCartStore';
import { useProductStore } from '../stores/useProductStore';

export default function CreatePage() {
  const {
    selections: { category, subcategory, size, color },
  } = useProductSelector();
  const { product } = useProductStore();
  const { image } = product
  const { addProduct } = useCartStore();
  const [showNotification, setShowNotification] = useState(false);

  const isAddToCartDisabled = () => {
    // Required fields for Clothing
    return !(
      category &&
      subcategory &&
      size &&
      color &&
      image.url &&
      image.printPosition
    );
  };

  const handleAddToCart = () => {
    addProduct(product);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000); // Hide after 3 seconds
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create Your Order</h1>
      <CustomOrderForm />
      <div className="mt-8">
        {showNotification && (
          <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg shadow-md transition-opacity duration-500 ease-in-out">
            Product successfully added to cart!
          </div>
        )}
        <div>
          <button
            onClick={handleAddToCart}
            disabled={isAddToCartDisabled()}
            className={`w-full py-3 px-8 rounded-full text-lg font-bold transition duration-300 ${isAddToCartDisabled()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
          >
            Add to Cart
          </button>
        </div>
        <Link href="/" className="text-sm text-gray-500 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}