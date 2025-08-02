import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { get, set } from 'idb-keyval';
import { Product, Image } from '../types';

type ProductStore = {
  product: Product;
  setProductSelection: (product: Partial<Product>) => void;
  setUseProcessedUrl: (useProcessed: boolean) => void;
  setImage: (image: Partial<Image>) => void;
};

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      product: {
        id: '',
        category: '',
        subcategory: '',
        sizeOrModel: '',
        color: '',
        material: '',
        quantity: 1,
        price: 0,
        image: {
          url: null,
          processedUrl: null,
          useProcessedUrl: true,
        },
      },
      setProductSelection: (newProduct) =>
        set((state) => ({
          product: {
            ...state.product,
            ...newProduct,
          },
        })),
      setUseProcessedUrl: (useProcessed) =>
        set((state) => ({
          product: {
            ...state.product,
            image: { ...state.product.image, useProcessedUrl: useProcessed },
          },
        })),
      setImage: (image) =>
        set((state) => ({
          product: {
            ...state.product,
            image: {
              ...state.product.image,
              ...image,
            },
          },
        })),
    }),
    {
      name: 'product-store',
      storage: createJSONStorage(() => ({
        getItem: async (name) => {
          const value = await get(name);
          return value ? JSON.stringify(value) : null;
        },
        setItem: async (name, value) => {
          await set(name, JSON.parse(value));
        },
        removeItem: async (name) => {
          await set(name, undefined);
        },
      })),
    }
  )
);