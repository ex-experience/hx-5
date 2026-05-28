"use client"

export function Atmosphere() {
  return (
    <mesh scale={[10, 10, 10]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="#112244" transparent opacity={0.05} />
    </mesh>
  )
}
