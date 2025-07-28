'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '../../../components/ImageUpload';
import ContactInfoForm from '../../../components/ContactInfoForm';

export default function CreatePage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    image: null as File | null,
    phone: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    paymentInfo: '',
  });

  const handleNext = () => {
    setStep((prev) => (prev < 3 ? (prev + 1 as 1 | 2 | 3) : prev));
  };

  const handleBack = () => setStep((prev) => (prev > 1 ? (prev - 1 as 1 | 2 | 3) : prev));

  const handleImageUpload = (file: File | null) => {
    setFormData((prev) => ({ ...prev, image: file }));
    if (file) handleNext();
  };

  const handleContactSubmit = (contactInfo: {
    phone: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }) => {
    setFormData((prev) => ({ ...prev, ...contactInfo }));
    handleNext();
  };

  const handlePaymentSubmit = () => {
    // Store formData in localStorage for the checkout page
    localStorage.setItem('orderData', JSON.stringify({
      ...formData,
      // Convert File to a URL or metadata if needed (File objects can't be JSON-serialized)
      image: formData.image ? formData.image.name : null,
    }));

    // Redirect to the checkout page
    router.push('/checkout');
  };

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
          Step 3: Confirm Order
        </span>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upload Your Image</h2>
          <ImageUpload onUpload={handleImageUpload} />
          <button
            onClick={handleNext}
            disabled={!formData.image}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <ContactInfoForm
          initialData={{
            phone: formData.phone,
            email: formData.email,
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,
          }}
          onSubmit={handleContactSubmit}
          onBack={handleBack}
        />
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800"> Order Confirmation</h2>
          <p className="text-lg text-gray-700">
            Review your order and proceed to payment.
          </p>
          <div className="border p-4 rounded-md bg-gray-50">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Order Summary</h3>
            <p className="text-gray-600">Custom Image Upload: $29.99</p>
            <p className="text-gray-600">Image: {formData.image ? formData.image.name : 'Not uploaded'}</p>
            <p className="text-gray-600">Contact: {formData.email || 'Not provided'}</p>
            <p className="text-gray-600">
              Address: {formData.street}, {formData.city}, {formData.state} {formData.zipCode}, {formData.country}
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleBack}
              className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Back
            </button>
            <button
              onClick={handlePaymentSubmit}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
      <div className="mt-8">
        <Link href="/" className="text-sm text-gray-500 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}