'use client';

import { motion } from 'framer-motion';

export default function NeuralGateway() {

  return (

    <section className="
      relative
      min-h-screen
      flex
      items-center
      justify-center
      overflow-hidden
      border-b
      border-white/5
    ">

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="
          absolute
          w-[1200px]
          h-[1200px]
          rounded-full
          border
          border-cyan-400/10
        "
      />

      <div className="
        relative
        z-20
        text-center
      ">

        <div className="
          uppercase
          tracking-[0.7em]
          text-[10px]
          opacity-40
          mb-8
        ">
          Sovereign Neural Gateway
        </div>

        <h1 className="
          text-[12vw]
          font-thin
          tracking-[-0.08em]
          leading-none
        ">
          EXOS
        </h1>

      </div>

    </section>

  );
}
