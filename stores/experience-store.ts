import { create } from 'zustand';

interface ExperienceStore {
  mode: string;
  setMode: (mode: string) => void;
}

export const useExperienceStore = create<ExperienceStore>((set) => ({
  mode: 'minimal',
  setMode: (mode) => set({ mode }),
}));
