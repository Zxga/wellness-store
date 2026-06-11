'use client';
import { useEffect, useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export default function EmailPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('raylune_popup_dismissed');
    if (dismissed) return;
    const timer = setTimeout(() => setShow(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setShow(false);
    localStorage.setItem('raylune_popup_dismissed', '1');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
      setTimeout(dismiss, 3000);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative max-w-md w-full rounded-card overflow-hidden border border-[rgba(240,98,146,0.25)] shadow-[0_0_80px_rgba(194,24,91,0.35)]">
        {/* Glow bg */}
        <div className="absolute inset-0 bg-[#1F0810]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] glow-hero opacity-70 pointer-events-none" />

        <div className="relative p-8 text-center">
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 text-text-secondary hover:text-white transition-colors"
          >
            <X size={18} />
          </button>

          <div className="w-14 h-14 rounded-full bg-primary/20 border border-[rgba(240,98,146,0.3)] flex items-center justify-center mx-auto mb-5">
            <Sparkles size={26} className="text-secondary" />
          </div>

          {submitted ? (
            <>
              <h3 className="font-display font-800 text-2xl mb-2">You&apos;re glowing! ✨</h3>
              <p className="text-text-secondary">Check your inbox for your 15% off code. Your ritual awaits.</p>
            </>
          ) : (
            <>
              <h3 className="font-display font-800 text-2xl mb-2">Get 15% Off Your Glow Ritual</h3>
              <p className="text-text-secondary mb-6 text-sm leading-relaxed">
                Join 18,000+ who&apos;ve made red light therapy part of their routine. Get exclusive drops and your welcome discount.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="input-dark w-full px-4 py-3 text-sm"
                />
                <button type="submit" disabled={loading} className="btn-primary py-3 disabled:opacity-60">
                  {loading ? 'Sending...' : 'Claim My 15% Off →'}
                </button>
              </form>
              <button onClick={dismiss} className="mt-4 text-xs text-text-tertiary hover:text-text-secondary transition-colors">
                No thanks, I&apos;ll skip the glow
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
