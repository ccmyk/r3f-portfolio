// src/components/Background.tsx
'use client';

import { motion } from 'framer-motion';
import { useAnimation } from '@/providers/AnimationProvider';
import { power2InOut } from '@/lib/easings';

export function Background() {
  const { state } = useAnimation();
  const isVisible = state === 'CONTENT_VISIBLE' |

| state === 'IDLE';

  return (
    <motion.div
      className="Mbg"
      initial={{ maxHeight: '0vh' }}
      animate={{ maxHeight: isVisible? '100vh' : '0vh' }}
      transition={{ duration: 2, ease: power2InOut }}
    >
      {/* Create 13 columns for the grid, matching the original design */}
      {Array.from({ length: 13 }).map((_, i) => (
        <div key={i} className="Mbg_col">
          <div className="Mbg_col_el Mbg_col_el-1"></div>
          <div className="Mbg_col_el Mbg_col_el-2"></div>
        </div>
      ))}
    </motion.div>
  );
}