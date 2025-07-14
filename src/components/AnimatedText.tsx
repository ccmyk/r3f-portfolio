// src/components/AnimatedText.tsx
'use client'

import React from 'react'
import { motion, Variants, AnimatePresence } from 'framer-motion'
import { useMemo, useEffect, useRef, useState, useCallback } from 'react'
import { power2InOut, power4InOut } from '@/lib/easings'

// Fake characters and timings from anims.js
const FAKE_CHARS = '##·$%&/=€|()@+09*+]}{['.split('')
const TIMINGS = {
  default: { realDuration: 0.3, charStagger: 0.05, fakeDuration: 0.16, fakeDelayBase: 0.05, fakeStagger: 0.016 },
  line: { realDuration: 0.3, charStagger: 0.05, fakeDuration: 0.16, fakeDelayBase: 0.05, fakeStagger: 0.016 },
  Ms: { realDuration: 0.22, charStagger: 0.05, fakeDuration: 0.16, fakeDelayBase: 0.05, fakeStagger: 0.016 },
}
const LINE_ANIMATION = { duration: 0.6, stagger: 0.1 }

interface AnimatedTextProps {
  text: string
  el?: keyof React.JSX.IntrinsicElements
  className?: string
  startDelay?: number
  type?: 'char' | 'line' | 'text'
  isVisible?: boolean
  instant?: boolean
  timing?: 'default' | 'line' | 'Ms'
  bucle?: boolean
  onAnimationComplete?: () => void
}

interface WrapperProps {
  ref?: React.RefObject<HTMLElement>
  className?: string
  'aria-label'?: string
  children: React.ReactNode
}

interface CharData {
  char: string
  fake1: string
  fake2: string
}

// Helper functions
const splitTextIntoChars = (text: string): CharData[] => {
  return text.split('').map((char, index) => ({
    char: char === ' ' ? '\u00A0' : char,
    fake1: FAKE_CHARS[index % FAKE_CHARS.length], // Use deterministic fake chars
    fake2: FAKE_CHARS[(index + 1) % FAKE_CHARS.length], // Use deterministic fake chars
  }))
}

const splitTextIntoLines = (text: string): string[] => {
  return text.split('\n').filter(line => line.trim() !== '')
}

export function AnimatedText({
  text,
  el: Wrapper = 'p',
  className = '',
  startDelay = 0,
  type = 'char',
  isVisible = true,
  instant = false,
  timing = 'default',
  bucle = false,
  onAnimationComplete,
}: AnimatedTextProps) {
  const [isIvi, setIsIvi] = useState(false)
  const ref = useRef<HTMLElement>(null)

  // Memoize split data to avoid unnecessary recalculations
  const splitData = useMemo(() => {
    if (type === 'char') {
      return { chars: splitTextIntoChars(text) }
    } else if (type === 'line' || type === 'text') {
      return { lines: splitTextIntoLines(text) }
    }
    return {}
  }, [text, type])

  // Handle animation completion
  const handleAnimationComplete = useCallback(() => {
    setIsIvi(true)
    if (onAnimationComplete) {
      onAnimationComplete()
    }
    if (bucle) {
      const event = new CustomEvent('anim', { detail: { state: 1, el: ref.current } })
      document.dispatchEvent(event)
    }
  }, [onAnimationComplete, bucle])

  // Reset animation state when visibility changes
  useEffect(() => {
    if (!isVisible) {
      setIsIvi(false)
    }
  }, [isVisible])

  // Memoize animation variants
  const containerVariants: Variants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: TIMINGS[timing].charStagger, delayChildren: startDelay },
    },
    exit: { opacity: 0, transition: { duration: 0.4, ease: power4InOut } },
  }), [timing, startDelay])

  const realCharVariants: Variants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: TIMINGS[timing].realDuration, ease: power4InOut },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, ease: power4InOut },
    },
  }), [timing])

  const fakeCharVariants = useCallback((charIndex: number, fakeIndex: number): Variants => ({
    hidden: { scaleX: 1, opacity: 1, display: 'inline-block' },
    visible: {
      scaleX: 0,
      opacity: 0,
      display: 'none',
      transition: {
        scaleX: { duration: TIMINGS[timing].fakeDuration, ease: power4InOut },
        opacity: { duration: TIMINGS[timing].fakeDuration, ease: power4InOut },
        display: { delay: TIMINGS[timing].fakeDuration },
        delay: startDelay + (charIndex * TIMINGS[timing].fakeDelayBase) + ((1 + fakeIndex) * TIMINGS[timing].fakeStagger),
      },
    },
    exit: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.12, ease: power4InOut },
    },
  }), [timing, startDelay])

  const lineContainerVariants: Variants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: LINE_ANIMATION.stagger, delayChildren: startDelay },
    },
    exit: { opacity: 0, transition: { duration: 0.4, ease: power4InOut } },
  }), [startDelay])

  const lineVariants: Variants = useMemo(() => ({
    hidden: { opacity: 0, y: '50%' },
    visible: {
      opacity: 1,
      y: '0%',
      transition: { duration: LINE_ANIMATION.duration, ease: power2InOut },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, ease: power2InOut },
    },
  }), [])

  return React.createElement(
    Wrapper,
    {
      ref,
      className: `${className} ${isIvi ? 'ivi' : ''}`,
      ...(type === 'char' && { 'aria-label': text }),
    },
    <AnimatePresence
      onExitComplete={() => {
        setIsIvi(false)
      }}
    >
      {isVisible && (
        type === 'char' ? (
          <motion.span
            className="animated-text-container"
            variants={containerVariants}
            initial={instant ? 'visible' : 'hidden'}
            animate="visible"
            exit="exit"
            onAnimationComplete={handleAnimationComplete}
          >
            {splitData.chars?.map((charData, charIndex) => (
              <motion.span key={`${charIndex}-${charData.char}`} className="char" variants={realCharVariants}>
                <span className="n">{charData.char}</span>
                <motion.span className="f" variants={fakeCharVariants(charIndex, 0)} aria-hidden="true">
                  {charData.fake1}
                </motion.span>
                <motion.span className="f" variants={fakeCharVariants(charIndex, 1)} aria-hidden="true">
                  {charData.fake2}
                </motion.span>
              </motion.span>
            ))}
          </motion.span>
        ) : (
          <motion.div
            className="line-container"
            variants={lineContainerVariants}
            initial={instant ? 'visible' : 'hidden'}
            animate="visible"
            exit="exit"
            onAnimationComplete={handleAnimationComplete}
          >
            {splitData.lines?.map((line, index) => (
              <motion.div key={index} variants={lineVariants} className="line">
                {type === 'text' ? (
                  <AnimatedText
                    text={line}
                    type="char"
                    timing={timing}
                    startDelay={index * 0.15}
                    isVisible={isVisible}
                    instant={instant}
                  />
                ) : (
                  line
                )}
              </motion.div>
            ))}
          </motion.div>
        )
      )}
    </AnimatePresence>
  )
}