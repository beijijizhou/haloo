import { CartItem, Product } from "../types";

export function findMatchingProduct(products: CartItem[], product: Product): CartItem | undefined {
  return products.find(
    (item) =>
      item.product.category === product.category &&
      item.product.subcategory === product.subcategory &&
      item.product.sizeOrModel === product.sizeOrModel &&
      item.product.material === product.material &&
      item.product.color === product.color &&
      item.product.image.url === product.image.url &&
      item.product.image.processedUrl === product.image.processedUrl &&
      item.product.image.useProcessedUrl === product.image.useProcessedUrl
  );
}