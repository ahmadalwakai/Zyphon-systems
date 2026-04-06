import type { Metadata } from 'next';
import { Container, VStack } from '@chakra-ui/react';
import { BookingHero } from '@/components/book/BookingHero';
import { BookingForm } from '@/components/book/BookingForm';

export const metadata: Metadata = {
  title: 'Book a Meeting',
  description: 'Schedule a discovery meeting to discuss your mobile app, admin panel, or digital platform project.',
};

export default function BookPage() {
  return (
    <Container maxW="3xl" py={{ base: 16, md: 24 }}>
      <VStack gap={{ base: 10, md: 14 }} align="stretch">
        <BookingHero />
        <BookingForm />
      </VStack>
    </Container>
  );
}
