/**
 * Represents product details for an order.
 */
export interface Product {
  category: string;
  subcategory: string;
  sizeOrModel: string;
  color: string; // Empty string for Phone Cases
  material: string;
  imageUrl: string; // Base64 image string or URL
  quantity: number; // Quantity of the product
  price: number; // Unit price in dollars
}