import dynamic from 'next/dynamic';
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

export default function Home() {
  return (
    <>
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
