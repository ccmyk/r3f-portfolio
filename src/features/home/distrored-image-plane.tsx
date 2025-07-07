'use client'

import * as THREE from 'three'
import { useRef } from 'react'
import { useLoader, useFrame, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

// Define the GLSL shaders inline.
// This is a simple shader that creates a wavy distortion effect.
const vertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.z += sin(pos.x * 10.0 + uTime) * 0.05;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uHover;
  varying vec2 vUv;
  void main() {
    vec2 uv = vUv;
    vec4 textureColor = texture2D(uTexture, uv);
    gl_FragColor = textureColor;
  }
`

// Create a reusable shader material with drei's helper
const DistortionMaterial = shaderMaterial(
  // Uniforms
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
  },
  // Vertex Shader
  vertexShader,
  // Fragment Shader
  fragmentShader
)

// Make it available as a JSX component
extend({ DistortionMaterial })

export function DistortedImagePlane({ imageUrl }: { imageUrl: string }) {
  const materialRef = useRef<any>()
  const texture = useLoader(THREE.TextureLoader, imageUrl)

  // This hook runs on every frame
  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime += delta * 0.5
    }
  })

  return (
    <mesh>
      <planeGeometry args={[2, 1.4]} />
      {/* @ts-ignore */}
      <distortionMaterial ref={materialRef} uTexture={texture} />
    </mesh>
  )
}