'use client'

import { motion, useInView, Variants } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedTextProps {
  text: string
  el?: keyof JSX.IntrinsicElements
  className?: string
  once?: boolean
  repeatDelay?: number
  animation?: {
    hidden: Variants
    visible: Variants
  }
}

const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
}

export function AnimatedText({
  text,
  el: Wrapper = 'p',
  className,
  once,
  repeatDelay,
  animation = defaultAnimations,
}: AnimatedTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.5, once })

  return (
    <Wrapper className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        ref={ref}
        initial="hidden"
        animate={isInView? 'visible' : 'hidden'}
        transition={{ staggerChildren: 0.05, delayChildren: 0.05 }}
        aria-hidden
      >
        {text.split(' ').map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block">
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={charIndex}
                className="inline-block"
                variants={animation}
              >
                {char}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </span>
        ))}
      </motion.span>
    </Wrapper>
  )
}