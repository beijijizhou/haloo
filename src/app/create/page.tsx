'use client';

import Link from 'next/link';
import CustomOrderForm from '../../../components/CustomOrderForm';
import ContactInfoForm from '../../../components/ContactInfoForm';
import { useOrderStore } from '@/app/stores/useOrderStore';
import OrderSummary from '../../../components/OrderSummary';

export default function CreatePage() {
  const { step} = useOrderStore();
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create Your Order</h1>
      <div className="flex justify-between items-center mb-8">
        <span className={`text-lg ${step === 1 ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
          Step 1: Upload Image
        </span>
        <span className={`text-lg ${step === 2 ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
          Step 2: Contact Info
        </span>
        <span className={`text-lg ${step === 3 ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
          Step 3: Review & Checkout
        </span>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <CustomOrderForm />
        </div>
      )}
      {step === 2 && (
        <>
          <ContactInfoForm />
        </>
      )
      }
      {step === 3 &&
        <>
          <OrderSummary />
        </>
      }
      <div className="mt-8">
        <Link href="/" className="text-sm text-gray-500 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div >
  );
}