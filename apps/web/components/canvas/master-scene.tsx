"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import ParticleIntelligence from "./particle-intelligence";
import CinematicCamera from "./cinematic-camera";
import AdaptivePostProcessing from "./post-processing";
import OracleVisualInterface from "../oracle/oracle-visual";

export default function MasterScene() {
  return (
    <div className="fixed inset-0 z-[-10] pointer-events-none bg-[#050505]">
      {/* WebGL Optimization Layer: dpr clamp, precision, powerPreference */}
      <Canvas
        dpr={[1, 2]}
        gl={{ 
          antialias: false, 
          powerPreference: "high-performance",
          alpha: false 
        }}
      >
        <Suspense fallback={null}>
          {/* Neural Fog & Depth Atmosphere */}
          <color attach="background" args={["#050505"]} />
          <fog attach="fog" args={["#050505", 10, 40]} />

          {/* Core Components */}
          <CinematicCamera />
          <ParticleIntelligence />
          <OracleVisualInterface />
          
          {/* Ambient Lighting */}
          <ambientLight intensity={0.2} />
          
          {/* Post Processing */}
          <AdaptivePostProcessing />
        </Suspense>
      </Canvas>
    </div>
  );
}
