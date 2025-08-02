import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { get, set } from 'idb-keyval';
import { Product, Image } from '../types';

type ProductStore = {
  product: Product;
  setProductSelection: (product: Partial<Product>) => void;
  setUseProcessedImageUrl: (useProcessed: boolean) => void;
  setProcessedImageUrl: (processedImageUrl: string | null) => void;
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
            image: {
              ...state.product.image,
              ...(newProduct.image || {}),
              useProcessedUrl:
                newProduct.image?.url !== undefined
                  ? true
                  : state.product.image.useProcessedUrl,
              processedUrl:
                newProduct.image?.url !== undefined ? null : state.product.image.processedUrl,
            },
          },
        })),
      setUseProcessedImageUrl: (useProcessed) =>
        set((state) => ({
          product: {
            ...state.product,
            image: { ...state.product.image, useProcessedUrl: useProcessed },
          },
        })),
      setProcessedImageUrl: (processedImageUrl) =>
        set((state) => ({
          product: {
            ...state.product,
            image: { ...state.product.image, processedUrl: processedImageUrl },
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