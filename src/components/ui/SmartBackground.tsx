'use client';

import { useEffect, useState, useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

// Deterministic pseudo-random based on index (no Math.random in render)
function seededValue(index: number, offset: number = 0): number {
  const x = Math.sin(index * 127.1 + offset * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

interface FloatingShape {
  id: number;
  type: 'hexagon' | 'triangle' | 'circle' | 'diamond' | 'cross' | 'ring';
  x: number;
  y: number;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface GridLine {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
  duration: number;
  delay: number;
}

interface ConnectionNode {
  id: number;
  cx: number;
  cy: number;
  r: number;
  duration: number;
  delay: number;
}

function generateShapes(count: number): FloatingShape[] {
  const types: FloatingShape['type'][] = ['hexagon', 'triangle', 'circle', 'diamond', 'cross', 'ring'];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    type: types[i % types.length],
    x: seededValue(i, 1) * 100,
    y: seededValue(i, 2) * 100,
    size: 20 + seededValue(i, 3) * 40,
    rotation: seededValue(i, 4) * 360,
    duration: 20 + seededValue(i, 5) * 30,
    delay: seededValue(i, 6) * -20,
    opacity: 0.03 + seededValue(i, 7) * 0.06,
  }));
}

function generateGridLines(count: number): GridLine[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x1: seededValue(i, 10) * 100,
    y1: seededValue(i, 11) * 100,
    x2: seededValue(i, 12) * 100,
    y2: seededValue(i, 13) * 100,
    opacity: 0.02 + seededValue(i, 14) * 0.04,
    duration: 15 + seededValue(i, 15) * 25,
    delay: seededValue(i, 16) * -15,
  }));
}

function generateNodes(count: number): ConnectionNode[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    cx: seededValue(i, 20) * 100,
    cy: seededValue(i, 21) * 100,
    r: 1.5 + seededValue(i, 22) * 2.5,
    duration: 10 + seededValue(i, 23) * 20,
    delay: seededValue(i, 24) * -10,
  }));
}

// SVG path generators for each shape
function hexagonPath(size: number): string {
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    return `${Math.cos(angle) * size},${Math.sin(angle) * size}`;
  });
  return `M${points.join('L')}Z`;
}

function trianglePath(size: number): string {
  const h = size * Math.sqrt(3) / 2;
  return `M0,${-h * 0.66}L${size / 2},${h * 0.33}L${-size / 2},${h * 0.33}Z`;
}

function diamondPath(size: number): string {
  return `M0,${-size}L${size * 0.6},0L0,${size}L${-size * 0.6},0Z`;
}

function crossPath(size: number): string {
  const t = size * 0.2;
  return `M${-t},${-size}L${t},${-size}L${t},${-t}L${size},${-t}L${size},${t}L${t},${t}L${t},${size}L${-t},${size}L${-t},${t}L${-size},${t}L${-size},${-t}L${-t},${-t}Z`;
}

function ShapePath({ shape, reducedMotion }: { shape: FloatingShape; reducedMotion: boolean }) {
  let d: string;
  switch (shape.type) {
    case 'hexagon': d = hexagonPath(shape.size / 2); break;
    case 'triangle': d = trianglePath(shape.size / 2); break;
    case 'diamond': d = diamondPath(shape.size / 2); break;
    case 'cross': d = crossPath(shape.size / 2); break;
    default: d = '';
  }

  if (reducedMotion) return null;

  if (shape.type === 'circle') {
    return (
      <motion.circle
        cx={0}
        cy={0}
        r={shape.size / 2}
        fill="none"
        stroke="currentColor"
        strokeWidth={0.5}
        opacity={shape.opacity}
        initial={{ x: `${shape.x}%`, y: `${shape.y}%`, rotate: shape.rotation }}
        animate={{
          x: [`${shape.x}%`, `${(shape.x + 8) % 100}%`, `${shape.x}%`],
          y: [`${shape.y}%`, `${(shape.y + 6) % 100}%`, `${shape.y}%`],
          rotate: [shape.rotation, shape.rotation + 90, shape.rotation],
        }}
        transition={{
          duration: shape.duration,
          repeat: Infinity,
          ease: 'linear',
          delay: shape.delay,
        }}
      />
    );
  }

  if (shape.type === 'ring') {
    return (
      <motion.circle
        cx={0}
        cy={0}
        r={shape.size / 2}
        fill="none"
        stroke="currentColor"
        strokeWidth={0.3}
        strokeDasharray={`${shape.size * 0.4} ${shape.size * 0.2}`}
        opacity={shape.opacity}
        initial={{ x: `${shape.x}%`, y: `${shape.y}%`, rotate: 0 }}
        animate={{
          x: [`${shape.x}%`, `${(shape.x + 5) % 100}%`, `${shape.x}%`],
          y: [`${shape.y}%`, `${(shape.y + 7) % 100}%`, `${shape.y}%`],
          rotate: [0, 360],
        }}
        transition={{
          duration: shape.duration,
          repeat: Infinity,
          ease: 'linear',
          delay: shape.delay,
        }}
      />
    );
  }

  return (
    <motion.path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={0.5}
      opacity={shape.opacity}
      initial={{ x: `${shape.x}%`, y: `${shape.y}%`, rotate: shape.rotation }}
      animate={{
        x: [`${shape.x}%`, `${(shape.x + 10) % 100}%`, `${shape.x}%`],
        y: [`${shape.y}%`, `${(shape.y + 8) % 100}%`, `${shape.y}%`],
        rotate: [shape.rotation, shape.rotation + 120, shape.rotation],
      }}
      transition={{
        duration: shape.duration,
        repeat: Infinity,
        ease: 'linear',
        delay: shape.delay,
      }}
    />
  );
}

export function SmartBackground() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const shapes = useMemo(() => generateShapes(18), []);
  const gridLines = useMemo(() => generateGridLines(12), []);
  const nodes = useMemo(() => generateNodes(25), []);

  if (!mounted) return null;

  return (
    <Box
      position="fixed"
      inset={0}
      zIndex={0}
      pointerEvents="none"
      overflow="hidden"
      aria-hidden="true"
    >
      {/* Base gradient layer */}
      <Box
        position="absolute"
        inset={0}
        _dark={{
          bg: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(13, 148, 136, 0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(79, 70, 229, 0.06) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 20% 60%, rgba(124, 58, 237, 0.04) 0%, transparent 50%)',
        }}
        _light={{
          bg: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(13, 148, 136, 0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(79, 70, 229, 0.04) 0%, transparent 50%)',
        }}
      />

      {/* Animated SVG layer */}
      <Box
        as="svg"
        position="absolute"
        inset={0}
        width="100%"
        height="100%"
        _dark={{ color: 'teal.400' }}
        _light={{ color: 'teal.600' }}
      >
        {/* Grid lines — subtle connecting lines */}
        {!reducedMotion && gridLines.map((line) => (
          <motion.line
            key={`line-${line.id}`}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke="currentColor"
            strokeWidth={0.3}
            opacity={0}
            animate={{
              opacity: [0, line.opacity, 0],
            }}
            transition={{
              duration: line.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: line.delay,
            }}
          />
        ))}

        {/* Connection nodes — small pulsing dots */}
        {nodes.map((node) => (
          <motion.circle
            key={`node-${node.id}`}
            cx={`${node.cx}%`}
            cy={`${node.cy}%`}
            r={node.r}
            fill="currentColor"
            opacity={0}
            animate={
              reducedMotion
                ? { opacity: 0.04 }
                : {
                    opacity: [0, 0.06, 0],
                    r: [node.r, node.r * 1.5, node.r],
                  }
            }
            transition={{
              duration: node.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: node.delay,
            }}
          />
        ))}

        {/* Floating geometric shapes */}
        {shapes.map((shape) => (
          <ShapePath key={`shape-${shape.id}`} shape={shape} reducedMotion={reducedMotion} />
        ))}
      </Box>

      {/* Dot grid pattern overlay */}
      <Box
        position="absolute"
        inset={0}
        _dark={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        _light={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.02) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </Box>
  );
}
