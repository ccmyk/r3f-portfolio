// src/app/ClientLayout.tsx
"use client"

import { Nav } from '@/components/Nav';
import { Mouse } from '@/components/Mouse';
import { ScrollProvider } from '@/providers/ScrollProvider';

// This component wraps your main page content with client-side providers and components.
export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    // The ScrollProvider now correctly wraps the children within a client component.
    <ScrollProvider>
      <Nav />
      <Mouse />
      <main>{children}</main>
    </ScrollProvider>
  );
}

