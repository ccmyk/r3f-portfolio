// src/app/ClientLayout.tsx
'use client'

import { Nav } from '@/components/Nav'
import { Mouse } from '@/components/Mouse'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <Mouse />
      {children}
    </>
  )
}
