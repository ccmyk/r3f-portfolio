// src/webgl/components/FooterText.gl.tsx
'use client'

import * as THREE from 'three'
import { useRef } from 'react'
import { useFrame, extend, useLoader } from '@react-three/fiber'
import { shaderMaterial, Text } from '@react-three/drei'
import { EffectComposer, ShaderPass } from '@react-three/postprocessing'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Shader from the original /gl🌊🌊🌊/🔥/🧪parent.glsl
const postFragmentShader = `
  uniform float uTime;
  uniform float uMouse; // Will control the hover effect
  uniform sampler2D tDiffuse;
  varying vec2 vUv;

  void main() {
    vec4 tex = texture2D(tDiffuse, vUv);
    
    float a = atan(vUv.y - 0.5, vUv.x - 0.5);
    float d = length(vUv - 0.5);

    vec2 U = vUv;
    U.x += sin(d * 10.0 + uTime) * 0.02 * uMouse;

    tex = texture2D(tDiffuse, U);

    gl_FragColor = tex;
  }
`

const PostMaterial = shaderMaterial(
  {
    tDiffuse: null,
    uTime: 0,
    uMouse: 0,
  },
  `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 1.0); }`,
  postFragmentShader
)

extend({ PostMaterial })

export function FooterTextGL() {
  const mouseX = useMotionValue(0.5)
  const springX = useSpring(mouseX, { stiffness: 400, damping: 50 })
  const materialRef = useRef<any>()

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <>
      <Text
        font="/fonts/PPNeueMontreal-Medium.woff2"
        fontSize={14} // This should be dynamically sized based on viewport
        letterSpacing={-0.022}
        color="black"
        onPointerMove={(e) => mouseX.set(e.uv.x)}
        onPointerOut={() => mouseX.set(0.5)}
      >
        Get in touch
      </Text>

      <EffectComposer>
        {/* @ts-ignore */}
        <shaderPass args={[PostMaterial]} ref={materialRef} uMouse={springX} />
      </EffectComposer>
    </>
  )
}