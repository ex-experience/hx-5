'use client';

import { motion } from 'framer-motion';

export default function DataStreams() {

  return (

    <div className="
      absolute
      inset-0
      overflow-hidden
      pointer-events-none
    ">

      {[...Array(20)].map((_, i) => (

        <motion.div
          key={i}
          animate={{
            y: ['0%', '100%'],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="
            absolute
            top-0
            w-px
            h-40
            bg-cyan-400/20
          "
          style={{
            left: `${i * 5}%`,
          }}
        />

      ))}

    </div>

  );
}
