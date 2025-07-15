// src/providers/AnimationProvider.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// This defines the "cues" our animation system will use.
interface AnimationContextType {
  isNavVisible: boolean;
  isHeroVisible: boolean;
  // We will add more cues here later (isProjectsVisible, etc.)
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const AnimationProvider = ({ children }: { children: React.ReactNode }) => {
  const [isNavVisible, setNavVisible] = useState(false);
  const [isHeroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    // This sequence REPLACES the old setTimeout-based master timeline.
    // We are disabling the loader for now by using short delays.

    // Cue 1: Show the Nav. (Matches the 2600ms mark in your docs)
    const navTimer = setTimeout(() => {
      setNavVisible(true);
    }, 200); // Using a short delay for testing

    // Cue 2: Show the Hero section. (Matches the 3000ms mark in your docs)
    const heroTimer = setTimeout(() => {
      setHeroVisible(true);
    }, 500); // A slightly longer delay

    return () => {
      clearTimeout(navTimer);
      clearTimeout(heroTimer);
    };
  }, []);

  const value = { isNavVisible, isHeroVisible };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimations = (): AnimationContextType => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimations must be used within an AnimationProvider');
  }
  return context;
};
