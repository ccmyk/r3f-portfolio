// src/webgl/TitleWebGL.tsx 
'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect, useMemo } from 'react'
import { Mesh, ShaderMaterial, Vector2 } from 'three'
import { Text } from '@react-three/drei'
import { power4InOut } from '@/lib/easings'

const vertexShader = `
  attribute vec2 uv;
  attribute vec3 position;
  attribute float id;
  attribute vec3 index;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPower;
  uniform float uCols;
  uniform int uLength;
  varying vec2 vUv;
  varying vec2 vUvR;
  varying vec3 vPos;
  varying vec3 vIndex;
  varying float vId;

  void main() {
    vUv = uv;
    vUvR = vec2(gl_VertexID << 1 & 2, gl_VertexID & 2);
    vPos = position;
    vId = id;
    vIndex = index;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;
  uniform sampler2D tMap;
  uniform float uTime;
  uniform vec2 uScreen;
  uniform vec2 uMouse;
  uniform float uPower;
  uniform float uCols;
  uniform float uColor;
  uniform float uStart;
  uniform float uKey;
  uniform float uPowers[32];
  varying vec2 vUv;
  varying vec2 vUvR;
  varying vec3 vPos;
  varying float vId;
  varying vec3 vIndex;

  float ripple(float uv, float time, float prog) {
    float distance = length((uv) + time);
    return tan(distance * prog) * -0.01;
  }

  void main() {
    float time = abs(sin(uTime * 0.002));
    float time2 = sin(uTime * 0.001);
    float time3 = abs(sin(uTime * 0.001));
    float rippleUV = 0.0;
    float cols = uCols;
    float startshit = 0.0;
    float halfv = (vUvR.y - 1.0) * 7.0;
    float halfanim = 0.0;
    vec3 tex = vec3(0.0);
    float sumac = 0.0;
    time3 = abs(sin(uTime * 0.0008));
    time2 = sin(uTime * 0.0008);
    float mPos = 0.0;
    float mPower = 0.0;
    int index = int(vId);

    if (uKey == -2.0) {
      mPower = 1.0 - uStart;
      mPos = (uStart - 1.0) * 1.0;
      startshit = ((halfv * 0.001)) * uStart;
      sumac = ripple(vUvR.y, mPos, cols) * (0.4 * (1.0 - mPower + (1.0 * uPower)));
      rippleUV = vUv.x + startshit + sumac;
      tex = texture2D(tMap, vec2(rippleUV, vUv.y)).rgb;
    } else if (uKey != -1.0) {
      time2 = uMouse.x * -2.0;
      time3 = 0.0;
      halfanim = 1.0;
      mPos = uPowers[index] * -2.0;
      mPower = abs(uPowers[index] * (2.0 - abs(time2 * 0.5)));
      rippleUV = vUv.x + sumac;
      tex = texture2D(tMap, vec2(rippleUV, vUv.y)).rgb;
    } else {
      mPos = uPowers[index] * -2.0;
      mPower = abs(uPowers[index] * (2.0 - abs(time2 * 0.5)));
      sumac = ripple(vUv.y, mPos, cols) * (0.2 * (1.0 - mPower) * (1.0 - mPower));
      rippleUV = vUv.x + sumac;
      tex = texture2D(tMap, vec2(rippleUV, vUv.y)).rgb;
    }

    float signedDist = max(min(tex.r, tex.g), min(max(tex.r, tex.g), tex.b)) - 0.5;
    float d = fwidth(signedDist);
    float alpha = smoothstep(-d, d, signedDist);

    gl_FragColor.rgb = vec3(uColor);
    gl_FragColor.a = alpha * (1.0 - uStart * 1.9);
    if (uKey == -2.0) {
      gl_FragColor.a -= abs(sumac * 8.0);
    } else {
      gl_FragColor.a -= abs(sumac * 8.0);
    }
  }
`

interface TitleProps {
  text: string
  position?: [number, number, number]
}

export function Title({ text, position = [0, 0, 0] }: TitleProps) {
  const meshRef = useRef<Mesh>(null)
  const { gl, camera, size } = useThree()
  const mouse = useRef(new Vector2(0, 0))
  const [chars, setChars] = useState<string[]>([])
  const [isActive, setIsActive] = useState(-1)
  const [lerp, setLerp] = useState(0.6)
  const [currentChar, setCurrentChar] = useState(-2)
  const uniforms = useMemo(
    () => ({
      tMap: { value: null },
      uTime: { value: 0 },
      uScreen: { value: new Vector2(0, 0) },
      uMouse: { value: new Vector2(0, 0) },
      uPower: { value: 0.5 },
      uCols: { value: 0 },
      uColor: { value: 1 },
      uStart: { value: 1 },
      uKey: { value: -2 },
      uPowers: { value: [] },
      uWidth: { value: [] },
      uHeight: { value: [] },
    }),
    []
  )

  useEffect(() => {
    const chars = text.split('')
    setChars(chars)
    uniforms.uCols.value = chars.length
    uniforms.uPowers.value = new Array(chars.length).fill(0.5)
    uniforms.uWidth.value = chars.map(() => 0.1) // Approximate width
    uniforms.uHeight.value = chars.map(() => 0.1) // Approximate height
  }, [text, uniforms])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const bound = gl.domElement.getBoundingClientRect()
      const x = ((e.clientX - bound.left) / bound.width) * 2 - 1
      const y = -((e.clientY - bound.top) / bound.height) * 2 + 1
      mouse.current.set(x, y)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [gl])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const material = meshRef.current.material as ShaderMaterial
    material.uniforms.uTime.value = clock.getElapsedTime()
    material.uniforms.uMouse.value = mouse.current
    // Update powers based on mouse position (similar to calcChars)
    const powers = chars.map((_, i) => {
      const tot = mouse.current.x - (i * 0.1) / chars.length
      return Math.min(Math.max(tot - 0.5, -0.5), 0.5)
    })
    material.uniforms.uPowers.value = powers
  })

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[chars.length * 0.1, 0.1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}
