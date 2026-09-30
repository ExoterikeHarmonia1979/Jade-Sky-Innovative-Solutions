export type ServicePillar = 'azure' | 'm365' | 'ai';

export interface Service {
  slug: ServicePillar;
  title: string;
  summary: string;
  detail: string;
  bullets: string[];
}

export interface ProcessStepData {
  step: number;
  title: string;
  description: string;
}
