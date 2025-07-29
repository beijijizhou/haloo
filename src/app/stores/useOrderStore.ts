import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OrderState {
  file: File | null;
  imageUrl: string;
  category: string;
  subcategory: string;
  sizeOrModel: string;
  setImage: (data: { file: File | null; imageUrl: string }) => void;
  setProductSelection: (data: { category: string; subcategory: string; sizeOrModel: string }) => void;
  reset: () => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      file: null,
      imageUrl: '',
      category: '',
      subcategory: '',
      sizeOrModel: '',
      setImage: ({ file, imageUrl }) => set({ file, imageUrl }),
      setProductSelection: ({ category, subcategory, sizeOrModel }) =>
        set({ category, subcategory, sizeOrModel }),
      reset: () =>
        set({ file: null, imageUrl: '', category: '', subcategory: '', sizeOrModel: '' }),
    }),
    {
      name: 'order-data', // Replaces localStorage key 'orderData'
    }
  )
);