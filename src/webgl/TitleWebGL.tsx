// src/webgl/TitleWebGL.tsx
'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Mesh, ShaderMaterial } from 'three';
import { motion }s useAnimate;
import { power4InOut } from '@/lib/easings';

// Custom shader to add the interactive "power" effect
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

type TitleWebGLProps = {
  text: string;
  isVisible: boolean;
};

export function TitleWebGL({ text, isVisible }: TitleWebGLProps) {
  const meshRef = useRef<Mesh>(null);
  const [scope, animate] = useAnimate();

  const uniforms = {
    tMap: { value: null },
    uColor: { value: new THREE.Color('#000000') },
    uPower: { value: 0.0 },
  };

  useEffect(() => {
    if (isVisible) {
      // Entrance animation for the text shader
      animate(scope.current, { uPower: 0.5 }, { duration: 2, ease: power4InOut, delay: 0.8 });
    }
  }, [isVisible, animate, scope]);

  useFrame(() => {
    if (meshRef.current) {
      const material = meshRef.current.material as ShaderMaterial;
      // This is where mouse interaction logic would go to update uniforms
    }
  });

  return (
    <group>
      <Text
        ref={meshRef}
        font="/fonts/PPNeueMontreal-Medium.json"
        fontSize={1}
        letterSpacing={-0.024}
        anchorX="center"
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