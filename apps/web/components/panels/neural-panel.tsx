"use client";

import { motion } from "framer-motion";

export default function NeuralPanel() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1 }}
      viewport={{ once: true }}
      className="px-6 py-32 bg-[#020202]"
    >
      <div className="max-w-6xl mx-auto rounded-[36px] border border-cyan-400/10 bg-black/40 backdrop-blur-3xl p-10">
        <div className="uppercase tracking-[0.45em] text-[10px] opacity-50 mb-8">
          Neural Runtime Intelligence
        </div>

        <h2 className="text-4xl md:text-6xl font-thin tracking-[-0.06em] leading-tight">
          Autonomous cinematic experience orchestration.
        </h2>
      </div>
    </motion.section>
  );
}
