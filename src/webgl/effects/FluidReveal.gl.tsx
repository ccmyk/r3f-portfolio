// src/features/loader/fluid-reveal-effect.tsx
'use client'

import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import { useAnimate } from 'framer-motion'

// 🩻main.glsl from /⌛️/
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

// 🧪main.glsl from /⌛️/
const fragmentShader = `
  uniform float uTime;
  uniform float uStart0;
  uniform float uStart1;
  uniform float uStart2;
  uniform float uStartX;
  uniform float uStartY;
  uniform float uMultiX;
  uniform float uMultiY;
  uniform vec2 uResolution;
  varying vec2 vUv;

  void main() {
    vec2 U = vUv;
    U.y = 1. - U.y;
    vec2 V = U;
    V -=.5;
    V.x *= uResolution.x / uResolution.y;
    float t = uTime *.001;
    vec3 col = vec3(0.);
    float s = sin(t *.5) *.5 +.5;
    float c = cos(t *.5) *.5 +.5;
    V.x += uStartX + (s * uMultiX);
    V.y += uStartY + (c * uMultiY);
    float r = length(V) * 2.;
    float a = atan(V.y, V.x);
    float f = cos(a * 3.) *.5 +.5;
    f += smoothstep(.2,.25, r);
    f *= 1. - smoothstep(.4,.45, r);
    f *= uStart0;
    f *= smoothstep(uStart1, uStart1 +.1, r);
    f *= 1. - smoothstep(uStart2, uStart2 +.1, r);
    col = vec3(f);
    gl_FragColor = vec4(col, 1.0);
  }
`

const FluidRevealMaterial = shaderMaterial(
  {
    uTime: 0,
    uStart0: 0, uStart1: 0, uStart2: 1, // Start with the effect invisible
    uStartX: 0, uStartY: 0.1, uMultiX: -0.4, uMultiY: 0.45,
    uResolution: new THREE.Vector2(),
  },
  vertexShader,
  fragmentShader
)

extend({ FluidRevealMaterial })

export function FluidRevealEffect({ onTransitionComplete }: { onTransitionComplete: () => void }) {
  const materialRef = useRef<any>()
  const [scope, animate] = useAnimate()

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime += delta * 1000
      materialRef.current.uResolution.set(state.size.width, state.size.height)
    }
  })

  useEffect(() => {
    const sequence = async () => {
      if (materialRef.current) {
        // Animate the effect IN
        await animate(materialRef.current.uniforms.uStart0, 1, { duration: 0.8, ease: 'circOut' })
        // Animate the effect OUT by "wiping" it
        await animate(materialRef.current.uniforms.uStart1, 1, { duration: 1.2, ease: 'circInOut' })
        onTransitionComplete()
      }
    }
    sequence()
  },)

  return (
    <mesh ref={scope}>
      <planeGeometry args={[2, 2]} />
      {/* @ts-ignore */}
      <fluidRevealMaterial ref={materialRef} transparent blending={THREE.AdditiveBlending} />
    </mesh>
  )
}