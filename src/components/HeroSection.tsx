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
