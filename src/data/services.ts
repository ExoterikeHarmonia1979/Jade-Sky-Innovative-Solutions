import type { Service } from '@/lib/types';

export const services: Service[] = [
  {
    slug: 'azure',
    title: 'Azure',
    summary: 'Cloud infrastructure that scales with you, without the enterprise overhead.',
    detail:
      "Most engagements start with a lift-and-shift migration off aging on-prem servers or an over-provisioned VM sprawl, then move into cost optimization once workloads are running in Azure — rightsizing instances, reserved capacity, and cutting the surprise line items on the monthly bill. For businesses building out multiple environments, I set up landing zones and governance (policy, RBAC, budgets) so dev, test, and prod stay organized as the footprint grows, with infrastructure defined as code so changes are reviewable instead of made by hand in the portal.",
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
    detail:
      "Typical work is standing up or cleaning up a tenant that grew organically without a plan — fixing licensing, conditional access, and MFA gaps, then rolling out Teams and SharePoint with a folder and permissions structure people can actually navigate. For teams already on M365, that often extends into security and compliance hardening (Defender, DLP, retention policies) ahead of an audit or client requirement, plus a staged Copilot rollout with training so adoption doesn't stall after the licenses are purchased.",
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
    detail:
      "This usually looks like a custom agent or assistant built on Azure OpenAI that's wired directly into your existing data — a support inbox, a SharePoint library, a CRM — rather than a generic chatbot bolted on top. Common projects include automating a manual, repetitive workflow (document processing, ticket triage, report generation) or building an internal tool that gives non-technical staff a simple interface over an AI capability, all running inside your own Azure tenant so data stays under your control.",
    bullets: [
      'Custom AI agents & assistants',
      'Azure OpenAI integration',
      'Workflow & process automation',
      'Internal tools powered by AI',
    ],
  },
];
