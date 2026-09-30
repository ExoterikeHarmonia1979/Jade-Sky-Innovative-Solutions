import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroSection } from '@/components/HeroSection';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { ServiceCard } from '@/components/ServiceCard';
import { ProcessStep } from '@/components/ProcessStep';
import { LinkButton } from '@/components/Button';
import { services } from '@/data/services';
import { processSteps } from '@/data/process';
import { buildProfessionalServiceSchema } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Jade Sky Innovative Solutions | Azure, Microsoft 365 & AI Consulting',
  description:
    'Jade Sky Innovative Solutions helps growing businesses adopt Azure, Microsoft 365, and custom AI solutions.',
};

export default function HomePage() {
  const schema = buildProfessionalServiceSchema();

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <HeroSection />

      <Reveal>
        <section className="mx-auto max-w-6xl px-4 py-20">
          <SectionHeading
            eyebrow="What I Do"
            title="Azure, Microsoft 365, and AI — under one roof"
            subtitle="Three specialties, one point of contact, no hand-offs between vendors."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services#${service.slug}`}
                className="block transition hover:-translate-y-1"
              >
                <ServiceCard service={service} />
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <LinkButton href="/services" variant="secondary">
              See all services
            </LinkButton>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="border-t border-midnight-border px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <SectionHeading eyebrow="How I Work" title="A straightforward process" />
            <div className="mt-12 space-y-8">
              {processSteps.map((step) => (
                <ProcessStep key={step.step} data={step} />
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-3xl px-4 py-20 text-center">
          <SectionHeading
            eyebrow="About"
            title="Hi, I'm Walter Johnson"
            subtitle="I help small and mid-size businesses get real value out of Azure, Microsoft 365, and AI — without hiring a full-time cloud team."
          />
          <div className="mt-8">
            <LinkButton href="/about" variant="secondary">
              More about me
            </LinkButton>
          </div>
        </section>
      </Reveal>

      <section className="border-t border-midnight-border px-4 py-16 text-center">
        <h2 className="font-heading text-3xl font-bold text-gray-100">Ready to talk cloud &amp; AI?</h2>
        <p className="mt-3 text-gray-400">Let&apos;s find out if I&apos;m the right fit for your project.</p>
        <div className="mt-6">
          <LinkButton href="/contact">Get in touch</LinkButton>
        </div>
      </section>
    </main>
  );
}
