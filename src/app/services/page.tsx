import type { Metadata } from 'next';
import { Box, Container, VStack, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { ServicesHero } from '@/components/services/ServicesHero';
import { ServiceCard } from '@/components/services/ServiceCard';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Mobile app development, admin panels, backend systems, and full platform development. Production-ready digital systems for modern businesses.',
};

export default function ServicesPage() {
  return (
    <>
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
