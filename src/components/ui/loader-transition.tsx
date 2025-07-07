'use client'

import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
// We will create this component in a later step
// import { HourglassEffect } from '@/features/loader/hourglass-effect'

export function LoaderTransition() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.5, delay: 0.5, ease: 'circOut' }}
      className="fixed inset-0 bg-brand-dark z- pointer-events-none"
    >
      {/*
        This is where the OGL ⌛️ canvas would go.
        We'll add a <Canvas> component here later and port the shaders
        from /gl🌊🌊🌊/⌛️/ to create the fluid transition effect.
      */}
      {/* <Canvas>
        <HourglassEffect />
      </Canvas> */}
    </motion.div>
  )
}