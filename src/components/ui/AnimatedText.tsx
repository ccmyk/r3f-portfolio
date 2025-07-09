// src/components/ui/AnimatedText.tsx
'use client'

import { motion, Variants } from 'framer-motion'
import { useMemo } from 'react'

// The exact fake characters from the original anims.js
const FAKE_CHARS = '##·$%&/=€|()@+09*+]}{['.split('')

// The exact timing values from the original anims.js
const DURATION_REAL = 0.3
const STAGGER_REAL = 0.05
const DURATION_FAKE = 0.16
const DELAY_FAKE_BASE = 0.05
const STAGGER_FAKE_MICRO = 0.016

interface AnimatedTextProps {
  text: string
  el?: keyof JSX.IntrinsicElements
  className?: string
  staggerDelay?: number
  startDelay?: number
}

export function AnimatedText({ text, el: Wrapper = 'p', className, staggerDelay = 0.05, startDelay = 0 }: AnimatedTextProps) {
  const chars = useMemo(() => {
    return text.split('').map((char, index) => ({
      key: `${index}-${char}`,
      char: char === ' ' ? '\u00A0' : char, // Use non-breaking space
      fake1: FAKE_CHARS[Math.floor(Math.random() * FAKE_CHARS.length)],
      fake2: FAKE_CHARS[Math.floor(Math.random() * FAKE_CHARS.length)],
    }))
  }, [text])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: startDelay,
        staggerChildren: staggerDelay,
      },
    },
  }

  const charVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: DURATION_REAL, ease: 'easeOut' } },
  }

  const fakeCharVariants = (charIndex: number, fakeIndex: number): Variants => ({
    hidden: { scaleX: 1, opacity: 1 },
    visible: {
      scaleX: 0,
      opacity: 0,
      transition: {
        duration: DURATION_FAKE,
        delay: (charIndex * DELAY_FAKE_BASE) + ((1 + fakeIndex) * STAGGER_FAKE_MICRO),
        ease: 'easeOut',
      },
    },
  })

  return (
    <Wrapper className={className}>
      <motion.span
        className="animated-text-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-label={text}
      >
        {chars.map(({ key, char, fake1, fake2 }, charIndex) => (
          <motion.span key={key} variants={charVariants} className="char">
            <span className="real-char">{char}</span>
            <motion.span
              variants={fakeCharVariants(charIndex, 0)}
              className="fake-char"
              aria-hidden="true"
            >
              {fake1}
            </motion.span>
            <motion.span
              variants={fakeCharVariants(charIndex, 1)}
              className="fake-char"
              aria-hidden="true"
            >
              {fake2}
            </motion.span>
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  )
}