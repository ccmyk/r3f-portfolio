// src/webgl/components/Background.gl.tsx
'use client'

import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'
import { shaderMaterial, Plane } from '@react-three/drei'
import { motion, useMotionValue, useTransform } from 'framer-motion'

// Shaders from the original /gl🌊🌊🌊/🏜️/ directory
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`
const fragmentShader = `
  uniform float uTime;
  uniform float uProgress; // Replaces the complex GSAP timeline from the original
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Simplified noise for the transition effect
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 U = vUv;
    U.y = 1. - U.y;
    vec3 color = vec3(0.05); // The dark background color
    
    // The transition effect, controlled by scroll progress
    float transition = smoothstep(0.0, 1.0, uProgress);
    float noiseEffect = mix(0.0, noise(U * 2.0), transition);
    
    gl_FragColor = vec4(color, transition - noiseEffect * 0.2);
  }
`

const BackgroundMaterial = shaderMaterial(
  {
    uTime: 0,
    uProgress: 0,
    uResolution: new THREE.Vector2(),
  },
  vertexShader,
  fragmentShader
)

extend({ BackgroundMaterial })

export function BackgroundGL() {
  const materialRef = useRef<any>()

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime += delta
      materialRef.current.uResolution.set(state.size.width, state.size.height)
    }
  })

  // Here you could pass in scroll progress to the uProgress uniform
  // For now, it will just be a static dark background.
  return (
    <Plane args={[2, 2]}>
      {/* @ts-ignore */}
      <backgroundMaterial ref={materialRef} transparent blending={THREE.AdditiveBlending} />
    </Plane>
  )
}