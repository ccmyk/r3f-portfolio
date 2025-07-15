// src/hooks/useAnimationController.ts 
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useInView } from 'framer-motion'
import { useScroll } from '@/providers/ScrollProvider'

interface AnimationState {
  loaderComplete: boolean
  navVisible: boolean
  heroVisible: boolean
  projectsVisible: boolean
  aboutVisible: boolean
  footerVisible: boolean
}

export function useAnimationController() {
  const [state, setState] = useState<AnimationState>({
    loaderComplete: false,
    navVisible: false,
    heroVisible: false,
    projectsVisible: false,
    aboutVisible: false,
    footerVisible: false,
  })

  const { lenis } = useScroll()

  useEffect(() => {
    if (!lenis) return

    const startAnimations = async () => {
      // Loader (0-2600ms)
      await new Promise((resolve) => setTimeout(resolve, 2600))
      setState((prev) => ({ ...prev, loaderComplete: true, navVisible: true }))

      // Hero (3000-6000ms)
      await new Promise((resolve) => setTimeout(resolve, 400))
      setState((prev) => ({ ...prev, heroVisible: true }))

      // Projects (6000-8000ms)
      await new Promise((resolve) => setTimeout(resolve, 3000))
      setState((prev) => ({ ...prev, projectsVisible: true }))

      // About (8000-10000ms)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setState((prev) => ({ ...prev, aboutVisible: true }))

      // Footer (10000-12000ms)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setState((prev) => ({ ...prev, footerVisible: true }))
    }

    startAnimations()
    lenis.start()

    return () => {
      lenis.stop()
    }
  }, [lenis])

  const observeElement = useCallback((ref: React.RefObject<HTMLElement>, key: keyof AnimationState) => {
    const { inView } = useInView({ ref, threshold: 0, triggerOnce: false })
    useEffect(() => {
      if (inView) {
        setState((prev) => ({ ...prev, [key]: true }))
      }
    }, [inView, key])
  }, [])

  return { state, observeElement }
}
