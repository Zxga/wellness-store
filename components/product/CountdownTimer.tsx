'use client';
import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    // Reset every 24h from midnight
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    let remaining = Math.floor((midnight.getTime() - now.getTime()) / 1000);

    function tick() {
      if (remaining <= 0) {
        remaining = 86400;
      }
      const h = Math.floor(remaining / 3600);
      const m = Math.floor((remaining % 3600) / 60);
      const s = remaining % 60;
      setTimeLeft({ h, m, s });
      remaining--;
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex items-center gap-2 bg-danger/10 border border-danger/20 rounded-btn px-4 py-2.5 text-danger">
      <Clock size={16} className="shrink-0" />
      <span className="text-sm font-semibold">Sale ends in:</span>
      <span className="font-display font-800 text-base animate-pulse-gentle">
        {pad(timeLeft.h)}:{pad(timeLeft.m)}:{pad(timeLeft.s)}
      </span>
    </div>
  );
}
