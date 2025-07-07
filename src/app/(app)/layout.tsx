import type { Metadata } from 'next'
import { montreal, montrealbook } from '@/lib/fonts'
import './globals.css'
import { AppProviders } from '@/components/providers/app-providers'
import { cn } from '@/lib/utils'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { PageLoader } from '@/components/ui/page-loader'
import { CustomCursor } from '@/components/ui/custom-cursor'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Chris Hall - Art Director & Designer',
  description: 'Art Director & Designer living in Los Angeles.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn('antialiased', montreal.variable, montrealbook.variable)} suppressHydrationWarning>
      <body>
        <AppProviders>
          <Suspense fallback={null}>
            <PageLoader />
            <CustomCursor />
            <Navigation />
            <main className="pt-24">{children}</main> {/* Add padding to offset fixed nav */}
            <Footer />
          </Suspense>
        </AppProviders>
      </body>
    </html>
  )
}