// src/webgl/Media.tsx
'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { ShaderMaterial, Vector2, Color } from 'three';

// Translated directly from the original project's 🩻main.glsl
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Translated directly from the original project's 🧪main.glsl
const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uMap;
  uniform vec2 uTextureSize;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uHover;
  uniform vec2 uCover;

  // Simplex noise function from the original shader for the fractal effect
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y)? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 ratio = vec2(
        min((uCover.x / uCover.y) / (uTextureSize.x / uTextureSize.y), 1.0),
        min((uCover.y / uCover.x) / (uTextureSize.y / uTextureS.y), 1.0)
    );
    vec2 uv = vec2(
        vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
        vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    float uL = length(uMouse) * uHover;
    float uA = atan(uMouse.x, uMouse.y);

    vec2 p = uv -.5;
    p.x *= uCover.x/uCover.y;

    float a = (atan(p.y,p.x) + uA);
    float r = length(p);
    float ns = snoise(vec2(p.x*14., p.y*14.) + uTime*.1);
    float f = fract(r*4. - uTime*.2 + ns*.2);
    float val = smoothstep(0.,.1,f) * smoothstep(.4,.3,f);
    
    vec4 color = texture2D(uMap, uv);
    color.rgb += val * uL * 2.;
    gl_FragColor = color;
  }
`;

type MediaProps = {
  url: string;
  isHovered: boolean;
};

export function Media({ url, isHovered }: MediaProps) {
  const materialRef = useRef<ShaderMaterial>(null);
  const texture = useTexture(url);
  const { size } = useThree(); // viewport size

  const uniforms = useMemo(
    () => ({
      uMap: { value: texture },
      uTime: { value: 0 },
      uMouse: { value: new Vector2(0.5, 0.5) },
      uHover: { value: 0.0 },
      uTextureSize: { value: new Vector2(texture.image.width, texture.image.height) },
      uCover: { value: new Vector2(size.width, size.height) },
    }),
    [texture, size]
  );

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      // Animate hover state for smooth transitions
      materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHover.value,
        isHovered? 1 : 0,
        0.1
      );
    }
  });

  return (
    <mesh>
      <planeGeometry args={} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}