// src/components/Mouse.tsx
'use client';

import { motion } from 'framer-motion';
import { useMouse } from '@/providers/MouseProvider';

export function Mouse() {
  const { mousePosition } = useMouse();

  return (
    <motion.div
      className="mouse"
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
        restDelta: 0.001,
      }}
    />
  );
}