// src/components/Nav.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAnimation } from '@/providers/AnimationProvider';
import { Animated } from './Animated';

export function Nav() {
  const { state } = useAnimation();
  const isNavVisible = state === 'CONTENT_VISIBLE' |

| state === 'IDLE';
  const = useState({ h: '00', m: '00', a: 'AM' });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours? hours : 12; // the hour '0' should be '12'

      setTime({
        h: String(hours).padStart(2, '0'),
        m: String(minutes).padStart(2, '0'),
        a: ampm,
      });
    };

    updateClock();
    const timerId = setInterval(updateClock, 60000); // Update every minute
    return () => clearInterval(timerId);
  },);

  return (
    <motion.nav
      className="nav"
      initial={{ opacity: 0 }}
      animate={{ opacity: isNavVisible? 1 : 0 }}
      transition={{ duration: 0.5, ease: 'linear' }}
    >
      <div className="nav_top c-vw">
        <div className="nav_left">
          <Link href="/" className="nav_logo">
            <Animated as="span" variant="Awrite" text="EVA SANCHEZ" isVisible={isNavVisible} />
          </Link>
          <div className="sep"></div>
          <div className="nav_clock">
            <div className="nav_clock_p">
              <Animated as="span" variant="Awrite" text="_BCN" isVisible={isNavVisible} delay={0.1} />
            </div>
            <div className="nav_clock_h">
              <Animated as="span" variant="Awrite" text={time.h} isVisible={isNavVisible} delay={0.2} />
            </div>
            <div className="nav_clock_s">:</div>
            <div className="nav_clock_m">
              <Animated as="span" variant="Awrite" text={time.m} isVisible={isNavVisible} delay={0.3} />
            </div>
            <div className="nav_clock_a">
              <Animated as="span" variant="Awrite" text={time.a} isVisible={isNavVisible} delay={0.4} />
            </div>
          </div>
        </div>
        <div className="nav_right">
          <div className="nav_right_ops">
            <Link href="/index">
              <Animated as="span" variant="Awrite" text="INDEX" isVisible={isNavVisible} delay={0.5} />
            </Link>
            <Link href="/about">
              <Animated as="span" variant="Awrite" text="ABOUT" isVisible={isNavVisible} delay={0.6} />
            </Link>
            <Link href="/playground">
              <Animated as="span" variant="Awrite" text="PLAYGROUND" isVisible={isNavVisible} delay={0.7} />
            </Link>
          </div>
          <a href="mailto:chris@chrishall.io">
            <Animated as="span" variant="Awrite-inv" text="LET'S TALK" isVisible={isNavVisible} delay={0.9} />
          </a>
        </div>
      </div>
    </motion.nav>
  );
}