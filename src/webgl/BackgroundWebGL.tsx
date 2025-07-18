// src/webgl/BackgroundWebGL.tsx
'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { motion, useAnimate } from 'framer-motion';
import { Mesh, ShaderMaterial, Vector2 } from 'three';
import { power2InOut } from '@/lib/easings';

// The vertex and fragment shaders are identical to the LoaderScene
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

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

export function BackgroundWebGL() {
  const meshRef = useRef<Mesh>(null);
  const { gl, size } = useThree();
  const [scope, animate] = useAnimate();

  const uniforms = useRef({
    uStart0: { value: 0.0 },
    uStart1: { value: 0.5 },
    uStart2: { value: 1.0 },
    uStartX: { value: 0.0 },
    uStartY: { value: 0.1 },
    uMultiX: { value: 0.0 },
    uMultiY: { value: 0.45 },
    uResolution: { value: new Vector2(size.width, size.height) },
  });

  useEffect(() => {
    // Replicates the GSAP timeline from /🏜️/base.js
    animate(uniforms.current.uStart0, , { duration: 0.6, ease: power2InOut });
    animate(uniforms.current.uStartX, [0, -0.1], { duration: 2, ease: power2InOut });
    animate(uniforms.current.uMultiX, [-0.4, 0.1], { duration: 2, ease: power2InOut });
    animate(uniforms.current.uStartY, [0.1, 0.95], { duration: 2, ease: power2InOut });
    animate(uniforms.current.uMultiY, [0.45, 0.3], { duration: 2, ease: power2InOut });
    animate(uniforms.current.uStart2, , { duration: 1, ease: power2InOut, delay: 0.6 });
  }, [animate]);

  useFrame(() => {
    uniforms.current.uResolution.value.set(gl.drawingBufferWidth, gl.drawingBufferHeight);
  });

  return (
    <motion.mesh ref={scope}>
      <planeGeometry args={} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
      />
    </motion.mesh>
  );
}