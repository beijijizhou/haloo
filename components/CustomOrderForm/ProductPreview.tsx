'use client';

import { useProductStore } from '@/app/stores/useProductStore';
import Image from 'next/image';
import { colorMap } from '../../lib/constants/tshirtColor';
import { useRemoveBackground } from './useRemoveBackground';

export default function ProductPreview() {
  const { product, setUseProcessedImage } = useProductStore();
  useRemoveBackground(product.imageUrl);
  const tshirtColor = colorMap[product.color] || colorMap.default;

  const handleToggle = () => {
    setUseProcessedImage(!product.useProcessedImage);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-700">Preview:</h3>
      <div className="relative w-full h-64 bg-gray-100 rounded-md overflow-hidden">
        {/* T-shirt SVG */}
        <Image
          src="/images/tshirt.svg"
          alt="T-shirt template"
          fill
          className="object-contain"
          style={{ filter: tshirtColor }}
        />
        {/* Placeholder text when no image */}
        {!product.imageUrl && (
          <div
            className="absolute top-[48%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-700 text-base font-bold text-center bg-gray-200/50 border-2 border-dashed border-gray-400 rounded"
            style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            Your Design Here
          </div>
        )}
        {/* Processed or original image centered on printable area */}
        {product.imageUrl && (
          <Image
            src={product.useProcessedImage && product.processedImage ? product.processedImage : product.imageUrl}
            alt="Uploaded design on T-shirt"
            width={64} // 80% of printable area width (80 * 0.8)
            height={64}
            className="absolute top-[48%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-95"
            style={{ objectFit: 'contain', filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))' }}
          />
        )}
      </div>
      {/* Toggle button at bottom */}
      {product.imageUrl && (
        <div className="flex justify-center pt-2">
          <button
            onClick={handleToggle}
            className={`px-4 py-1 text-sm font-semibold rounded-full border-0 text-blue-600 ${
              product.useProcessedImage ? 'bg-blue-100' : 'bg-blue-50'
            } hover:bg-blue-200 transition-colors duration-200`}
          >
            {product.useProcessedImage ? 'Keep Background' : 'Remove Background'}
          </button>
        </div>
      )}
    </div>
  );
}