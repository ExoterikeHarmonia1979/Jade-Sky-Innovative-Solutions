import { Cloud, LayoutGrid, Sparkles, type LucideIcon } from 'lucide-react';
import type { Service } from '@/lib/types';

const ICONS: Record<Service['slug'], LucideIcon> = {
  azure: Cloud,
  m365: LayoutGrid,
  ai: Sparkles,
};

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = ICONS[service.slug];

  return (
    <div
      id={service.slug}
      className="h-full scroll-mt-24 rounded-lg border border-midnight-border bg-gradient-to-b from-[#0f1b33] to-midnight p-6"
    >
      <Icon className="h-8 w-8 text-jade" />
      <h3 className="mt-4 font-heading text-xl font-bold text-gray-100">{service.title}</h3>
      <p className="mt-2 text-sm text-gray-400">{service.summary}</p>
      <ul className="mt-4 space-y-2">
        {service.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2 text-sm text-gray-300">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-jade" />
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}
