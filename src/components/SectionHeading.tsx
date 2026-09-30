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
