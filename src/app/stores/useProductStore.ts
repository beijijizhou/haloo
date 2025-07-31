import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { get, set as Iset, values } from 'idb-keyval';
import { Product } from '@/app/types/product';

interface ProductState {
  product: Product;
  setProductSelection: (product: Partial<Product>) => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      product: {
        category: 'Clothing',
        subcategory: '',
        sizeOrModel: '',
        color: '',
        material: '',
        imageUrl: '',
        quantity: 1,
        price: 0,
      },
      setProductSelection: async (product) => {
        const newImageUrl = product.imageUrl;
        if (newImageUrl !== undefined) {
          try {
            await Iset('current-product-image', newImageUrl || '');
          } catch (error) {
            console.error('Failed to save imageUrl to IndexedDB:', error);
          }
        }
        set((state) => ({
          product: { ...state.product, ...product },
        }));
      },
    }),
    {
      name: 'product-data',
      partialize: (state) => ({
        product: {
          category: state.product.category,
          subcategory: state.product.subcategory,
          sizeOrModel: state.product.sizeOrModel,
          color: state.product.color,
          material: state.product.material,
          quantity: state.product.quantity,
          price: state.product.price,
        },
      }),
      // Load imageUrl from IndexedDB on initialization

    }
  )
);