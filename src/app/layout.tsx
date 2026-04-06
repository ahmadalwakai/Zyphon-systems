import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SmartBackground } from '@/components/ui/SmartBackground';
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
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Zyphon Systems',
    title: 'Zyphon Systems — Product Engineering for Modern Businesses',
    description:
      'We build production-ready mobile apps, admin panels, backend systems, and scalable digital platforms for modern businesses.',
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
          <SmartBackground />
          <Navbar />
          <main style={{ flex: 1, minHeight: '100vh' }}>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
