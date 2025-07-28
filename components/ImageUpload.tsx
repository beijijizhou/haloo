'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  onUpload: (file: File | null) => void;
}

export default function ImageUpload({ onUpload }: ImageUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);
    setSuccess(null);

    if (!file) {
      setSelectedFile(null);
      setPreviewUrl(null);
      onUpload(null);
      return;
    }

    if (file.type !== 'image/png') {
      setError('Only PNG files are allowed!');
      setSelectedFile(null);
      setPreviewUrl(null);
      onUpload(null);
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setSuccess('PNG file selected successfully!');
    onUpload(file);

    return () => URL.revokeObjectURL(url);
  };

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
  );
}