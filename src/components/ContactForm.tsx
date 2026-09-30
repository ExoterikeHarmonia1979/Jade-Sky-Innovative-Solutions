'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Button } from './Button';
import { validateContactForm, type ContactFormData, type ContactFormErrors } from '@/lib/validateContactForm';

const SERVICE_OPTIONS = [
  { value: 'azure', label: 'Azure' },
  { value: 'm365', label: 'Microsoft 365' },
  { value: 'ai', label: 'AI Solution Development' },
  { value: 'unsure', label: 'Not sure yet' },
];

const EMPTY_FORM: ContactFormData = {
  name: '',
  email: '',
  company: '',
  serviceInterest: '',
  message: '',
};

const FORMSPREE_ENDPOINT = `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID ?? 'YOUR_FORM_ID'}`;

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const handleChange =
    (field: keyof ContactFormData) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('idle');
    const validationErrors = validateContactForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus('submitting');
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Submission failed');

      setStatus('success');
      setFormData(EMPTY_FORM);
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-200">
          Name
        </label>
        <input
          id="name"
          value={formData.name}
          onChange={handleChange('name')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className="mt-1 w-full rounded border border-midnight-border bg-[#0f1b33] px-3 py-2 text-gray-200 focus:border-jade focus:outline-none"
        />
        {errors.name && (
          <p id="name-error" role="alert" className="mt-1 text-sm text-red-400">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-200">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className="mt-1 w-full rounded border border-midnight-border bg-[#0f1b33] px-3 py-2 text-gray-200 focus:border-jade focus:outline-none"
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1 text-sm text-red-400">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-semibold text-gray-200">
          Company <span className="text-gray-500">(optional)</span>
        </label>
        <input
          id="company"
          value={formData.company}
          onChange={handleChange('company')}
          className="mt-1 w-full rounded border border-midnight-border bg-[#0f1b33] px-3 py-2 text-gray-200 focus:border-jade focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="serviceInterest" className="block text-sm font-semibold text-gray-200">
          What do you need help with?
        </label>
        <select
          id="serviceInterest"
          value={formData.serviceInterest}
          onChange={handleChange('serviceInterest')}
          aria-invalid={!!errors.serviceInterest}
          aria-describedby={errors.serviceInterest ? 'serviceInterest-error' : undefined}
          className="mt-1 w-full rounded border border-midnight-border bg-[#0f1b33] px-3 py-2 text-gray-200 focus:border-jade focus:outline-none"
        >
          <option value="">Select one</option>
          {SERVICE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.serviceInterest && (
          <p id="serviceInterest-error" role="alert" className="mt-1 text-sm text-red-400">
            {errors.serviceInterest}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-200">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={handleChange('message')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className="mt-1 w-full rounded border border-midnight-border bg-[#0f1b33] px-3 py-2 text-gray-200 focus:border-jade focus:outline-none"
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1 text-sm text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending...' : 'Send message'}
      </Button>

      {status === 'success' && (
        <p className="text-sm font-semibold text-jade">Thanks! I&apos;ll get back to you shortly.</p>
      )}
      {status === 'error' && (
        <p className="text-sm font-semibold text-red-400">Something went wrong. Please email me directly.</p>
      )}
    </form>
  );
}
