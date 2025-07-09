// src/app/(app)/layout.tsx
import type { Metadata } from 'next'
import { AppProviders } from '@/providers/AppProviders'
import { montreal, montrealbook } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Chris Hall - Art Director & Designer',
  description: 'Art Director & Designer living in Los Angeles.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn('antialiased', montreal.variable, montrealbook.variable)} suppressHydrationWarning>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}