'use client';

import { useState, useEffect } from 'react';
import { useProductStore } from '@/app/stores/useProductStore';
import { ImageState } from '@/app/types';
import StaticProductPreview from '../StaticProductPreview';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductPreview() {
  const { product, setFinalImageState } = useProductStore();
  const { image } = product;
  const { url, processedUrl, highQualityProcessedUrl, imageState } = image;
  const [localImageState, setLocalImageState] = useState<ImageState>(imageState);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sync localImageState with store's imageState
  useEffect(() => {
    setLocalImageState(imageState);
  }, [imageState]);

  const getImageUrl = () => {
    switch (localImageState) {
      case ImageState.HighQuality:
        return highQualityProcessedUrl || processedUrl || url;
      case ImageState.Processed:
        return processedUrl || url;
      case ImageState.Original:
      default:
        return url;
    }
  };

  const isOptionDisabled = (mode: ImageState) => {
    if (mode === ImageState.Original) return false;
    if (mode === ImageState.Processed) return !processedUrl;
    if (mode === ImageState.HighQuality) return !highQualityProcessedUrl;
    return true;
  };

  const handleModeChange = (mode: ImageState) => {
    if (!isOptionDisabled(mode)) {
      setLocalImageState(mode);
      setFinalImageState(mode);
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-700">Preview:</h3>
      {url && (
        <div className="relative">
          <StaticProductPreview
            product={{
              ...product,
              image: { ...image, url: getImageUrl() },
            }}
          />
          {localImageState !== ImageState.HighQuality && highQualityProcessedUrl === null && (
            <div className="absolute top-2 right-2 bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
              Processing High-Quality Image...
            </div>
          )}
        </div>
      )}
      {url && (
        <div className="flex justify-center pt-2">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-4 py-2 text-sm font-semibold text-white rounded-full border-0 bg-orange-500 hover:bg-orange-200 transition-colors duration-3000"
            >
              {localImageState}            <span className="ml-2">&#9660;</span>

            </button>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10, transition: { delay: 0.2 } }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-orange-500 text-white shadow-lg rounded-lg z-50"
                >
                  {Object.values(ImageState).map((mode) => (
                    <div
                      key={mode}
                      onClick={() => handleModeChange(mode)}
                      className={`px-4 py-2 text-sm text-black bg-white font-semibold hover:bg-orange-200 transition-colors duration-200 ${
                        isOptionDisabled(mode) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                    >
                      {mode}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}