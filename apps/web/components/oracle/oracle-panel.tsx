"use client";

import { motion } from "framer-motion";

export default function OraclePanel() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="px-6 py-24 bg-black"
    >
      <div className="max-w-5xl mx-auto rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-8">
        <div className="uppercase tracking-[0.45em] text-[10px] opacity-50 mb-6">
          Oracle
        </div>
        <p className="text-white/80 leading-8">
          The intelligence layer is now scaffolded and ready to receive memory, routing, and behavioral modeling.
        </p>
      </div>
    </motion.section>
  );
}
