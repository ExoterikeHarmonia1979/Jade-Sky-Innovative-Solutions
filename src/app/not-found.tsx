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
