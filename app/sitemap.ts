import type { MetadataRoute } from 'next'
import { calculators } from '@/lib/calculators'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://devtoolsbox.site'
  const staticRoutes = ['', '/calculators', '/about', '/contact', '/privacy', '/terms']

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: (route === '' ? 'weekly' :'monthly') as 'weekly' | 'monthly',
      priority: route === '' ? 1 : route === '/calculators' ? 0.9 : 0.7,
    })),
    ...calculators.map((calculator) => ({
      url: `${baseUrl}/calculators/${calculator.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
