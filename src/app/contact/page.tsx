import type { Metadata } from 'next';
import { Box, Container, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Zyphon Systems. Discuss your project requirements for mobile apps, admin panels, backend systems, or full platform development.',
};

export default function ContactPage() {
  return (
    <>
      <Box py={{ base: 16, md: 24 }}>
        <Container maxW="7xl">
          <VStack gap={{ base: 6, md: 8 }} align="center" textAlign="center" mb={{ base: 12, md: 16 }}>
            <Heading
              as="h1"
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="bold"
              color={{ base: 'gray.900', _dark: 'white' }}
            >
              Contact Us
            </Heading>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              color={{ base: 'gray.600', _dark: 'gray.400' }}
              maxW="2xl"
            >
              Have a project in mind? Let&apos;s talk about how we can help you build something
              great.
            </Text>
          </VStack>

          <Grid
            templateColumns={{ base: '1fr', lg: '1.2fr 1fr' }}
            gap={{ base: 8, md: 12 }}
          >
            <ContactForm />
            <ContactInfo />
          </Grid>
        </Container>
      </Box>
    </>
  );
}
