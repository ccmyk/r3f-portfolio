'use client'

import * as THREE from 'three'
import { useRef, useState } from 'react'
import { useLoader, useFrame, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import { motion } from 'framer-motion-3d'

// 🩻main.glsl - Vertex Shader from gl_directory.txt
const vertexShader = `
  uniform float uTime;
  uniform float uStart;
  uniform vec2 uMouse;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.z += sin(pos.x * 10.0 + uTime * 2.0) * (uMouse.x * 0.1);
    pos.z += cos(pos.y * 10.0 + uTime * 2.0) * (uMouse.y * 0.1);
    pos.z *= uStart;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

// 🧪main.glsl - Fragment Shader from gl_directory.txt
const fragmentShader = `
  uniform sampler2D tMap;
  uniform float uStart1;
  uniform float uTime;
  varying vec2 vUv;

  vec2 coverTexture(vec2 tsize, vec2 vUv, vec2 mouse) {
    vec2 tUv = vUv;
    vec2 tPos = (tUv -.5);
    tPos.x *= tsize.x / tsize.y;
    return tPos +.5;
  }

  void main() {
    vec2 mouse = vec2(0.);
    vec2 cover = coverTexture(vec2(1., 1.), vUv, mouse);
    vec4 final = texture2D(tMap, cover);
    gl_FragColor = final;
  }
`

// Create a reusable shader material with drei's helper
const DistortionMaterial = shaderMaterial(
  // Uniforms
  {
    uTime: 0,
    uStart: 0, // Corresponds to the animation start
    uMouse: new THREE.Vector2(0, 0),
    tMap: new THREE.Texture(),
  },
  vertexShader,
  fragmentShader
)

// Make it available as a JSX component
extend({ DistortionMaterial })

export function DistortedImagePlane({ imageUrl }: { imageUrl: string }) {
  const materialRef = useRef<any>()
  const texture = useLoader(THREE.TextureLoader, imageUrl)
  const [hovered, setHovered] = useState(false)

  // This hook runs on every frame
  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime += delta
      // Lerp mouse position for smooth effect
      materialRef.current.uMouse.lerp(state.pointer, 0.05)
    }
  })

  return (
    <motion.mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      animate={{ scale: hovered? 1.05 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <planeGeometry args={[2.2, 1.5]} />
      {/* @ts-ignore */}
      <distortionMaterial ref={materialRef} tMap={texture} />
    </motion.mesh>
  )
}