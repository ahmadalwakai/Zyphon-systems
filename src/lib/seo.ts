import type { SEOConfig } from '@/types';

export const defaultSEO: SEOConfig = {
  titleTemplate: '%s | Zyphon Systems',
  defaultTitle: 'Zyphon Systems — Product Engineering for Modern Businesses',
  description: 'We build production-ready mobile apps, admin panels, backend systems, and scalable digital platforms for modern businesses.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Zyphon Systems',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zyphon Systems - Product Engineering for Modern Businesses',
      },
    ],
  },
};

export function generateMetadata(title: string, description?: string) {
  return {
    title,
    description: description || defaultSEO.description,
    openGraph: {
      title,
      description: description || defaultSEO.description,
      ...defaultSEO.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description || defaultSEO.description,
    },
  };
}
