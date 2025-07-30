import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OrderState {
  file: File | null;
  imageUrl: string;
  category: string;
  subcategory: string;
  sizeOrModel: string;
  price: number; // Optional, can be calculated later
  quantity: number; // Optional, can be set in the component
  step: 1 | 2 | 3; // Current step in the order process
  setStep: (step: 1 | 2 | 3) => void;
  setImage: (data: { file: File | null; imageUrl: string }) => void;
  setProductSelection: (data: { category: string; subcategory: string; sizeOrModel: string }) => void;
  reset: () => void;
  setQuantity: (quantity: number) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      file: null,
      imageUrl: '',
      category: '',
      subcategory: '',
      sizeOrModel: '',
      step: 1,
      quantity: 1, // Default quantity
      price: 10, // Default price, can be updated later
      setStep: (step) => set({ step }),
      setImage: ({ file, imageUrl }) => {
        // Validate Base64 image
        if (imageUrl) {
          const base64Regex = /^data:image\/png;base64,/;
          if (!base64Regex.test(imageUrl)) {
            throw new Error('Invalid Base64 image format. Expected PNG.');
          }
          // Check size (Base64 is ~1.33x larger than binary)
          const content = imageUrl.replace(base64Regex, '');
          const sizeInBytes = (content.length * 3) / 4;
          if (sizeInBytes > 5 * 1024 * 1024) {
            throw new Error('Image size exceeds 5MB limit');
          }
        }
        set({ file, imageUrl });
      },
      setProductSelection: ({ category, subcategory, sizeOrModel }) =>
        set({ category, subcategory, sizeOrModel }),
      setQuantity: (quantity) => set({ quantity }),
      reset: () =>
        set({ file: null, imageUrl: '', category: '', subcategory: '', sizeOrModel: '' }),
    }),
    {
      name: 'order-data',
    }
  )
);