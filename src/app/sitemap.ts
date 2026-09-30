import type { MetadataRoute } from 'next';

const SITE_URL = 'https://jadeskyinnovativesolutions.com';
const ROUTES = ['', '/services', '/about', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}
