'use client';

import { motion } from 'framer-motion';

export default function RuntimeTerminal() {

  return (

    <section className="
      relative
      z-20
      px-6
      py-40
    ">

      <div className="
        max-w-6xl
        mx-auto
        rounded-[40px]
        border
        border-cyan-400/10
        bg-black/40
        backdrop-blur-2xl
        p-10
      ">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="
            font-mono
            text-sm
            leading-8
            opacity-80
          "
        >

          &gt; initialize_sovereign_runtime()

          <br />

          &gt; synchronize_ai_memory()

          <br />

          &gt; cinematic_engine = ACTIVE

          <br />

          &gt; neural_runtime = READY

        </motion.div>

      </div>

    </section>

  );
}
