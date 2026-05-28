'use client';

import { motion } from 'framer-motion';

export default function FloatingOrb() {

  return (

    <motion.div
      animate={{
        y: [-20, 20, -20],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
      }}
      className="
        absolute
        top-[20%]
        right-[10%]
        w-[300px]
        h-[300px]
        rounded-full
        bg-cyan-400/10
        blur-[120px]
        pointer-events-none
      "
    />

  );
}
