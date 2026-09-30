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
