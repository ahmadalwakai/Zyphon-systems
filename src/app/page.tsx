import dynamic from 'next/dynamic';
import { JsonLd } from '@/components/seo/JsonLd';
import { HeroSection } from '@/components/home/HeroSection';
import { WhatWeBuild } from '@/components/home/WhatWeBuild';
import { WhoWeWorkWith } from '@/components/home/WhoWeWorkWith';
import { HowWeWork } from '@/components/home/HowWeWork';

// Lazy load below-fold components
const TypicalProjects = dynamic(
  () => import('@/components/home/TypicalProjects').then((m) => ({ default: m.TypicalProjects })),
  { ssr: true }
);
const WhyClientsChooseUs = dynamic(
  () => import('@/components/home/WhyClientsChooseUs').then((m) => ({ default: m.WhyClientsChooseUs })),
  { ssr: true }
);
const FinalCTA = dynamic(
  () => import('@/components/home/FinalCTA').then((m) => ({ default: m.FinalCTA })),
  { ssr: true }
);

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Zyphon Systems',
  url: 'https://zyphon.dev',
  logo: 'https://zyphon.dev/favicon.ico',
  description: 'Production-ready mobile apps, admin panels, backend systems, and scalable digital platforms.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'hello@zyphon.dev',
  },
  sameAs: ['https://github.com/zyphon-systems'],
};

export default function Home() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <HeroSection />
      <WhatWeBuild />
      <WhoWeWorkWith />
      <HowWeWork />
      <TypicalProjects />
      <WhyClientsChooseUs />
      <FinalCTA />
    </>
  );
}
