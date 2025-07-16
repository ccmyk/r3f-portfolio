// src/webgl/MainCanvas.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { View } from '@react-three/drei';

export function MainCanvas() {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none', // The canvas itself should not be interactive
        zIndex: 10, // Positioned above the background but below main UI
      }}
      eventSource={document.getElementById('root')!} // Connect events to the main app body
    >
      <View.Port />
    </Canvas>
  );
}