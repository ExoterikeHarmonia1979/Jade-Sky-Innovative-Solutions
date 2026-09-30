interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  as?: 'h1' | 'h2';
}

export function SectionHeading({ eyebrow, title, subtitle, as = 'h2' }: SectionHeadingProps) {
  const Heading = as;
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && <p className="text-sm font-semibold uppercase tracking-wide text-jade">{eyebrow}</p>}
      <Heading className="mt-2 font-heading text-3xl font-bold text-gray-100 md:text-4xl">{title}</Heading>
      {subtitle && <p className="mt-4 text-gray-400">{subtitle}</p>}
    </div>
  );
}
