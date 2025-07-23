import Link from 'next/link';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';

// Import your Stripe secret key from environment variables
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRETE_KEY || '', {
  apiVersion: '2025-06-30.basil', // Use a recent stable API version
});

// Define an interface for the expected URL search parameters
interface OrderSuccessPageProps {
  searchParams: Promise<{
    payment_intent?: string;
    payment_intent_client_secret?: string;
    redirect_status?: string;
  }>;
}

// Main component for the order success page
export default async function OrderSuccessPage({ searchParams }: OrderSuccessPageProps) {
  const { payment_intent, redirect_status } = await searchParams;
  // 1. Basic validation of required parameters
  if (!payment_intent || !redirect_status) {
    // If essential parameters are missing, redirect to home or an error page
    redirect('/'); // Or to a generic error page like /payment-error
  }

  // 2. Handle different redirect statuses from Stripe
  let statusMessage: string;
  let isSuccess = false;

  switch (redirect_status) {
    case 'succeeded':
      statusMessage = 'Payment succeeded! Thank you for your order.';
      isSuccess = true;
      break;
    case 'processing':
      statusMessage = 'Your payment is processing. We will notify you once it\'s complete.';
      break;
    case 'requires_payment_method':
      statusMessage = 'Your payment failed. Please try again with a different payment method.';
      break;
    case 'requires_action':
      statusMessage = 'Your payment requires additional action to complete. Please check your email or bank app.';
      break;
    default:
      statusMessage = 'An unexpected payment status occurred.';
      break;
  }

  // 3. Server-side verification of the PaymentIntent with Stripe
  let paymentIntentDetails: Stripe.PaymentIntent | null = null;
  let verificationError: string | null = null;

  try {
    // Retrieve the PaymentIntent directly from Stripe using its ID
    paymentIntentDetails = await stripe.paymentIntents.retrieve(payment_intent);

    // Further verify the status from Stripe's API response
    if (paymentIntentDetails.status === 'succeeded') {
      isSuccess = true;
      statusMessage = 'Payment confirmed and successful! Your order is being processed.';
      // In a real app, this is where you'd update your database, send confirmation emails, etc.
    } else if (paymentIntentDetails.status !== redirect_status) {
      // Mismatch between redirect_status and actual Stripe status, investigate
      statusMessage = `Payment status is ${paymentIntentDetails.status}. Please contact support if you have questions.`;
      isSuccess = false; // Override if Stripe's definitive status isn't 'succeeded'
    }

  } catch {
    console.error('Error retrieving PaymentIntent from Stripe:');
    verificationError = 'Could not verify payment details. Please contact support.';
    isSuccess = false; // Mark as not successful if verification fails
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center min-h-[60vh]">
      <div className={`p-8 rounded-lg shadow-xl max-w-2xl w-full ${isSuccess ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'} border-2`}>
        {isSuccess ? (
          <svg className="mx-auto h-20 w-20 text-green-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg className="mx-auto h-20 w-20 text-red-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        <h1 className={`text-4xl font-bold mb-4 ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
          {isSuccess ? 'Payment Successful!' : 'Payment Issue'}
        </h1>
        <p className={`text-lg mb-6 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
          {statusMessage}
        </p>

        {verificationError && (
          <p className="text-red-500 text-sm mt-4">
            {verificationError}
          </p>
        )}

        {paymentIntentDetails && (
          <div className="mt-8 p-4 bg-white rounded-md border border-gray-200 text-left">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Order Summary</h3>
            <p className="text-gray-700"><strong>Payment ID:</strong> {paymentIntentDetails.id}</p>
            <p className="text-gray-700"><strong>Amount:</strong> ${((paymentIntentDetails.amount || 0) / 100).toFixed(2)} {paymentIntentDetails.currency.toUpperCase()}</p>
            {/* In a real application, you would fetch actual order details from your database here */}
            <p className="text-gray-700 mt-2">
              Thank you for shopping at **Haloo**!
            </p>
          </div>
        )}

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
