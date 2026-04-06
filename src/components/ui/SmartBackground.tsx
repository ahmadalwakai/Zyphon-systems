'use client';

import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

export function SmartBackground() {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={-1}
      overflow="hidden"
      bg={{ base: '#ffffff', _dark: '#0a0a0f' }}
    >
      {/* Base gradient */}
      <Box
        position="absolute"
        inset={0}
        bg={{ base: 'linear-gradient(135deg, #ffffff 0%, #f7f7f8 50%, #ffffff 100%)', _dark: 'linear-gradient(135deg, #0a0a0f 0%, #111118 50%, #0a0a0f 100%)' }}
      />

      {/* Animated gradient orbs */}
      <MotionBox
        position="absolute"
        width="60vw"
        height="60vw"
        borderRadius="full"
        bg={{ base: 'radial-gradient(circle, rgba(13, 148, 136, 0.08) 0%, transparent 70%)', _dark: 'radial-gradient(circle, rgba(13, 148, 136, 0.15) 0%, transparent 70%)' }}
        filter="blur(60px)"
        initial={{ x: '-20%', y: '-20%' }}
        animate={{
          x: ['-20%', '10%', '-20%'],
          y: ['-20%', '10%', '-20%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <MotionBox
        position="absolute"
        width="50vw"
        height="50vw"
        borderRadius="full"
        bg={{ base: 'radial-gradient(circle, rgba(79, 70, 229, 0.06) 0%, transparent 70%)', _dark: 'radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, transparent 70%)' }}
        filter="blur(60px)"
        right="-10%"
        top="20%"
        initial={{ x: '0%', y: '0%' }}
        animate={{
          x: ['0%', '-15%', '0%'],
          y: ['0%', '15%', '0%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <MotionBox
        position="absolute"
        width="40vw"
        height="40vw"
        borderRadius="full"
        bg={{ base: 'radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, transparent 70%)', _dark: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)' }}
        filter="blur(60px)"
        left="30%"
        bottom="-10%"
        initial={{ x: '0%', y: '0%' }}
        animate={{
          x: ['0%', '20%', '0%'],
          y: ['0%', '-10%', '0%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle noise overlay */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.03}
        backgroundImage="url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')"
      />
    </Box>
  );
}
