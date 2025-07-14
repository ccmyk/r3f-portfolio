// src/hooks/useMouseWatch.ts
'use client'

import { useEffect, useRef } from 'react'
import { Vector2 } from 'three'

export function useMouseWatch() {
  const mouse = useRef(new Vector2(0, 0))

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      mouse.current.set(x, y)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return mouse
}