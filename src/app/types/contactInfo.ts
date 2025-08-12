export interface ContactInfo {
  fullName: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export const DEFAULT_CONTACT_INFO: ContactInfo = {
  fullName: '',
  phone: '',
  email: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'United States',
};