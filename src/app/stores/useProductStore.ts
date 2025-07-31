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
  clearStorage: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      product: {
        category: '',
        subcategory: '',
        sizeOrModel: '',
        color: '',
        material: '',
        imageUrl: '',
        quantity: 1,
        price: 0,
      },
      setProductSelection: ({ category, subcategory, sizeOrModel, color, material, imageUrl, quantity, price }) =>
        set({
          product: {
            category,
            subcategory,
            sizeOrModel,
            color,
            material,
            imageUrl,
            quantity: quantity || 1, // Default to 1 if not provided
            price: price || 0, // Default to 0 if not provided
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
            imageUrl: '',
            quantity: 1,
            price: 0,
          },
        }),
      clearStorage: () => {
        try {
          localStorage.removeItem('product-data');
          set({
            product: {
              category: '',
              subcategory: '',
              sizeOrModel: '',
              color: '',
              material: '',
              imageUrl: '',
              quantity: 1,
              price: 0,
            },
          });
        } catch (error) {
          console.error('Failed to clear product storage:', error);
        }
      },
    }),
    {
      name: 'product-data',
    }
  )
);