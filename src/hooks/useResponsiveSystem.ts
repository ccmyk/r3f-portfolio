// src/hooks/useResponsiveSystem.ts 
'use client'

import { useEffect, useState } from 'react'

export function useResponsiveSystem() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { isMobile }
}
