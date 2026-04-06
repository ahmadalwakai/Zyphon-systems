'use client';

import { Box, Container, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import { Smartphone, LayoutDashboard, Server, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionGeometry } from '@/components/ui/SectionGeometry';

const MotionBox = motion.create(Box);

const items = [
  {
    title: 'Customer Mobile Apps',
    description:
      'Modern mobile applications for booking, account management, service access, notifications, and customer engagement.',
    icon: Smartphone,
  },
  {
    title: 'Admin Panels',
    description:
      'Clear and structured admin systems for managing operations, users, content, bookings, pricing, workflows, and reporting.',
    icon: LayoutDashboard,
  },
  {
    title: 'Backend & APIs',
    description:
      'Reliable backend architecture, business logic, secure APIs, database systems, and scalable technical foundations.',
    icon: Server,
  },
  {
    title: 'Full Digital Platforms',
    description:
      'End-to-end product development covering the customer-facing experience, internal admin systems, workflows, and platform core.',
    icon: Layers,
  },
];

export function WhatWeBuild() {
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
              What we build
            </Heading>
          </MotionBox>

          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={{ base: 6, md: 8 }}
          >
            {items.map((item, index) => (
              <MotionBox
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <Box
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
                  bg={{ base: 'white', _dark: 'rgba(17, 17, 24, 0.7)' }}
                  backdropFilter="blur(12px)"
                  p={{ base: 6, md: 8 }}
                  h="100%"
                  transition="all 0.3s ease-in-out"
                  _hover={{
                    borderColor: 'primary.500',
                    boxShadow: '0 0 30px rgba(13, 148, 136, 0.15)',
                  }}
                >
                  <VStack align="start" gap={4}>
                    <Box
                      p={3}
                      borderRadius="lg"
                      bg={{ base: 'primary.50', _dark: 'primary.500/10' }}
                      color="primary.500"
                    >
                      <item.icon size={24} />
                    </Box>
                    <Heading
                      as="h3"
                      fontSize={{ base: 'lg', md: 'xl' }}
                      fontWeight="semibold"
                      color={{ base: 'gray.900', _dark: 'white' }}
                    >
                      {item.title}
                    </Heading>
                    <Text
                      fontSize={{ base: 'sm', md: 'md' }}
                      color={{ base: 'gray.600', _dark: 'gray.400' }}
                      lineHeight="relaxed"
                    >
                      {item.description}
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
