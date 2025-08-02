'use client';

import { useRemoveBackground } from '@/app/hooks/useRemoveBackground';
import { useProductStore } from '@/app/stores/useProductStore';
import Image from 'next/image';
import { colorMap } from '../../lib/constants/tshirtColor';


export default function ProductPreview() {
  const { product, setUseProcessedImageUrl } = useProductStore();
  useRemoveBackground(product.image.url);
  const tshirtColor = colorMap[product.color] || colorMap.default;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-700">Preview:</h3>
      <div className="relative w-full h-64 bg-gray-100 rounded-md overflow-hidden">
        <Image
          src="/images/tshirt.svg"
          alt="T-shirt template"
          fill
          className="object-contain"
          style={{ filter: tshirtColor }}
        />
        {!product.image.url && (
          <div
            className="absolute top-[48%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-700 text-base font-bold text-center bg-gray-200/50 border-2 border-dashed border-gray-400 rounded"
            style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            Your Design Here
          </div>
        )}
        {product.image.url && (
          <Image
            src={
              product.image.useProcessedUrl && product.image.processedUrl
                ? product.image.processedUrl
                : product.image.url
            }
            alt="Uploaded design on T-shirt"
            width={64}
            height={64}
            className="absolute top-[48%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-95"
            style={{ objectFit: 'contain', filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))' }}
          />
        )}
      </div>
      {product.image.url && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setUseProcessedImageUrl(!product.image.useProcessedUrl)}
            className={`px-4 py-1 text-sm font-semibold rounded-full border-0 text-blue-600 ${product.image.useProcessedUrl ? 'bg-blue-100' : 'bg-blue-50'
              } hover:bg-blue-200 transition-colors duration-200`}
          >
            {product.image.useProcessedUrl ? 'Keep Background' : 'Remove Background'}
          </button>
        </div>
      )}
    </div>
  );
}