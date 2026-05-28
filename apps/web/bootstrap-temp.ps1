Write-Host "BOOTSTRAP WORKING..." -ForegroundColor Green

cd ex-experience-os

npm install framer-motion three @react-three/fiber @react-three/drei

mkdir components\hero -Force

@'
'use client';

import { motion } from 'framer-motion';

export default function NeuralBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute w-[900px] h-[900px] rounded-full bg-cyan-400/10 blur-[180px] top-[-300px] left-[-200px]"
      />

      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.08, 0.2, 0.08],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute w-[700px] h-[700px] rounded-full bg-purple-500/10 blur-[180px] bottom-[-250px] right-[-200px]"
      />
    </div>
  );
}
'@ | Set-Content components\hero\neural-background.tsx

@'
'use client';

import { motion } from 'framer-motion';
import NeuralBackground from './neural-background';

export default function CinematicHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">

      <NeuralBackground />

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8 }}
        className="z-10 text-center"
      >
        <div className="text-[12vw] font-thin tracking-[-0.08em] leading-none">
          EX
        </div>

        <div className="uppercase tracking-[0.6em] text-xs opacity-60 mt-6">
          Experience Operating System
        </div>
      </motion.div>
    </section>
  );
}
'@ | Set-Content components\hero\cinematic-hero.tsx

@'
import CinematicHero from '@/components/hero/cinematic-hero';

export default function HomePage() {
  return <CinematicHero />;
}
'@ | Set-Content app\page.tsx

Remove-Item components\hero\hero-runtime.tsx -Force -ErrorAction SilentlyContinue

npm run dev
