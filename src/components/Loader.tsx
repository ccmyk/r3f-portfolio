// src/components/Loader.tsx 
'use client'

import { useState, useEffect } from 'react'
import { motion, animate } from 'framer-motion'
import { power2InOut } from '@/lib/easings'
import { AnimatedText } from './AnimatedText'

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 2.6,
      ease: power2InOut,
      onUpdate: (value) => {
        if (value < 42) {
          setCount(Math.round(value * 42 / 2)) // 0-42 in 2s
        } else if (value < 90) {
          setCount(Math.round(42 + (value - 42) * 48 / 8)) // 42-90 in 0.6s
        } else {
          setCount(Math.round(value)) // 90-100 in 0.49s
        }
      },
      onComplete,
    })

    return () => controls.stop()
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2.6, ease: power2InOut }}
      className="loader"
    >
      <div className="loader_tp">{count}%</div>
      <AnimatedText text="Loading..." type="char" className="loader_bp Awrite" isVisible={true} />
    </motion.div>
  )
}
