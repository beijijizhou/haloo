'use client';

import Image from 'next/image';
import { useProductStore } from '@/app/stores/useProductStore';
import { useImageUploader } from '@/app/hooks/useImageUploader';

export default function ImageUploader() {
  const { product } = useProductStore();
  const { error, success, handleFileChange } = useImageUploader();

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="image-upload"
          className="block text-lg font-medium text-gray-700 mb-1"
        >
          Select a PNG file:
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/png"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {success && (
        <p className="text-sm text-green-600" role="status">
          {success}
        </p>
      )}

      {product.image.url && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-700">Preview:</h3>
          <div className="relative w-full h-64 bg-gray-100 rounded-md overflow-hidden">
            <Image
              src={product.image.url}
              alt="Uploaded PNG preview"
              fill
              style={{ objectFit: 'contain' }}
              className="rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
}