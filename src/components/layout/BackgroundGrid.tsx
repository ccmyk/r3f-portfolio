// src/components/layout/BackgroundGrid.tsx
'use client'

import { motion } from 'framer-motion'

// This component is purely stylistic and uses an array to generate the 13 columns.
export function BackgroundGrid() {
  return (
    <motion.div
      className="Mbg fixed inset-0 z-0 flex justify-between px-4 md:px-8 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.15, transition: { delay: 3.5, duration: 2 } }}
    >
      {Array.from({ length: 13 }).map((_, i) => (
        <div key={i} className="Mbg_col w-px bg-repeat-y" style={{ backgroundImage: `linear-gradient(to bottom, transparent 50%, #9c9c9c 50%)`, backgroundSize: '100% 8px' }} />
      ))}
    </motion.div>
  )
}