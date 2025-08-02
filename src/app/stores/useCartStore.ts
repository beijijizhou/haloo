import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { get, set as setIDB, del, clear, values } from 'idb-keyval';
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
  removeProduct: (id: string) => Promise<void>;
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
            item.product.image.url === product.image.url
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
            await setIDB(`cart-item-image-${id}`, product.image.url || '');
            console.log(`Saved imageUrl for cart item ${id}:`, product.image.url ? 'Present' : 'Empty');
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
          clear();
          values().then((v) => console.log('Cleared IndexedDB entries:', v));
          localStorage.removeItem('cart-data');
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
          try {
            const value = localStorage.getItem(name);
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
                  // console.log(`Loaded imageUrl for cart item ${item.id}:`, imageUrl ? 'Present' : 'Empty');
                  return {
                    ...item,
                    product: { ...item.product, imageUrl: imageUrl || '' },
                  };
                } catch (error) {
                  console.error(`Failed to load imageUrl for cart item ${item.id}:`, error);
                  return {
                    ...item,
                    product: { ...item.product, imageUrl: '' },
                  };
                }
              })
            );
            // console.log('Loaded cart from localStorage:', { products: productsWithImages });
            return { state: { products: productsWithImages } };
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