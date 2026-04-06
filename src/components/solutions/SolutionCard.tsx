'use client';

import { useState } from 'react';
import { Box, Heading, Text, VStack, HStack, Grid } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, CalendarCheck, Hotel, Building2, Settings2, Smartphone, type LucideIcon } from 'lucide-react';

const MotionBox = motion.create(Box);

const iconMap: Record<string, LucideIcon> = {
  CalendarCheck,
  Hotel,
  Building2,
  Settings2,
  Smartphone,
};

interface SolutionCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  delay?: number;
}

export function SolutionCard({ icon, title, description, features, delay = 0 }: SolutionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = iconMap[icon] || CalendarCheck;

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      <Box
        borderRadius="xl"
        borderWidth="1px"
        borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
        bg={{ base: 'white', _dark: 'rgba(17, 17, 24, 0.7)' }}
        backdropFilter="blur(12px)"
        p={{ base: 6, md: 8 }}
        cursor="pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        transition="all 0.2s"
        _hover={{
          borderColor: { base: 'primary.200', _dark: 'primary.500/30' },
        }}
      >
        <VStack align="stretch" gap={4}>
          <HStack justify="space-between" align="start">
            <HStack gap={4}>
              <Box
                p={3}
                borderRadius="lg"
                bg={{ base: 'primary.50', _dark: 'primary.500/10' }}
                color="primary.500"
              >
                <Icon size={24} />
              </Box>
              <VStack align="start" gap={1}>
                <Heading
                  as="h3"
                  fontSize={{ base: 'lg', md: 'xl' }}
                  fontWeight="semibold"
                  color={{ base: 'gray.900', _dark: 'white' }}
                >
                  {title}
                </Heading>
                <Text
                  fontSize={{ base: 'sm', md: 'md' }}
                  color={{ base: 'gray.600', _dark: 'gray.400' }}
                >
                  {description}
                </Text>
              </VStack>
            </HStack>
            <Box
              color={{ base: 'gray.400', _dark: 'gray.500' }}
              flexShrink={0}
              transform={isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'}
              transition="transform 0.2s"
            >
              <ChevronDown size={20} />
            </Box>
          </HStack>

          <AnimatePresence>
            {isExpanded && (
              <MotionBox
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                overflow="hidden"
              >
                <Box
                  pt={4}
                  borderTopWidth="1px"
                  borderColor={{ base: 'gray.100', _dark: 'whiteAlpha.100' }}
                >
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    color={{ base: 'gray.700', _dark: 'gray.300' }}
                    mb={3}
                  >
                    Key Features
                  </Text>
                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={3}>
                    {features.map((feature) => (
                      <HStack key={feature} gap={2} align="start">
                        <Box color="primary.500" mt={0.5}>
                          <Check size={16} />
                        </Box>
                        <Text
                          fontSize="sm"
                          color={{ base: 'gray.600', _dark: 'gray.400' }}
                        >
                          {feature}
                        </Text>
                      </HStack>
                    ))}
                  </Grid>
                </Box>
              </MotionBox>
            )}
          </AnimatePresence>
        </VStack>
      </Box>
    </MotionBox>
  );
}
