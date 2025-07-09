// src/components/ui/PageLoader.tsx
'use client'

import { useEffect, useRef } from 'react'
import { animate } from 'framer-motion'
import { AnimatedText } from './AnimatedText'
import { power2InOut } from '@/lib/easings'

export function PageLoader({ onLoaded }: { onLoaded: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const numberEl = numberRef.current
    if (!numberEl) return

    const runLoaderSequence = async () => {
      // Replicate the text reveal from the original (data-params=".8")
      // This will be handled by AnimatedText's variants later
      await animate(textRef.current!, { opacity: 1, y: 0 }, { duration: 0.8, delay: 0.8 })

      // ** Stage 1: 0 -> 42 (2 seconds, linear) **
      await animate(0, 42, {
        duration: 2,
        ease: 'linear',
        onUpdate: (latest) => {
          numberEl.textContent = Math.round(latest).toString().padStart(3, '0')
        },
      })

      // ** Stage 2: 42 -> 90 (8 seconds, easeInOut) **
      await animate(42, 90, {
        duration: 8,
        ease: power2InOut,
        onUpdate: (latest) => {
          numberEl.textContent = Math.round(latest).toString().padStart(3, '0')
        },
      })
      
      // ** Stage 3: The exit sequence **
      // The final number animation and the fade out happen concurrently.
      Promise.all([
        animate(90, 100, {
          duration: 0.49,
          ease: power2InOut,
          onUpdate: (latest) => {
            numberEl.textContent = Math.round(latest).toString().padStart(3, '0')
          },
        }),
        animate(containerRef.current!, { opacity: 0 }, { duration: 0.5, delay: 0.2 })
      ]).then(() => {
        // This onLoaded call now correctly triggers the next stage in AppProviders
        onLoaded()
      })
    }

    runLoaderSequence()
  }, [onLoaded])

  return (
    // We use the semantic classes defined in src/styles/loader.css
    <div ref={containerRef} className="loader-container">
      <div className="loader-backdrop" />
      <div className="loader-content content-grid">
        <div /> {/* Top spacer */}
        <div>
            <div ref={numberRef} className="loader-number">000</div>
            <div ref={textRef} className="loader-text-group">
                {/* The text content from the original HTML */}
                <AnimatedText text="CHRIS HALL" el="h1" />
                <AnimatedText text="DESIGN_PORTFOLIO" el="h2" />
            </div>
        </div>
        <div /> {/* Bottom spacer */}
      </div>
    </div>
  )
}