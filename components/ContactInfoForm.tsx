'use client';

import { useForm } from 'react-hook-form';
import { useContactInfoStore } from '@/app/stores/useContactInfoStore';
import { ContactInfo } from '@/app/types';
import { useEffect } from 'react';

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA',
  'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR',
  'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
] as const;

export default function ContactInfoForm() {
  const { contactInfo, setContactInfo, setIsContactInfoValid } = useContactInfoStore();
  const {
    register,
    formState: { errors, isValid },
    getValues,
  } = useForm<ContactInfo>({
    mode: 'onChange',
    defaultValues: contactInfo,
  });

  useEffect(() => {
    setIsContactInfoValid(isValid);
    if (isValid) {
      setContactInfo(getValues());
    }
  }, [isValid, getValues, setContactInfo, setIsContactInfoValid]);

  return (
    <form className="space-y-4">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">Contact Information</h2>
      <p className="text-sm text-gray-600 mb-4">All fields marked with <span className="text-red-600">*</span> are required.</p>
      <div>
        <label htmlFor="fullName" className="block text-lg font-medium text-gray-700 mb-1">
          Full Name <span className="text-red-600">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          {...register('fullName', { required: 'Full name is required' })}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="John Doe"
        />
        {errors.fullName && (
          <p className="text-sm text-red-600 mt-1">{errors.fullName.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          {...register('phone', {
            pattern: {
              value: /^\d{3}\d{3}\d{4}$/,
              message: 'Phone number must be in format 1234567890',
            },
          })}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="1234567890"
        />
        {errors.phone && (
          <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-1">
          Email Address <span className="text-red-600">*</span>
        </label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Valid email is required',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Valid email is required',
            },
          })}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="example@domain.com"
        />
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="street" className="block text-lg font-medium text-gray-700 mb-1">
          Street Address <span className="text-red-600">*</span>
        </label>
        <input
          id="street"
          type="text"
          {...register('street', { required: 'Street address is required' })}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="55 Kennedy Dr, Suite D"
        />
        {errors.street && (
          <p className="text-sm text-red-600 mt-1">{errors.street.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="city" className="block text-lg font-medium text-gray-700 mb-1">
          City <span className="text-red-600">*</span>
        </label>
        <input
          id="city"
          type="text"
          {...register('city', { required: 'City is required' })}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Hauppauge"
        />
        {errors.city && (
          <p className="text-sm text-red-600 mt-1">{errors.city.message}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="state" className="block text-lg font-medium text-gray-700 mb-1">
            State <span className="text-red-600">*</span>
          </label>
          <select
            id="state"
            {...register('state', {
              required: 'Valid state code is required (e.g., NY)',
              validate: (value) =>
                US_STATES.includes(value as typeof US_STATES[number]) || 'Valid state code is required (e.g., NY)',
            })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Select State</option>
            {US_STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && (
            <p className="text-sm text-red-600 mt-1">{errors.state.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="zipCode" className="block text-lg font-medium text-gray-700 mb-1">
            ZIP Code <span className="text-red-600">*</span>
          </label>
          <input
            id="zipCode"
            type="text"
            {...register('zipCode', {
              required: 'Valid ZIP code is required',
              pattern: {
                value: /^\d{5}(-\d{4})?$/,
                message: 'Valid ZIP code is required (e.g., 12345 or 12345-6789)',
              },
            })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="11788"
          />
          {errors.zipCode && (
            <p className="text-sm text-red-600 mt-1">{errors.zipCode.message}</p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="country" className="block text-lg font-medium text-gray-700 mb-1">
          Country <span className="text-red-600">*</span>
        </label>
        <select
          id="country"
          {...register('country', { required: 'Country is required' })}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="United States">United States</option>
        </select>
        {errors.country && (
          <p className="text-sm text-red-600 mt-1">{errors.country.message}</p>
        )}
      </div>
    </form>
  );
}