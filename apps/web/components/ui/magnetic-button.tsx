'use client';

import { motion } from 'framer-motion';

export default function MagneticButton({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <motion.button
      whileHover={{
        scale: 1.04,
        y: -4,
      }}
      whileTap={{
        scale: 0.98,
      }}
      className="
        relative
        px-8
        py-4
        rounded-full
        border
        border-cyan-400/20
        bg-cyan-400/10
        backdrop-blur-xl
        uppercase
        tracking-[0.3em]
        text-xs
        overflow-hidden
      "
    >

      {children}

    </motion.button>

  );
}
