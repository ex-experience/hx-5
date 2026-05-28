'use client';

import { motion } from 'framer-motion';

export default function CommandMatrix() {

  const commands = [
    'INITIALIZE_RUNTIME()',
    'SYNC_NEURAL_MEMORY()',
    'ACTIVATE_CINEMATIC_LAYER()',
    'SOVEREIGN_MODE = TRUE',
  ];

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
        backdrop-blur-3xl
        p-12
      ">

        {commands.map((cmd, i) => (

          <motion.div
            key={cmd}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1,
              delay: i * 0.2,
            }}
            className="
              font-mono
              text-sm
              opacity-80
              mb-6
            "
          >

            &gt; {cmd}

          </motion.div>

        ))}

      </div>

    </section>

  );
}
