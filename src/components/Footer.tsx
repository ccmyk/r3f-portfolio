// src/components/Footer.tsx
'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { View } from '@react-three/drei';
import { Animated } from './Animated';
import { FooterWebGL } from '@/webgl/FooterWebGL';

export function Footer() {
  const footerTitleRef = useRef<HTMLDivElement>(null);

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="footer_cm">
        <div className="Atitle">
          <div ref={footerTitleRef} className="cCover" />
          <h2 className="ttj Oiel act">Let's talk</h2>
          <View track={footerTitleRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <FooterWebGL text="Let's talk" isVisible={true} />
          </View>
        </div>
      </div>
      <div className="cnt c-vw">
        <div className="cnt_lk">
          <Animated as="a" href="#" className="cnt_lk_el" variant="Awrite" text="LINKEDIN" isVisible={true} delay={0.4} />
          <Animated as="a" href="#" className="cnt_lk_el" variant="Awrite" text="INSTAGRAM" isVisible={true} delay={0.5} />
          <Animated as="a" href="#" className="cnt_lk_el" variant="Awrite" text="READ.CV" isVisible={true} delay={0.6} />
          <Animated as="a" href="#" className="cnt_lk_el" variant="Awrite" text="ARE.NA" isVisible={true} delay={0.7} />
        </div>
        <div className="cnt_cr">
          <div className="cnt_cr_el">
            <Animated as="span" variant="Awrite" text="CREDITS" isVisible={true} delay={0.8} />
          </div>
          <div className="cnt_cr_el">
            <Animated as="span" variant="Awrite" text="DESIGNED BY EVA SANCHEZ" isVisible={true} delay={0.9} />
            <Animated as="span" variant="Awrite" text="DEVELOPED BY CHRIS HALL" isVisible={true} delay={1.0} />
          </div>
        </div>
        <div className="cnt_cp">
          <Animated as="span" variant="Awrite" text="©2025" isVisible={true} delay={1.1} />
        </div>
      </div>
    </motion.footer>
  );
}