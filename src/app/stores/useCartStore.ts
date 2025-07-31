import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { get, set as setIDB, keys, del, entries } from 'idb-keyval';
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
  clearCart: () => Promise<void>;
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
            console.log(`Saved imageUrl for cart item ${id}:`, product.imageUrl ? 'Present' : 'Empty');
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
        try {
          // Log all cart-related entries before clearing
          const allEntries = await entries();
          const cartEntries = allEntries.filter(([key]) => key.toString().startsWith('cart-item-image-'));
          console.log('Cart IndexedDB entries before clearing:', cartEntries);

          // Delete only cart-related entries
          for (const [key] of cartEntries) {
            await del(key);
          }

          set({ products: [] });
          // Log remaining entries to confirm clearing
          const remainingEntries = await entries();
          console.log('Cart IndexedDB entries after clearing:', remainingEntries);
        } catch (error) {
          console.error('Failed to clear cart IndexedDB entries:', error);
        }
      },
    }),
    {
      name: 'cart-data',
      partialize: (state) => ({
        state: {
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
        },
      }),
      storage: {
        getItem: async (name) => {
          try {
            const value = await localStorage.getItem(name);
            const parsed = value
              ? JSON.parse(value)
              : { state: { products: [] } };
            console.log('Loading cart from localStorage:', parsed);
            if (parsed && parsed.state && parsed.state.products) {
              const productsWithImages = await Promise.all(
                parsed.state.products.map(async (item: CartItem) => {
                  const imageUrl = await get(`cart-item-image-${item.id}`);
                  console.log(`Loaded imageUrl for cart item ${item.id}:`, imageUrl ? 'Present' : 'Empty');
                  return {
                    ...item,
                    product: { ...item.product, imageUrl: imageUrl || '' },
                  };
                })
              );
              parsed.state.products = productsWithImages;
              console.log('Final parsed cart state:', parsed);
            }
            return parsed;
          } catch (error) {
            console.error('Failed to load cart from localStorage or IndexedDB:', error);
            return { state: { products: [] } };
          }
        },
        setItem: (name, value) => {
          console.log('Saving cart to localStorage:', value);
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);