'use client';

import { motion } from 'framer-motion';

export function HeroRuntime() {
  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,#111_0%,transparent_70%)] opacity-50' />

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8 }}
        className='z-10 text-center'
      >
        <div className='text-[12vw] font-thin tracking-[-0.08em] leading-none'>
          EX
        </div>

        <div className='uppercase tracking-[0.6em] text-xs opacity-60 mt-6'>
          Experience Operating System
        </div>
      </motion.div>
    </section>
  );
}
