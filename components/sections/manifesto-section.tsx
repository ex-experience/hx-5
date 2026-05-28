"use client";

import { motion } from "framer-motion";

export default function ManifestoSection() {
  return (
    <section className="px-6 py-32 bg-[#050505]">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto"
      >
        <div className="uppercase tracking-[0.5em] text-[10px] opacity-50 mb-8">
          Core Philosophy
        </div>

        <h2 className="text-5xl md:text-7xl font-thin tracking-[-0.06em] leading-none">
          We engineer
          <br />
          digital emotion.
        </h2>

        <p className="mt-10 max-w-3xl text-white/70 leading-8 text-lg">
          EX Experience OS is being built as a sovereign cinematic runtime:
          stable, adaptive, AI-ready, and designed for luxury interaction.
        </p>
      </motion.div>
    </section>
  );
}
