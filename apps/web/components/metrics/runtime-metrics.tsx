'use client';

import CountUp from 'react-countup';

export default function RuntimeMetrics() {

  const metrics = [
    { label: 'Runtime Speed', value: 99 },
    { label: 'Neural Sync', value: 97 },
    { label: 'Cinematic Fidelity', value: 100 },
    { label: 'Experience Intelligence', value: 96 },
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
        md:grid-cols-4
        gap-8
      ">

        {metrics.map((metric) => (

          <div
            key={metric.label}
            className="
              rounded-[32px]
              border
              border-white/10
              bg-white/[0.03]
              backdrop-blur-2xl
              p-10
            "
          >

            <div className="
              text-5xl
              font-thin
              tracking-[-0.05em]
              mb-4
            ">
              <CountUp end={metric.value} duration={4} />%
            </div>

            <div className="
              uppercase
              tracking-[0.3em]
              text-[10px]
              opacity-50
            ">
              {metric.label}
            </div>

          </div>

        ))}

      </div>

    </section>

  );
}
