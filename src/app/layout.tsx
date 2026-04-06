import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SmartBackground } from '@/components/ui/SmartBackground';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { SkipToContent } from '@/components/ui/SkipToContent';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0d9488',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://zyphonsystems.com'),
  title: {
    default: 'Zyphon Systems — Production-Ready Mobile Apps, Admin Panels & Digital Platforms',
    template: '%s | Zyphon Systems',
  },
  description:
    'We build production-ready mobile apps, admin panels, backend systems, and scalable digital platforms for modern businesses.',
  keywords: [
    'software development',
    'mobile apps',
    'admin panels',
    'backend systems',
    'digital platforms',
    'product engineering',
  ],
  authors: [{ name: 'Zyphon Systems' }],
  creator: 'Zyphon Systems',
  icons: {
    icon: '/favicon.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Zyphon Systems',
    title: 'Zyphon Systems — Product Engineering for Modern Businesses',
    description:
      'We build production-ready mobile apps, admin panels, backend systems, and scalable digital platforms for modern businesses.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zyphon Systems — Product Engineering for Modern Businesses',
    description:
      'We build production-ready mobile apps, admin panels, backend systems, and scalable digital platforms for modern businesses.',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <Providers>
          <SkipToContent />
          <SmartBackground />
          <Navbar />
          <main id="main-content" style={{ flex: 1, minHeight: '100vh' }}>{children}</main>
          <Footer />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
