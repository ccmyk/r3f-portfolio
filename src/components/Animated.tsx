// src/components/Animated.tsx
'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { power4InOut } from '@/lib/easings';

// Helper to get a deterministic "random" character to prevent client/server hydration mismatch
const getDeterministicChar = (characterSet: string, index: number): string => {
  return characterSet;
};

type AnimatedProps<T extends React.ElementType> = {
  as?: T;
  text: string;
  variant: 'Awrite' | 'Atext' | 'Aline' | 'Awrite-inv';
  className?: string;
  stagger?: number;
  delay?: number;
  scrambleDuration?: number;
  revealDuration?: number;
  scrambleChars?: string;
  scrambleCount?: number;
  isVisible?: boolean; // Prop to manually trigger animation
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'variant'>;

export const Animated = <T extends React.ElementType = 'div'>({
  as,
  text,
  variant,
  className = '',
  stagger = 0.05, // Matches original's times[1]
  delay = 0,
  scrambleDuration = 0.16, // Matches original's times[2]
  revealDuration = 0.3, // Matches original's times
  scrambleChars = '##·$%&/=€|()@+09*+]',
  scrambleCount = 2,
  isVisible = false, // Default to false, trigger manually or with whileInView
 ...rest
}: AnimatedProps<T>) => {
  const Tag = as |

| 'span';

  const baseClass = {
    'Awrite': 'Awrite',
    'Awrite-inv': 'Awrite Awrite-inv',
    'Atext': 'Atext',
    'Aline': 'Aline',
  }[variant];

  const characters = Array.from(text);
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: delay, staggerChildren: stagger },
    },
  };

  return (
    <Tag className={`${baseClass} ${className}`} aria-label={text} {...rest}>
      <motion.span
        style={{ display: 'inline-block' }}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible? 'visible' : 'hidden'}
        viewport={{ once: true, amount: 0.5 }}
      >
        {characters.map((char, charIndex) => {
          const fakes = Array.from({ length: scrambleCount }).map((_, i) =>
            getDeterministicChar(scrambleChars, charIndex + i)
          );
          return (
            <span key={charIndex} className="char" style={{ display: 'inline-block', position: 'relative' }}>
              <motion.span
                className="n"
                style={{ position: 'relative', zIndex: 1, opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: scrambleCount * (scrambleDuration / scrambleCount),
                  duration: revealDuration,
                  ease: power4InOut,
                }}
              >
                {char === ' '? '\u00A0' : char}
              </motion.span>
              {fakes.map((fakeChar, fakeIndex) => (
                <motion.span
                  key={fakeIndex}
                  className="f"
                  style={{ position: 'absolute', top: 0, left: 0, opacity: 0, transformOrigin: 'left center' }}
                  initial={{ opacity: 1, scaleX: 1 }}
                  animate={{ opacity: 0, scaleX: 0 }}
                  transition={{
                    delay: fakeIndex * (scrambleDuration / scrambleCount),
                    duration: scrambleDuration,
                    ease: power4InOut,
                  }}
                >
                  {fakeChar}
                </motion.span>
              ))}
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
};