// src/providers/ScrollProvider.tsx
'use client'

import { createContext, useContext, useEffect, useRef } from 'react'
import Lenis from 'lenis'

const ScrollContext = createContext<{ lenis: Lenis | null }>({ lenis: null })

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    lenisRef.current = new Lenis({
      lerp: 0.04,
      duration: 0.8,
      smoothWheel: true,
    })

    const raf = (time: number) => {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenisRef.current?.destroy()
    }
  }, [])

  return (
    <ScrollContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </ScrollContext.Provider>
  )
}

export function useScroll() {
  return useContext(ScrollContext)
}