// src/components/Nav.tsx
"use client";

import { motion } from 'framer-motion';
import { useAnimations } from '@/providers/AnimationProvider';
import { Animated } from './Animated';
import { power4InOut } from '@/lib/easings';

export function Nav() {
  const { isNavVisible } = useAnimations();

  return (
    // This container's animation matches the simple opacity change in nav_index.js.
    // The real choreography happens inside.
    <motion.nav
      className="nav"
      initial={{ opacity: 0 }}
      animate={{ opacity: isNavVisible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "linear" }} // A simple, fast fade as a container
    >
      <div className="nav_left">
        <a className="nav_logo">
          {/* This component only renders when the nav is cued, just like the event-based system. */}
          {isNavVisible && (
            <Animated
              as="span"
              variant="Awrite"
              text="CHRIS HALL"
              // Timings and easing are taken directly from your anims.js and documentation
              stagger={0.05}
              delay={0.2} // Delay after the nav container appears
              revealDuration={0.3}
              scrambleDuration={0.16}
            />
          )}
        </a>
        {/* The clock would be its own component and would also listen for isNavVisible */}
      </div>
      <div className="nav_right">
        <div className="nav_right_ops">
          {isNavVisible && (
            <Animated
              as="a"
              href="#"
              variant="Awrite-inv"
              text="LET'S TALK"
              className="tt3 Ms" // .Ms class for faster timing, as seen in anims.js
              stagger={0.03}
              delay={0.5}
              revealDuration={0.22} // Faster reveal for hover elements
            />
          )}
        </div>
      </div>
    </motion.nav>
  );
}
