// src/webgl/LoaderScene.tsx
'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Mesh, ShaderMaterial, Vector2 } from 'three';
import { animate } from 'framer-motion';
import { power2InOut, power4InOut } from '@/lib/easings';

// Translated from /gl🌊🌊🌊/⌛️/🩻main.glsl (Vertex Shader)
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// Translated from /gl🌊🌊🌊/⌛️/🧪main.glsl (Fragment Shader)
const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform float uStart0;
  uniform float uStart1;
  uniform float uStart2;
  uniform float uStartX;
  uniform float uStartY;
  uniform float uMultiX;
  uniform float uMultiY;
  uniform vec2 uResolution;

  vec3 p(vec3 x,vec3 a,vec3 b,vec3 c,vec3 d){
    return a+b*cos(6.28318*(c*x+d));
  }

  void main() {
    vec2 uv = gl_FragCoord.xy/uResolution.xy;
    float u = 1. - uv.y;
    float f = uStart0;
    float s = uStart1;
    float t = uStart2;
    float x = uStartX;
    float y = uStartY;
    float mx = uMultiX;
    float my = uMultiY;
    float r = p(vec3(u),vec3(f),vec3(s),vec3(t),vec3(x,y,0.)).x;
    float g = p(vec3(u),vec3(f),vec3(s),vec3(t),vec3(x,y,0.)).y;
    float b = p(vec3(u),vec3(f),vec3(s),vec3(t),vec3(x,y,0.)).z;
    vec3 color = vec3(r,g,b);
    gl_FragColor = vec4(color,1.);
  }
`;

export function LoaderScene({ onComplete }: { onComplete: () => void }) {
  const meshRef = useRef<Mesh>(null);
  const { gl, size } = useThree();

  const uniforms = useRef({
    uStart0: { value: 1.0 },
    uStart1: { value: 0.5 },
    uStart2: { value: 1.0 },
    uStartX: { value: 0.0 },
    uStartY: { value: 0.1 },
    uMultiX: { value: -0.4 },
    uMultiY: { value: 0.45 },
    uResolution: { value: new Vector2(size.width, size.height) },
  });

  useEffect(() => {
    // Replicates the GSAP timeline from /⌛️/base.js
    animate(uniforms.current.uStart0, { value: 0 }, { duration: 1.0, ease: power4InOut });
    animate(uniforms.current.uStart1, { value: 1 }, { duration: 2.0, ease: power2InOut });
    animate(uniforms.current.uStart2, { value: 0 }, { duration: 2.6, ease: power4InOut, onComplete });
  }, [onComplete]);

  useFrame(() => {
    // Ensure resolution is up-to-date
    uniforms.current.uResolution.value.set(gl.drawingBufferWidth, gl.drawingBufferHeight);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
      />
    </mesh>
  );
}