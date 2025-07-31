import { Product } from './product';

/**
 * Represents an item in the shopping cart.
 */
export interface CartItem {
  id: string; // Unique identifier for the cart item
  product: Product;

}