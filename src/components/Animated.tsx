// src/components/Animated.tsx 
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { power4InOut } from '@/lib/easings';

// --- FIX: Use a deterministic function to generate scramble characters ---
// This uses the character's index to pick from the set, ensuring the server
// and client always generate the same "random" sequence.
const getDeterministicChar = (characterSet: string, index: number): string => {
  return characterSet[index % characterSet.length];
};

// --- Component Props Interface ---
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
  lineStagger?: number;
  lineDuration?: number;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'variant'>;


// --- The Main Component ---
export const Animated = <T extends React.ElementType = 'div'>({
  as,
  text,
  variant,
  className = '',
  stagger = 0.03,
  delay = 0,
  scrambleDuration = 0.16,
  revealDuration = 0.3,
  scrambleChars = '##·$%&/=€|()@+09*+]',
  scrambleCount = 2,
  lineStagger = 0.1,
  lineDuration = 0.6,
  ...rest
}: AnimatedProps<T>) => {
  const isLineBased = variant === 'Atext' || variant === 'Aline';
  // FIX: Default to 'div' for line-based animations to prevent invalid nesting.
  // A <p> tag can't contain divs. This ensures valid HTML by default.
  const Tag = as || (isLineBased ? 'div' : 'span');

  const baseClass = {
    'Awrite': 'Awrite',
    'Awrite-inv': 'Awrite Awrite-inv',
    'Atext': 'Atext',
    'Aline': 'Aline',
  }[variant];

  if (variant === 'Awrite' || variant === 'Awrite-inv') {
    const characters = Array.from(text);
    const containerVariants: Variants = {
      hidden: {},
      visible: { transition: { delayChildren: delay, staggerChildren: stagger } },
    };

    return (
      <Tag className={`${baseClass} ${className}`} aria-label={text} {...rest}>
        <motion.span
            style={{ display: 'inline-block' }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
        >
          {characters.map((char, charIndex) => {
            // FIX: Use the deterministic function
            const fakes = Array.from({ length: scrambleCount }).map((_, i) => getDeterministicChar(scrambleChars, charIndex + i));
            return (
              <span key={charIndex} className="char" style={{ display: 'inline-block', position: 'relative' }}>
                <motion.span
                  className="n"
                  style={{ position: 'relative', zIndex: 1, opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: scrambleCount * scrambleDuration, duration: revealDuration, ease: power4InOut }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
                {fakes.map((fakeChar, fakeIndex) => (
                  <motion.span
                    key={fakeIndex}
                    className="f"
                    style={{ position: 'absolute', top: 0, left: 0, opacity: 0, transformOrigin: 'left center' }}
                    initial={{ opacity: 1, scaleX: 1 }}
                    animate={{ opacity: 0, scaleX: 0 }}
                    transition={{ delay: fakeIndex * (scrambleDuration / scrambleCount), duration: scrambleDuration, ease: power4InOut }}
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
  }

  if (isLineBased) {
    const lines = text.split('\n');
    const containerVariants: Variants = {
        hidden: {},
        visible: { transition: { delayChildren: delay, staggerChildren: lineStagger } },
    };
    const lineVariants: Variants = {
        hidden: { opacity: 0, y: '50%' },
        visible: {
            opacity: 1,
            y: '0%',
            transition: { duration: lineDuration, ease: power4InOut },
        },
    };

    return (
      <Tag className={`${baseClass} ${className}`} {...rest}>
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
        >
            {lines.map((line, index) => (
                // This structure is now valid: the parent Tag is a div (by default)
                // which can safely contain other divs.
                <div key={index} className="line" style={{ overflow: 'hidden' }}>
                    <motion.div variants={lineVariants}>
                        {line.trim() === '' ? '\u00A0' : line}
                    </motion.div>
                </div>
            ))}
        </motion.div>
      </Tag>
    );
  }

  return null;
};
