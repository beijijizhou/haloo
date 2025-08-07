import { PrintPosition } from "../lib/constants/category";

export enum ImageState {
  Original = 'Original',
  Processed = 'Processed',
  AI = 'AI Processed',
}

export interface Image {
  url: string | null; // Original Base64 image or URL
  processedUrl: string | null; // Regular background-removed Base64 image
  highQualityProcessedUrl: string | null; // High-quality background-removed Base64 image
  imageState: ImageState; // Controls which image to display
  printPosition: PrintPosition,
}

export interface Product {
  id: string;
  category: string;
  subcategory: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  image: Image;
}