'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// Define a type for the models object
interface Models {
  [key: string]: string[];
}

// Define a type for products
interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  alt: string;
  category: string;
  model: string;
}

// iPhone case products
const iphoneCaseProducts: Product[] = [
  {
    id: 'iphone-case',
    name: 'iPhone Case',
    price: '24.99',
    image: '/images/display/iphone-case.jpg',
    alt: 'Custom iPhone case',
    category: 'phonecase',
    model: 'iphone',
  },
  {
    id: 'devil-iphone-case',
    name: 'Devil iPhone Case',
    price: '25.99',
    image: '/images/phone case/devil.jpg',
    alt: 'Devil-themed custom iPhone case',
    category: 'phonecase',
    model: 'iphone',
  },
  {
    id: 'sky-iphone-case',
    name: 'Sky iPhone Case',
    price: '23.99',
    image: '/images/phone case/sky.jpg',
    alt: 'Sky-themed custom iPhone case',
    category: 'phonecase',
    model: 'iphone',
  },
  {
    id: 'tiger-iphone-case',
    name: 'Tiger iPhone Case',
    price: '26.99',
    image: '/images/phone case/tiger.jpg',
    alt: 'Tiger-themed custom iPhone case',
    category: 'phonecase',
    model: 'iphone',
  },
  {
    id: 'wtw-iphone-case',
    name: 'WTW iPhone Case',
    price: '24.99',
    image: '/images/phone case/wtw.jpg',
    alt: 'WTW-themed custom iPhone case',
    category: 'phonecase',
    model: 'iphone',
  },
];

// Other products (cloth and Samsung case)
const otherProducts: Product[] = [
  {
    id: 'pen',
    name: 'Pen T-shirt',
    price: '9.99',
    image: '/images/display/pen.jpg',
    alt: 'Cutie pen and strawberry T-shirt',
    category: 'cloth',
    model: 'tshirt',
  },
  {
    id: 'first-day-tee',
    name: 'First Day Tee',
    price: '29.99',
    image: '/images/display/first-day.jpg',
    alt: 'Custom T-shirt for first day events',
    category: 'cloth',
    model: 'tshirt',
  },
  {
    id: 'brother-hoodie',
    name: 'Brother Hoodie',
    price: '34.99',
    image: '/images/display/brother.jpg',
    alt: 'Brother-themed custom hoodie',
    category: 'cloth',
    model: 'hoodie',
  },
  {
    id: 'daughter-sweatshirt',
    name: 'Daughter Sweatshirt',
    price: '19.99',
    image: '/images/display/daughter.jpg',
    alt: 'Personalized sweatshirt for daughters',
    category: 'cloth',
    model: 'sweatshirt',
  },
  {
    id: 'samsung-case',
    name: 'Samsung Case',
    price: '22.99',
    image: '/images/display/samsung-case.jpg',
    alt: 'Custom Samsung case',
    category: 'phonecase',
    model: 'samsung',
  },
];

// Combine products
const products: Product[] = [...iphoneCaseProducts, ...otherProducts];

export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get category and model from query parameters
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedModel, setSelectedModel] = useState(searchParams.get('model') || '');

  // Available models based on category
  const models: Models = {
    cloth: ['tshirt', 'hoodie', 'sweatshirt'],
    phonecase: ['iphone', 'samsung', 'others'],
    all: [],
  };

  // Filter products based on category and model
  const filteredProducts = products.filter((product) => {
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
            <option value="cloth">Cloth</option>
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
                  src={product.image}
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