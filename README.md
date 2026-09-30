# Jade Sky Innovative Solutions Website

Next.js marketing site for Jade Sky Innovative Solutions LLC (Azure, Microsoft 365, and AI consulting).

## Setup

```bash
npm install
npm run dev
```

## Environment variables

Create `.env.local` for local development:

```
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_form_id
```

Without this, the contact form posts to a placeholder Formspree URL and will fail — set the real
Formspree form ID before going live.

## Build

```bash
npm run build
```

Deploys to Vercel on the default Node runtime. Attach the `jadeskyinnovativesolutions.com` domain
in the Vercel dashboard after the first deploy — that step is manual and outside this repo.

## Tests

```bash
npm test
```

Runs the Vitest suite covering contact form validation and the structured-data builder.

## Editing content

- Contact info (name/phone/email) lives in `src/components/Footer.tsx`,
  `src/app/contact/page.tsx`, and `src/lib/structuredData.ts` — update all three if it changes.
- Service and process copy: edit `src/data/services.ts` and `src/data/process.ts`.
- Logo: replace `public/logo.svg` and `src/app/icon.svg` (must stay identical to each other).
