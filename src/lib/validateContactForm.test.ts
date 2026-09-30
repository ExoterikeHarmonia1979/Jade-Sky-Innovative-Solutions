import { describe, expect, it } from 'vitest';
import { validateContactForm, type ContactFormData } from './validateContactForm';

const validData: ContactFormData = {
  name: 'Jane Owner',
  email: 'jane@example.com',
  company: '',
  serviceInterest: 'azure',
  message: 'Looking for help migrating to Azure.',
};

describe('validateContactForm', () => {
  it('returns no errors for valid data with no company (company is optional)', () => {
    expect(validateContactForm(validData)).toEqual({});
  });

  it('flags missing required fields', () => {
    const errors = validateContactForm({ ...validData, name: '', message: '   ' });
    expect(errors.name).toBeDefined();
    expect(errors.message).toBeDefined();
  });

  it('flags an invalid email', () => {
    const errors = validateContactForm({ ...validData, email: 'not-an-email' });
    expect(errors.email).toBe('Enter a valid email address.');
  });

  it('flags an unselected service interest', () => {
    const errors = validateContactForm({ ...validData, serviceInterest: '' });
    expect(errors.serviceInterest).toBeDefined();
  });
});
