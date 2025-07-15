// src/app/ClientLayout.tsx 
"use client";

import { Nav } from '@/components/Nav';
import { Mouse } from '@/components/Mouse';
import { ScrollProvider } from '@/providers/ScrollProvider';
import { AnimationProvider } from '@/providers/AnimationProvider';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    // Foundational providers wrap more specific ones.
    <ScrollProvider>
      <AnimationProvider>
        <Nav />
        <Mouse />
        <main>{children}</main>
      </AnimationProvider>
    </ScrollProvider>
  );
}
