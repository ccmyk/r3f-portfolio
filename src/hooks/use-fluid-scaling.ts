'use client' // This hook must run on the client.

import { useLayoutEffect } from 'react'

// Define the design breakpoints from the original project.
const DESIGN_BREAKPOINTS = {
  L: { w: 1440, h: 800, multi: 0.4 }, // Large/Desktop
  P: { w: 390, h: 640, multi: 0.4 }, // Portrait/Mobile
}

export function useFluidScaling() {
  // useLayoutEffect runs synchronously after all DOM mutations.
  // It's perfect for measurements and DOM updates like this to avoid flickering.
  useLayoutEffect(() => {
    const calculateAndSetMultipliers = () => {
      const vw = window.innerWidth

      // Replicate the exact calculation from the legacy constructor.js
      let multiL = 10 - (10 - (vw / DESIGN_BREAKPOINTS.L.w) * 10) * DESIGN_BREAKPOINTS.L.multi
      multiL = Math.min(10, multiL)

      let multiP = 10 - (10 - (vw / DESIGN_BREAKPOINTS.P.w) * 10) * DESIGN_BREAKPOINTS.P.multi
      multiP = Math.min(10, multiP)

      // Set the calculated values as CSS variables on the root <html> element.
      document.documentElement.style.setProperty('--ck-multi-l', multiL.toString())
      document.documentElement.style.setProperty('--ck-multi-p', multiP.toString())
      document.documentElement.style.setProperty('--ck-hvar', `${window.innerHeight}px`)
    }

    // Calculate on initial mount.
    calculateAndSetMultipliers()

    // Recalculate whenever the window is resized.
    window.addEventListener('resize', calculateAndSetMultipliers)

    // This is a crucial cleanup function.
    // It removes the event listener when the component unmounts to prevent memory leaks.
    return () => {
      window.removeEventListener('resize', calculateAndSetMultipliers)
    }
  },) // The empty dependency array means this effect runs only once on mount.
}