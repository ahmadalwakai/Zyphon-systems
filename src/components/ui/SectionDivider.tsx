'use client';

import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export function SectionDivider() {
  return (
    <Box
      py={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      aria-hidden="true"
    >
      <svg
        width="200"
        height="20"
        viewBox="0 0 200 20"
        style={{ color: 'var(--chakra-colors-teal-400)' }}
      >
        {/* Left line */}
        <motion.line
          x1={0} y1={10} x2={80} y2={10}
          stroke="currentColor"
          strokeWidth={0.5}
          opacity={0.15}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        {/* Centre diamond */}
        <motion.path
          d="M100,4 L106,10 L100,16 L94,10Z"
          fill="none"
          stroke="currentColor"
          strokeWidth={0.8}
          opacity={0.2}
          initial={{ scale: 0, rotate: 0 }}
          whileInView={{ scale: 1, rotate: 45 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ transformOrigin: '100px 10px' }}
        />
        {/* Right line */}
        <motion.line
          x1={120} y1={10} x2={200} y2={10}
          stroke="currentColor"
          strokeWidth={0.5}
          opacity={0.15}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </svg>
    </Box>
  );
}
