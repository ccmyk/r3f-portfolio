// src/components/layout/Navigation.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { LiveClock } from './LiveClock'
import { power2InOut, power4InOut } from '@/lib/easings'

// Animation variants remain the same
const navVariants: Variants = {
  hidden: { y: '-100%' },
  visible: { y: '0%', transition: { duration: 1, ease: power4InOut } },
}

const navLinks = [
  { href: '/', label: 'Index' },
  { href: '/about', label: 'About' },
  { href: '/playground', label: 'Playground' },
]

export function Navigation({ isVisible }: { isVisible: boolean }) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="nav-container" // Use our new semantic class
      >
        <div className="nav-backdrop"></div>
        <div className="nav-content">
          <div className="nav-left-cluster">
            <Link href="/" className="font-main uppercase tracking-wider text-base">
              <AnimatedText text="Chris Hall" el="span" />
            </Link>
            <div className="h-4 w-px bg-black/20 hidden md:block" />
            <LiveClock />
          </div>
          <div className="nav-right-cluster hidden md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="font-main uppercase tracking-wider relative group">
                <AnimatedText text={link.label} el="span" />
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-px bg-brand-dark origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: pathname === link.href ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: power2InOut }}
                />
              </Link>
            ))}
             <Link href="#" className="nav-link-inverted"> {/* Use our other new class */}
                Let's Talk
             </Link>
          </div>
          {/* Mobile Burger Menu remains the same */}
        </div>
      </motion.nav>
      {/* Mobile Menu Overlay remains the same */}
    </>
  )
}