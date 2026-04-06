'use client';

import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionPath = motion.path;
const MotionSvg = motion.svg;

interface ZyphonLogoProps {
  size?: number;
  animated?: boolean;
}

export function ZyphonLogo({ size = 40, animated = true }: ZyphonLogoProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: detect client hydration for animation
    setMounted(true);
  }, []);

  const shouldAnimate = animated && mounted;

  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 1.5,
          ease: 'easeInOut' as const,
        },
        opacity: {
          duration: 0.3,
        },
      },
    },
  };

  const glowVariants = {
    glow: {
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  return (
    <Box display="inline-flex" alignItems="center" gap={2}>
      <MotionSvg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        initial={shouldAnimate ? 'hidden' : 'visible'}
        animate={shouldAnimate ? ['visible', 'glow'] : 'visible'}
        variants={glowVariants}
      >
        {/* Outer frame / circuit border */}
        <MotionPath
          d="M8 8 L40 8 L40 40 L8 40 Z"
          stroke="url(#gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={shouldAnimate ? pathVariants : undefined}
          initial={shouldAnimate ? undefined : { pathLength: 1, opacity: 1 }}
          animate={shouldAnimate ? undefined : { pathLength: 1, opacity: 1 }}
        />
        
        {/* Stylized Z mark - angular/circuit-like design */}
        <MotionPath
          d="M14 14 L34 14 L16 34 L34 34"
          stroke="url(#gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={shouldAnimate ? pathVariants : undefined}
          initial={shouldAnimate ? undefined : { pathLength: 1, opacity: 1 }}
          animate={shouldAnimate ? undefined : { pathLength: 1, opacity: 1 }}
        />
        
        {/* Circuit nodes/dots at corners */}
        <MotionPath
          d="M14 14 L14 14.1 M34 14 L34 14.1 M16 34 L16 34.1 M34 34 L34 34.1"
          stroke="#0d9488"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          variants={shouldAnimate ? pathVariants : undefined}
          initial={shouldAnimate ? undefined : { pathLength: 1, opacity: 1 }}
          animate={shouldAnimate ? undefined : { pathLength: 1, opacity: 1 }}
        />
        
        {/* Inner detail lines for circuit feel */}
        <MotionPath
          d="M8 24 L12 24 M36 24 L40 24 M24 8 L24 12 M24 36 L24 40"
          stroke="url(#gradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity={0.6}
          variants={shouldAnimate ? pathVariants : undefined}
          initial={shouldAnimate ? undefined : { pathLength: 1, opacity: 0.6 }}
          animate={shouldAnimate ? undefined : { pathLength: 1, opacity: 0.6 }}
        />

        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d9488" />
            <stop offset="50%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </MotionSvg>
      
      <Box
        as="span"
        fontSize={size * 0.5}
        fontWeight="bold"
        letterSpacing="-0.02em"
        color={{ base: 'gray.900', _dark: 'white' }}
      >
        Zyphon
      </Box>
    </Box>
  );
}
