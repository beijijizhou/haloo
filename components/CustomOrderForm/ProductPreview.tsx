'use client';

import { useProductStore } from '@/app/stores/useProductStore';
import StaticProductPreview from '../StaticProductPreview';

export default function ProductPreview() {
  const { product, setUseProcessedUrl } = useProductStore();
  const { image } = product;
  const { url, useProcessedUrl } = image;
  // console.log('ProductPreview: processedUrl:', processedUrl);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-700">Preview:</h3>
      <StaticProductPreview product={product} />
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