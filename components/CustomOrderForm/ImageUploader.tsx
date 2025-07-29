'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useOrderStore } from '@/app/stores/useOrderStore';



export default function ImageUploader() {
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { setImage, imageUrl, file } = useOrderStore();

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };

  }, [imageUrl]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);
    setSuccess(null);

    if (!file) {

      setImage({ file: null, imageUrl: '' });
      return;
    }

    if (file.type !== 'image/png') {
      setError('Only PNG files are allowed!');

      setImage({ file: null, imageUrl: '' });
      return;
    }

    try {
      // Convert file to Base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      });
      const base64 = await base64Promise;


      setSuccess('PNG file selected successfully!');
      setImage({ file, imageUrl: base64 });
    } catch (error) {
      setError('Failed to process image');
      console.error('Error:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        {/* <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upload Your Image</h2> */}

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

      {imageUrl && file && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-700">Preview:</h3>
          <div className="relative w-full h-64 bg-gray-100 rounded-md overflow-hidden">
            <Image
              src={imageUrl}
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