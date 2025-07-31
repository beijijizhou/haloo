import { ContactInfo } from './contactInfo';
import { Product } from './product';

/**
 * Payload for sending order confirmation emails.
 */
export interface ConfirmationEmailPayload {
  contactInfo: ContactInfo;
  product: Product;
  order: {
    price?: number; // Optional, matches original EmailPayload
    image: string; // Required, base64 image string
    quantity?: number; // Optional, matches original EmailPayload
    orderId?: string; // Optional, for email subject or body
  };
}