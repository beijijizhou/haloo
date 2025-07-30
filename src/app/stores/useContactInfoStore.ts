
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ContactInfo } from '../types';

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA',
  'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR',
  'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
] as const;


interface ContactInfoState {
  contactInfo: ContactInfo;
  errors: Partial<Record<keyof ContactInfo, string>>;
  touched: Partial<Record<keyof ContactInfo, boolean>>;
  setContactInfo: (data: Partial<ContactInfo>) => void;
  setTouched: (field: keyof ContactInfo, value: boolean) => void;
  validateField: (name: keyof ContactInfo, value: string) => string;
  validateForm: () => Partial<Record<keyof ContactInfo, string>>;

  
  reset: () => void;
}

export const useContactInfoStore = create<ContactInfoState>()(
  persist(
    (set, get) => ({
      contactInfo: {
        phone: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
      },
      errors: {},
      touched: {},
      setContactInfo: (data) => {
        set((state) => {
          const newContactInfo = { ...state.contactInfo, ...data };
          const newErrors: Partial<Record<keyof ContactInfo, string>> = {};
          (Object.keys(data) as (keyof ContactInfo)[]).forEach((key) => {
            if (state.touched[key]) {
              const error = get().validateField(key, newContactInfo[key]);
              if (error) newErrors[key] = error;
            }
          });
          return { contactInfo: newContactInfo, errors: { ...state.errors, ...newErrors } };
        });
      },
      setTouched: (field, value) => {
        set((state) => {
          const newTouched = { ...state.touched, [field]: value };
          const error = value ? get().validateField(field, state.contactInfo[field]) : state.errors[field];
          return {
            touched: newTouched,
            errors: { ...state.errors, [field]: error },
          };
        });
      },
      validateField: (name, value) => {
        const { country } = get().contactInfo;
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
            return !value || (country === 'United States' && !US_STATES.includes(value as typeof US_STATES[number]))
              ? 'Valid state code is required (e.g., NY)'
              : '';
          case 'zipCode':
            return !value || (country === 'United States' && !/^\d{5}(-\d{4})?$/.test(value))
              ? 'Valid ZIP code is required (e.g., 12345 or 12345-6789)'
              : '';
          case 'country':
            return !value ? 'Country is required' : '';
          default:
            return '';
        }
      },
      validateForm: () => {
        const { contactInfo } = get();
        const newErrors: Partial<Record<keyof ContactInfo, string>> = {};
        (Object.keys(contactInfo) as (keyof ContactInfo)[]).forEach((key) => {
          const error = get().validateField(key, contactInfo[key]);
          if (error) newErrors[key] = error;
        });
        set({ errors: newErrors });
        return newErrors;
      },


      reset: () =>
        set({
          contactInfo: {
            phone: '',
            email: '',
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'United States',
          },
          errors: {},
          touched: {},
        }),
    }),
    {
      name: 'contact-info',
    }
  )
);
