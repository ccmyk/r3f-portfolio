// src/components/layout/AnimatedClockSegment.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'

export function AnimatedClockSegment({ digit }: { digit: string }) {
  return (
    <div className="relative h-4 w-2 overflow-hidden font-book">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={digit}
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ ease: 'easeInOut', duration: 0.4 }}
          className="absolute inset-0"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}