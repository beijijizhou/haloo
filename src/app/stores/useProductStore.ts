import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { get, set } from 'idb-keyval';

export type Product = {
  id: string;
  imageUrl: string;
  color: string;
  size: string;
  useProcessedImage: boolean;
  processedImage: string | null;
};

type ProductStore = {
  product: Product;
  setProductSelection: (product: Partial<Product>) => void;
  setUseProcessedImage: (useProcessed: boolean) => void;
  setProcessedImage: (processedImage: string | null) => void;
};

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      product: {
        id: '',
        imageUrl: '',
        color: '',
        size: '',
        useProcessedImage: true,
        processedImage: null,
      },
      setProductSelection: (newProduct) =>
        set((state) => ({
          product: {
            ...state.product,
            ...newProduct,
            useProcessedImage: newProduct.imageUrl !== undefined ? true : state.product.useProcessedImage,
            processedImage: newProduct.imageUrl !== undefined ? null : state.product.processedImage,
          },
        })),
      setUseProcessedImage: (useProcessed) =>
        set((state) => ({
          product: { ...state.product, useProcessedImage: useProcessed },
        })),
      setProcessedImage: (processedImage) =>
        set((state) => ({
          product: { ...state.product, processedImage },
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