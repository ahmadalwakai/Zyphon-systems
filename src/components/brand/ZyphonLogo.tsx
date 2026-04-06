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

  // Static paths always visible - no conditional rendering, no loading states
  // Animation is purely progressive enhancement after hydration
  const staticPathProps = {
    strokeWidth: '2',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  return (
    <Box display="inline-flex" alignItems="center" gap={2}>
      <MotionSvg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        animate={shouldAnimate ? { opacity: [0.8, 1, 0.8] } : undefined}
        transition={shouldAnimate ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : undefined}
      >
        {/* Outer frame / circuit border - always visible */}
        <MotionPath
          d="M8 8 L40 8 L40 40 L8 40 Z"
          stroke="url(#gradient)"
          {...staticPathProps}
          initial={{ pathLength: 1, opacity: 1 }}
          animate={shouldAnimate 
            ? { pathLength: [0, 1], opacity: [0, 1] } 
            : { pathLength: 1, opacity: 1 }
          }
          transition={shouldAnimate 
            ? { pathLength: { duration: 1.5, ease: 'easeInOut' }, opacity: { duration: 0.3 } }
            : { duration: 0 }
          }
        />
        
        {/* Stylized Z mark - always visible */}
        <MotionPath
          d="M14 14 L34 14 L16 34 L34 34"
          stroke="url(#gradient)"
          {...staticPathProps}
          strokeWidth="3"
          initial={{ pathLength: 1, opacity: 1 }}
          animate={shouldAnimate 
            ? { pathLength: [0, 1], opacity: [0, 1] } 
            : { pathLength: 1, opacity: 1 }
          }
          transition={shouldAnimate 
            ? { pathLength: { duration: 1.5, ease: 'easeInOut', delay: 0.3 }, opacity: { duration: 0.3, delay: 0.3 } }
            : { duration: 0 }
          }
        />
        
        {/* Circuit nodes/dots at corners - always visible */}
        <MotionPath
          d="M14 14 L14 14.1 M34 14 L34 14.1 M16 34 L16 34.1 M34 34 L34 34.1"
          stroke="#0d9488"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 1, opacity: 1 }}
          animate={{ pathLength: 1, opacity: 1 }}
        />
        
        {/* Inner detail lines for circuit feel - always visible */}
        <MotionPath
          d="M8 24 L12 24 M36 24 L40 24 M24 8 L24 12 M24 36 L24 40"
          stroke="url(#gradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 1, opacity: 0.6 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
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
