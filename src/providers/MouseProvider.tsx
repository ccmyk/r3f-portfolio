// src/providers/MouseProvider.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MouseContextProps {
  mousePosition: { x: number; y: number };
}

const MouseContext = createContext<MouseContextProps | undefined>(undefined);

export const MouseProvider = ({ children }: { children: ReactNode }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  },);

  return (
    <MouseContext.Provider value={{ mousePosition }}>
      {children}
    </MouseContext.Provider>
  );
};

export const useMouse = () => {
  const context = useContext(MouseContext);
  if (!context) {
    throw new Error('useMouse must be used within a MouseProvider');
  }
  return context;
};