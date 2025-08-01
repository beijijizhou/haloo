'use client';

import { useProductStore } from '@/app/stores/useProductStore';
import Image from 'next/image';

export default function ImagePreview() {
  const { product } = useProductStore();

  // Map product.color to Tailwind background classes
  const colorMap: { [key: string]: string } = {
    Blue: 'fill-blue-500',
    Red: 'fill-red-500',
    Black: 'fill-black',
    White: 'fill-white',
    // Fallback for unknown colors
    default: 'fill-gray-200',
  };

  const tshirtColor = colorMap[product.color] || colorMap.default;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium text-gray-700">Preview:</h3>
      <div className="relative w-full h-64 bg-gray-100 rounded-md overflow-hidden">
        {/* T-shirt SVG */}
        <svg
          className={`w-full h-full ${tshirtColor}`}
          viewBox="0 0 200 200"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* T-shirt shape */}
          <path
            d="M50 20 L20 50 L40 80 L40 150 A10 10 0 0 0 50 160 H150 A10 10 0 0 0 160 150 V80 L180 50 L150 20 H50 Z M60 80 H140 V140 H60 V80 Z"
          />
        </svg>
        {/* Uploaded image centered on T-shirt */}
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt="Uploaded design on T-shirt"
            width={80} // 40% of T-shirt width (200 * 0.4)
            height={80}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ objectFit: 'contain' }}
          />
        )}
      </div>
    </div>
  );
}