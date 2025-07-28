'use client';

import { useState, useEffect } from 'react';

// List of US state codes for validation
const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA',
  'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR',
  'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
] as const;

interface ContactInfo {
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface ContactInfoFormProps {
  initialData?: ContactInfo;
  onSubmit: (data: ContactInfo) => void;
  onBack: () => void;
}

export default function ContactInfoForm({ initialData, onSubmit, onBack }: ContactInfoFormProps) {
  const [formData, setFormData] = useState<ContactInfo>({
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    street: initialData?.street || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    zipCode: initialData?.zipCode || '',
    country: initialData?.country || 'United States',
  });

  const [errors, setErrors] = useState<Partial<ContactInfo>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInfo, boolean>>>({});

  // Real-time validation
  const validateField = (name: keyof ContactInfo, value: string): string => {
    switch (name) {
      case 'phone':
        return !value || !/^\d{3}\d{3}\d{4}$/.test(value)
          ? 'Phone number must be in format 123-456-7890'
          : '';
      case 'email':
        return !value || !/^\S+@\S+\.\S+$/.test(value)
          ? 'Valid email is required'
          : '';
      case 'street':
        return !value ? 'Street address is required' : '';
      case 'city':
        return !value ? 'City is required' : '';
      case 'state':
        return !value || (formData.country === 'United States' && !US_STATES.includes(value as unknown as typeof US_STATES[number]))
          ? 'Valid state code is required (e.g., NY)'
          : '';
      case 'zipCode':
        return !value || (formData.country === 'United States' && !/^\d{5}(-\d{4})?$/.test(value))
          ? 'Valid ZIP code is required (e.g., 12345 or 12345-6789)'
          : '';
      case 'country':
        return !value ? 'Country is required' : '';
      default:
        return '';
    }
  };

  // Validate all fields on submit or blur
  const validateForm = (): Partial<ContactInfo> => {
    const newErrors: Partial<ContactInfo> = {};
    (Object.keys(formData) as (keyof ContactInfo)[]).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  };

  // Update errors on form data change for touched fields
  useEffect(() => {
    const newErrors: Partial<ContactInfo> = {};
    (Object.keys(touched) as (keyof ContactInfo)[]).forEach((key) => {
      if (touched[key]) {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
    setErrors((prev) => ({ ...prev, ...newErrors }));
  }, [formData, touched]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);
    setTouched({
      phone: true,
      email: true,
      street: true,
      city: true,
      state: true,
      zipCode: true,
      country: true,
    });

    if (Object.keys(formErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Information</h2>
      <div>
        <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="123-456-7890"
        />
        {errors.phone && touched.phone && (
          <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="example@domain.com"
        />
        {errors.email && touched.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email}</p>
        )}
      </div>
      <div>
        <label htmlFor="street" className="block text-lg font-medium text-gray-700 mb-1">
          Street Address
        </label>
        <input
          id="street"
          name="street"
          type="text"
          value={formData.street}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="55 Kennedy Dr, Suite D"
        />
        {errors.street && touched.street && (
          <p className="text-sm text-red-600 mt-1">{errors.street}</p>
        )}
      </div>
      <div>
        <label htmlFor="city" className="block text-lg font-medium text-gray-700 mb-1">
          City
        </label>
        <input
          id="city"
          name="city"
          type="text"
          value={formData.city}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Hauppauge"
        />
        {errors.city && touched.city && (
          <p className="text-sm text-red-600 mt-1">{errors.city}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="state" className="block text-lg font-medium text-gray-700 mb-1">
            State
          </label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Select State</option>
            {US_STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && touched.state && (
            <p className="text-sm text-red-600 mt-1">{errors.state}</p>
          )}
        </div>
        <div>
          <label htmlFor="zipCode" className="block text-lg font-medium text-gray-700 mb-1">
            ZIP Code
          </label>
          <input
            id="zipCode"
            name="zipCode"
            type="text"
            value={formData.zipCode}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="11788"
          />
          {errors.zipCode && touched.zipCode && (
            <p className="text-sm text-red-600 mt-1">{errors.zipCode}</p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="country" className="block text-lg font-medium text-gray-700 mb-1">
          Country
        </label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="United States">United States</option>
          <option value="Canada">Canada</option>
          <option value="Other">Other</option>
        </select>
        {errors.country && touched.country && (
          <p className="text-sm text-red-600 mt-1">{errors.country}</p>
        )}
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Back
        </button>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={Object.keys(errors).length > 0}
        >
          Next
        </button>
      </div>
    </form>
  );
}