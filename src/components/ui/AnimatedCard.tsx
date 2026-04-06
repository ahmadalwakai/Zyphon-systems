'use client';

import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const MotionBox = motion.create(Box);

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
}

export function AnimatedCard({ children, delay = 0 }: AnimatedCardProps) {
  return (
    <MotionBox
      position="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.3 } }}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.100' }}
      bg={{ base: 'white', _dark: 'rgba(17, 17, 24, 0.7)' }}
      backdropFilter="blur(12px)"
      p={{ base: 6, md: 8 }}
      cursor="pointer"
      overflow="hidden"
    >
      {/* Corner geometric accent */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 60,
          height: 60,
          pointerEvents: 'none',
        }}
        viewBox="0 0 60 60"
        aria-hidden="true"
      >
        <motion.path
          d="M60,0 L60,20 M60,0 L40,0"
          stroke="currentColor"
          strokeWidth={0.8}
          opacity={0.15}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ color: 'var(--chakra-colors-teal-400)' }}
        />
        <motion.circle
          cx={60}
          cy={0}
          r={2}
          fill="currentColor"
          opacity={0}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          style={{ color: 'var(--chakra-colors-teal-400)' }}
        />
      </svg>
      {children}
    </MotionBox>
  );
}
