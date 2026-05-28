"use client";

import { useEffect } from "react";
import { runtimeKernel } from "@/core/runtime-kernel";

export function useRuntimeBoot() {
  useEffect(() => {
    runtimeKernel.initialize();
  }, []);
}
