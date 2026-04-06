'use client';

import { Box, Container, Flex, Grid, Heading, Text, VStack, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionGeometry } from '@/components/ui/SectionGeometry';

const MotionBox = motion.create(Box);

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'Understand the business, users, workflow, and real operational needs.',
  },
  {
    number: '02',
    title: 'Scope & System Planning',
    description: 'Define product structure, modules, priorities, and technical direction.',
  },
  {
    number: '03',
    title: 'Design & Development',
    description:
      'Build the app, admin panel, backend, and key workflows in a controlled and scalable way.',
  },
  {
    number: '04',
    title: 'Testing & Launch',
    description:
      'Review, test, refine, deploy, and support the product toward launch readiness.',
  },
];

export function HowWeWork() {
  return (
    <Box position="relative" overflow="hidden" py={{ base: 16, md: 24 }}>
      <SectionGeometry variant="process" />
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
              A clear and structured process
            </Heading>
          </MotionBox>

          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
            gap={{ base: 6, md: 8 }}
          >
            {steps.map((step, index) => (
              <MotionBox
                key={step.number}
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
                  position="relative"
                >
                  <VStack align="start" gap={4}>
                    <Flex
                      align="center"
                      justify="center"
                      w="12"
                      h="12"
                      borderRadius="full"
                      bg="primary.500"
                      color="white"
                      fontWeight="bold"
                      fontSize="lg"
                    >
                      {step.number}
                    </Flex>
                    <Heading
                      as="h3"
                      fontSize={{ base: 'lg', md: 'xl' }}
                      fontWeight="semibold"
                      color={{ base: 'gray.900', _dark: 'white' }}
                    >
                      {step.title}
                    </Heading>
                    <Text
                      fontSize={{ base: 'sm', md: 'md' }}
                      color={{ base: 'gray.600', _dark: 'gray.400' }}
                      lineHeight="relaxed"
                    >
                      {step.description}
                    </Text>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          <MotionBox
            textAlign="center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/process">
              <Button
                variant="outline"
                borderWidth="1px"
                borderColor={{ base: 'gray.300', _dark: 'gray.600' }}
                color={{ base: 'gray.700', _dark: 'white' }}
                fontWeight="semibold"
                borderRadius="lg"
                px={6}
                _hover={{
                  bg: { base: 'gray.100', _dark: 'whiteAlpha.100' },
                  borderColor: { base: 'gray.400', _dark: 'gray.500' },
                }}
                transition="all 0.2s"
              >
                View Full Workflow
              </Button>
            </Link>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
}
