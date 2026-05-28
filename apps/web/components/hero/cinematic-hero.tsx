"use client"

import { useEffect, useState } from "react"
import SafeScene from "@/components/scene/safe-scene"

export default function CinematicHero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="relative h-screen w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-black" />

      {mounted ? <SafeScene /> : null}

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-black tracking-tight">
            EX EXPERIENCE OS
          </h1>
          <p className="mt-6 text-white/60 text-base md:text-xl tracking-[0.35em] uppercase">
            Cinematic Intelligence Runtime
          </p>
        </div>
      </div>
    </main>
  )
}
