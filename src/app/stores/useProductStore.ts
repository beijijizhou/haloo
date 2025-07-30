import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/app/types/product';

/**
 * State and actions for managing product selection.
 */
interface ProductState {
  product: Product;
  setProductSelection: (data: Product) => void;
  reset: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      product: {
        category: '',
        subcategory: '',
        sizeOrModel: '',
        color: '', // Initialize as undefined
        material: '',
      },
      setProductSelection: ({ category, subcategory, sizeOrModel, color, material }) =>
        set({
          product: {
            category,
            subcategory,
            sizeOrModel,
            color: category === 'Phone Cases' ? '' : color, // Set undefined for Phone Cases
            material,
          },
        }),
      reset: () =>
        set({
          product: {
            category: '',
            subcategory: '',
            sizeOrModel: '',
            color: '',
            material: '',
          },
        }),
    }),
    {
      name: 'product-data',
    }
  )
);