'use client';

import { motion } from 'framer-motion';

export default function AmbientReactor() {

  return (

    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.08, 0.18, 0.08],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="
          absolute
          top-[20%]
          left-[10%]
          w-[900px]
          h-[900px]
          rounded-full
          bg-cyan-400/10
          blur-[200px]
        "
      />

    </div>

  );
}
