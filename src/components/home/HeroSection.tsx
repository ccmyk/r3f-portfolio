// src/components/home/HeroSection.tsx
'use client'

import { useRef } from 'react'
import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import { View } from '@react-three/drei'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { power2InOut } from '@/lib/easings'
import { InteractiveTextGL } from '@/webgl/components/InteractiveText.gl'

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: power2InOut },
  },
}

const ArrowIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M6.49194 3.516H5.67594L5.67594 2.052L5.74794 1.272L5.71194 1.26L4.94394 2.124L0.911938 6.156L0.335937 5.58L4.36794 1.548L5.23194 0.78L5.21994 0.743999L4.43994 0.816L2.97594 0.816V0L6.49194 0L6.49194 3.516Z" fill="currentColor" />
  </svg>
)

export function HeroSection({ isVisible }: { isVisible: boolean }) {
  const titleLine1 = useRef<HTMLDivElement>(null)
  const titleLine2 = useRef<HTMLDivElement>(null)

  return (
    <motion.section
      className="relative min-h-screen flex flex-col justify-center px-4 py-20 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      <div className="relative z-20 w-full max-w-screen-2xl mx-auto">
        <div className="flex flex-col items-start lg:ml-[59.5rem] md:ml-[8.5rem] ml-[4.5rem] pt-16">
          <div className="font-main text-8xl md:text-[18rem] tracking-tighter leading-[0.9]">
            <div ref={titleLine1}>Chris</div>
            <div ref={titleLine2}>Hall</div>
          </div>
          <motion.div variants={itemVariants} className="max-w-md mt-12">
            <h3 className="font-book text-lg leading-relaxed">
              Art Director & Designer<br />
              Living in Los Angeles.
            </h3>
            <div className="mt-6">
              <AnimatedText
                el="h4"
                text="Portfolio_20/25"
                className="font-book text-sm text-neutral-500 uppercase"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div variants={itemVariants} className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <p className="font-book text-sm uppercase text-neutral-500">[scroll to explore]</p>
      </motion.div>
      <motion.div variants={itemVariants} className="absolute bottom-10 right-4 md:right-8">
        <div className="flex items-center gap-6">
          <Link href="#" className="group font-book text-sm uppercase flex items-center gap-2 hover:text-neutral-500 transition-colors">
            LinkedIn <ArrowIcon className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Link href="#" className="group font-book text-sm uppercase flex items-center gap-2 hover:text-neutral-500 transition-colors">
            Resume <ArrowIcon className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </motion.div>

      <View track={titleLine1}>
        <InteractiveTextGL text="CHRIS" size={5} />
      </View>
      <View track={titleLine2}>
        <InteractiveTextGL text="HALL" size={5} />
      </View>
    </motion.section>
  )
}