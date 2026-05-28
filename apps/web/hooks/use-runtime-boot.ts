"use client"

import { useEffect } from "react"

export function useRuntimeBoot() {
  useEffect(() => {
    console.log(
      "[EX EXPERIENCE OS] Runtime Online"
    )
  }, [])
}
