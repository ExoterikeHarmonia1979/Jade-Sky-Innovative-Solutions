import type { Metadata } from 'next';
import { Phone, Mail } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact | Jade Sky Innovative Solutions',
  description: 'Get in touch about your Azure, Microsoft 365, or AI project.',
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-20">
      <h1 className="text-center font-heading text-4xl font-bold text-gray-100">Get in touch</h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-gray-400">
        Tell me about your Azure, Microsoft 365, or AI project and I&apos;ll get back to you shortly.
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <ContactForm />

        <div className="space-y-4">
          <a
            href="tel:+16086305875"
            className="flex items-center gap-3 rounded-lg border border-midnight-border p-4 transition hover:border-jade"
          >
            <Phone className="h-5 w-5 text-jade" />
            <span className="text-gray-200">608-630-5875</span>
          </a>
          <a
            href="mailto:WalterJohnson@jadeskyinnovativesolutions.onmicrosoft.com"
            className="flex items-center gap-3 rounded-lg border border-midnight-border p-4 transition hover:border-jade"
          >
            <Mail className="h-5 w-5 text-jade" />
            <span className="break-all text-gray-200">WalterJohnson@jadeskyinnovativesolutions.onmicrosoft.com</span>
          </a>
        </div>
      </div>
    </main>
  );
}
