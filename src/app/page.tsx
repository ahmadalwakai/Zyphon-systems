import { HeroSection } from '@/components/home/HeroSection';
import { WhatWeBuild } from '@/components/home/WhatWeBuild';
import { WhoWeWorkWith } from '@/components/home/WhoWeWorkWith';
import { HowWeWork } from '@/components/home/HowWeWork';
import { TypicalProjects } from '@/components/home/TypicalProjects';
import { WhyClientsChooseUs } from '@/components/home/WhyClientsChooseUs';
import { FinalCTA } from '@/components/home/FinalCTA';

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
