'use client';

import { Box, Container, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Target, Workflow, Layers, Lightbulb } from 'lucide-react';

const MotionBox = motion.create(Box);

const principles = [
  {
    title: 'Business logic first',
    description:
      'We start by understanding the actual workflow, operations, and business rules — not by jumping into UI design or feature lists.',
    icon: Target,
  },
  {
    title: 'Systems thinking',
    description:
      'Every app we build is part of a larger system. We think about how admin panels, customer apps, and backend systems connect and communicate.',
    icon: Workflow,
  },
  {
    title: 'Structured delivery',
    description:
      'We break work into clear phases, with defined deliverables, regular check-ins, and predictable timelines.',
    icon: Layers,
  },
  {
    title: 'Pragmatic solutions',
    description:
      'We choose technologies and approaches that make sense for your scale, budget, and timeline — not trends.',
    icon: Lightbulb,
  },
];

export function HowWeThink() {
  return (
    <Box py={{ base: 12, md: 16 }}>
      <Container maxW="7xl">
        <VStack gap={{ base: 10, md: 12 }} align="stretch">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Heading
              as="h2"
              fontSize={{ base: '2xl', md: '3xl' }}
              fontWeight="bold"
              color={{ base: 'gray.900', _dark: 'white' }}
              textAlign={{ base: 'center', md: 'left' }}
            >
              How we think
            </Heading>
          </MotionBox>

          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={{ base: 6, md: 8 }}
          >
            {principles.map((principle, index) => (
              <MotionBox
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Box
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
                  bg={{ base: 'white', _dark: 'rgba(17, 17, 24, 0.7)' }}
                  backdropFilter="blur(12px)"
                  p={{ base: 6, md: 8 }}
                  h="100%"
                >
                  <VStack align="start" gap={4}>
                    <Box
                      p={3}
                      borderRadius="lg"
                      bg={{ base: 'primary.50', _dark: 'primary.500/10' }}
                      color="primary.500"
                    >
                      <principle.icon size={24} />
                    </Box>
                    <Heading
                      as="h3"
                      fontSize={{ base: 'lg', md: 'xl' }}
                      fontWeight="semibold"
                      color={{ base: 'gray.900', _dark: 'white' }}
                    >
                      {principle.title}
                    </Heading>
                    <Text
                      fontSize={{ base: 'sm', md: 'md' }}
                      color={{ base: 'gray.600', _dark: 'gray.400' }}
                      lineHeight="relaxed"
                    >
                      {principle.description}
                    </Text>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
}
