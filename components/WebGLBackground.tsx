import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'motion/react';

const vertexShader = `
  uniform float uTime;
  uniform float uDistort;
  
  varying vec2 vUv;
  
  // Simplex 3D Noise 
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vUv = uv;
    
    vec3 pos = position;
    float noiseFreq = 1.5;
    float noiseAmp = 0.4;
    vec3 noisePos = vec3(pos.x * noiseFreq + uTime * 0.5, pos.y * noiseFreq + uTime * 0.5, pos.z * noiseFreq);
    
    // Calculate normal manually since we are just using points
    vec3 objectNormal = normalize(pos);
    
    pos.xyz += objectNormal * snoise(noisePos) * noiseAmp * uDistort;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    // Size attenuation
    gl_PointSize = 4.0 * (10.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  
  void main() {
    // Circle shape for particles
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    
    // Soft glow
    float alpha = 1.0 - (dist * 2.0);
    alpha = pow(alpha, 1.2) * uOpacity;
    
    gl_FragColor = vec4(uColor, alpha);
  }
`;

function ParticleSphere() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();
  
  // Create a dense sphere geometry
  const geometry = useMemo(() => {
    return new THREE.SphereGeometry(1.5, 128, 128);
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uDistort: { value: 1.0 },
    uColor: { value: new THREE.Color('#0033FF') }, // Brand blue
    uOpacity: { value: 0.3 } // Base opacity
  }), []);

  // Reduce scale on mobile
  const baseScale = size.width < 768 ? 1.2 : 1.8;

  useFrame((state) => {
    if (!pointsRef.current || !materialRef.current) return;
    
    const elapsedTime = state.clock.getElapsedTime();
    
    // Initial scale animation
    const animationDuration = 3.0; // 3.0 seconds to grow (20% slower)
    const progress = Math.min(elapsedTime / animationDuration, 1.0);
    
    // Easing function (easeOutQuart)
    const easeProgress = 1 - Math.pow(1 - progress, 4);
    
    // Start from 0.01 and grow to baseScale
    const currentScale = 0.01 + (baseScale - 0.01) * easeProgress;
    pointsRef.current.scale.set(currentScale, currentScale, currentScale);

    // Update time
    materialRef.current.uniforms.uTime.value = elapsedTime;

    // Calculate scroll progress (0 to 1)
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

    // Rotate based on time and scroll
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.05 + scrollProgress * Math.PI;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.08 + scrollProgress * Math.PI * 2;

    // Move sphere slightly based on scroll
    const targetY = THREE.MathUtils.lerp(0, -viewport.height * 0.2, scrollProgress);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, targetY, 0.05);

    // Change distortion based on scroll
    const isDarkSection = scrollProgress > 0.3 && scrollProgress < 0.8;
    const targetDistort = isDarkSection ? 1.5 : 1.0;
    materialRef.current.uniforms.uDistort.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uDistort.value, 
      targetDistort, 
      0.05
    );

    // Change color and opacity based on scroll
    const colorBlue = new THREE.Color('#0033FF'); // Brand blue
    const colorNavy = new THREE.Color('#001641'); // Deep navy for dark section
    
    let targetColor = colorBlue;
    let targetOpacity = 0.4; // Slightly transparent initially
    if (scrollProgress > 0.25 && scrollProgress < 0.85) {
      targetColor = colorNavy;
      targetOpacity = 0.7; // More opaque when dark
    }

    materialRef.current.uniforms.uColor.value.lerp(targetColor, 0.05);
    materialRef.current.uniforms.uOpacity.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uOpacity.value,
      targetOpacity,
      0.05
    );
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <points ref={pointsRef} geometry={geometry}>
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </Float>
  );
}

// Floating stardust particles
function Stardust() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const count = 500;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function WebGLBackground() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="fixed inset-0 z-0 pointer-events-none bg-[#050505]"
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <ParticleSphere />
        <Stardust />
      </Canvas>
    </motion.div>
  );
}
