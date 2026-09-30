import type { ProcessStepData } from '@/lib/types';

interface ProcessStepProps {
  data: ProcessStepData;
}

export function ProcessStep({ data }: ProcessStepProps) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-jade text-sm font-bold text-jade">
        {data.step}
      </div>
      <div>
        <h3 className="font-heading text-lg font-bold text-gray-100">{data.title}</h3>
        <p className="mt-1 text-sm text-gray-400">{data.description}</p>
      </div>
    </div>
  );
}
