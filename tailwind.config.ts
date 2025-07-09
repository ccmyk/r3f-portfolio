import type { Config } from 'tailwindcss'

const config: Config = {
  // This tells Tailwind where to look for class names.
  // It's automatically configured by Next.js to scan all relevant files.
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // The container utility is used to center content. We'll set a default padding.
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      // Here we map our CSS variables from globals.css to Tailwind's color palette.
      // This allows us to use classes like `bg-background` or `text-accent`.
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        // We can add the original color names as well for clarity.
        'brand-light': '#F8F6F2',
        'brand-dark': '#050505',
        'brand-gray': '#8A8A8A',
      },
      spacing: {
        // Add custom spacing from the original CSS for easy reuse
        '59.2': '59.2rem',
        '8.5': '8.5rem',
        '4.5': '4.5rem',
        '3.7': '3.7rem',
      },
      // Here we define our custom fonts so we can use classes like `font-main` or `font-book`.
      fontFamily: {
        main: ['var(--font-montreal)', 'sans-serif'],
        book: ['var(--font-montrealbook)', 'monospace'],
      },
      // We can define custom animation keyframes and utilities here.
      // This is how we'll replace hardcoded CSS animations.
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  // We can add plugins for extra functionality, like typography defaults or animations.
  plugins: [require('tailwindcss-animate')],
}
export default config