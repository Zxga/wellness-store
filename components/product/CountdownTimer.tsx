'use client';
import { useEffect, useState } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    let remaining = Math.floor((midnight.getTime() - now.getTime()) / 1000);

    function tick() {
      if (remaining <= 0) remaining = 86400;
      setTimeLeft({
        h: Math.floor(remaining / 3600),
        m: Math.floor((remaining % 3600) / 60),
        s: remaining % 60,
      });
      remaining--;
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="inline-flex items-center gap-2.5 rounded-btn px-4 py-2 text-sm"
      style={{ background: 'rgba(255,64,129,0.1)', border: '1px solid rgba(255,64,129,0.25)' }}>
      <span className="text-danger">●</span>
      <span className="text-text-secondary">Sale ends in</span>
      <span className="font-display font-700 text-white animate-pulse-gentle">
        {pad(timeLeft.h)}:{pad(timeLeft.m)}:{pad(timeLeft.s)}
      </span>
    </div>
  );
}
