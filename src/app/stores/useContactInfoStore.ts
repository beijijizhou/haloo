import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ContactInfo, DEFAULT_CONTACT_INFO } from '../types';

interface ContactInfoState {
  contactInfo: ContactInfo;
  isContactInfoValid: boolean;
  setContactInfo: (data: Partial<ContactInfo>) => void;
  setIsContactInfoValid: (valid: boolean) => void;
  reset: () => void;
}

export const useContactInfoStore = create<ContactInfoState>()(
  persist(
    (set) => ({
      contactInfo: DEFAULT_CONTACT_INFO,
      isContactInfoValid: false,
      setContactInfo: (data) =>
        set((state) => ({
          contactInfo: { ...state.contactInfo, ...data },
        })),
      setIsContactInfoValid: (valid) => set({ isContactInfoValid: valid }),
      reset: () => set({ contactInfo: DEFAULT_CONTACT_INFO, isContactInfoValid: false }),
    }),
    {
      name: 'contact-info',
    }
  )
);