'use client';

import ImagePreview from './ImagePreview';
import ImageUploader from './ImageUploader';
import ProductSelector from './ProductSelector';

export default function CustomOrderForm() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side: Image Upload */}

        <ImageUploader />
        {/* Right Side: Product Selection */}
        <ProductSelector />
        <ImagePreview />
      </div>

    </>

  );
}