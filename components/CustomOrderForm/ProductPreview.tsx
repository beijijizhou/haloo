'use client';

import Image from 'next/image';
import { useProductStore } from '@/app/stores/useProductStore';
import { colorMap } from '@/app/lib/constants/tshirtColor';

export default function ProductPreview() {
  const { product, setUseProcessedUrl } = useProductStore();
  const { image } = product;
  const { url, processedUrl, useProcessedUrl } = image;
  console.log('ProductPreview: processedUrl:', processedUrl);
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
        {!url && (
          <div
            className="absolute top-[48%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-700 text-base font-bold text-center bg-gray-200/50 border-2 border-dashed border-gray-400 rounded"
            style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            Your Design Here
          </div>
        )}
        {url && !processedUrl && (
          <div
            className="absolute top-[48%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-700 text-base font-bold text-center bg-gray-200/50 border-2 border-dashed border-gray-400 rounded"
            style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            Processing Image...
          </div>
        )}
        {url && processedUrl && (
          <Image
            key={useProcessedUrl ? processedUrl : url}
            src={useProcessedUrl ? processedUrl : url}
            alt="Uploaded design on T-shirt"
            width={64}
            height={64}
            className="absolute top-[48%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-95"
            style={{ objectFit: 'contain', filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))' }}
          />
        )}
      </div>
      {url && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setUseProcessedUrl(!useProcessedUrl)}
            className={`px-4 py-1 text-sm font-semibold rounded-full border-0 text-blue-600 ${
              useProcessedUrl ? 'bg-blue-100' : 'bg-blue-50'
            } hover:bg-blue-200 transition-colors duration-200`}
          >
            {useProcessedUrl ? 'Keep Background' : 'Remove Background'}
          </button>
        </div>
      )}
    </div>
  );
}