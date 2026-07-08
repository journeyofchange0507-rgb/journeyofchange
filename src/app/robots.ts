import { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${SEO_CONFIG.url}/sitemap.xml`,
  };
}
