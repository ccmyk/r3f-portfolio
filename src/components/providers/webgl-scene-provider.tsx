'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type SceneContextType = {
  activeScene: string | null
  setActiveScene: (scene: string | null) => void
}

const WebGLSceneContext = createContext<SceneContextType | undefined>(undefined)

export function WebGLSceneProvider({ children }: { children: ReactNode }) {
  const = useState<string | null>('loader')

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