// src/components/Footer.tsx
'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { AnimatedText } from './AnimatedText'

interface FooterProps {
  isVisible: boolean
}

export const Footer = forwardRef<HTMLElement, FooterProps>(({ isVisible }, ref) => {
  return (
    <motion.section
      ref={ref}
      className="footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="footer_cm">
        <AnimatedText
          text="Get in touch"
          type="char"
          className="Awrite"
          isVisible={isVisible}
          data-io="11"
        />
      </div>
      <div className="cnt_lk">
        {['Instagram', 'Savee', 'LinkedIn', 'Dribbble', 'Read.cv', 'Behance'].map((link, index) => (
          <AnimatedText
            key={link}
            text={link}
            type="char"
            className="Awrite cnt_lk_el"
            isVisible={isVisible}
            data-io={`12${index}`}
            delay={index * 0.1}
          />
        ))}
      </div>
    </motion.section>
  )
})

Footer.displayName = 'Footer'