import type { Metadata } from 'next';
import { Sora, Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';

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
      <body className="bg-midnight font-body text-gray-200 antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
