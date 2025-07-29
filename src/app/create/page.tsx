'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CustomOrderForm from '../../../components/CustomOrderForm';
import ContactInfoForm from '../../../components/ContactInfoForm';
import { useOrderStore } from '@/app/stores/useOrderStore';

export default function CreatePage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    paymentInfo: '',
    price: 29.99,
  });
  const { file, imageUrl, category, subcategory, sizeOrModel, reset } = useOrderStore();

  const calculatePrice = (subcategory: string, sizeOrModel: string) => {
    const basePrices = {
      Tshirts: 29.99,
      Hoodies: 39.99,
      Sweatshirt: 34.99,
      Apple: 19.99,
      Samsung: 19.99,
      Others: 19.99,
    };
    const sizeMultipliers = {
      Small: 1,
      Medium: 1,
      Large: 1,
      XL: 1.1,
      '2XL': 1.2,
      '3XL': 1.3,
      '4XL': 1.4,
    };
    let price = basePrices[subcategory as keyof typeof basePrices] || 19.99;
    if (sizeOrModel in sizeMultipliers) {
      price *= sizeMultipliers[sizeOrModel as keyof typeof sizeMultipliers];
    }
    return Number(price.toFixed(2));
  };

  useEffect(() => {
    if (file && imageUrl && category && subcategory && sizeOrModel) {
      if (step === 1) {
        setStep(2);
      }
    }
    setFormData((prev) => ({
      ...prev,
      price: subcategory && sizeOrModel ? calculatePrice(subcategory, sizeOrModel) : prev.price,
    }));
  }, [file, imageUrl, category, subcategory, sizeOrModel, step]);

  const handleNext = () => {
    if (step === 1 && (!file || !category || !subcategory || !sizeOrModel)) {
      alert('Please upload a PNG file and select a category, item, and size/model.');
      return;
    }
    setStep((prev) => (prev < 3 ? (prev + 1 as 1 | 2 | 3) : prev));
  };

  const handleBack = () => setStep((prev) => (prev > 1 ? (prev - 1 as 1 | 2 | 3) : prev));

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
    setStep(3);
  };

  const handlePaymentSubmit = async () => {
    const orderData = {
      image: imageUrl || null,
      category,
      subcategory,
      sizeOrModel,
      ...formData,
    };
    localStorage.setItem('orderData', JSON.stringify(orderData));
    reset();
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
          Step 3: Payment
        </span>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upload Your Image</h2>
          <CustomOrderForm />
          <button
            onClick={handleNext}
            disabled={!file || !category || !subcategory || !sizeOrModel}
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
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Payment</h2>
          <p className="text-lg text-gray-700">Review your order and proceed to payment.</p>
          <div className="border p-4 rounded-md bg-gray-50">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Order Summary</h3>
            <p className="text-gray-600">
              Custom {subcategory} ({category}, {sizeOrModel}): ${formData.price}
            </p>
            <p className="text-gray-600">Image: {file ? file.name : 'Not uploaded'}</p>
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