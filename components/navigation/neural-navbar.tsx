'use client';

import { motion } from 'framer-motion';

export function NeuralNavbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      className='fixed top-0 left-0 w-full z-50'
    >
      <div className='glass mx-6 mt-6 rounded-full px-8 py-4 flex items-center justify-between'>
        <div className='tracking-[0.4em] uppercase text-sm'>
          EX Experience OS
        </div>

        <div className='flex gap-8 uppercase text-xs tracking-[0.3em]'>
          <button>Archive</button>
          <button>Oracle</button>
          <button>Gateway</button>
        </div>
      </div>
    </motion.nav>
  );
}
