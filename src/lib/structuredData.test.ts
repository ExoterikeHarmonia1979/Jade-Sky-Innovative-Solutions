import { describe, expect, it } from 'vitest';
import { buildProfessionalServiceSchema } from './structuredData';

describe('buildProfessionalServiceSchema', () => {
  it('contains the real business contact details, not placeholders', () => {
    const schema = buildProfessionalServiceSchema();
    expect(schema.name).toBe('Jade Sky Innovative Solutions LLC');
    expect(schema.telephone).toBe('+1-608-630-5875');
    expect(schema.email).toBe('WalterJohnson@jadeskyinnovativesolutions.onmicrosoft.com');
    expect(schema.founder.name).toBe('Walter Johnson');
  });
});
