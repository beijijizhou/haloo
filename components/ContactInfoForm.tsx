
'use client';

import { useContactInfoStore } from '@/app/stores/useContactInfoStore';
import { useOrderStore } from '@/app/stores/useOrderStore';

export default function ContactInfoForm() {
  const { contactInfo, errors, touched, setContactInfo, setTouched, } = useContactInfoStore();
  const { step, setStep } = useOrderStore();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactInfo({ [name]: value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(name as keyof typeof contactInfo, true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  };
  const handleBack = () => {
    const newStep = step > 1 ? ((step - 1) as 1 | 2 | 3) : 1;
    setStep(newStep);
  };
  const handleNext = () => {
    if (Object.values(contactInfo).some(value => value === '')) {
      alert('Please fill in all contact information fields.');
      return;
    }
    setStep(step + 1 as 1 | 2 | 3);
  };
  // List of US state codes for select options
  const US_STATES = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA',
    'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR',
    'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
  ] as const;

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
          value={contactInfo.phone}
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
          value={contactInfo.email}
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
          value={contactInfo.street}
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
          value={contactInfo.city}
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
            value={contactInfo.state}
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
            value={contactInfo.zipCode}
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
          value={contactInfo.country}
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
      <div className='flex gap-4 mt-2'>
        <button
          onClick={handleBack}
          className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={contactInfo.phone === '' || contactInfo.email === '' || contactInfo.street === '' || contactInfo.city === '' || contactInfo.state === '' || contactInfo.zipCode === ''}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next

        </button>
      </div>
    </form>
  );
}
