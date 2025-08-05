import { useState, useEffect } from 'react';
import { useProductStore } from '../stores/useProductStore';
import { removeBackground } from '../utils/removeBackground';
import { highQualityRemove } from '../utils/test';



type UseImageUploaderReturn = {
  error: string | null;
  success: string | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
};

export const useImageUploader = (): UseImageUploaderReturn => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { product, setImage } = useProductStore();

  useEffect(() => {
    return () => {
      if (product.image.url && product.image.url.startsWith('blob:')) {
        URL.revokeObjectURL(product.image.url);
      }
    };
  }, [product.image.url]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);
    setSuccess(null);

    if (!file) {
      setImage({ url: null, processedUrl: null });
      return;
    }

    if (file.type !== 'image/png') {
      setError('Only PNG files are allowed!');
      setImage({ url: null, processedUrl: null });
      return;
    }

    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      });
      const base64 = await base64Promise;
      const processedUrl = await removeBackground(base64);
      //  const result = highQualityRemove(base64);
      // console.log(result)
      setImage({ url: base64, processedUrl });

      setSuccess('PNG file selected and processed successfully!');
    } catch (error) {
      setError('Failed to process image');
      console.error('Error:', error);
      setImage({ url: null, processedUrl: null });
    }
  };

  return { error, success, handleFileChange };
};