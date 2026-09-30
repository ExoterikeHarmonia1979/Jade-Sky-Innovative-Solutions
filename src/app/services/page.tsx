import type { Metadata } from 'next';
import { SectionHeading } from '@/components/SectionHeading';
import { ServiceCard } from '@/components/ServiceCard';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: 'Services | Jade Sky Innovative Solutions',
  description: 'Azure, Microsoft 365, and AI solution development for growing businesses.',
};

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeading
        eyebrow="Services"
        title="Azure, Microsoft 365, and AI solution development"
        subtitle="Three specialties, one point of contact."
      />
      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </main>
  );
}
