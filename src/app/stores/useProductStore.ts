import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { get, set } from 'idb-keyval';
import { PrintPosition } from '../lib/constants/category';
import { Product, Image, ImageState } from '../types';

type ProductStore = {
  product: Product;
  setProductSelection: (product: Partial<Product>) => void;
  setImage: (image: Partial<Image>) => void;
};

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      product: {
        id: '',
        category: '',
        subcategory: '',
        size: '',
        color: '',
        material: '',
        quantity: 1,
        price: 0,
        image: {
          url: null,
          processedUrl: null,
          highQualityProcessedUrl: null,
          imageState: ImageState.Original, // Neutral default
          printPosition: PrintPosition.Front,
        },
      },
      setProductSelection: (newProduct) =>
        set((state) => ({
          product: {
            ...state.product,
            ...newProduct,
          },
        })),
      setImage: (image) =>
        set((state) => ({
          product: {
            ...state.product,
            image: {
              ...state.product.image,
              ...image, // Merge partial image updates
            }, // Replace entire image object
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