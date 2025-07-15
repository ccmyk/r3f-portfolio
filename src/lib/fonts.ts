// src/lib/fonts.ts 
import localFont from 'next/font/local'

// Define your local fonts
export const montreal = localFont({
  src: '../../public/fonts/PPNeueMontreal-Medium.woff2',
  display: 'swap',
  variable: '--font-montreal', // This is the CSS variable name
})

export const montrealbook = localFont({
  src: '../../public/fonts/PPNeueMontrealMono-Book.woff2',
  display: 'swap',
  variable: '--font-montrealbook', // This is the CSS variable name
})
