# Jade Sky Innovative Solutions Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a Next.js marketing site for Jade Sky Innovative Solutions LLC (jadeskyinnovativesolutions.com) — a solo Azure/Microsoft 365/AI consultancy — matching the approved "Midnight Cloud" design spec.

**Architecture:** Next.js 14 App Router + TypeScript project on the default Node runtime (deployed to Vercel, not statically exported), Tailwind CSS styling, a handful of Framer Motion accents for the hero and scroll reveals, local TypeScript data arrays (no CMS), and a client-side Formspree POST for the contact form. Four routes (`/`, `/services`, `/about`, `/contact`) share a root layout with `Header`/`Footer`.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, lucide-react, framer-motion, next/font/google (Sora + Inter), Vitest (dev-only, for real logic: form validation and structured data).

**Spec:** `Docs/superpowers/specs/2026-09-29-jsis-website-design.md`

## Global Constraints

- Next.js 14 App Router + TypeScript; default Node runtime — no `output: 'export'` in `next.config.js`.
- Styling is Tailwind CSS only — no component library (no shadcn/ui, no Radix).
- Icons come from `lucide-react` only.
- Animation is Framer Motion, used sparingly — hero fade/slide-in, a slow-drifting gradient blob, scroll-reveal on section entry. This is the one dependency beyond the sibling ConstrucFix project's baseline.
- Headings use Sora weights 600/700; body uses Inter — both loaded via `next/font/google`, no external `<link>` stylesheet.
- Audience is SMB owners/decision-makers — plain-English, ROI-focused copy, not enterprise-technical jargon.
- Services are exactly three: Azure, Microsoft 365, AI Solution Development.
- Contact info is real, not placeholder: **Walter Johnson**, **608-630-5875**, **WalterJohnson@jadeskyinnovativesolutions.onmicrosoft.com**.
- Theme colors: `midnight` `#0b1120` (background), `midnight-border` `#1f2a44`, `jade` `#22c58b` (UI accent — brighter than the brand swatch `#008952` for contrast on dark backgrounds). Body/secondary text uses Tailwind's built-in `gray-200`/`gray-400` (no custom text-color tokens needed — they already match the spec's hex values).
- Contact form posts client-side (`fetch`) to `https://formspree.io/f/${NEXT_PUBLIC_FORMSPREE_ID}` — no other backend.
- Logo: `Docs/logo.svg` (1024×1024) copied into the app as-is (no recoloring/modification) — it already reads correctly on dark backgrounds.
- Out of scope: blog, case studies/portfolio, testimonials, CMS, Calendly booking, tech/cert badge row, multi-language support, analytics.

## Review Focus

- Contact form submitted with empty required fields (name/email/message) — must show inline errors and must not POST to Formspree.
- Invalid email format in the contact form (e.g. `not-an-email`) — must be rejected with a specific message, not a generic "required" error.
- Contact form submitted with the service-interest field left on its placeholder ("Select one") — must be rejected even though all four real options (Azure/M365/AI/Not sure yet) are individually valid.
- Contact form submitted with the company field blank — the spec lists a company field but never says it's required; it must be optional, not silently blocked.
- The JSON-LD structured data on the home page must contain the real business name/phone/email, not a leftover placeholder — wrong here is invisible in the browser but wrong to Google.

---

### Task 1: Project scaffold, Tailwind theme, fonts, logo assets, root layout

**Files:**
- Create: `package.json`
- Create: `next.config.js`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `public/logo.svg` (copied from `Docs/logo.svg`)
- Create: `src/app/icon.svg` (copied from `Docs/logo.svg` — Next.js App Router favicon convention)

Note: `.gitignore` already exists at the project root (committed with the design spec) and already covers `node_modules`, `.next`, `out`, `*.tsbuildinfo`, `.env*`, `.vercel` — no changes needed here.

**Interfaces:**
- Consumes: nothing (first task).
- Produces: Tailwind classes `midnight`, `midnight-border`, `jade`, `jade-brand`, `font-heading`, `font-body` available project-wide; path alias `@/*` → `src/*`; a building Next.js app; `/logo.svg` servable at runtime; favicon wired via `src/app/icon.svg`.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "jsis-website",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "lucide-react": "^0.400.0",
    "framer-motion": "^11.3.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "vitest": "^1.6.0"
  }
}
```

- [ ] **Step 2: Create `next.config.js`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#0b1120',
        'midnight-border': '#1f2a44',
        jade: '#22c58b',
        'jade-brand': '#008952',
      },
      fontFamily: {
        heading: ['var(--font-sora)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 5: Create `postcss.config.js`**

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 6: Create `src/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #0b1120;
}
```

- [ ] **Step 7: Create `src/app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import { Sora, Inter } from 'next/font/google';
import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-sora',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Jade Sky Innovative Solutions | Azure, Microsoft 365 & AI Consulting',
  description:
    'Jade Sky Innovative Solutions helps growing businesses adopt Azure, Microsoft 365, and custom AI solutions.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body className="bg-midnight font-body text-gray-200 antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 8: Create `src/app/page.tsx` (placeholder, replaced in Task 9)**

```tsx
export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-24">
      <h1 className="font-heading text-4xl font-bold text-gray-200">Jade Sky Innovative Solutions</h1>
    </main>
  );
}
```

- [ ] **Step 9: Copy logo assets into place**

Run:
```bash
mkdir -p public
cp "Docs/logo.svg" public/logo.svg
cp "Docs/logo.svg" src/app/icon.svg
```
Expected: `public/logo.svg` and `src/app/icon.svg` exist and are identical to `Docs/logo.svg`.

- [ ] **Step 10: Install dependencies and verify build**

Run: `npm install && npm run build`
Expected: build completes successfully with no errors.

- [ ] **Step 11: Commit**

```bash
git add package.json next.config.js tsconfig.json tailwind.config.ts postcss.config.js src/app/globals.css src/app/layout.tsx src/app/page.tsx public/logo.svg src/app/icon.svg package-lock.json
git commit -m "chore: scaffold Next.js project with Midnight Cloud Tailwind theme and logo assets"
```

---

### Task 2: Shared types and content data

**Files:**
- Create: `src/lib/types.ts`
- Create: `src/data/services.ts`
- Create: `src/data/process.ts`

**Interfaces:**
- Consumes: nothing beyond Task 1's TS config.
- Produces: `Service`, `ServicePillar`, `ProcessStepData` types from `@/lib/types`; `services: Service[]` from `@/data/services`; `processSteps: ProcessStepData[]` from `@/data/process`. Later components/pages import from these exact paths.

- [ ] **Step 1: Create `src/lib/types.ts`**

```ts
export type ServicePillar = 'azure' | 'm365' | 'ai';

export interface Service {
  slug: ServicePillar;
  title: string;
  summary: string;
  bullets: string[];
}

export interface ProcessStepData {
  step: number;
  title: string;
  description: string;
}
```

- [ ] **Step 2: Create `src/data/services.ts`**

```ts
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
```

- [ ] **Step 3: Create `src/data/process.ts`**

```ts
import type { ProcessStepData } from '@/lib/types';

export const processSteps: ProcessStepData[] = [
  {
    step: 1,
    title: 'Assess',
    description:
      'We review your current environment, goals, and constraints — no jargon, just a clear picture of where you stand.',
  },
  {
    step: 2,
    title: 'Plan',
    description:
      'You get a concrete roadmap: what gets built, in what order, and what it costs — before any work starts.',
  },
  {
    step: 3,
    title: 'Build',
    description:
      'Hands-on implementation across Azure, Microsoft 365, and AI — with regular check-ins, not radio silence.',
  },
  {
    step: 4,
    title: 'Support',
    description: 'Once it ships, you get ongoing support so the solution keeps working as your business changes.',
  },
];
```

- [ ] **Step 4: Verify types compile**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/lib/types.ts src/data
git commit -m "feat: add shared types and service/process content data"
```

---

### Task 3: Button component

**Files:**
- Create: `src/components/Button.tsx`

**Interfaces:**
- Consumes: nothing beyond React/Next.
- Produces: `buttonStyles(variant?: 'primary' | 'secondary'): string`, `Button` (native `<button>` wrapper), `LinkButton({ href, variant?, className?, children }: { href: string; variant?: 'primary' | 'secondary'; className?: string; children: ReactNode })` — all from `@/components/Button`. Later tasks (Header, HeroSection, Home, ContactForm) import `LinkButton` and/or `buttonStyles`.

- [ ] **Step 1: Create `src/components/Button.tsx`**

```tsx
import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary';

export function buttonStyles(variant: ButtonVariant = 'primary'): string {
  const base =
    'inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0';
  const variants: Record<ButtonVariant, string> = {
    primary: `${base} bg-jade text-midnight hover:bg-jade/90`,
    secondary: `${base} border border-midnight-border text-gray-200 hover:border-jade hover:text-jade`,
  };
  return variants[variant];
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  return (
    <button className={`${buttonStyles(variant)} ${className}`} {...props}>
      {children}
    </button>
  );
}

interface LinkButtonProps {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}

export function LinkButton({ href, variant = 'primary', className = '', children }: LinkButtonProps) {
  return (
    <Link href={href} className={`${buttonStyles(variant)} ${className}`}>
      {children}
    </Link>
  );
}
```

- [ ] **Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Button.tsx
git commit -m "feat: add Button and LinkButton components"
```

---

### Task 4: SectionHeading component

**Files:**
- Create: `src/components/SectionHeading.tsx`

**Interfaces:**
- Consumes: nothing beyond React.
- Produces: `SectionHeading({ eyebrow?, title, subtitle? }: { eyebrow?: string; title: string; subtitle?: string })` from `@/components/SectionHeading`. Home, Services, and About pages import it.

- [ ] **Step 1: Create `src/components/SectionHeading.tsx`**

```tsx
interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && <p className="text-sm font-semibold uppercase tracking-wide text-jade">{eyebrow}</p>}
      <h2 className="mt-2 font-heading text-3xl font-bold text-gray-100 md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-gray-400">{subtitle}</p>}
    </div>
  );
}
```

- [ ] **Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/SectionHeading.tsx
git commit -m "feat: add SectionHeading component"
```

---

### Task 5: Header component

**Files:**
- Create: `src/components/Header.tsx`
- Modify: `src/app/layout.tsx` (add `Header` above `{children}`)

**Interfaces:**
- Consumes: `LinkButton` from `@/components/Button` (Task 3); `/logo.svg` from `public/` (Task 1).
- Produces: `Header` (no props) from `@/components/Header`, wired into root layout.

- [ ] **Step 1: Create `src/components/Header.tsx`**

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { LinkButton } from './Button';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-midnight-border bg-midnight/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Jade Sky Innovative Solutions" className="h-8 w-8" />
          <span className="font-heading text-lg font-bold text-gray-200">JSIS</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-300 transition hover:text-jade"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <LinkButton href="/contact">Get in touch</LinkButton>
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="text-gray-200 md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="flex flex-col gap-4 border-t border-midnight-border bg-midnight px-4 py-6 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium text-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <LinkButton href="/contact">Get in touch</LinkButton>
        </nav>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Modify `src/app/layout.tsx` to render `Header`**

Change the body from:

```tsx
      <body className="bg-midnight font-body text-gray-200 antialiased">{children}</body>
```

to:

```tsx
      <body className="bg-midnight font-body text-gray-200 antialiased">
        <Header />
        {children}
      </body>
```

And add the import near the top with the other imports:

```tsx
import { Header } from '@/components/Header';
```

- [ ] **Step 3: Verify build**

Run: `npx tsc --noEmit && npm run build`
Expected: no errors; build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.tsx src/app/layout.tsx
git commit -m "feat: add sticky Header with mobile nav and wire into layout"
```

---

### Task 6: Footer component

**Files:**
- Create: `src/components/Footer.tsx`
- Modify: `src/app/layout.tsx` (add `Footer` below `{children}`)

**Interfaces:**
- Consumes: `/logo.svg` from `public/` (Task 1).
- Produces: `Footer` (no props) from `@/components/Footer`, wired into root layout.

- [ ] **Step 1: Create `src/components/Footer.tsx`**

```tsx
import Link from 'next/link';

const SITE_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Footer() {
  return (
    <footer className="border-t border-midnight-border bg-midnight">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Jade Sky Innovative Solutions" className="h-8 w-8" />
            <div>
              <p className="font-heading text-sm font-bold text-gray-200">Jade Sky Innovative Solutions LLC</p>
              <p className="text-xs text-gray-500">jadeskyinnovativesolutions.com</p>
            </div>
          </div>

          <nav className="flex flex-col gap-2 md:flex-row md:gap-8">
            {SITE_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-gray-400 hover:text-jade">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="text-sm text-gray-400">
            <p>Walter Johnson</p>
            <p>608-630-5875</p>
            <p>WalterJohnson@jadeskyinnovativesolutions.onmicrosoft.com</p>
          </div>
        </div>

        <p className="mt-8 border-t border-midnight-border pt-6 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Jade Sky Innovative Solutions LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Modify `src/app/layout.tsx` to render `Footer`**

Change:

```tsx
      <body className="bg-midnight font-body text-gray-200 antialiased">
        <Header />
        {children}
      </body>
```

to:

```tsx
      <body className="bg-midnight font-body text-gray-200 antialiased">
        <Header />
        {children}
        <Footer />
      </body>
```

And add the import:

```tsx
import { Footer } from '@/components/Footer';
```

- [ ] **Step 3: Verify build**

Run: `npx tsc --noEmit && npm run build`
Expected: no errors; build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.tsx src/app/layout.tsx
git commit -m "feat: add Footer with real contact info and wire into layout"
```

---

### Task 7: ServiceCard and ProcessStep components

**Files:**
- Create: `src/components/ServiceCard.tsx`
- Create: `src/components/ProcessStep.tsx`

**Interfaces:**
- Consumes: `Service`, `ProcessStepData` types from `@/lib/types` (Task 2).
- Produces: `ServiceCard({ service: Service })` from `@/components/ServiceCard`; `ProcessStep({ data: ProcessStepData })` from `@/components/ProcessStep`. Home and Services pages import `ServiceCard`; Home page imports `ProcessStep`.

- [ ] **Step 1: Create `src/components/ServiceCard.tsx`**

```tsx
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
      className="h-full rounded-lg border border-midnight-border bg-gradient-to-b from-[#0f1b33] to-midnight p-6"
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
```

- [ ] **Step 2: Create `src/components/ProcessStep.tsx`**

```tsx
import type { ProcessStepData } from '@/lib/types';

interface ProcessStepProps {
  data: ProcessStepData;
}

export function ProcessStep({ data }: ProcessStepProps) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-jade text-sm font-bold text-jade">
        {data.step}
      </div>
      <div>
        <h3 className="font-heading text-lg font-bold text-gray-100">{data.title}</h3>
        <p className="mt-1 text-sm text-gray-400">{data.description}</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify types compile**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ServiceCard.tsx src/components/ProcessStep.tsx
git commit -m "feat: add ServiceCard and ProcessStep components"
```

---

### Task 8: Contact form validation, Vitest setup, and ContactForm component

This is real logic (form validation), so it gets a real red/green test cycle. Tests here cover 4 of the 5 Review Focus items.

**Files:**
- Create: `vitest.config.ts`
- Create: `src/lib/validateContactForm.ts`
- Create: `src/lib/validateContactForm.test.ts`
- Create: `src/components/ContactForm.tsx`

**Interfaces:**
- Consumes: `buttonStyles` from `@/components/Button` (Task 3).
- Produces: `ContactFormData`, `ContactFormErrors` types and `validateContactForm(data: ContactFormData): ContactFormErrors` from `@/lib/validateContactForm`; `ContactForm` (no props, `'use client'`) from `@/components/ContactForm`. Contact page (Task 12) imports `ContactForm`.

- [ ] **Step 1: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
  },
});
```

- [ ] **Step 2: Write the failing test — create `src/lib/validateContactForm.test.ts`**

```ts
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
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run src/lib/validateContactForm.test.ts`
Expected: FAIL — `Cannot find module './validateContactForm'` (module doesn't exist yet).

- [ ] **Step 4: Write minimal implementation — create `src/lib/validateContactForm.ts`**

```ts
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
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/lib/validateContactForm.test.ts`
Expected: PASS — 4 tests passing.

- [ ] **Step 6: Create `src/components/ContactForm.tsx`**

```tsx
'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { buttonStyles } from './Button';
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
          className="mt-1 w-full rounded border border-midnight-border bg-[#0f1b33] px-3 py-2 text-gray-200 focus:border-jade focus:outline-none"
        />
        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
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
          className="mt-1 w-full rounded border border-midnight-border bg-[#0f1b33] px-3 py-2 text-gray-200 focus:border-jade focus:outline-none"
        />
        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
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
          className="mt-1 w-full rounded border border-midnight-border bg-[#0f1b33] px-3 py-2 text-gray-200 focus:border-jade focus:outline-none"
        >
          <option value="">Select one</option>
          {SERVICE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.serviceInterest && <p className="mt-1 text-sm text-red-400">{errors.serviceInterest}</p>}
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
          className="mt-1 w-full rounded border border-midnight-border bg-[#0f1b33] px-3 py-2 text-gray-200 focus:border-jade focus:outline-none"
        />
        {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
      </div>

      <button type="submit" disabled={status === 'submitting'} className={buttonStyles('primary')}>
        {status === 'submitting' ? 'Sending...' : 'Send message'}
      </button>

      {status === 'success' && (
        <p className="text-sm font-semibold text-jade">Thanks! I&apos;ll get back to you shortly.</p>
      )}
      {status === 'error' && (
        <p className="text-sm font-semibold text-red-400">Something went wrong. Please email me directly.</p>
      )}
    </form>
  );
}
```

- [ ] **Step 7: Verify types compile and full test suite passes**

Run: `npx tsc --noEmit && npx vitest run`
Expected: no type errors; all tests pass.

- [ ] **Step 8: Commit**

```bash
git add vitest.config.ts src/lib/validateContactForm.ts src/lib/validateContactForm.test.ts src/components/ContactForm.tsx package.json
git commit -m "feat: add contact form validation with tests and ContactForm component"
```

---

### Task 9: Motion components and Home page assembly

**Files:**
- Create: `src/components/HeroSection.tsx`
- Create: `src/components/Reveal.tsx`
- Modify: `src/app/page.tsx` (replace placeholder from Task 1)

**Interfaces:**
- Consumes: `LinkButton` (Task 3), `SectionHeading` (Task 4), `ServiceCard` (Task 7), `ProcessStep` (Task 7), `services` (Task 2), `processSteps` (Task 2).
- Produces: `HeroSection` (no props, `'use client'`) from `@/components/HeroSection`; `Reveal({ children }: { children: ReactNode })` (`'use client'`) from `@/components/Reveal`; the `/` route.

- [ ] **Step 1: Create `src/components/HeroSection.tsx`**

```tsx
'use client';

import { motion } from 'framer-motion';
import { LinkButton } from './Button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-28 text-center">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-jade/20 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative mx-auto max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-heading text-4xl font-bold leading-tight text-gray-100 md:text-6xl">
          Azure, Microsoft 365, and AI — without the enterprise overhead.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-gray-400">
          Fractional cloud and AI expertise for businesses that need it done right, not a committee to manage.
        </p>
        <div className="mt-8 flex justify-center">
          <LinkButton href="/contact">Get in touch</LinkButton>
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/components/Reveal.tsx`**

```tsx
'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
}

export function Reveal({ children }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Replace `src/app/page.tsx`**

```tsx
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

export const metadata: Metadata = {
  title: 'Jade Sky Innovative Solutions | Azure, Microsoft 365 & AI Consulting',
  description:
    'Jade Sky Innovative Solutions helps growing businesses adopt Azure, Microsoft 365, and custom AI solutions.',
};

export default function HomePage() {
  return (
    <main>
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
```

- [ ] **Step 4: Verify build**

Run: `npx tsc --noEmit && npm run build`
Expected: no errors; build succeeds; `/` renders.

- [ ] **Step 5: Commit**

```bash
git add src/components/HeroSection.tsx src/components/Reveal.tsx src/app/page.tsx
git commit -m "feat: assemble Home page with animated hero, services teaser, and process"
```

---

### Task 10: Services page

**Files:**
- Create: `src/app/services/page.tsx`

**Interfaces:**
- Consumes: `SectionHeading` (Task 4), `ServiceCard` (Task 7), `services` (Task 2).
- Produces: the `/services` route, with `#azure`/`#m365`/`#ai` anchors matching the home-page teaser links.

- [ ] **Step 1: Create `src/app/services/page.tsx`**

```tsx
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
```

- [ ] **Step 2: Verify build**

Run: `npx tsc --noEmit && npm run build`
Expected: no errors; `/services` renders with working `#azure`, `#m365`, `#ai` anchors.

- [ ] **Step 3: Commit**

```bash
git add src/app/services/page.tsx
git commit -m "feat: add Services page"
```

---

### Task 11: About page

**Files:**
- Create: `src/app/about/page.tsx`

**Interfaces:**
- Consumes: nothing beyond Next metadata.
- Produces: the `/about` route.

- [ ] **Step 1: Create `src/app/about/page.tsx`**

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Jade Sky Innovative Solutions',
  description: 'Walter Johnson, founder of Jade Sky Innovative Solutions — Azure, Microsoft 365, and AI consulting.',
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="font-heading text-4xl font-bold text-gray-100">About Walter Johnson</h1>
      <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start">
        <div
          aria-hidden="true"
          className="h-40 w-40 flex-shrink-0 rounded-full border border-midnight-border bg-gradient-to-b from-[#0f1b33] to-midnight"
        />
        <div className="space-y-4 text-gray-400">
          <p>
            I&apos;m Walter Johnson, founder of Jade Sky Innovative Solutions. I&apos;ve spent my career in and
            around Microsoft&apos;s cloud stack — Azure infrastructure, Microsoft 365 administration, and more
            recently, building practical AI solutions on top of both. I started JSIS because most businesses
            don&apos;t need a full-time cloud team; they need someone who can move across Azure, M365, and AI
            without three separate vendors and three separate invoices.
          </p>
          <p>
            My approach is simple: understand what you actually need before recommending anything, give you a
            plan with real costs attached, and stay involved after launch instead of disappearing once the
            invoice is paid.
          </p>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npx tsc --noEmit && npm run build`
Expected: no errors; `/about` renders.

- [ ] **Step 3: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: add About page"
```

---

### Task 12: Contact page and not-found page

**Files:**
- Create: `src/app/contact/page.tsx`
- Create: `src/app/not-found.tsx`

**Interfaces:**
- Consumes: `ContactForm` (Task 8).
- Produces: the `/contact` route and the 404 page.

- [ ] **Step 1: Create `src/app/contact/page.tsx`**

```tsx
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
```

- [ ] **Step 2: Create `src/app/not-found.tsx`**

```tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center px-4 py-32 text-center">
      <h1 className="font-heading text-5xl font-bold text-gray-100">404</h1>
      <p className="mt-4 text-lg text-gray-400">That page doesn&apos;t exist. Let&apos;s get you back on track.</p>
      <Link href="/" className="mt-8 font-semibold text-jade hover:underline">
        Back to Home
      </Link>
    </main>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npx tsc --noEmit && npm run build`
Expected: no errors; `/contact` and the 404 page render.

- [ ] **Step 4: Commit**

```bash
git add src/app/contact/page.tsx src/app/not-found.tsx
git commit -m "feat: add Contact page with ContactForm and not-found page"
```

---

### Task 13: SEO — sitemap, robots, structured data

This includes one piece of real logic (the structured-data builder), so it gets a red/green test cycle covering the fifth Review Focus item.

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Create: `src/lib/structuredData.ts`
- Create: `src/lib/structuredData.test.ts`
- Modify: `src/app/page.tsx` (add the JSON-LD `<script>` tag)

**Interfaces:**
- Consumes: nothing new.
- Produces: `buildProfessionalServiceSchema(): ProfessionalServiceSchema` from `@/lib/structuredData`, rendered into the home page's `<head>` via a `<script type="application/ld+json">` tag.

- [ ] **Step 1: Write the failing test — create `src/lib/structuredData.test.ts`**

```ts
import { describe, expect, it } from 'vitest';
import { buildProfessionalServiceSchema } from './structuredData';

describe('buildProfessionalServiceSchema', () => {
  it('contains the real business contact details, not placeholders', () => {
    const schema = buildProfessionalServiceSchema();
    expect(schema.name).toBe('Jade Sky Innovative Solutions LLC');
    expect(schema.telephone).toBe('+1-608-630-5875');
    expect(schema.email).toBe('WalterJohnson@jadeskyinnovativesolutions.onmicrosoft.com');
    expect(schema.founder.name).toBe('Walter Johnson');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/structuredData.test.ts`
Expected: FAIL — `Cannot find module './structuredData'` (module doesn't exist yet).

- [ ] **Step 3: Write minimal implementation — create `src/lib/structuredData.ts`**

```ts
export interface ProfessionalServiceSchema {
  '@context': 'https://schema.org';
  '@type': 'ProfessionalService';
  name: string;
  url: string;
  telephone: string;
  email: string;
  founder: { '@type': 'Person'; name: string };
  areaServed: string;
  description: string;
}

const SITE_URL = 'https://jadeskyinnovativesolutions.com';

export function buildProfessionalServiceSchema(): ProfessionalServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Jade Sky Innovative Solutions LLC',
    url: SITE_URL,
    telephone: '+1-608-630-5875',
    email: 'WalterJohnson@jadeskyinnovativesolutions.onmicrosoft.com',
    founder: { '@type': 'Person', name: 'Walter Johnson' },
    areaServed: 'US',
    description: 'Azure, Microsoft 365, and AI solution development for small and mid-size businesses.',
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/structuredData.test.ts`
Expected: PASS — 1 test passing.

- [ ] **Step 5: Create `src/app/sitemap.ts`**

```ts
import type { MetadataRoute } from 'next';

const SITE_URL = 'https://jadeskyinnovativesolutions.com';
const ROUTES = ['', '/services', '/about', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}
```

- [ ] **Step 6: Create `src/app/robots.ts`**

```ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://jadeskyinnovativesolutions.com/sitemap.xml',
  };
}
```

- [ ] **Step 7: Modify `src/app/page.tsx` to render the structured data**

Add the import near the top with the other imports:

```tsx
import { buildProfessionalServiceSchema } from '@/lib/structuredData';
```

Change the start of the component from:

```tsx
export default function HomePage() {
  return (
    <main>
      <HeroSection />
```

to:

```tsx
export default function HomePage() {
  const schema = buildProfessionalServiceSchema();

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <HeroSection />
```

- [ ] **Step 8: Verify types compile, tests pass, and build succeeds**

Run: `npx tsc --noEmit && npx vitest run && npm run build`
Expected: no type errors; all tests pass; build succeeds; `out`-free build output includes `/sitemap.xml` and `/robots.txt` routes.

- [ ] **Step 9: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts src/lib/structuredData.ts src/lib/structuredData.test.ts src/app/page.tsx
git commit -m "feat: add sitemap, robots, and ProfessionalService structured data"
```

---

### Task 14: Final verification and README

**Files:**
- Create: `README.md`

**Interfaces:**
- Consumes: nothing (documentation task).
- Produces: setup/deploy instructions; final full-site verification.

- [ ] **Step 1: Create `README.md`**

```markdown
# Jade Sky Innovative Solutions Website

Next.js marketing site for Jade Sky Innovative Solutions LLC (Azure, Microsoft 365, and AI consulting).

## Setup

​```bash
npm install
npm run dev
​```

## Environment variables

Create `.env.local` for local development:

​```
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_form_id
​```

Without this, the contact form posts to a placeholder Formspree URL and will fail — set the real
Formspree form ID before going live.

## Build

​```bash
npm run build
​```

Deploys to Vercel on the default Node runtime. Attach the `jadeskyinnovativesolutions.com` domain
in the Vercel dashboard after the first deploy — that step is manual and outside this repo.

## Tests

​```bash
npm test
​```

Runs the Vitest suite covering contact form validation and the structured-data builder.

## Editing content

- Contact info (name/phone/email) lives in `src/components/Footer.tsx`,
  `src/app/contact/page.tsx`, and `src/lib/structuredData.ts` — update all three if it changes.
- Service and process copy: edit `src/data/services.ts` and `src/data/process.ts`.
- Logo: replace `public/logo.svg` and `src/app/icon.svg` (must stay identical to each other).
```

- [ ] **Step 2: Run full verification suite**

Run: `npx tsc --noEmit && npx vitest run && npm run build`
Expected: no type errors; all Vitest tests pass (validation + structured data, 5 tests total); build completes with routes for `/`, `/services`, `/about`, `/contact`, `/sitemap.xml`, `/robots.txt`, and the 404 page.

- [ ] **Step 3: Manual responsive check**

Run: `npm run build && npm run start`, then open `http://localhost:3000` in a browser. Check at mobile (375px), tablet (768px), and desktop (1280px) widths: Header nav collapses to hamburger menu below `md`, hero text/CTA stay centered and readable, services grid reflows from 1 to 3 columns, contact form and contact-info block stack vertically on mobile.

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: add README with setup, env vars, and deploy instructions"
```
