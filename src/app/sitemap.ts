import { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_CONFIG.url;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];
}
