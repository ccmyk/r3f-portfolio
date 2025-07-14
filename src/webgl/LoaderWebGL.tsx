// src/webgl/Loader.tsx'
'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { Mesh, ShaderMaterial, Vector2, PerspectiveCamera } from 'three'
import { animate } from 'framer-motion'
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
uniform float uStart0;
uniform vec2 uResolution;
varying vec2 vUv;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float time = uTime * 0.1;
  float r = sin(uv.x * 10.0 + time) * uStart0;
  vec3 color = vec3(r, r, r);
  gl_FragColor = vec4(color, 1.0);
}
`

export function LoaderWebGL({ onComplete }: { onComplete?: () => void }) {
  const meshRef = useRef<Mesh>(null)
  const { gl, camera, size } = useThree()
  const uniforms = useRef({
    uTime: { value: 0.0 },
    uStart0: { value: 0.0 },
    uResolution: { value: new Vector2(size.width, size.height) },
  })

  useEffect(() => {
    uniforms.current.uResolution.value.set(size.width, size.height)
    const perspectiveCamera = camera as PerspectiveCamera
    perspectiveCamera.fov = 45
    perspectiveCamera.aspect = size.width / size.height
    perspectiveCamera.position.set(0, 0, 7)
    perspectiveCamera.updateProjectionMatrix()
    gl.setSize(size.width, size.height)

    const controls = animate(uniforms.current.uStart0, { value: 1 }, {
      duration: 2.6,
      ease: power2InOut,
      onComplete,
    })

    return () => controls.stop()
  }, [gl, camera, size, onComplete])

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as ShaderMaterial
      material.uniforms.uTime.value = state.clock.getElapsedTime()
    }
  })

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