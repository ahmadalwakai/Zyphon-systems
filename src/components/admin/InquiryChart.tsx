'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

interface InquiryChartProps {
  data: { label: string; value: number }[];
}

export function InquiryChart({ data }: InquiryChartProps) {
  if (!data || data.length === 0) {
    return (
      <Box p={6} textAlign="center">
        <Text color="gray.500" fontSize="sm">No data available</Text>
      </Box>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <Flex gap={2} align="end" h="200px" px={2}>
      {data.map((item, i) => (
        <Flex key={item.label} direction="column" align="center" flex={1} gap={2}>
          <Text fontSize="xs" color="white" fontWeight="semibold">
            {item.value}
          </Text>
          <MotionBox
            w="full"
            maxW="40px"
            borderRadius="md"
            bg="primary.500"
            initial={{ height: 0 }}
            animate={{ height: `${(item.value / maxValue) * 150}px` }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          />
          <Text fontSize="xs" color="gray.500" textAlign="center">
            {item.label}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
}
