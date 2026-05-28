"use client"

import { MeshDistortMaterial }
from "@react-three/drei"

export function NeuralCore() {
  return (
    <mesh>
      <icosahedronGeometry
        args={[1.6, 32]}
      />

      <MeshDistortMaterial
        color="#6ee7ff"
        speed={2}
        distort={0.32}
        roughness={0}
      />
    </mesh>
  )
}
