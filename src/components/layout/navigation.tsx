'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { AnimatedText } from '@/components/ui/animated-text'
import { LiveClock } from './live-clock'
import { power2InOut, power4InOut } from '@/lib/easings'

const navLinks = [
  { href: '/index', label: 'Index' },
  { href: '/about', label: 'About' },
  { href: '/playground', label: 'Playground' },
]

export function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <motion.nav
        initial={{ y: '-100%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1, ease: power4InOut, delay: 3.5 }} // Using precise easing
        className="fixed top-0 left-0 w-full z-50 p-4 text-sm text-brand-dark"
      >
        <div className="absolute inset-0 bg-brand-light/80 backdrop-blur-sm border-b border-black/10"></div>
        <div className="relative flex items-center justify-between max-w-screen-2xl mx-auto">
          {/* Left Side: Logo and Clock */}
          <div className="flex items-center gap-4">
            <Link href="/" className="font-main uppercase tracking-wider text-base">
              <AnimatedText text="Chris Hall" el="span" />
            </Link>
            <div className="h-4 w-px bg-black/20 hidden md:block" />
            <LiveClock />
          </div>

          {/* Right Side: Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-main uppercase tracking-wider relative group"
              >
                <AnimatedText text={link.label} el="span" />
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-px bg-brand-dark origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: pathname === link.href? 1 : 0 }}
                  transition={{ duration: 0.6, ease: power2InOut }} // Using precise easing
                />
              </Link>
            ))}
          </div>

          {/* Mobile Burger Menu */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="z-50 relative w-8 h-8">
              <motion.span
                className="absolute h-0.5 w-5 bg-brand-dark"
                animate={{ rotate: isMenuOpen? 45 : 0, y: isMenuOpen? 0 : -4 }}
                transition={{ duration: 0.6, ease: power2InOut }}
              />
              <motion.span
                className="absolute h-0.5 w-5 bg-brand-dark"
                animate={{ rotate: isMenuOpen? -45 : 0, y: isMenuOpen? 0 : 4 }}
                transition={{ duration: 0.6, ease: power2InOut }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: power2InOut }}
            className="fixed inset-0 bg-brand-light z-40 flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-main text-3xl uppercase"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}