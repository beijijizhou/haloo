import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/app/types/product';
import { CartItem } from '../types';



/**
 * State and actions for managing the shopping cart.
 */
interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
        addItem: (product) => {
            const existingItem = get().items.find((item) => item.product.imageUrl === product.imageUrl);
            if (existingItem) {
            // If the item already exists, increase its quantity
            set((state) => ({
                items: state.items.map((item) =>
                item.product.imageUrl === product.imageUrl
                    ? { ...item, product: { ...item.product, quantity: item.product.quantity + 1 } }
                    : item
                ),
            }));
            } else {
            // Otherwise, add a new item to the cart
            const newItem: CartItem = {
                id: crypto.randomUUID(),
                product: {
                ...product,
                quantity: 1, // Default to 1 when adding a new item
                },
            };
            set((state) => ({ items: [...state.items, newItem] }));
            }
        },
      // Increase quantity of an item in the cart
      // If the item doesn't exist, it will not be added
      // This prevents adding the same item multiple times
      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, product: { ...item.product, quantity: item.product.quantity + 1 } }
              : item
          ),
        })),
      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items
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
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-data',
    }
  )
)