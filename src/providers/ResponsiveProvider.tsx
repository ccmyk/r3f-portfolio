// src/providers/ResponsiveProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ResponsiveContextProps {
  isDesktop: boolean;
  isTouch: boolean;
}

const ResponsiveContext = createContext<ResponsiveContextProps | undefined>(undefined);

export const ResponsiveProvider = ({ children }: { children: ReactNode }) => {
  const = useState(true);
  const = useState(false);

  useEffect(() => {
    const updateResponsiveState = () => {
      const isTouchDevice = 'ontouchstart' in window |

| navigator.maxTouchPoints > 0;
      const isDesktopDevice = window.innerWidth > 1024; // A common breakpoint for desktop

      setIsTouch(isTouchDevice);
      setIsDesktop(isDesktopDevice);

      document.documentElement.classList.toggle('T', isTouchDevice);
      document.documentElement.classList.toggle('D',!isTouchDevice);

      // Replicating the original's dynamic CSS variable injection from constructor🫀.js
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);

      // These multipliers are for fluid typography and layout scaling
      const multiL = window.innerWidth / 2560; // Landscape multiplier
      const multiP = window.innerWidth / 750;  // Portrait multiplier
      document.documentElement.style.setProperty('--ck_multiL', `${multiL}`);
      document.documentElement.style.setProperty('--ck_multiP', `${multiP}`);
    };

    updateResponsiveState();
    window.addEventListener('resize', updateResponsiveState);

    return () => {
      window.removeEventListener('resize', updateResponsiveState);
    };
  },);

  const value = { isDesktop, isTouch };

  return (
    <ResponsiveContext.Provider value={value}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export const useResponsive = () => {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error('useResponsive must be used within a ResponsiveProvider');
  }
  return context;
};