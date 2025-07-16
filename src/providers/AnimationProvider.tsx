// src/providers/AnimationProvider.tsx
'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';

type AnimationState = 'LOADING' | 'LOADER_EXITING' | 'CONTENT_VISIBLE' | 'IDLE';
type Action = { type: 'LOADER_EXIT_COMPLETE' } | { type: 'SET_IDLE' };

interface AnimationContextProps {
  state: AnimationState;
  dispatch: React.Dispatch<Action>;
}

const AnimationContext = createContext<AnimationContextProps | undefined>(undefined);

const animationReducer = (state: AnimationState, action: Action): AnimationState => {
  switch (action.type) {
    case 'LOADER_EXIT_COMPLETE':
      return 'CONTENT_VISIBLE';
    case 'SET_IDLE':
      return 'IDLE';
    default:
      return state;
  }
};

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(animationReducer, 'LOADING');

  return (
    <AnimationContext.Provider value={{ state, dispatch }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};