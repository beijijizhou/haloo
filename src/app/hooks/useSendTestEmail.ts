'use client';

import { useState, useCallback } from 'react';
import axios from 'axios';
import { useOrderStore } from '@/app/stores/useOrderStore';
import { image64 } from './constant';

interface TestEmailResponse {
  id?: string;
  error?: string;
}

export function useSendEmail() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { file, imageUrl, category, subcategory, sizeOrModel } = useOrderStore();

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
    image: imageUrl 
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

    } catch {
      const errorMessage = 'An error occurred while sending the test email';
      setError(errorMessage);
      console.error('Error sending test email:');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { sendTestEmail, isLoading, error, success };
}