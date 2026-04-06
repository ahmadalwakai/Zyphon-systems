'use client';

import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Service } from '@/types';
import {
  Smartphone,
  LayoutDashboard,
  Server,
  Layers,
  Compass,
} from 'lucide-react';

const MotionBox = motion.create(Box);

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Smartphone,
  LayoutDashboard,
  Server,
  Layers,
  Compass,
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = iconMap[service.icon] || Layers;

  return (
    <MotionBox
      id={service.id}
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
        overflow="hidden"
        transition="all 0.3s ease-in-out"
        _hover={{
          borderColor: 'primary.500',
          boxShadow: '0 0 30px rgba(13, 148, 136, 0.15)',
        }}
      >
        <Box
          p={{ base: 6, md: 8 }}
          cursor="pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <VStack align="start" gap={4}>
            <Box display="flex" w="100%" justifyContent="space-between" alignItems="start">
              <Box
                p={3}
                borderRadius="lg"
                bg={{ base: 'primary.50', _dark: 'primary.500/10' }}
                color="primary.500"
              >
                <Icon size={24} />
              </Box>
              <Box color={{ base: 'gray.400', _dark: 'gray.500' }}>
                {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </Box>
            </Box>
            <Heading
              as="h3"
              fontSize={{ base: 'xl', md: '2xl' }}
              fontWeight="semibold"
              color={{ base: 'gray.900', _dark: 'white' }}
            >
              {service.title}
            </Heading>
            <Text
              fontSize={{ base: 'sm', md: 'md' }}
              color={{ base: 'gray.600', _dark: 'gray.400' }}
              lineHeight="relaxed"
            >
              {service.description}
            </Text>
          </VStack>
        </Box>

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
                px={{ base: 6, md: 8 }}
                pb={{ base: 6, md: 8 }}
                pt={2}
                borderTopWidth="1px"
                borderColor={{ base: 'gray.100', _dark: 'whiteAlpha.50' }}
              >
                <Text
                  fontSize="sm"
                  fontWeight="semibold"
                  color={{ base: 'gray.700', _dark: 'gray.300' }}
                  mb={4}
                >
                  What&apos;s included:
                </Text>
                <VStack align="start" gap={2}>
                  {service.includedItems.map((item, i) => (
                    <Box key={i} display="flex" alignItems="center" gap={2}>
                      <Box
                        w={1.5}
                        h={1.5}
                        borderRadius="full"
                        bg="primary.500"
                        flexShrink={0}
                      />
                      <Text
                        fontSize="sm"
                        color={{ base: 'gray.600', _dark: 'gray.400' }}
                      >
                        {item}
                      </Text>
                    </Box>
                  ))}
                </VStack>
              </Box>
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>
    </MotionBox>
  );
}
