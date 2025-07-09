// src/webgl/providers/WebGLSceneProvider.gl.tsx
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type SceneContextType = {
  activeScene: string | null
  setActiveScene: (scene: string | null) => void
}

const WebGLSceneContext = createContext<SceneContextType | undefined>(undefined)

export function WebGLSceneProvider({ children }: { children: ReactNode }) {
  // FIX: Added [activeScene, setActiveScene] to the useState hook.
  const [activeScene, setActiveScene] = useState<string | null>(null)

  return (
    <WebGLSceneContext.Provider value={{ activeScene, setActiveScene }}>
      {children}
    </WebGLSceneContext.Provider>
  )
}

export function useWebGLScene() {
  const context = useContext(WebGLSceneContext)
  if (!context) {
    throw new Error('useWebGLScene must be used within a WebGLSceneProvider')
  }
  return context
}