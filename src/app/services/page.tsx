import type { Metadata } from 'next';
import { Box, Container, VStack, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { ServicesHero } from '@/components/services/ServicesHero';
import { ServiceCard } from '@/components/services/ServiceCard';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Mobile app development, admin panels, backend systems, and full platform development. Production-ready digital systems for modern businesses.',
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: services.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: s.title,
      description: s.description,
      provider: { '@type': 'Organization', name: 'Zyphon Systems' },
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <ServicesHero />
      <Box py={{ base: 8, md: 12 }}>
        <Container maxW="4xl">
          <VStack gap={{ base: 6, md: 8 }} align="stretch">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </VStack>
          <Box textAlign="center" mt={{ base: 12, md: 16 }}>
            <Link href="/contact">
              <Button
                size="lg"
                bg="primary.500"
                color="white"
                fontWeight="semibold"
                borderRadius="lg"
                px={8}
                _hover={{ bg: 'primary.600', transform: 'translateY(-2px)' }}
                transition="all 0.2s"
              >
                Discuss Your Project
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </>
  );
}
