export interface Image {
  url: string | null; // Original Base64 image
  processedUrl: string | null; // Background-removed Base64 image
  useProcessedUrl: boolean; // Toggle processed vs. original
}

export interface Product {
  id: string;
  category: string;
  subcategory: string;
  sizeOrModel: string;
  color: string;
  material: string;
  quantity: number;
  price: number;
  image: Image;
}