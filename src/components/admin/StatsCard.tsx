'use client';

import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

const MotionBox = motion.create(Box);

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color: string;
  delay?: number;
}

export function StatsCard({ title, value, icon: Icon, color, delay = 0 }: StatsCardProps) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Box
        borderRadius="xl"
        borderWidth="1px"
        borderColor="whiteAlpha.100"
        bg="rgba(17, 17, 24, 0.7)"
        backdropFilter="blur(12px)"
        p={6}
      >
        <Flex justify="space-between" align="start">
          <VStack align="start" gap={2}>
            <Text fontSize="sm" color="gray.400">
              {title}
            </Text>
            <Text fontSize="3xl" fontWeight="bold" color="white">
              {value}
            </Text>
          </VStack>
          <Box
            p={3}
            borderRadius="lg"
            bg={`${color}/10`}
            color={color}
          >
            <Icon size={24} />
          </Box>
        </Flex>
      </Box>
    </MotionBox>
  );
}
