"use client";

import { useEffect } from "react";
import { runtimeKernel } from "@/core/runtime-kernel";
import { useSystemStore } from "@/stores/system-store";

export function useRuntime() {
  const setAdaptiveMode = useSystemStore((s) => s.setAdaptiveMode);

  useEffect(() => {
    const result = runtimeKernel.update({
      scrollSpeed: 100,
      interactionDepth: 0,
      hesitation: 1,
      country: "SA",
      hour: new Date().getHours(),
      engagement: 90,
    });

    setAdaptiveMode(result.adaptive);
  }, [setAdaptiveMode]);
}
