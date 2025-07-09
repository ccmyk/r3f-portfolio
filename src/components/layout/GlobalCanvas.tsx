// src/components/layout/GlobalCanvas.tsx
'use client'

import { Canvas } from '@react-three/fiber'
import { View, Preload } from '@react-three/drei'
import { AnimatePresence } from 'framer-motion'

// Custom WebGL component imports
import { useWebGLScene } from '@/webgl/providers/WebGLSceneProvider.gl'
import { FluidRevealEffect } from '@/webgl/effects/FluidReveal.gl'

export function GlobalCanvas({ onTransitionComplete }: { onTransitionComplete: () => void }) {
  const { activeScene } = useWebGLScene()

  return (
    <Canvas
      eventSource={document.body} // This allows the canvas to receive events from the whole page
      className="fixed inset-0 z-10 pointer-events-none"
      gl={{ antialias: false }}
    >
      {/* This is the portal that all of our <View> components will render into */}
      <View.Port />

      {/* This pre-loads assets for smoother scene transitions */}
      <Preload all />

      {/* The only scene that renders directly into the canvas is the loader's transition effect */}
      <AnimatePresence>
        {activeScene === 'loader' && (
          <FluidRevealEffect onTransitionComplete={onTransitionComplete} />
        )}
      </AnimatePresence>
    </Canvas>
  )
}