// app/checkout/page.tsx or app/components/PaymentForm.tsx
'use client'; // This component needs to be a Client Component

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// IMPORTANT: Replace with your actual Stripe publishable key
// This key is safe to be exposed in your frontend code.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

// A sub-component that uses useStripe and useElements hooks
function CheckoutForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    // Confirm the payment
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/order-success`,
      },
    });

    // This point will only be reached if there's an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "An unexpected error occurred.");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Complete Your Payment</h2>
      <PaymentElement id="payment-element" className="mb-6" /> {/* Stripe's secure UI for card input */}
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span id="button-text">
          {isLoading ? "Processing..." : `Pay $${amount.toFixed(2)}`}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message" className="mt-4 text-red-600 text-center">{message}</div>}
    </form>
  );
}

// Main page component or parent wrapper
export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadingPaymentIntent, setLoadingPaymentIntent] = useState(true);
  const [errorFetchingIntent, setErrorFetchingIntent] = useState<string | null>(null);

  const orderAmount = 50.00; // This should come from your cart/order total

  useEffect(() => {
    // Fetch client secret from your Next.js API route
    const fetchClientSecret = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: orderAmount }),
        });
        const data = await response.json();
        if (response.ok) {
          setClientSecret(data.clientSecret);
        } else {
          setErrorFetchingIntent(data.error || 'Failed to fetch payment intent.');
        }
      } catch (error) {
        setErrorFetchingIntent('Network error fetching payment intent.');
      } finally {
        setLoadingPaymentIntent(false);
      }
    };

    fetchClientSecret();
  }, [orderAmount]); // Re-fetch if orderAmount changes

  if (loadingPaymentIntent) {
    return <div className="text-center py-10">Loading payment form...</div>;
  }

  if (errorFetchingIntent) {
    return <div className="text-center py-10 text-red-600">Error: {errorFetchingIntent}</div>;
  }

  // Render the Elements provider once clientSecret is available
  return (
    clientSecret && stripePromise && (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-full max-w-md">
          <Elements options={{ clientSecret }} stripe={stripePromise}>
            <CheckoutForm amount={orderAmount} />
          </Elements>
        </div>
      </div>
    )
  );
}