import type { Metadata } from 'next';
import { Box, Container, VStack, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { ProcessHero } from '@/components/process/ProcessHero';
import { ProcessStep } from '@/components/process/ProcessStep';
import { processSteps } from '@/data/process-steps';

export const metadata: Metadata = {
  title: 'Our Workflow',
  description:
    'A structured, phase-based approach to building production-ready digital systems. Discovery, planning, development, testing, and launch support.',
};

export default function ProcessPage() {
  return (
    <>
      <ProcessHero />
      <Box py={{ base: 8, md: 12 }}>
        <Container maxW="4xl">
          <VStack align="stretch" gap={0}>
            {processSteps.map((step, index) => (
              <ProcessStep
                key={step.id}
                step={step}
                index={index}
                isLast={index === processSteps.length - 1}
              />
            ))}
          </VStack>
          <Box textAlign="center" mt={{ base: 8, md: 12 }}>
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
                Start Your Project
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </>
  );
}
