
import axios from 'axios';
import { useOrderStore } from '@/app/stores/useOrderStore';
import { useContactInfoStore } from '@/app/stores/useContactInfoStore';
import { useProductStore } from '../stores/useProductStore';

interface ConfirmationEmailResponse {
  message?: string;
  error?: string;
}

export const sendConfirmationEmail = async (): Promise<ConfirmationEmailResponse> => {
  const { imageUrl, quantity, price } = useOrderStore.getState();
  const { product } = useProductStore.getState();

  const { contactInfo } = useContactInfoStore.getState();

  const payload = {
    contactInfo,
    product,
    order: {
      price: quantity * price, 
      image: imageUrl || '', 
      quantity, // Quantity of the product ordered
      orderId: `ORDER-${Date.now()}`, // Generate a unique order ID
    }
  };

  try {
    
    const response = await axios.post<ConfirmationEmailResponse>('/api/send-order-confirmation', payload);
    return response.data;
  } catch {
    const errorMessage = 'Failed to send confirmation email';
    return { error: errorMessage };
  }
};
