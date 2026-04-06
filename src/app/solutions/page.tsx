import type { Metadata } from 'next';
import { Container, VStack } from '@chakra-ui/react';
import { SolutionsHero } from '@/components/solutions/SolutionsHero';
import { SolutionCard } from '@/components/solutions/SolutionCard';
import { SolutionsCTA } from '@/components/solutions/SolutionsCTA';

export const metadata: Metadata = {
  title: 'Solutions',
  description: 'We build digital systems around real business operations — booking platforms, hospitality systems, multi-branch platforms, and more.',
};

const solutions = [
  {
    icon: 'CalendarCheck',
    title: 'Booking Platforms',
    description: 'Platforms for managing bookings, availability, customer records, pricing, statuses, and internal workflows.',
    features: [
      'Real-time availability',
      'Customer self-service booking',
      'Admin booking management',
      'Payment integration ready',
      'Status tracking & notifications',
      'Reporting dashboards',
    ],
  },
  {
    icon: 'Hotel',
    title: 'Hospitality Systems',
    description: 'Custom systems for hotels and hospitality businesses including room management, booking flow, pricing control, content management, and reporting.',
    features: [
      'Room inventory management',
      'Dynamic pricing controls',
      'Guest booking portal',
      'Housekeeping workflows',
      'Revenue reporting',
      'Multi-property support',
    ],
  },
  {
    icon: 'Building2',
    title: 'Multi-Branch Business Platforms',
    description: 'Systems designed for businesses operating across multiple branches, with centralised control and branch-level management.',
    features: [
      'Centralised admin dashboard',
      'Branch-level access control',
      'Cross-branch reporting',
      'Unified customer database',
      'Branch performance tracking',
      'Scalable architecture',
    ],
  },
  {
    icon: 'Settings2',
    title: 'Internal Operations Systems',
    description: 'Admin tools and dashboards that replace fragmented manual processes with a structured digital workflow.',
    features: [
      'Workflow automation',
      'Task management',
      'Team collaboration tools',
      'Document management',
      'Approval workflows',
      'Activity logging',
    ],
  },
  {
    icon: 'Smartphone',
    title: 'Customer Experience Apps',
    description: 'Apps built to make customer interactions smoother — from onboarding and booking to updates and support.',
    features: [
      'Intuitive onboarding flows',
      'Real-time notifications',
      'Account management',
      'Service history',
      'In-app support',
      'Loyalty & engagement tools',
    ],
  },
];

export default function SolutionsPage() {
  return (
    <Container maxW="7xl" py={{ base: 16, md: 24 }}>
      <VStack gap={{ base: 12, md: 16 }} align="stretch">
        <SolutionsHero />
        <VStack gap={6} align="stretch">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={solution.title}
              icon={solution.icon}
              title={solution.title}
              description={solution.description}
              features={solution.features}
              delay={index * 0.1}
            />
          ))}
        </VStack>
        <SolutionsCTA />
      </VStack>
    </Container>
  );
}
