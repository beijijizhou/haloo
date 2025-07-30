import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ImageState {
  file: File | null;
  imageUrl: string;
  setImage: (data: { file: File | null; imageUrl: string }) => void;
  reset: () => void;
}

export const useImageStore = create<ImageState>()(
  persist(
    (set) => ({
      file: null,
      imageUrl: '',
      setImage: ({ file, imageUrl }) => {
        if (imageUrl) {
          const base64Regex = /^data:image\/png;base64,/;
          if (!base64Regex.test(imageUrl)) {
            throw new Error('Invalid Base64 image format. Expected PNG.');
          }
          const content = imageUrl.replace(base64Regex, '');
          const sizeInBytes = (content.length * 3) / 4;
          if (sizeInBytes > 5 * 1024 * 1024) {
            throw new Error('Image size exceeds 5MB limit');
          }
        }
        set({ file, imageUrl });
      },
      reset: () => set({ file: null, imageUrl: '' }),
    }),
    {
      name: 'image-data',
    }
  )
);
