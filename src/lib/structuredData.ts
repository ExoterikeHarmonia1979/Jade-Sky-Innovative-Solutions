import { SITE_URL } from './site';

export interface ProfessionalServiceSchema {
  '@context': 'https://schema.org';
  '@type': 'ProfessionalService';
  name: string;
  url: string;
  telephone: string;
  email: string;
  founder: { '@type': 'Person'; name: string };
  areaServed: string;
  description: string;
}

export function buildProfessionalServiceSchema(): ProfessionalServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Jade Sky Innovative Solutions LLC',
    url: SITE_URL,
    telephone: '+1-608-630-5875',
    email: 'WalterJohnson@jadeskyinnovativesolutions.onmicrosoft.com',
    founder: { '@type': 'Person', name: 'Walter Johnson' },
    areaServed: 'US',
    description: 'Azure, Microsoft 365, and AI solution development for small and mid-size businesses.',
  };
}
