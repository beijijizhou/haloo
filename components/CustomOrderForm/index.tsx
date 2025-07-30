'use client';

import { useOrderStore } from '@/app/stores/useOrderStore';
import ImageUploader from './ImageUploader';
import ProductSelector from './ProductSelector';

export default function CustomOrderForm() {
  const { file, category, subcategory, sizeOrModel, step, setStep } = useOrderStore();
  const handleNext = () => {
    if (step === 1 && (!file || !category || !subcategory || !sizeOrModel)) {
      alert('Please upload a PNG file and select a category, item, and size/model.');
      return;
    }
    setStep(step + 1 as 1 | 2 | 3);
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side: Image Upload */}

        <ImageUploader />
        {/* Right Side: Product Selection */}
        <ProductSelector />

      </div>
      <div className='mt-2'>
        <button
          onClick={handleNext}
          disabled={!file || !category || !subcategory || !sizeOrModel}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </>

  );
}