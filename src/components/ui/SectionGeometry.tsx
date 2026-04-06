'use client';

import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface SectionGeometryProps {
  variant: 'hero' | 'cards' | 'process' | 'cta' | 'default';
}

const svgStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  overflow: 'visible',
  color: 'var(--chakra-colors-teal-400)',
};

function HeroGeometry() {
  return (
    <Box position="absolute" inset={0} overflow="visible" pointerEvents="none" aria-hidden="true">
      <svg style={svgStyle}>
        {/* Large hexagon outline — top right */}
        <motion.path
          d="M0,-80L69.3,-40L69.3,40L0,80L-69.3,40L-69.3,-40Z"
          fill="none"
          stroke="currentColor"
          strokeWidth={0.8}
          opacity={0.06}
          initial={{ x: '75%', y: '20%', rotate: 0, scale: 1 }}
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />

        {/* Small triangle — left */}
        <motion.path
          d="M0,-30L26,15L-26,15Z"
          fill="none"
          stroke="currentColor"
          strokeWidth={0.6}
          opacity={0.05}
          initial={{ x: '15%', y: '60%', rotate: 0 }}
          animate={{ rotate: -360, y: ['60%', '55%', '60%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />

        {/* Dashed circle — centre right */}
        <motion.circle
          cx="85%"
          cy="70%"
          r={50}
          fill="none"
          stroke="currentColor"
          strokeWidth={0.5}
          strokeDasharray="8 6"
          opacity={0.04}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '85% 70%' }}
        />

        {/* Circuit line with nodes */}
        <motion.path
          d="M5%,80% L20%,80% L25%,70% L40%,70%"
          fill="none"
          stroke="currentColor"
          strokeWidth={0.5}
          opacity={0}
          animate={{ opacity: [0, 0.06, 0], pathLength: [0, 1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 4 }}
        />
      </svg>
    </Box>
  );
}

function CardsGeometry() {
  const positions = [
    { x: 10, y: 15 }, { x: 90, y: 25 }, { x: 5, y: 75 },
    { x: 95, y: 85 }, { x: 50, y: 5 },
  ];

  return (
    <Box position="absolute" inset={0} overflow="visible" pointerEvents="none" aria-hidden="true">
      <svg style={svgStyle}>
        {/* Grid of small crosses */}
        {positions.map((pos, i) => (
          <motion.g
            key={i}
            opacity={0.04}
            initial={{ x: `${pos.x}%`, y: `${pos.y}%`, rotate: 0 }}
            animate={{ rotate: 90 }}
            transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
          >
            <line x1={-8} y1={0} x2={8} y2={0} stroke="currentColor" strokeWidth={0.5} />
            <line x1={0} y1={-8} x2={0} y2={8} stroke="currentColor" strokeWidth={0.5} />
          </motion.g>
        ))}
      </svg>
    </Box>
  );
}

function ProcessGeometry() {
  return (
    <Box position="absolute" inset={0} overflow="visible" pointerEvents="none" aria-hidden="true">
      <svg style={svgStyle}>
        {/* Vertical dashed line — timeline accent */}
        <motion.line
          x1="8%"
          y1="5%"
          x2="8%"
          y2="95%"
          stroke="currentColor"
          strokeWidth={0.3}
          strokeDasharray="4 8"
          opacity={0.05}
          animate={{ strokeDashoffset: [0, -48] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />

        {/* Diamond markers along the line */}
        {[20, 40, 60, 80].map((y, i) => (
          <motion.path
            key={i}
            d="M0,-6L4,0L0,6L-4,0Z"
            fill="none"
            stroke="currentColor"
            strokeWidth={0.5}
            opacity={0}
            initial={{ x: '8%', y: `${y}%` }}
            animate={{ opacity: [0, 0.08, 0], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 1.5 }}
          />
        ))}
      </svg>
    </Box>
  );
}

function CTAGeometry() {
  return (
    <Box position="absolute" inset={0} overflow="visible" pointerEvents="none" aria-hidden="true">
      <svg style={svgStyle}>
        {/* Expanding rings */}
        {[0, 2, 4].map((delay, i) => (
          <motion.circle
            key={i}
            cx="50%"
            cy="50%"
            r={40 + i * 30}
            fill="none"
            stroke="currentColor"
            strokeWidth={0.3}
            opacity={0}
            animate={{ opacity: [0, 0.05, 0], r: [40 + i * 30, 80 + i * 30] }}
            transition={{ duration: 6, repeat: Infinity, delay, ease: 'easeOut' }}
          />
        ))}
      </svg>
    </Box>
  );
}

export function SectionGeometry({ variant }: SectionGeometryProps) {
  switch (variant) {
    case 'hero': return <HeroGeometry />;
    case 'cards': return <CardsGeometry />;
    case 'process': return <ProcessGeometry />;
    case 'cta': return <CTAGeometry />;
    default: return null;
  }
}
