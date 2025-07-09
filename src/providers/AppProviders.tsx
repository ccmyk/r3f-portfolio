// src/providers/AppProviders.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useFluidScaling } from '@/hooks/useFluidScaling'
import { WebGLSceneProvider, useWebGLScene } from '@/webgl/providers/WebGLSceneProvider.gl'

import { PageLoader } from '@/components/ui/PageLoader'
import { GlobalCanvas } from '@/components/layout/GlobalCanvas'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { BackgroundGrid } from '@/components/layout/BackgroundGrid'

type LoadingState = 'dom-loading' | 'webgl-loading' | 'complete'

export function AppProviders({ children }: { children: React.ReactNode }) {
  useFluidScaling()

  const [loadingState, setLoadingState] = useState<LoadingState>('dom-loading')
  // We get setActiveScene from the context *after* the provider is rendered.
  const WebGLContextConsumer = ({ children }: { children: React.ReactNode }) => {
    const { setActiveScene } = useWebGLScene()
    const pathname = usePathname()

    useEffect(() => {
      if (sessionStorage.getItem('siteLoaded') === 'true') {
        setLoadingState('complete')
        setActiveScene(null)
      }
    }, [pathname, setActiveScene])

    const handleDomLoadComplete = () => {
      setActiveScene('loader')
      setLoadingState('webgl-loading')
    }

    const handleWebglLoadComplete = () => {
      setActiveScene(null)
      setLoadingState('complete')
      sessionStorage.setItem('siteLoaded', 'true')
    }

    return (
      <>
        <CustomCursor />
        <AnimatePresence>
          {loadingState !== 'complete' && (
            <div key="loader-wrapper">
              {/* <GlobalCanvas onTransitionComplete={handleWebglLoadComplete} /> */}
              {loadingState === 'dom-loading' && <PageLoader onLoaded={handleDomLoadComplete} />}
            </div>
          )}
        </AnimatePresence>

        {loadingState === 'complete' && (
          <div className="fade-in">
            <Navigation isVisible={true} />
            <main className="pt-24">{children}</main>
            <Footer />
          </div>
        )}
      </>
    )
  }

  return (
    <WebGLSceneProvider>
      <WebGLContextConsumer>{children}</WebGLContextConsumer>
    </WebGLSceneProvider>
  )
}