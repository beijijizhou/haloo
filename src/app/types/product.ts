export enum ImageState {
  Original = 'Original',
  Processed = 'Processed',
  HighQuality = 'High Quality',
}

export interface Image {
  url: string | null; // Original Base64 image or URL
  processedUrl: string | null; // Regular background-removed Base64 image
  highQualityProcessedUrl: string | null; // High-quality background-removed Base64 image
  imageState: ImageState; // Controls which image to display
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