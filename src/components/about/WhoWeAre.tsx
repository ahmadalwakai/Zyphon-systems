'use client';

import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

export function WhoWeAre() {
  return (
    <Box py={{ base: 12, md: 16 }}>
      <Container maxW="7xl">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box
            borderRadius="xl"
            borderWidth="1px"
            borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
            bg={{ base: 'white', _dark: 'rgba(17, 17, 24, 0.7)' }}
            backdropFilter="blur(12px)"
            p={{ base: 8, md: 12 }}
          >
            <VStack gap={6} align="start">
              <Heading
                as="h2"
                fontSize={{ base: '2xl', md: '3xl' }}
                fontWeight="bold"
                color={{ base: 'gray.900', _dark: 'white' }}
              >
                Who we are
              </Heading>
              <VStack gap={4} align="start">
                <Text
                  fontSize={{ base: 'md', md: 'lg' }}
                  color={{ base: 'gray.600', _dark: 'gray.400' }}
                  lineHeight="relaxed"
                >
                  Zyphon Systems is a product engineering studio focused on building structured,
                  production-ready digital systems for businesses. We specialise in mobile apps,
                  admin panels, backend systems, and full platform development.
                </Text>
                <Text
                  fontSize={{ base: 'md', md: 'lg' }}
                  color={{ base: 'gray.600', _dark: 'gray.400' }}
                  lineHeight="relaxed"
                >
                  We work with companies that need more than a basic website or a quick MVP. Our
                  clients typically have real operational workflows, teams that need internal tools,
                  and customers that need a proper digital experience.
                </Text>
                <Text
                  fontSize={{ base: 'md', md: 'lg' }}
                  color={{ base: 'gray.600', _dark: 'gray.400' }}
                  lineHeight="relaxed"
                >
                  Our focus is on building systems that work in the real world — for hospitality,
                  service businesses, booking platforms, multi-branch operations, and businesses
                  undergoing digital transformation.
                </Text>
              </VStack>
            </VStack>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}
