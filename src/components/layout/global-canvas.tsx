'use client'

import { Canvas } from '@react-three/fiber'
import { useWebGLScene } from '../providers/webgl-scene-provider'
import { AnimatePresence } from 'framer-motion'
import { FluidRevealEffect } from '@/features/loader/fluid-reveal-effect'

export function GlobalCanvas() {
  const { activeScene, setActiveScene } = useWebGLScene()

  return (
    <Canvas
      className="fixed inset-0 z-20 pointer-events-none"
      gl={{ antialias: false }} // The original doesn't seem to use antialiasing for these effects
    >
      <AnimatePresence>
        {activeScene === 'loader' && (
          <FluidRevealEffect onTransitionComplete={() => setActiveScene(null)} />
        )}
        {/* We will add other scenes here, like the hero text effect */}
      </AnimatePresence>
    </Canvas>
  )
}