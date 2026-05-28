"use client";

import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export default function CinematicCamera() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const target = new THREE.Vector3(0, 0, 0);
  const mouse = new THREE.Vector2();

  useFrame((state) => {
    if (!cameraRef.current) return;
    
    // Parallax effect based on pointer (AI Reactive Motion)
    mouse.x = (state.pointer.x * 2) * 0.5;
    mouse.y = (state.pointer.y * 2) * 0.5;

    cameraRef.current.position.x += (mouse.x - cameraRef.current.position.x) * 0.02;
    cameraRef.current.position.y += (-mouse.y - cameraRef.current.position.y) * 0.02;
    
    cameraRef.current.lookAt(target);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 0, 15]}
      fov={45}
      near={0.1}
      far={1000}
    />
  );
}
