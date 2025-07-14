// src/app/animated-test/page.tsx
"use client";

import { Animated } from "@/components/Animated";

export default function AnimatedTestPage() {
  return (
    <main style={{
      padding: '5rem',
      background: '#050505',
      color: '#F8F6F2',
      minHeight: '200vh' // Make page scrollable to test scroll-in animations
    }}>
      
      <div style={{ marginBottom: '8rem' }}>
        <h2 style={{ fontSize: '1rem', color: '#8a8a8a', marginBottom: '1rem' }}>
          Test 1: 'Awrite' variant (character scramble)
        </h2>
        
        <Animated
          as="h1"
          variant="Awrite"
          text="Interactive Designer"
          className="tt1" // Use a class from your typography system
        />
      </div>

      <div style={{ marginBottom: '8rem', display: 'inline-block' }}>
        <h2 style={{ fontSize: '1rem', color: '#8a8a8a', marginBottom: '1rem' }}>
          Test 2: 'Awrite-inv' variant (inverted style)
        </h2>
        
        <Animated
          as="a" // Renders as an anchor tag
          href="#"
          variant="Awrite-inv"
          text="Let's Talk"
          className="tt3" // Use a class from your typography system
        />
      </div>

      <div style={{ marginBottom: '8rem' }}>
        <h2 style={{ fontSize: '1rem', color: '#8a8a8a', marginBottom: '1rem' }}>
          Test 3: 'Aline' variant (line-by-line reveal)
        </h2>
        
        <Animated
          as="p"
          variant="Aline"
          // Use a template literal with `\n` to create line breaks
          text={"This is the first animated line.\nAnd this is the second."}
          className="tt3"
          lineStagger={0.15} // You can override default timings
        />
      </div>

      <div style={{ marginTop: '50vh', marginBottom: '8rem' }}>
         <h2 style={{ fontSize: '1rem', color: '#8a8a8a', marginBottom: '1rem' }}>
          Test 4: Scroll-triggered animation
        </h2>
        <Animated
          as="h2"
          variant="Awrite"
          text="[SCROLL TO EXPLORE]"
          className="tt3"
        />
      </div>

    </main>
  );
}
