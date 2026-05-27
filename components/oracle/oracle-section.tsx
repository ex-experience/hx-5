'use client';

import { useState } from 'react';

export function OracleSection() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  async function handleAsk() {
    const res = await fetch('/api/oracle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setResponse(data.reply);
  }

  return (
    <section className='px-6 py-32'>
      <div className='glass max-w-3xl mx-auto rounded-[32px] p-10'>
        <div className='uppercase tracking-[0.4em] text-xs opacity-60 mb-8'>
          Oracle Interface
        </div>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='w-full bg-transparent border border-white/10 rounded-2xl p-6 min-h-[160px]'
          placeholder='Enter the experience...'
        />

        <button
          onClick={handleAsk}
          className='mt-6 px-8 py-4 rounded-full border border-white/10'
        >
          Initialize Oracle
        </button>

        <div className='mt-10 opacity-80'>
          {response}
        </div>
      </div>
    </section>
  );
}
