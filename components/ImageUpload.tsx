'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ProductSelector from './ProductSelector';

interface ImageUploadProps {
  onUpload: (data: { file: File | null; imageUrl: string; category: string; subcategory: string; sizeOrModel: string }) => void;
}

export default function ImageUpload({ onUpload }: ImageUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);
    setSuccess(null);

    if (!file) {
      setSelectedFile(null);
      setPreviewUrl(null);
      setImageUrl('');
      onUpload({ file: null, imageUrl: '', category: '', subcategory: '', sizeOrModel: '' });
      return;
    }

    if (file.type !== 'image/png') {
      setError('Only PNG files are allowed!');
      setSelectedFile(null);
      setPreviewUrl(null);
      setImageUrl('');
      onUpload({ file: null, imageUrl: '', category: '', subcategory: '', sizeOrModel: '' });
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

      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setSuccess('PNG file selected successfully!');
      setImageUrl(base64);
      onUpload({ file, imageUrl: base64, category: '', subcategory: '', sizeOrModel: '' });
    } catch (error) {
      setError('Failed to process image');
      console.error('Error:', error);
    }
  };

  const handleProductSelection = (data: { category: string; subcategory: string; sizeOrModel: string }) => {
    onUpload({ file: selectedFile, imageUrl, ...data });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Side: Image Upload */}
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

        {previewUrl && selectedFile && (
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-700">Preview:</h3>
            <div className="relative w-full h-64 bg-gray-100 rounded-md overflow-hidden">
              <Image
                src={previewUrl}
                alt="Uploaded PNG preview"
                fill
                style={{ objectFit: 'contain' }}
                className="rounded-md"
              />
            </div>
          </div>
        )}
      </div>

      {/* Right Side: Product Selector */}
      <ProductSelector onChange={handleProductSelection} />
    </div>
  );
}