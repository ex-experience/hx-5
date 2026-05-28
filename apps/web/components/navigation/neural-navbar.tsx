"use client";

import { motion } from "framer-motion";

export default function NeuralNavbar() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="fixed top-0 left-0 w-full z-50"
    >
      <div className="glass mx-6 mt-6 rounded-full px-8 py-4 flex items-center justify-between">
        <div className="text-sm tracking-[0.4em] uppercase">
          EX Experience OS
        </div>

        <div className="flex gap-8 text-xs uppercase tracking-[0.3em]">
          <button>Archive</button>
          <button>Oracle</button>
          <button>Gateway</button>
        </div>
      </div>
    </motion.nav>
  );
}
