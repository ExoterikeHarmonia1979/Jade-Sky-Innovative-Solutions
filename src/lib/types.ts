export type ServicePillar = 'azure' | 'm365' | 'ai';

export interface Service {
  slug: ServicePillar;
  title: string;
  summary: string;
  bullets: string[];
}

export interface ProcessStepData {
  step: number;
  title: string;
  description: string;
}
