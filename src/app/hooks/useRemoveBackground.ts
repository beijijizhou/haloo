import { useProductStore } from '@/app/stores/useProductStore';
import { useEffect } from 'react';

export const useRemoveBackground = (imageUrl: string | null) => {
  const { setProcessedImageUrl } = useProductStore();

  useEffect(() => {
    if (!imageUrl) {
      setProcessedImageUrl(null);
      return;
    }

    const removeBackground = async (url: string) => {
      try {
        const img = new window.Image();
        img.crossOrigin = 'Anonymous';
        img.src = url;

        await new Promise((resolve) => {
          img.onload = resolve;
        });

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas context not available');

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          if (r > 200 && g > 200 && b > 200) {
            data[i + 3] = 0; // Set alpha to 0 (transparent)
          }
        }

        ctx.putImageData(imageData, 0, 0);
        const processedBase64 = canvas.toDataURL('image/png');
        setProcessedImageUrl(processedBase64);
      } catch (error) {
        console.error('Failed to remove background:', error);
        setProcessedImageUrl(url); // Fallback to original image
      }
    };

    removeBackground(imageUrl);
  }, [imageUrl, setProcessedImageUrl]);
};