import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { sendConfirmationEmail } from './api';
import { useCartStore } from '../stores/useCartStore';

// A sub-component that uses useStripe and useElements hooks
export function CheckoutForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { clearCart } = useCartStore();

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
    // alert("waiting for redirect")
    setIsLoading(false);
    if (error) {
      // Show error to your customer (e.g., insufficient funds)
      setMessage(error.message || 'An unexpected error occurred.');
    } else {
      // Payment succeeded, show a success message or redirect
      setMessage('Payment successful! Thank you for your order.');
      await sendConfirmationEmail();
      clearCart();
    }

    
    
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


