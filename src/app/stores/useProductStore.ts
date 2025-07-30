import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProductState {
  category: string;
  subcategory: string;
  sizeOrModel: string;
  color: string;
  material: string;
  setProductSelection: (data: { category: string; subcategory: string; sizeOrModel: string; color: string; material: string }) => void;
  reset: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      category: '',
      subcategory: '',
      sizeOrModel: '',
      color: '',
      material: '',
      setProductSelection: ({ category, subcategory, sizeOrModel, color, material }) =>
        set({
          category,
          subcategory,
          sizeOrModel,
          color: category === 'Phone Cases' ? '' : color, // Clear color for Phone Cases
          material,
        }),
      reset: () => set({ category: '', subcategory: '', sizeOrModel: '', color: '', material: '' }),
    }),
    {
      name: 'product-data',
    }
  )
);