"use client";

import { motion } from "framer-motion";

export default function ManifestoSection() {
  return (
    <section className="px-6 py-32 bg-[#050505]">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto"
      >
        <div className="uppercase tracking-[0.5em] text-[10px] opacity-50 mb-8">
          Manifesto
        </div>

        <h2 className="text-5xl md:text-7xl font-thin tracking-[-0.06em] leading-none">
          We engineer
          <br />
          digital emotion.
        </h2>

        <p className="mt-10 max-w-3xl text-white/70 leading-8 text-lg">
          EX Experience OS is a sovereign cinematic operating layer designed for luxury digital ecosystems, adaptive interaction, and future-ready AI identity.
        </p>
      </motion.div>
    </section>
  );
}
