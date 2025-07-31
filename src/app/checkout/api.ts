
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
  const { product} = useProductStore.getState();

  const { contactInfo } = useContactInfoStore.getState();
  
  const payload = {
    contactInfo,
    product,
    price: quantity * price, // Convert cents to dollars
    image: imageUrl || '', // Base64 image string
    quantity, // Included for potential API use
    // orderId, // Included for email subject or body
  };

  try {
    // console.log('Sending confirmation email with payload:', payload);
    const response = await axios.post<ConfirmationEmailResponse>('/api/send-order-confirmation', payload);
    return response.data;
  } catch {
    const errorMessage = 'Failed to send confirmation email';
    return { error: errorMessage };
  }
};
