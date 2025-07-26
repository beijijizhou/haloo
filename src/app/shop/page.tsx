'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { mockProducts } from '../../../lib/constants/product';

// Define a type for the models object
interface Models {
  [key: string]: string[];
}

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get category and model from query parameters
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedModel, setSelectedModel] = useState(searchParams.get('model') || '');

  // Sync state with searchParams when URL changes
  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    const model = searchParams.get('model') || '';
    setSelectedCategory(category);
    setSelectedModel(model);
  }, [searchParams]);

  // Log for debugging
  console.log('Selected Category:', selectedCategory);
  console.log('Selected Model:', selectedModel);

  // Available models based on category
  const models: Models = {
    clothing: ['Tshirts', 'Hoodies', 'sweatshirt'],
    phonecase: ['iphone', 'samsung', 'others'],
    all: [],
  };

  // Filter products based on category and model
  const filteredProducts = mockProducts.filter((product) => {
    if (selectedCategory === 'all') return true;
    if (product.category !== selectedCategory) return false;
    if (selectedModel && product.model !== selectedModel) return false;
    return true;
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (selectedModel) params.set('model', selectedModel);
    router.push(`/shop?${params.toString()}`, { scroll: false });
  }, [selectedCategory, selectedModel, router]);

  // Reset model when category changes
  useEffect(() => {
    setSelectedModel('');
  }, [selectedCategory]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Shop Products
      </h1>

      {/* Category and Model Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
        <div>
          <label htmlFor="category" className="mr-2 text-gray-700 font-medium">
            Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="all">All</option>
            <option value="clothing">Clothing</option>
            <option value="phonecase">Phone Case</option>
          </select>
        </div>

        {selectedCategory !== 'all' && (
          <div>
            <label htmlFor="model" className="mr-2 text-gray-700 font-medium">
              Model:
            </label>
            <select
              id="model"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">All Models</option>
              {models[selectedCategory].map((model) => (
                <option key={model} value={model}>
                  {model.charAt(0).toUpperCase() + model.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.length === 0 ? (
          <p className="text-center col-span-full text-gray-600">
            No products found for the selected filters.
          </p>
        ) : (
          filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${product.id}`}
              className="group block bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative w-full h-72 bg-gray-100 flex items-center justify-center overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.alt}
                  fill
                  style={{ objectFit: 'cover' }}
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
          ))
        )}
      </div>
    </div>
  );
}

// Main ShopPage component with Suspense boundary
export default function ShopPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}