// src/providers/WebGLProvider.tsx 
'use client'

import { Canvas } from '@react-three/fiber'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

// Component that uses R3F hooks - must be inside Canvas
function CanvasContent({ children }: { children: React.ReactNode }) {
  const { gl } = useThree()

  useEffect(() => {
    // Global WebGL setup (e.g., pixel ratio, antialiasing)
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }, [gl])

  return <>{children}</>
}

export function WebGLProvider({ children }: { children: React.ReactNode }) {
  return (
    <Canvas
      gl={{ antialias: true }}
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ width: '100%', height: '100vh' }}
    >
      <CanvasContent>{children}</CanvasContent>
    </Canvas>
  )
}
