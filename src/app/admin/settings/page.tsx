'use client';

import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

export default function SettingsPage() {
  return (
    <VStack gap={8} align="stretch">
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Heading as="h1" size="xl" color="white">
          Settings
        </Heading>
        <Text color="gray.400" mt={2}>
          Configure site settings
        </Text>
      </MotionBox>

      <Box
        borderRadius="xl"
        borderWidth="1px"
        borderColor="whiteAlpha.100"
        bg="rgba(17, 17, 24, 0.7)"
        p={8}
      >
        <VStack gap={6} align="start">
          <Box>
            <Text color="white" fontWeight="semibold" mb={2}>
              Site Configuration
            </Text>
            <Text color="gray.400" fontSize="sm">
              Settings for site configuration will be available in a future update.
            </Text>
          </Box>

          <Box>
            <Text color="white" fontWeight="semibold" mb={2}>
              Contact Information
            </Text>
            <Text color="gray.400" fontSize="sm">
              Manage contact details displayed on the website.
            </Text>
            <Box mt={3} p={4} borderRadius="lg" bg="whiteAlpha.50">
              <VStack align="start" gap={2}>
                <Text color="gray.300" fontSize="sm">
                  <strong>Email:</strong> hello@zyphonsystems.com
                </Text>
                <Text color="gray.300" fontSize="sm">
                  <strong>Phone:</strong> +44 (0) 123 456 7890
                </Text>
              </VStack>
            </Box>
          </Box>

          <Box>
            <Text color="white" fontWeight="semibold" mb={2}>
              SEO Defaults
            </Text>
            <Text color="gray.400" fontSize="sm">
              Configure default meta tags and SEO settings.
            </Text>
            <Text color="gray.500" fontSize="xs" mt={2}>
              Coming soon
            </Text>
          </Box>

          <Box>
            <Text color="white" fontWeight="semibold" mb={2}>
              Database Initialization
            </Text>
            <Text color="gray.400" fontSize="sm">
              The database tables are automatically created when the first request is made to the
              API endpoints.
            </Text>
          </Box>
        </VStack>
      </Box>
    </VStack>
  );
}
