'use client';

import { useState, useCallback } from 'react';
import axios from 'axios';
import { useOrderStore } from '@/app/stores/useOrderStore';
import { image64 } from './constant';

interface TestEmailResponse {
  id?: string;
  error?: string;
}
const testOrderData = {
  email: 'haloowebsite@gmail.com', // Replace with real user email
  phone: '123-456-7890', // Replace with user input
  street: '123 Main St',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
  country: 'United States',
  category: 'Clothing',
  subcategory: 'Tshirts',
  sizeOrModel: 'Medium',
  price: 29.99,
  image: image64 // Add Base64 image if available
};
export function useSendTestEmail() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { file, imageUrl, category, subcategory, sizeOrModel } = useOrderStore();

  const calculatePrice = (subcategory: string, sizeOrModel: string) => {
    const basePrices = {
      Tshirts: 29.99,
      Hoodies: 39.99,
      Sweatshirt: 34.99,
      Apple: 19.99,
      Samsung: 19.99,
      Others: 19.99,
    };
    const sizeMultipliers = {
      Small: 1,
      Medium: 1,
      Large: 1,
      XL: 1.1,
      '2XL': 1.2,
      '3XL': 1.3,
      '4XL': 1.4,
    };
    let price = basePrices[subcategory as keyof typeof basePrices] || 19.99;
    if (sizeOrModel in sizeMultipliers) {
      price *= sizeMultipliers[sizeOrModel as keyof typeof sizeMultipliers];
    }
    return Number(price.toFixed(2));
  };

  const sendTestEmail = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {


      const response = await axios.post<TestEmailResponse>('/api/send-order-confirmation', testOrderData)

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      setSuccess(true);
      
    } catch  {
      const errorMessage = 'An error occurred while sending the test email';
      setError(errorMessage);
      console.error('Error sending test email:');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { sendTestEmail, isLoading, error, success };
}