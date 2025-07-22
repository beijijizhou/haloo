// app/api/create-payment-intent/route.ts

// Import necessary modules from Next.js and Stripe
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key.
// The API version helps ensure consistent behavior with Stripe's API.
// It's crucial to get the secret key from environment variables for security.
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRETE_KEY || '', {
  apiVersion: '2025-06-30.basil', // Use a recent stable API version
});

/**
 * Handles POST requests to create a Stripe PaymentIntent.
 * This API route acts as your backend endpoint for payment initiation.
 *
 * @param req The incoming Next.js Request object.
 * @returns A NextResponse object containing the client secret or an error message.
 */
export async function POST(req: Request) {
  try {
    // Parse the request body to get the amount and currency.
    // The amount should typically come from your server-side calculation of the cart total
    // to prevent tampering from the client. For this example, we're taking it from the request.
    const { amount, currency = 'usd' /*, optional: orderId, userId, etc. */ } = await req.json();

    // Basic validation: Ensure amount is provided and meets Stripe's minimum charge.
    // Stripe requires amounts in the smallest currency unit (e.g., cents for USD).
    if (!amount || typeof amount !== 'number' || amount < 0.5) {
      console.error('Invalid amount received:', amount);
      return NextResponse.json({ error: 'Invalid amount provided. Must be a number and at least $0.50.' }, { status: 400 });
    }

    // Create a PaymentIntent with Stripe.
    // A PaymentIntent is an object that represents your intent to collect payment from a customer,
    // tracking the lifecycle of the payment process.
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents (or smallest currency unit)
      currency: currency,
      // Enable automatic payment methods to allow Stripe to handle various payment types
      // based on the customer's region and browser capabilities.
      automatic_payment_methods: {
        enabled: true,
      },
      // You can add more metadata here, like order IDs, customer IDs, etc.,
      // which can be useful for tracking in your Stripe Dashboard.
      // metadata: { order_id: 'your_order_id_here' },
    });

    // Return the client_secret to the frontend.
    // The client_secret is used by Stripe.js on the frontend to confirm the payment
    // without exposing your secret API key.
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });

  } catch (error) {
    // Log the error for debugging purposes (server-side)
    console.error('Error creating PaymentIntent:', error);

    // Return a generic error message to the client for security
    return NextResponse.json({ error: error || 'Failed to create PaymentIntent.' }, { status: 500 });
  }
}

// You can also define other HTTP methods if needed, e.g., for handling webhooks.
// export async function GET(req: Request) { ... }
