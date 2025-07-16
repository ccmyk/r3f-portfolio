// src/components/HeroTitle.tsx
'use client';

import { useState }from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export function HeroTitle({ text, webglRef }) {
  // 1. State: The component's "memory". Does it think it's active?
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div
      className="Atitle"
      // 2. Declarative Trigger: When this component scrolls into view...
      onViewportEnter={() => setIsActive(true)}
      //...and only do it once.
      viewport={{ once: true, amount: 0.5 }}
    >
      <div ref={webglRef} className="cCover" />

      {/* 3. Declarative Rendering: The className is a direct RESULT of the state. */}
      <div className={clsx('ttj', 'Oiel', isActive && 'act')}>
        {text}
      </div>
    </motion.div>
  );
}