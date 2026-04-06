'use client';

import { Box, Container, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Brain, ListChecks, TrendingUp, Users } from 'lucide-react';
import { SectionGeometry } from '@/components/ui/SectionGeometry';

const MotionBox = motion.create(Box);

const reasons = [
  {
    title: 'Business-first thinking',
    description:
      'We start from workflow, operations, and business needs — not random screens.',
    icon: Brain,
  },
  {
    title: 'Structured execution',
    description:
      'Clear scope, organized phases, defined deliverables, and professional communication.',
    icon: ListChecks,
  },
  {
    title: 'Scalable architecture',
    description:
      'We build systems that are prepared for growth, not just quick launch.',
    icon: TrendingUp,
  },
  {
    title: 'Operational focus',
    description:
      'Our work is designed to support real teams, real users, and real day-to-day processes.',
    icon: Users,
  },
];

export function WhyClientsChooseUs() {
  return (
    <Box position="relative" overflow="hidden" py={{ base: 16, md: 24 }}>
      <SectionGeometry variant="cards" />
      <Container maxW="7xl" position="relative" zIndex={1}>
        <VStack gap={{ base: 10, md: 12 }} align="stretch">
          <MotionBox
            textAlign="center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Heading
              as="h2"
              fontSize={{ base: '2xl', md: '4xl' }}
              fontWeight="bold"
              color={{ base: 'gray.900', _dark: 'white' }}
            >
              Why clients work with us
            </Heading>
          </MotionBox>

          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={{ base: 6, md: 8 }}
          >
            {reasons.map((reason, index) => (
              <MotionBox
                key={reason.title}
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
                      bg={{ base: 'accent.50', _dark: 'accent.500/10' }}
                      color="accent.500"
                    >
                      <reason.icon size={24} />
                    </Box>
                    <Heading
                      as="h3"
                      fontSize={{ base: 'lg', md: 'xl' }}
                      fontWeight="semibold"
                      color={{ base: 'gray.900', _dark: 'white' }}
                    >
                      {reason.title}
                    </Heading>
                    <Text
                      fontSize={{ base: 'sm', md: 'md' }}
                      color={{ base: 'gray.600', _dark: 'gray.400' }}
                      lineHeight="relaxed"
                    >
                      {reason.description}
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
