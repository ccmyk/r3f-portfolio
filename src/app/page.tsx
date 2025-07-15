// src/app/page.tsx
"use client";

// We are not importing anything else for this test.
// We are only testing the Nav component's animation.

export default function HomePage() {
  return (
    <main style={{
      // An empty page to provide a clean testing environment
      height: '200vh',
      background: '#050505',
    }}>
      {/* The <Nav /> component is rendered inside src/app/ClientLayout.tsx.
        It will automatically appear and animate based on the cues from AnimationProvider.
        We don't need to do anything else on this page to test it.
      */}
    </main>
  );
}
