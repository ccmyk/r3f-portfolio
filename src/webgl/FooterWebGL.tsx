// src/webgl/FooterWebGL.tsx
'use client';

import { useRef, useEffect } from 'react';
import { Text } from '@react-three/drei';
import { motion }s useAnimate;
import { power4InOut } from '@/lib/easings';
import { Mesh, ShaderMaterial } from 'three';

// We reuse the same shader logic from the main hero title for visual consistency.
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D tMap;
  uniform vec3 uColor;
  uniform float uPower;
  varying vec2 vUv;

  void main() {
    vec4 tex = texture2D(tMap, vUv);
    float a = smoothstep(0.5 - uPower, 0.5 + uPower, tex.a);
    gl_FragColor = vec4(uColor, a);
  }
`;

type FooterWebGLProps = {
  text: string;
  isVisible: boolean;
};

export function FooterWebGL({ text, isVisible }: FooterWebGLProps) {
  const meshRef = useRef<Mesh>(null);
  const [scope, animate] = useAnimate();

  const uniforms = {
    tMap: { value: null },
    uColor: { value: new THREE.Color('#000000') },
    uPower: { value: 0.0 },
  };

  useEffect(() => {
    if (isVisible) {
      animate(scope.current, { uPower: 0.5 }, { duration: 1.2, ease: power4InOut, delay: 0.2 });
    }
  }, [isVisible, animate, scope]);

  return (
    <group>
      <Text
        ref={meshRef}
        font="/fonts/PPNeueMontreal-Medium.json"
        fontSize={1}
        letterSpacing={-0.024}
        anchorX="left"
        anchorY="middle"
      >
        {text.toUpperCase()}
        <shaderMaterial
          args={}
          attach="material"
        />
      </Text>
    </group>
  );
}