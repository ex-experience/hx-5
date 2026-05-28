import { create } from "zustand";

interface SystemState {
  cinematicMode: string;
  adaptiveMode: string;
  setCinematicMode: (mode: string) => void;
  setAdaptiveMode: (mode: string) => void;
}

export const useSystemStore = create<SystemState>((set) => ({
  cinematicMode: "minimal",
  adaptiveMode: "minimal",

  setCinematicMode: (mode) => set({ cinematicMode: mode }),
  setAdaptiveMode: (mode) => set({ adaptiveMode: mode }),
}));
