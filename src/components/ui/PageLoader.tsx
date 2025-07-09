// src/components/ui/PageLoader.tsx
'use client'

import { useEffect, useRef } from 'react'
import { animate } from 'framer-motion'
import { AnimatedText } from './AnimatedText'
import { power2InOut } from '@/lib/easings'

export function PageLoader({ onLoaded }: { onLoaded: () => void }) {
  const numberRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const numberEl = numberRef.current;
    if (!numberEl || !containerRef.current) return;

    const runLoaderSequence = async () => {
      // Stage 1: 0 -> 42 (2 seconds, linear)
      await animate(0, 42, {
        duration: 2,
        ease: 'linear',
        onUpdate: (latest) => {
          numberEl.textContent = Math.round(latest).toString().padStart(3, '0');
        },
      });

      // Stage 2: 42 -> 90 (8 seconds, easeInOut)
      await animate(42, 90, {
        duration: 8,
        ease: power2InOut,
        onUpdate: (latest) => {
          numberEl.textContent = Math.round(latest).toString().padStart(3, '0');
        },
      });

      // Stage 3: The exit sequence
      await Promise.all([
        animate(90, 100, {
          duration: 0.49,
          ease: power2InOut,
          onUpdate: (latest) => {
            numberEl.textContent = Math.round(latest).toString().padStart(3, '0');
          },
        }),
        animate(containerRef.current, { opacity: 0 }, { duration: 0.5, delay: 0.2 }),
      ]);
      onLoaded();
    };

    runLoaderSequence();
  }, [onLoaded]);

  return (
    <div ref={containerRef} className="loader-container">
      <div className="loader-backdrop" />
      <div className="loader-content content-grid">
        <div /> {/* Spacer */}
        <div>
          <div ref={numberRef} className="loader-number">000</div>
          <div className="loader-text-group">
            <AnimatedText text="CHRIS HALL" el="h1" startDelay={0.8} />
            <AnimatedText text="DESIGN_PORTFOLIO" el="h2" startDelay={1.0} />
          </div>
        </div>
        <div /> {/* Spacer */}
      </div>
    </div>
  );
}