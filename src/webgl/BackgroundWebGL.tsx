// src/webgl/Background.tsx
'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react'
import { Mesh, ShaderMaterial, Vector2 } from 'three'
import { power2InOut } from '@/lib/easings'

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float progress = fract(uTime * 0.5);
  vec3 color = mix(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0), progress);
  gl_FragColor = vec4(color, 1.0);
}
`

export function BackgroundWebGL({ startTime = 2.6 }: { startTime?: number }) {
  const meshRef = useRef<Mesh>(null)
  const { gl, size } = useThree()
  const [isActive, setIsActive] = useState(false)
  const uniforms = useRef({
    uTime: { value: 0.0 },
    uResolution: { value: new Vector2(size.width, size.height) },
  })

  useEffect(() => {
    const timer = setTimeout(() => setIsActive(true), startTime * 1000)
    uniforms.current.uResolution.value.set(size.width, size.height)
    gl.setSize(size.width, size.height)
    return () => clearTimeout(timer)
  }, [gl, size, startTime])

  useFrame((state) => {
    if (meshRef.current && isActive) {
      const material = meshRef.current.material as ShaderMaterial
      material.uniforms.uTime.value = state.clock.getElapsedTime() - startTime
    }
  })

  if (!isActive) return null

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
      />
    </mesh>
  )
}