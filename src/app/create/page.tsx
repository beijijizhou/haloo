'use client';

import Link from 'next/link';
import CustomOrderForm from '../../../components/CustomOrderForm';


export default function CreatePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create Your Order</h1>
      <div className="flex justify-between items-center mb-8">
        <span className={`text-lg text-blue-600 font-semibold`}>
          Step 1: Upload Image
        </span>
      </div>
      <CustomOrderForm />
      <div className="mt-8">
        <Link href="/" className="text-sm text-gray-500 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div >
  );
}