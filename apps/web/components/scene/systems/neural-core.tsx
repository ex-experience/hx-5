"use client"

export function NeuralCore() {
  return (
    <mesh>
      <icosahedronGeometry args={[1.25, 1]} />
      <meshStandardMaterial
        color="#ffffff"
        emissive="#6ee7ff"
        emissiveIntensity={1.8}
        roughness={0.15}
        metalness={1}
      />
    </mesh>
  )
}
