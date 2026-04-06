import type { Metadata } from 'next';
import { Container, VStack } from '@chakra-ui/react';
import { JsonLd } from '@/components/seo/JsonLd';
import { FAQHero } from '@/components/faq/FAQHero';
import { FAQAccordion } from '@/components/faq/FAQAccordion';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about our mobile app development, admin panel, backend, and full platform services.',
};

const faqItems = [
  {
    question: 'Do you build only mobile apps?',
    answer: 'No. We build mobile apps, admin panels, backend systems, APIs, and full digital platforms. Most of our projects involve multiple components working together as a unified system.',
  },
  {
    question: 'Can you build a full product from scratch?',
    answer: 'Yes. We handle the entire lifecycle — from discovery and planning through architecture, backend, admin systems, mobile applications, testing, and launch preparation.',
  },
  {
    question: 'Do you work in phases?',
    answer: 'Yes. We structure projects into clear phases with defined deliverables. This keeps execution controlled, allows for feedback loops, and ensures each phase is properly tested before moving forward.',
  },
  {
    question: 'Can you work with existing systems?',
    answer: 'Yes, depending on the current system quality, access level, and technical suitability. We assess the existing setup during discovery and recommend the best path forward.',
  },
  {
    question: 'Do you support post-launch improvements?',
    answer: 'Yes. Ongoing support, feature enhancements, and future phase development can be planned after launch based on business needs and user feedback.',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Timelines depend on scope and complexity. A focused MVP might take 8–12 weeks. A full platform with mobile app, admin panel, and backend typically takes 4–6 months. We provide realistic estimates during the scoping phase.',
  },
  {
    question: 'What technologies do you use?',
    answer: 'We primarily work with Next.js, React Native, Node.js, TypeScript, and PostgreSQL. Our stack choices are driven by project requirements, scalability needs, and long-term maintainability.',
  },
  {
    question: 'How do you handle pricing?',
    answer: 'We provide project-based pricing after a thorough discovery and scoping phase. All costs are in GBP (£). We offer milestone-based payment plans aligned with delivery phases.',
  },
  {
    question: 'Do you provide design services?',
    answer: 'Yes. UX/UI direction is part of our development process. We focus on usability, clarity, and business goals rather than just visual aesthetics.',
  },
  {
    question: 'What if I only need a backend or API?',
    answer: "That's perfectly fine. We build standalone backend systems, API architectures, and database platforms that can integrate with existing frontends or third-party services.",
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function FAQPage() {
  return (
    <Container maxW="4xl" py={{ base: 16, md: 24 }}>
      <JsonLd data={faqSchema} />
      <VStack gap={{ base: 12, md: 16 }} align="stretch">
        <FAQHero />
        <FAQAccordion items={faqItems} />
      </VStack>
    </Container>
  );
}
