import { ImageState } from './../types/product';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { get, set } from 'idb-keyval';
import { Product, Image } from '../types';
import { PrintPosition } from '../lib/constants/category';

type ProductStore = {
  product: Product;
  setProductSelection: (product: Partial<Product>) => void;
  setFinalImageState: (displayMode: ImageState) => void;
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
        quantity: 1,
        price: 0,
        image: {
          url: null,
          processedUrl: null,
          highQualityProcessedUrl: null,
          imageState: ImageState.Processed,
          printPosition:PrintPosition.Front
        },
      },
      setProductSelection: (newProduct) =>
        set((state) => ({
          product: {
            ...state.product,
            ...newProduct,
          },
        })),
      setFinalImageState: (displayMode) =>
        set((state) => ({
          product: {
            ...state.product,
            image: {
              ...state.product.image,
              imageState: displayMode,
            },
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