"use client";

import { useEffect } from "react";
import { runtimeKernel } from "@/core/runtime-kernel";

export default function RootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    runtimeKernel.initialize();
  }, []);

  return <>{children}</>;
}
