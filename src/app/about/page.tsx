import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { WhoWeAre } from '@/components/about/WhoWeAre';
import { HowWeThink } from '@/components/about/HowWeThink';
import { WhatMakesUsDifferent } from '@/components/about/WhatMakesUsDifferent';
import { OurGoal } from '@/components/about/OurGoal';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Zyphon Systems — a product engineering studio focused on building structured, production-ready digital systems for businesses.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhoWeAre />
      <HowWeThink />
      <WhatMakesUsDifferent />
      <OurGoal />
    </>
  );
}
