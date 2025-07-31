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
      storage: {
        getItem: async (name) => {
          const value = localStorage.getItem(name);
          const parsed = value ? JSON.parse(value) : null;
          console.log('Loading product from localStorage:', parsed);
          values().then((values) => console.log(values));

          if (parsed.product) {
            try {
              const imageUrl = await get('current-product-image');
              parsed.product.imageUrl = imageUrl || '';
            } catch (error) {
              console.error('Failed to load imageUrl from IndexedDB:', error);
            }
          }
          console.log('Final parsed product state:', parsed);
          return parsed;
        },
        setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);