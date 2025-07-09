// src/webgl/components/InteractiveText.gl.tsx
'use client'

import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { useFrame, extend, useLoader } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import { motion } from 'framer-motion-3d'
import { power4InOut } from '@/lib/easings'

// 🩻msdf.glsl from /💬/
const vertexShader = `
  attribute vec2 uv;
  attribute vec3 position;
  attribute float index;
  
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uPower;
  uniform float uStart;
  
  varying vec2 vUv;
  varying float vIndex;

  void main() {
    vUv = uv;
    vIndex = index;
    
    vec3 pos = position;
    pos.y += sin(uTime * 0.5 + index * 0.5) * uPower * 0.1;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

// 🧪msdf.glsl from /💬/
const fragmentShader = `
  uniform sampler2D tMap;
  uniform float uStart;
  uniform vec3 uColor;
  varying vec2 vUv;

  float median(float r, float g, float b) {
    return max(min(r, g), min(max(r, g), b));
  }

  void main() {
    vec3 tex = texture2D(tMap, vUv).rgb;
    float signedDist = median(tex.r, tex.g, tex.b) - 0.5;
    float d = fwidth(signedDist);
    float alpha = smoothstep(-d, d, signedDist);
    
    if (alpha < 0.01) discard;
    
    gl_FragColor.rgba = vec4(uColor, alpha * (1.0 - uStart));
  }
`

// Create the shader material
const MSDFTextMaterial = shaderMaterial(
  {
    uTime: 0,
    uPower: 0.0,
    uStart: 1.0, // Start at 1 (invisible) and animate to 0 (visible)
    uColor: new THREE.Color('#050505'),
    tMap: new THREE.Texture(),
  },
  vertexShader,
  fragmentShader
)

extend({ MSDFTextMaterial })

// Main Component
export function InteractiveTextWebGL({ text, size = 1, ...props }: { text: string; size?: number; [key: string]: any }) {
  const materialRef = useRef<any>()
  const font = useLoader(THREE.FileLoader, '/fonts/PPNeueMontreal-Medium.json')
  const texture = useLoader(THREE.TextureLoader, '/fonts/PPNeueMontreal-Medium.png')
  const fontData = JSON.parse(font as string)

  // Generate the geometry for the text
  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions: number[] = []
    const uvs: number[] = []
    const indices: number[] = []
    let x = 0

    for (let i = 0; i < text.length; i++) {
      const char = text[i]
      const charData = fontData.chars.find((c) => c.char === char)
      if (!charData) continue

      const s = size / fontData.info.size
      const w = charData.width * s
      const h = charData.height * s
      const xoffset = charData.xoffset * s
      const yoffset = charData.yoffset * s

      // Add vertices for a quad
      positions.push(x + xoffset, -yoffset, 0)
      positions.push(x + xoffset + w, -yoffset, 0)
      positions.push(x + xoffset, -yoffset - h, 0)
      positions.push(x + xoffset + w, -yoffset - h, 0)

      // Add UVs
      const u = charData.x / fontData.common.scaleW
      const v = 1 - charData.y / fontData.common.scaleH
      const uw = charData.width / fontData.common.scaleW
      const vh = charData.height / fontData.common.scaleH
      uvs.push(u, v, u + uw, v, u, v - vh, u + uw, v - vh)

      // Add indices
      const j = i * 4
      indices.push(j, j + 2, j + 1, j + 1, j + 2, j + 3)

      x += charData.xadvance * s
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
    geometry.setIndex(indices)
    geometry.center()

    return geometry
  }, [text, size, fontData])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime
      // Lerp mouse position for smooth effect
      materialRef.current.uPower = THREE.MathUtils.lerp(
        materialRef.current.uPower,
        state.pointer.length() * 2, // Power of effect based on mouse distance from center
        0.1
      )
    }
  })

  return (
    <motion.mesh geometry={geometry} {...props}>
      {/* @ts-ignore */}
      <mSDFTextMaterial
        ref={materialRef}
        tMap={texture}
        transparent
        side={THREE.DoubleSide}
        animate={{ uStart: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: power4InOut as any }}
      />
    </motion.mesh>
  )
}