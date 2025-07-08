'use client'

import { useFluidScaling } from '@/hooks/use-fluid-scaling'
import React, { useState } from 'react'
import { PageLoader } from '../ui/page-loader'
import { AnimatePresence } from 'framer-motion'
import { WebGLSceneProvider, useWebGLScene } from './webgl-scene-provider'
import { GlobalCanvas } from '../layout/global-canvas'

function AppContent({ children }: { children: React.ReactNode }) {
  const { setActiveScene } = useWebGLScene()
  const [isLoaded, setIsLoaded] = useState(false)

  const handleLoaded = () => {
    // When the UI loader is done, it tells the WebGL scene to start its transition.
    // The WebGL component will then handle setting the scene to null when it's finished.
    setActiveScene('loader')
    setIsLoaded(true)
  }

  return (
    <>
      <AnimatePresence>
        {!isLoaded && <PageLoader onLoaded={handleLoaded} />}
      </AnimatePresence>
      {children}
    </>
  )
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  useFluidScaling()

  return (
    <WebGLSceneProvider>
      <GlobalCanvas />
      <AppContent>{children}</AppContent>
    </WebGLSceneProvider>
  )
}