// src/components/Loader.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, animate } from 'framer-motion';
import { useAnimation } from '@/providers/AnimationProvider';
import { Animated } from './Animated';
import { power2InOut } from '@/lib/easings';

export function Loader() {
  const { dispatch } = useAnimation();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 2.6, // Total duration of the loading animation
      ease: power2InOut,
      onUpdate: (value) => {
        // Replicates the non-linear count from the original
        if (value < 42) setCount(Math.round(value * 2.38)); // 0-100 in 2s, scaled to 42% of time
        else if (value < 90) setCount(Math.round(42 + (value - 42) * 1.25)); // 42-90 in 0.6s
        else setCount(Math.round(value)); // 90-100
      },
      onComplete: () => {
        dispatch({ type: 'LOADER_EXIT_COMPLETE' });
      },
    });

    return () => controls.stop();
  }, [dispatch]);

  return (
    <motion.div
      className="loader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: power2InOut }}
    >
      <div className="loader_cnt">
        <div className="loader_tp">{String(count).padStart(3, '0')}</div>
        <div className="loader_bp">
          <Animated as="h1" variant="Awrite" text="CHRIS HALL" isVisible={true} />
          <Animated as="h2" variant="Awrite" text="ART DIRECTOR & DESIGNER_PORTFOLIO" isVisible={true} delay={0.4} />
        </div>
      </div>
    </motion.div>
  );
}