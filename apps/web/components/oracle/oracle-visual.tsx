"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function OracleVisualInterface() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
    
    // Breathing scale effect
    const scale = 1 + Math.sin(time * 2) * 0.05;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group position={[0, 0, -5]}>
      <Icosahedron ref={meshRef} args={[1.5, 4]}>
        <MeshDistortMaterial
          color="#050505"
          emissive="#6ee7ff"
          emissiveIntensity={0.5}
          wireframe
          distort={0.4}
          speed={2}
          transparent
          opacity={0.8}
        />
      </Icosahedron>
      {/* Central Core Glow */}
      <pointLight color="#6ee7ff" intensity={2} distance={10} />
    </group>
  );
}
