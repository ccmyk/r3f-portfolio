'use client'

import { useFluidScaling } from '@/hooks/use-fluid-scaling'
import React, { useState } from 'react'
import { PageLoader } from '../ui/page-loader'
import { LoaderTransition } from '../ui/loader-transition'
import { AnimatePresence } from 'framer-motion'

export function AppProviders({ children }: { children: React.ReactNode }) {
  useFluidScaling()
  // useLenis() // We'll enable this later

  const [isUiLoaded, setIsUiLoaded] = useState(false)
  const = useState(true)

  const handleUiLoaded = () => {
    setIsUiLoaded(true)
    // Set a timer to remove the transition component after it has faded out
    setTimeout(() => {
      setIsTransitioning(false)
    }, 2000) // Match the duration + delay of the transition
  }

  return (
    <>
      <AnimatePresence>
        {!isUiLoaded && <PageLoader onLoaded={handleUiLoaded} />}
      </AnimatePresence>
      
      <AnimatePresence>
        {isTransitioning && isUiLoaded && <LoaderTransition />}
      </AnimatePresence>

      {children}
    </>
  )
}