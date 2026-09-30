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
