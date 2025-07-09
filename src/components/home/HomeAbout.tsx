// src/components/home/HomeAbout.tsx
'use client'

import { useRef } from 'react'
import { View } from '@react-three/drei'
import { motion } from 'framer-motion'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { BackgroundGL } from '@/webgl/components/Background.gl'
import { DistortedImageGL } from '@/webgl/components/DistortedImage.gl'

export function HomeAbout() {
  // Refs to track the DOM elements for our WebGL views
  const bgViewRef = useRef<HTMLDivElement>(null)
  const portraitViewRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {/* This container needs to exist for the fixed WebGL background to track */}
      <div ref={bgViewRef} className="absolute top-[200vh] h-screen w-full" />
      
      <motion.section
        className="home_about relative mt-40 md:mt-80 p-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-200px" }}
        transition={{ duration: 1 }}
      >
        {/* About Section Content */}
        <div className="relative z-10 mx-auto flex max-w-screen-2xl flex-col">
          <div className="flex flex-col items-start md:ml-[59.4rem] text-brand-light">
              <AnimatedText text="Interactive Designer," el="h2" className="font-main text-4xl md:text-6xl tracking-tighter"/>
              <AnimatedText text="also Speaker & Teacher" el="h2" className="font-main text-4xl md:text-6xl tracking-tighter mt-2"/>
          </div>
          <div ref={portraitViewRef} className="relative mt-8 h-[400px] w-[300px] self-end md:h-[600px] md:w-[450px]">
            {/* This is the placeholder for the portrait. It will be invisible. */}
          </div>
        </div>
      </motion.section>

      {/* RENDER THE WEBGL VIEWS */}
      <View track={bgViewRef} className="fixed inset-0 z-0">
        <BackgroundGL />
      </View>
      <View track={portraitViewRef} className="z-10">
        {/* Replace with your actual portrait image URL */}
        <DistortedImageGL imageUrl="/path/to/your/portrait.jpg" />
      </View>
    </>
  )
}