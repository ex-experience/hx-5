"use client"

import dynamic from "next/dynamic"

const SceneCanvas = dynamic(() => import("./scene-canvas"), {
  ssr: false,
  loading: () => null,
})

export default function SafeScene() {
  return <SceneCanvas />
}
