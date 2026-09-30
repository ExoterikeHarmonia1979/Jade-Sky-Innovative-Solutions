export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  serviceInterest: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.name.trim()) errors.name = 'Name is required.';
  if (!data.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_PATTERN.test(data.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!data.serviceInterest) errors.serviceInterest = 'Select a service.';
  if (!data.message.trim()) errors.message = 'Tell me about your project.';
  // Note: `company` is intentionally not validated — it's optional.

  return errors;
}
