// src/components/providers/app-providers.tsx

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full p-8 mt-40">
      <div className="max-w-screen-2xl mx-auto flex flex-col items-center">
        {/* This will eventually be our WebGL text component */}
        <div className="text-center mb-12">
          <h2 className="font-main text-6xl md:text-8xl tracking-tighter">
            <Link href="mailto:chris@chrishall.io" className="hover:text-brand-gray transition-colors">
              Get in touch
            </Link>
          </h2>
        </div>

        <div className="flex items-center gap-8 font-book uppercase text-xs tracking-widest">
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gray transition-colors">Instagram</a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gray transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}