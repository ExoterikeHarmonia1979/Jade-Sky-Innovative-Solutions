# Jade Sky Innovative Solutions Website — Design Spec

Date: 2026-09-29

## Purpose

Marketing/contractor site for Jade Sky Innovative Solutions LLC
(jadeskyinnovativesolutions.com), a solo IT consultancy specializing in
Azure, Microsoft 365, and AI solution development. Goal: generate contact
form leads from SMB owners, present a credible technical-but-approachable
identity built around the existing JSIS cloud logo, deploy on Vercel.

## Scope

- Target audience: SMB owners/decision-makers, not enterprise IT buyers —
  plain-English, ROI-focused copy over deep technical jargon.
- Services covered: Azure, Microsoft 365, AI solution development (three
  pillars).
- Real contact info from day one (not placeholder):
  - Name: Walter Johnson
  - Phone: 608-630-5875
  - Email: WalterJohnson@jadeskyinnovativesolutions.onmicrosoft.com
- All other copy (bio details, service descriptions, "How I Work" steps) is
  placeholder-quality first-draft text, written to be realistic and directly
  editable, not `[TOKEN]` placeholders.
- Contact form submits via Formspree (client-side POST, no backend).
- No blog, no case studies/portfolio page, no testimonials — none exist yet
  for a new consultancy; add later without a spec change.

## Technical Framework

- Next.js 14, App Router, TypeScript.
- Styling: Tailwind CSS only, hand-built components (no shadcn/ui) — matches
  sibling ConstrucFix project's convention in this repo.
- Icons: `lucide-react`.
- Animation: Framer Motion, used sparingly — hero fade/slide-in, a slow-drifting
  gradient blob behind the hero, scroll-reveal on section entry. This is the
  one new dependency versus the ConstrucFix baseline, justified by the
  explicit "be creative" brief; kept to a handful of call sites, not a
  site-wide animation system.
- Fonts: Inter (body) + a heavier weight for headings, both via
  `next/font/google` — self-contained, no extra stylesheet request.
- Deployment: Vercel. `next build` with default Node runtime (not static
  export) since Formspree POST and future route flexibility don't need the
  `output: 'export'` constraint ConstrucFix used.
- Domain: jadeskyinnovativesolutions.com attached via Vercel dashboard —
  manual step outside this repo's automation, flagged at deploy time.

## Visual Identity — "Midnight Cloud"

Chosen via visual companion brainstorm (3 directions shown, this one picked).

- Background: `#0b1120` (near-black navy).
- Card surface: gradient `#0f1b33` → `#0b1120`, `1px` border `#1f2a44`.
- Accent jade: `#22c58b` (brightened from brand `#008952` for contrast on
  dark backgrounds; `#008952` remains the "official" brand swatch used in
  print/small-scale contexts per the logo brand sheet).
- Text: primary `#e5e7eb`, secondary `#9ca3af`.
- CTA buttons: solid jade `#22c58b` fill, dark text, on primary actions;
  outline/ghost style for secondary actions.
- Logo (`Docs/logo.svg`, 1024×1024 Recraft-exported vector) used as-is in
  Header, Footer, and for favicon/OG image generation — reads correctly on
  dark backgrounds without modification (green outline + green wordmark).

## Site Structure (routes)

All routes share a root layout with `<Header>` and `<Footer>`.

1. **`/` (Home)**
   - Hero: headline + subhead pitching Azure/M365/AI for SMBs, primary CTA
     ("Get in touch" → `/contact`), animated gradient blob background
     (Framer Motion, slow drift), fade/slide-in on load.
   - Services teaser: 3 `ServiceCard`s (Azure / M365 / AI), each linking to
     the matching anchor on `/services`.
   - "How I Work" process section: 4 `ProcessStep`s — Assess → Plan →
     Build → Support — with short description each.
   - About teaser: 2-3 sentence pull from `/about`, headshot placeholder,
     link to full page.
   - Final CTA band linking to `/contact`.

2. **`/services`**
   - Three detailed sections (anchor-linked from home), one per pillar:
     - **Azure**: migrations, cost optimization, landing zones,
       infrastructure-as-code.
     - **Microsoft 365**: tenant setup, Teams/SharePoint configuration,
       security & compliance, Copilot rollout.
     - **AI Solution Development**: custom AI agents, Azure OpenAI
       integration, workflow automation.
   - Each section: icon (Lucide), heading, 1-2 sentence intro, bullet list
     of specific offerings, matches `ServiceCard`-style visual treatment
     used on the home teaser but expanded.

3. **`/about`**
   - Bio (Walter Johnson), background/approach philosophy, why
     Azure+M365+AI as a combined specialty, placeholder professional photo.

4. **`/contact`**
   - `ContactForm` component: name, email, company, service interest
     (select: Azure / M365 / AI / Not sure), message — client-side `fetch`
     POST to Formspree endpoint
     (`process.env.NEXT_PUBLIC_FORMSPREE_ID`), inline success/error state,
     no page reload.
   - Direct contact block alongside the form: click-to-call
     (`tel:+16086305875`), click-to-email
     (`mailto:WalterJohnson@jadeskyinnovativesolutions.onmicrosoft.com`).

## Shared Components

- `Header` — sticky, dark glass (`backdrop-blur` over translucent navy),
  logo (SVG), nav links, "Get in touch" CTA button, mobile hamburger menu.
- `Footer` — navy background, site index, domain, contact info (phone/email
  from Scope section above).
- `Button` — primary (solid jade) / secondary (outline) variants.
- `ServiceCard` — icon, title, description, bullet list; used both as a
  condensed home teaser and an expanded `/services` block.
- `ProcessStep` — numbered step, title, short description, used in "How I
  Work".
- `ContactForm` — controlled form, Formspree submit, loading/success/error
  states, mirrors ConstrucFix's `QuoteForm` pattern
  (`validateContactForm` lib function + component).
- `SectionHeading` — shared heading/subheading block used across page
  sections for visual consistency.

## Data Flow

Fully static content, no CMS. Service pillar content and process steps live
as local TypeScript data arrays (`src/data/services.ts`,
`src/data/process.ts`) imported at build time. Editing copy later means
editing these files directly.

## SEO

- `sitemap.ts` and `robots.ts` (App Router conventions), matching
  ConstrucFix's approach.
- Per-page `metadata` exports (title/description/OG image using the logo).
- `ProfessionalService` JSON-LD structured data on the home page (adapted
  from ConstrucFix's `LocalBusiness` schema) with the real name, phone, and
  email from Scope.

## Error Handling

- `ContactForm`: client-side required-field validation before submit; on
  Formspree non-2xx response, show inline error and preserve entered
  values; on success, show confirmation and reset form.
- Standard Next.js `not-found.tsx` for unmatched routes.

## Testing

- Type-check (`tsc --noEmit`) and `next build` must succeed as the baseline
  correctness check.
- `validateContactForm` gets a Vitest unit test (required-field and email
  format cases) — mirrors ConstrucFix's `validateQuoteForm` test coverage.
- Manual responsive check (mobile/tablet/desktop) of Header nav collapse and
  hero/section reflow — no automated visual regression suite (YAGNI for a
  site this size).

## Out of Scope

- Blog/case-studies/portfolio/testimonials sections — no content exists yet
  for a new consultancy; add later without a spec change.
- CMS / dynamic content management.
- Tech/certification badge row, Calendly booking integration — considered
  and deferred during brainstorm (Formspree-only lead capture chosen).
- Multi-language support.
- Analytics/tracking integration (can be added later without spec changes).
