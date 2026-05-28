'use client';

import { motion } from 'framer-motion';

export default function RuntimeDashboard() {

  const panels = [
    'Experience Runtime',
    'Neural Intelligence',
    'Adaptive Systems',
    'Realtime Cinematics',
  ];

  return (

    <section className="
      relative
      z-20
      px-6
      py-40
    ">

      <div className="
        max-w-7xl
        mx-auto
        grid
        md:grid-cols-2
        gap-10
      ">

        {panels.map((panel, i) => (

          <motion.div
            key={panel}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.4,
              delay: i * 0.2,
            }}
            whileHover={{
              y: -8,
            }}
            className="
              rounded-[40px]
              border
              border-white/10
              bg-white/[0.03]
              backdrop-blur-2xl
              p-12
            "
          >

            <div className="
              uppercase
              tracking-[0.4em]
              text-[10px]
              opacity-40
              mb-6
            ">
              EXOS PANEL
            </div>

            <h3 className="
              text-4xl
              font-thin
              tracking-[-0.05em]
              leading-none
            ">
              {panel}
            </h3>

          </motion.div>

        ))}

      </div>

    </section>

  );
}
