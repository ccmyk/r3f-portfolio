'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { AnimatedText } from '@/components/ui/animated-text'
import { LiveClock } from './live-clock'

const navLinks = [
  { href: '/#work', label: 'Index' },
  { href: '/about', label: 'About' },
  { href: '/playground', label: 'Playground' },
]

export function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className={cn(
          'fixed top-0 left-0 w-full z-50 p-4 text-sm',
          'text-brand-dark'
        )}
      >
        <div className="absolute inset-0 bg-brand-light/80 backdrop-blur-sm border-b border-brand-dark/10"></div>
        <div className="relative flex items-center justify-between max-w-screen-2xl mx-auto">
          {/* Left Side: Logo and Clock */}
          <div className="flex items-center gap-4">
            <Link href="/" className="font-main uppercase tracking-wider text-base">
              <AnimatedText text="Eva Sánchez" el="span" />
            </Link>
            <div className="h-4 w-px bg-brand-dark/20 hidden md:block" />
            <LiveClock />
          </div>

          {/* Right Side: Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-main uppercase tracking-wider relative',
                  pathname === link.href && 'font-bold'
                )}
              >
                <AnimatedText text={link.label} el="span" />
                {pathname === link.href && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-px bg-brand-dark"
                    layoutId="underline"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Burger Menu */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="z-50 relative w-8 h-8">
              <span className={cn('absolute h-0.5 w-5 bg-brand-dark transform transition duration-300 ease-in-out', isMenuOpen? 'rotate-45' : '-translate-y-1.5')} />
              <span className={cn('absolute h-0.5 w-5 bg-brand-dark transform transition duration-300 ease-in-out', isMenuOpen? '-rotate-45' : 'translate-y-1.5')} />
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
            transition={{ duration: 0.3 }}
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