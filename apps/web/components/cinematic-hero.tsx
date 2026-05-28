"use client";

import { motion } from "framer-motion";

export default function CinematicHero() {
  return (
    <section
      className="relative flex h-screen items-center justify-center overflow-hidden bg-black text-white"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-900 opacity-90" />

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        className="relative z-10 text-center"
      >
        <h1 className="mb-6 text-7xl font-black tracking-tight">
          EX EXPERIENCE OS
        </h1>

        <p className="mx-auto max-w-2xl text-zinc-400 text-xl">
          Cinematic Digital Sovereignty Platform
        </p>
      </motion.div>
    </section>
  );
}