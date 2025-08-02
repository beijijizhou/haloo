'use client';

import Image from 'next/image';
import { colorMap } from '@/app/lib/constants/tshirtColor';
import { Product } from '@/app/types';

export default function StaticProductPreview({ product }: { product: Product }) {
  const { image } = product;
  const { url, processedUrl, useProcessedUrl } = image;
  // console.log('StaticProductPreview: processedUrl:', processedUrl);
  const tshirtColor = colorMap[product.color] || colorMap.default;
  return (
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
  );
}