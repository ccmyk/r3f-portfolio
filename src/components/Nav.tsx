// src/components/Nav.tsx
'use client'

import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { AnimatedText } from './AnimatedText'
import { useAnimationController } from '@/hooks/useAnimationController'

export function Nav() {
  const { state } = useAnimationController()
  const controls = useAnimation()

  useEffect(() => {
    if (state.navVisible) {
      controls.start({ opacity: 1, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } })
    }
  }, [state.navVisible, controls])

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={controls}
      className="nav"
    >
      <div className="nav_logo">
        <AnimatedText
          text="EVASANCHEZ"
          type="char"
          className="Awrite"
          isVisible={state.navVisible}
          data-io="0"
        />
      </div>
      <div className="nav_right">
        <AnimatedText
          text="LET'S TALK"
          type="char"
          className="Awrite Ms"
          isVisible={state.navVisible}
          data-io="0"
          delay={0.7}
        />
      </div>
    </motion.nav>
  )
}