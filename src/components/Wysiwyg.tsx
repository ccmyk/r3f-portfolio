// src/components/Wysiwyg.tsx
'use client';

import { motion } from 'framer-motion';

type WysiwygProps = {
  content: string;
  className?: string;
};

export function Wysiwyg({ content, className = '' }: WysiwygProps) {
  return (
    <motion.div
      className={`wysi ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}