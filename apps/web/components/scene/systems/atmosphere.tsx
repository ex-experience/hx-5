"use client"

import {
  Points,
  PointMaterial,
} from "@react-three/drei"

import { useMemo } from "react"

export function Atmosphere() {
  const particles = useMemo(() => {
    const arr = new Float32Array(3000)

    for (let i = 0; i < 3000; i++) {
      arr[i] =
        (Math.random() - 0.5) * 20
    }

    return arr
  }, [])

  return (
    <Points
      positions={particles}
      stride={3}
    >
      <PointMaterial
        transparent
        size={0.018}
        color="#ffffff"
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  )
}
