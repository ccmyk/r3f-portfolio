'use client'

import { AnimatedText } from '@/components/ui/animated-text'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-4 py-20 overflow-hidden">
      {/* This Canvas will hold our WebGL text effect. It's positioned behind the HTML text. */}
      <Canvas
        className="absolute inset-0 z-0"
        camera={{ position: , fov: 45 }}
      >
        {/* We will add the <HeroTextEffect /> component here later */}
      </Canvas>

      <div className="relative z-10 w-full max-w-screen-2xl mx-auto">
        <div className="flex flex-col items-start lg:ml-[59.5rem] md:ml-[8.5rem] ml-[4.5rem] pt-16">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="font-main text-[20vw] sm:text-[15vw] md:text-[12rem] leading-none tracking-tighter uppercase"
          >
            <motion.span
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              transition={{ duration: 1, delay: 2.5, ease: 'easeOut' }}
              className="block"
            >
              {/* This is the HTML fallback text */}
              <AnimatedText text="Chris" el="span" />
            </motion.span>
            <motion.span
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              transition={{ duration: 1, delay: 2.5, ease: 'easeOut' }}
              className="block -mt-[2vw] md:-mt-6"
            >
              <AnimatedText text="Hall" el="span" />
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3 }}
            className="max-w-md mt-12"
          >
            <p className="font-book text-base md:text-lg leading-relaxed">
              An art director and designer living in Los Angeles.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}