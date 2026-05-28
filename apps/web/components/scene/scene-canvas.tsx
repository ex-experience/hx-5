"use client"

import { Canvas } from "@react-three/fiber"
import { Float, OrbitControls, Environment } from "@react-three/drei"
import { Suspense } from "react"
import { NeuralCore } from "./systems/neural-core"
import { Atmosphere } from "./systems/atmosphere"

export default function SceneCanvas() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#050505]">
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 6], fov: 45 }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#050505"]} />
          <ambientLight intensity={1.2} />
          <directionalLight position={[3, 3, 3]} intensity={2.5} />

          <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
            <NeuralCore />
          </Float>

          <Atmosphere />
          <Environment preset="night" />

          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
        </Suspense>
      </Canvas>
    </div>
  )
}
