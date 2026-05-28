"use client";

import { motion } from "framer-motion";

const items = [
  { title: "Cinematic Motion", desc: "Animated depth and atmosphere." },
  { title: "AI Experience Layer", desc: "Behavior-driven narrative systems." },
  { title: "Neural Interfaces", desc: "Adaptive premium interactions." },
  { title: "Digital Sovereignty", desc: "Private invite-only identity." },
];

export default function ExperienceGrid() {
  return (
    <section className="px-6 py-32 bg-black">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: index * 0.08 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-8 min-h-[220px]"
          >
            <div className="text-xs uppercase tracking-[0.35em] opacity-45 mb-6">
              0{index + 1}
            </div>
            <h3 className="text-3xl font-medium tracking-[-0.04em] mb-4">
              {item.title}
            </h3>
            <p className="text-white/70 leading-7">
              {item.desc}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
