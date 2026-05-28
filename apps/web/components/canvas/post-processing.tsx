"use client";

import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export default function AdaptivePostProcessing() {
  return (
    <EffectComposer disableNormalPass multisampling={0}>
      {/* Cinematic Glow */}
      <Bloom
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        intensity={1.5}
        kernelSize={3}
      />
      {/* Film Grain Texture */}
      <Noise opacity={0.035} blendFunction={BlendFunction.OVERLAY} />
      {/* Depth Atmosphere & Focus */}
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  );
}
