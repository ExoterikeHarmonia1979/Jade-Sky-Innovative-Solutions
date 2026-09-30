import type { Service } from '@/lib/types';

export const services: Service[] = [
  {
    slug: 'azure',
    title: 'Azure',
    summary: 'Cloud infrastructure that scales with you, without the enterprise overhead.',
    bullets: [
      'Cloud migrations & modernization',
      'Cost optimization & rightsizing',
      'Landing zones & governance',
      'Infrastructure as code (Bicep/Terraform)',
    ],
  },
  {
    slug: 'm365',
    title: 'Microsoft 365',
    summary: 'A secure, well-configured Microsoft 365 tenant your whole team can rely on.',
    bullets: [
      'Tenant setup & configuration',
      'Teams & SharePoint rollout',
      'Security & compliance hardening',
      'Copilot deployment & adoption',
    ],
  },
  {
    slug: 'ai',
    title: 'AI Solution Development',
    summary: 'Custom AI that automates real work, built on tools you already own.',
    bullets: [
      'Custom AI agents & assistants',
      'Azure OpenAI integration',
      'Workflow & process automation',
      'Internal tools powered by AI',
    ],
  },
];
