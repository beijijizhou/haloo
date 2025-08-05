'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { get, set as setIDB, del, clear, values } from 'idb-keyval';
import { Product } from '@/app/types/product';
import { findMatchingProduct } from '../utils/findMatchingProduct';

interface CartItem {
  id: string;
  product: Product;
}

interface CartState {
  products: CartItem[];
  addProduct: (product: Product) => void;
  setQuantity: (id: string, quantity: number) => void;

  removeProduct: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      products: [],
      addProduct: async (newProduct) => {
        const id = `${newProduct.category}-${newProduct.subcategory}-${newProduct.sizeOrModel}-${newProduct.material}-${Date.now()}`;
        const existingProduct = findMatchingProduct(get().products, newProduct);
        if (existingProduct) {
          set((state) => ({
            products: state.products.map((item) =>
              item.id === existingProduct.id
                ? {
                  ...item,
                  product: {
                    ...item.product,
                    quantity: item.product.quantity + 1,
                  },
                }
                : item
            ),
          }));
        } else {
          try {
            await setIDB(`cart-item-image-${id}`, newProduct.image.url || '');
            console.log(`Saved imageUrl for cart item ${id}:`, newProduct.image.url ? 'Present' : 'Empty');
            set((state) => ({
              products: [
                ...state.products,
                {
                  id,
                  product: {
                    ...newProduct,
                    color: newProduct.category === 'Phone Cases' ? '' : newProduct.color,
                    quantity: newProduct.quantity || 1,
                  },
                },
              ],
            }));
          } catch (error) {
            if (error instanceof DOMException && error.name === 'QuotaExceededError') {
              console.error('IndexedDB quota exceeded. Please clear cart or remove items.');
              alert('Storage limit reached! Please clear your cart or remove items to add more.');
              return;
            }
            console.error('Failed to save imageUrl to IndexedDB:', error);
          }
        }
      },
      setQuantity: (id, quantity) =>
        set((state) => ({
          products: state.products
            .map((item) =>
              item.id === id
                ? {
                  ...item,
                  product: { ...item.product, quantity: Math.max(1, Math.floor(quantity)) },
                }
                : item
            )
            .filter((item) => item.product.quantity > 0),
        })),
      removeProduct: async (id) => {
        try {
          await del(`cart-item-image-${id}`);
          console.log(`Removed cart item ${id} from IndexedDB`);
          set((state) => ({
            products: state.products.filter((item) => item.id !== id),
          }));
        } catch (error) {
          console.error(`Failed to remove cart item ${id} from IndexedDB:`, error);
        }
      },
      clearCart: async () => {
        try {
          await clear();
          console.log('Cleared all IndexedDB entries');
          set({ products: [] });
        } catch (error) {
          console.error('Failed to clear cart IndexedDB entries:', error);
        }
      },
    }),
    {
      name: 'cart-data',
      partialize: (state) => ({
        products: state.products.map((item) => ({
          id: item.id,
          product:item.product
        })),
      }),
      storage: {
        getItem: async (name) => {
          try {
            const value = await get(name);
            let parsed = value ? JSON.parse(value) : { products: [] };
            // Handle nested state objects
            while (parsed.state && parsed.state.products) {
              parsed = parsed.state;
            }
            const products = parsed.products || [];
            const productsWithImages = await Promise.all(
              products.map(async (item: CartItem) => {
                try {
                  const imageUrl = await get(`cart-item-image-${item.id}`);
                  console.log(`Loaded imageUrl for cart item ${item.id}:`, imageUrl ? 'Present' : 'Empty');
                  return {
                    ...item,
                    product: { ...item.product, image: { ...item.product.image, url: imageUrl || '' } },
                  };
                } catch (error) {
                  console.error(`Failed to load imageUrl for cart item ${item.id}:`, error);
                  return {
                    ...item,
                    product: { ...item.product, image: { ...item.product.image, url: '' } },
                  };
                }
              })
            );
            console.log('Loaded cart from IndexedDB:', { products: productsWithImages });
            return { state: { products: productsWithImages } };
          } catch (error) {
            console.error('Failed to load cart from IndexedDB:', error);
            return { state: { products: [] } };
          }
        },
        setItem: async (name, value) => {
          try {
            await setIDB(name, JSON.stringify(value));
            console.log('Saved cart to IndexedDB:', value);
          } catch (error) {
            console.error('Failed to save cart to IndexedDB:', error);
          }
        },
        removeItem: async (name) => {
          try {
            await del(name);
            console.log('Removed cart from IndexedDB:', name);
          } catch (error) {
            console.error('Failed to remove cart from IndexedDB:', error);
          }
        },
      },
    }
  )
);