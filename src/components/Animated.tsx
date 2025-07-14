// components/Animated.tsx
import React from 'react';
import { motion, Variants } from 'framer-motion';

// --- Helper to get random characters for the scramble effect ---
const getRandomChar = (characterSet: string): string => {
  return characterSet[Math.floor(Math.random() * characterSet.length)];
};

// --- Component Props Interface ---
interface AnimatedProps {
  // The text to animate. Use `\n` for line breaks with 'Atext' or 'Aline'.
  text: string;
  // The HTML tag to render, e.g., 'h1', 'p'. Defaults to 'div'.
  as?: React.ElementType;
  // The animation variant, corresponding to your CSS classes.
  variant: 'Awrite' | 'Atext' | 'Aline' | 'Awrite-inv';
  // Any additional class names you want to add.
  className?: string;
  // Animation timing controls
  stagger?: number;
  delay?: number;
  // Scramble-specific controls
  scrambleDuration?: number;
  revealDuration?: number;
  scrambleChars?: string;
  scrambleCount?: number;
  // Line-specific controls
  lineStagger?: number;
  lineDuration?: number;
}

// --- The Main Component ---
export const Animated: React.FC<AnimatedProps> = ({
  text,
  as: Tag = 'div',
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
}) => {
  // --- Base Class Name Logic ---
  // This maps the variant prop to the correct CSS class.
  const baseClass = {
    'Awrite': 'Awrite',
    'Awrite-inv': 'Awrite Awrite-inv', // Combine classes for the inverse variant
    'Atext': 'Atext',
    'Aline': 'Aline',
  }[variant];

  // --- Render Logic ---
  // Decide which animation to render based on the variant.
  if (variant === 'Awrite' || variant === 'Awrite-inv') {
    // --- CHARACTER SCRAMBLE ANIMATION ('Awrite') ---
    const characters = Array.from(text);

    const containerVariants: Variants = {
      hidden: {},
      visible: {
        transition: { delayChildren: delay, staggerChildren: stagger },
      },
    };

    return (
      <Tag
        className={`${baseClass} ${className}`}
        aria-label={text}
      >
        <motion.span
            style={{ display: 'inline-block' }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
        >
          {characters.map((char, charIndex) => {
            const fakes = Array.from({ length: scrambleCount }).map(() => getRandomChar(scrambleChars));
            return (
              <span key={charIndex} className="char" style={{ display: 'inline-block', position: 'relative' }}>
                {/* Real Character with class 'n' */}
                <motion.span
                  className="n"
                  style={{ position: 'relative', zIndex: 1, opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: scrambleCount * scrambleDuration, duration: revealDuration, ease: [0.25, 1, 0.5, 1] }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
                {/* Fake Characters with class 'f' */}
                {fakes.map((fakeChar, fakeIndex) => (
                  <motion.span
                    key={fakeIndex}
                    className="f"
                    style={{ position: 'absolute', top: 0, left: 0, opacity: 0, transformOrigin: 'left center' }}
                    initial={{ opacity: 1, scaleX: 1 }}
                    animate={{ opacity: 0, scaleX: 0 }}
                    transition={{ delay: fakeIndex * (scrambleDuration / scrambleCount), duration: scrambleDuration, ease: [0.76, 0, 0.24, 1] }}
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

  if (variant === 'Atext' || variant === 'Aline') {
    // --- LINE-BY-LINE ANIMATION ('Atext' / 'Aline') ---
    // Split text by newline characters to get an array of lines.
    const lines = text.split('\n');

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                delayChildren: delay,
                staggerChildren: lineStagger,
            },
        },
    };

    const lineVariants: Variants = {
        hidden: { opacity: 0, y: '50%' },
        visible: {
            opacity: 1,
            y: '0%',
            transition: { duration: lineDuration, ease: [0.76, 0, 0.24, 1] },
        },
    };

    return (
      <Tag className={`${baseClass} ${className}`}>
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
        >
            {lines.map((line, index) => (
                // Add a wrapper div to handle `overflow: hidden` for the y-axis animation
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

  return null; // Should not happen if a valid variant is provided
};
