"use client";

import { motion } from "framer-motion";
import SafeScene from "@/components/scene/safe-scene";

export default function HeroRuntime() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      <SafeScene />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div className="mb-6 text-[10px] uppercase tracking-[0.55em] opacity-60">
            EX Experience OS
          </div>

          <h1 className="text-[12vw] font-thin tracking-[-0.08em] leading-none">
            CINEMATIC
            <br />
            ENGINE
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-sm md:text-lg text-white/70">
            Sovereign AI-native cinematic platform runtime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
