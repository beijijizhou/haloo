'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '../stores/useCartStore';
import { sendConfirmationEmail } from '../checkout/api';

// Enum for Stripe redirect statuses
enum RedirectStatus {
  Succeeded = 'succeeded',
  Processing = 'processing',
  RequiresPaymentMethod = 'requires_payment_method',
  RequiresAction = 'requires_action',
  Unknown = 'unknown',
}

// Inner component with useSearchParams
function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCartStore();
  const [statusMessage, setStatusMessage] = useState<string>('');
  const paymentIntent = searchParams.get('payment_intent');
  const redirectStatusParam = searchParams.get('redirect_status') as RedirectStatus | null;

  useEffect(() => {
    // Basic validation
    if (!paymentIntent || !redirectStatusParam) {
      setStatusMessage('Missing payment details. Please contact support.');
      return;
    }

    // Handle redirect status
    switch (redirectStatusParam) {
      case RedirectStatus.Succeeded:
        setStatusMessage('Payment succeeded! Thank you for your order.');
        sendConfirmationEmail();
        clearCart();
        break;
      case RedirectStatus.Processing:
        setStatusMessage('Your payment is processing. We will notify you once it’s complete.');
        break;
      case RedirectStatus.RequiresPaymentMethod:
        setStatusMessage('Your payment failed. Please try again with a different payment method.');
        break;
      case RedirectStatus.RequiresAction:
        setStatusMessage('Your payment requires additional action. Please check your email or bank app.');
        break;
      case RedirectStatus.Unknown:
      default:
        setStatusMessage('An unexpected payment status occurred.');
        break;
    }
  }, [searchParams, clearCart]);

  // Determine UI classes based on redirectStatusParam
  const isSuccess = redirectStatusParam === RedirectStatus.Succeeded;
  const containerClass = `p-8 rounded-lg shadow-xl max-w-2xl w-full ${
    isSuccess ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
  } border-2`;
  const titleClass = `text-4xl font-bold mb-4 ${isSuccess ? 'text-green-700' : 'text-red-700'}`;
  const messageClass = `text-lg mb-6 ${isSuccess ? 'text-green-600' : 'text-red-600'}`;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center min-h-[60vh]">
      <div className={containerClass}>
        {isSuccess ? (
          <svg
            className="mx-auto h-20 w-20 text-green-500 mb-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg
            className="mx-auto h-20 w-20 text-red-500 mb-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        <h1 className={titleClass}>{isSuccess ? 'Payment Successful!' : 'Payment Issue'}</h1>
        <p className={messageClass}>{statusMessage}</p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300 shadow-lg"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center min-h-[60vh]">
          <p className="text-lg text-gray-600">Loading order status...</p>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}