'use client';

import { motion } from 'framer-motion';

export default function SovereignMenu() {

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4 }}
      className="
        fixed
        top-6
        right-6
        z-50
      "
    >

      <button className="
        w-16
        h-16
        rounded-full
        border
        border-white/10
        bg-white/[0.04]
        backdrop-blur-xl
        text-xs
        tracking-[0.3em]
      ">
        EX
      </button>

    </motion.div>

  );
}
