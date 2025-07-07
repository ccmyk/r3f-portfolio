'use client'

import { useProgress } from '@react-three/drei'
import { useAnimate, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { AnimatedText } from './animated-text'

// GSAP's 'power2.inOut' corresponds to a standard cubic-bezier easing function.
// We define it here for Framer Motion.
const power2InOut = [0.455, 0.03, 0.515, 0.955]

export function PageLoader({ onLoaded }: { onLoaded: () => void }) {
  const { progress } = useProgress()
  const [scope, animate] = useAnimate()
  const = useState(false)

  // This effect replicates the GSAP timeline from the original Loader.js
  useEffect(() => {
    const runLoaderAnimation = async () => {
      // Ensure this runs only once
      if (isAnimationStarted) return
      setIsAnimationStarted(true)

      // Animate the text into view first
      await animate(
        '.loader-text',
        { opacity: 1, y: 0 },
        { duration: 0.8, delay: 0.5 }
      )

      // Animate the number from 0 to 90 over a long duration, mimicking the original timeline
      await animate(scope.current, 90, {
        duration: 10, // 2s 'none' + 8s 'power2.inOut'
        ease: power2InOut,
        onUpdate: (latest) => {
          if (scope.current) {
            scope.current.textContent = Math.round(latest)
             .toString()
             .padStart(3, '0')
          }
        },
      })
    }

    runLoaderAnimation()
  },)

  // This effect watches for the actual asset loading progress
  useEffect(() => {
    if (progress === 100) {
      const runExitAnimation = async () => {
        // Animate the number quickly from its current value to 100
        await animate(scope.current, 100, {
          duration: 0.49,
          ease: power2InOut,
          onUpdate: (latest) => {
            if (scope.current) {
              scope.current.textContent = Math.round(latest)
               .toString()
               .padStart(3, '0')
            }
          },
        })

        // Fade out the entire loader element
        await animate(
          '.loader-container',
          { opacity: 0 },
          { duration: 0.5, delay: 0.2, ease: power2InOut }
        )

        // Signal that loading is complete
        onLoaded()
      }
      runExitAnimation()
    }
  }, [progress, animate, scope, onLoaded])

  return (
    <div className="loader-container fixed inset-0 bg-brand-dark text-brand-light z- flex flex-col justify-between p-4 md:p-8">
      {/* This empty div helps with the justify-between layout */}
      <div></div>

      {/* Main loader content, using Tailwind arbitrary values to match the original CSS */}
      <div className="w-full max-w-screen-2xl mx-auto flex flex-col items-start pl-[4.5rem] md:pl-[8.5rem] lg:pl-[59.2rem]">
        <div
          ref={scope}
          className="font-main text-[16.7rem] md:text-[28rem] leading-none tracking-tighter"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          000
        </div>
        <div className="loader-text opacity-0 -translate-y-5 flex flex-col items-start mt-4">
          <AnimatedText
            text="chris hall"
            el="h1"
            className="text-sm uppercase"
          />
          <AnimatedText
            text="creative portfolio"
            el="h2"
            className="text-sm uppercase mt-1"
          />
        </div>
      </div>
    </div>
  )
}