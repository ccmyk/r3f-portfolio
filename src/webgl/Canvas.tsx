// src/webgl/Canvas.tsx 
'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

export function WebGLProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <Canvas
        gl={{ antialias: true }}
        camera={{ fov: 45, position: [0, 0, 7] }}
      >
        {children}
      </Canvas>
    </Suspense>
  )
}
