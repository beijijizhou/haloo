import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { get, set as setIDB, keys, clear } from 'idb-keyval';
import { Product } from '@/app/types/product';

interface CartItem {
  id: string;
  product: Product;
}

interface CartState {
  products: CartItem[];
  addProduct: (product: Product) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  getStorageInfo: () => Promise<number>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      products: [],
      addProduct: async (product) => {
        const id = `${product.category}-${product.subcategory}-${product.sizeOrModel}-${product.material}-${Date.now()}`;
        const existingProduct = get().products.find(
          (item) =>
            item.product.category === product.category &&
            item.product.subcategory === product.subcategory &&
            item.product.sizeOrModel === product.sizeOrModel &&
            item.product.material === product.material &&
            item.product.color === product.color &&
            item.product.imageUrl === product.imageUrl
        );
        if (existingProduct) {
          set((state) => ({
            products: state.products.map((item) =>
              item.id === existingProduct.id
                ? {
                  ...item,
                  product: {
                    ...item.product,
                    quantity: item.product.quantity + (product.quantity || 1),
                  },
                }
                : item
            ),
          }));
        } else {
          try {
            await setIDB(`cart-item-image-${id}`, product.imageUrl || '');
          } catch (error) {
            console.error('Failed to save imageUrl to IndexedDB:', error);
            await clear();
            localStorage.clear();
          }
          set((state) => ({
            products: [
              ...state.products,
              {
                id,
                product: {
                  ...product,
                  color: product.category === 'Phone Cases' ? '' : product.color,
                  quantity: product.quantity || 1,
                },
              },
            ],
          }));
        }
      },
      increaseQuantity: (id) =>
        set((state) => ({
          products: state.products.map((item) =>
            item.id === id
              ? { ...item, product: { ...item.product, quantity: item.product.quantity + 1 } }
              : item
          ),
        })),
      decreaseQuantity: (id) =>
        set((state) => ({
          products: state.products
            .map((item) =>
              item.id === id
                ? {
                  ...item,
                  product: { ...item.product, quantity: Math.max(1, item.product.quantity - 1) },
                }
                : item
            )
            .filter((item) => item.product.quantity > 0),
        })),
      clearCart: async () => {
        await clear();
        get().getStorageInfo();
        localStorage.clear();
        set({ products: [] });
      },
      getStorageInfo: async () => {
        try {
          const allKeys = await keys();
          const cartImageKeys = allKeys.filter((key) => key.toString().startsWith('cart-item-image-'));
          return cartImageKeys.length;
        } catch (error) {
          console.error('Failed to get IndexedDB storage info:', error);
          return 0;
        }
      },
    }),
    {
      name: 'cart-data',
      partialize: (state) => ({
        products: state.products.map((item) => ({
          id: item.id,
          product: {
            category: item.product.category,
            subcategory: item.product.subcategory,
            sizeOrModel: item.product.sizeOrModel,
            color: item.product.color,
            material: item.product.material,
            quantity: item.product.quantity,
            price: item.product.price,
          },
        })),
      }),
      storage: {
        getItem: async (name) => {
          const value = localStorage.getItem(name);
          const parsed = value ? JSON.parse(value) : null;
          if (parsed && parsed.products) {
            try {
              const productsWithImages = await Promise.all(
                parsed.products.map(async (item: CartItem) => {
                  const imageUrl = await get(`cart-item-image-${item.id}`);
                  return {
                    ...item,
                    product: { ...item.product, imageUrl: imageUrl || '' },
                  };
                })
              );
              parsed.products = productsWithImages;
            } catch (error) {
              console.error('Failed to load cart item images from IndexedDB:', error);
            }
          }
          return parsed;
        },
        setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);