"use client"

import dynamic from "next/dynamic"

const SceneCanvas = dynamic(
  () =>
    import("./scene-canvas").then(
      (mod) => mod.SceneCanvas
    ),
  {
    ssr: false,
    loading: () => null,
  }
)

export default function SafeScene() {
  return <SceneCanvas />
}
