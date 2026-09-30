import Link from 'next/link';
import { NAV_LINKS } from '@/lib/site';

export function Footer() {
  return (
    <footer className="border-t border-midnight-border bg-midnight">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Jade Sky Innovative Solutions" width={130} height={130} className="h-[130px] w-[130px]" />
            <div>
              <p className="font-heading text-sm font-bold text-gray-200">Jade Sky Innovative Solutions LLC</p>
              <p className="text-xs text-gray-500">jadeskyinnovativesolutions.com</p>
            </div>
          </div>

          <nav className="flex flex-col gap-2 md:flex-row md:gap-8">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-gray-400 hover:text-jade">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="text-sm text-gray-400">
            <p>Walter Johnson</p>
            <a href="tel:+16086305875" className="hover:text-jade">
              608-630-5875
            </a>
            <br />
            <a href="mailto:WalterJohnson@jadeskyinnovativesolutions.onmicrosoft.com" className="hover:text-jade">
              WalterJohnson@jadeskyinnovativesolutions.onmicrosoft.com
            </a>
          </div>
        </div>

        <p className="mt-8 border-t border-midnight-border pt-6 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Jade Sky Innovative Solutions LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
