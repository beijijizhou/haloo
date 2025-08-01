// app/checkout/page.tsx or app/components/PaymentForm.tsx
'use client'; // This component needs to be a Client Component
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
} from '@stripe/react-stripe-js';
import { CheckoutForm } from './stripe';
import ContactInfoForm from '../../../components/ContactInfoForm';
import { useContactInfoStore } from '../stores/useContactInfoStore';
import { useProductStore } from '../stores/useProductStore';
import ProductReview from '../../../components/ProductReview';
import { useCartStore } from '../stores/useCartStore';

// IMPORTANT: Replace with your actual Stripe publishable key
// This key is safe to be exposed in your frontend code.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

// A sub-component that uses useStripe and useElements hooks


// Main page component or parent wrapper
export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadingPaymentIntent, setLoadingPaymentIntent] = useState(true);
  const [errorFetchingIntent, setErrorFetchingIntent] = useState<string | null>(null);
  const { product } = useProductStore();
  const { price, quantity } = product || { price: 0.5, quantity: 1 }; // Default values if product is not available
  const { clearCart } = useCartStore()
  const { isContactInfoValid } = useContactInfoStore();
  const orderAmount = price * quantity; // Convert to cents for Stripe
  console.log('Order Amount:', orderAmount);

  useEffect(() => {
    // Fetch client secret from your Next.js API route
    const fetchClientSecret = async () => {
      try {
        setLoadingPaymentIntent(true);
        if (orderAmount > 0) {
          const response = await axios.post('/api/create-payment-intent', {
            amount: orderAmount,
          });

          setClientSecret(response.data.clientSecret);
        }

      } catch {
        const errorMessage = 'Network error fetching payment intent.';
        setErrorFetchingIntent(errorMessage);
      } finally {
        setLoadingPaymentIntent(false);
      }
    };

    fetchClientSecret();
  }, [clearCart, orderAmount]); // Re-fetch if orderAmount changes

  console.log(isContactInfoValid)
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">Checkout</h1>
      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div>
          <ContactInfoForm />
        </div>
        <div className="flex flex-col gap-8">
          <ProductReview />
          <div>
            {loadingPaymentIntent ? (
              <div className="text-center py-10">Loading payment form...</div>
            ) : errorFetchingIntent ? (
              <div className="text-center py-10 text-red-600">
                Error: {errorFetchingIntent}
              </div>
            ) : isContactInfoValid && clientSecret && stripePromise ? (
              <Elements options={{ clientSecret }} stripe={stripePromise}>
                <CheckoutForm amount={orderAmount} />
              </Elements>
            ) : (
              <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
                <p className="text-lg text-gray-600">Unable to load payment form.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}