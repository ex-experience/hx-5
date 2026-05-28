"use client"

import { create } from "zustand"

interface ExperienceStore {
  mode: string
  intensity: number
  setMode: (mode: string) => void
  setIntensity: (value: number) => void
}

export const useExperienceStore =
  create<ExperienceStore>((set) => ({
    mode: "minimal",
    intensity: 0.5,

    setMode: (mode) =>
      set({ mode }),

    setIntensity: (value) =>
      set({ intensity: value }),
  }))
