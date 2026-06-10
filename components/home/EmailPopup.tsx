'use client';
import { useEffect, useState } from 'react';
import { X, Leaf } from 'lucide-react';

export default function EmailPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('wh_popup_dismissed');
    if (dismissed) return;
    const timer = setTimeout(() => setShow(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setShow(false);
    localStorage.setItem('wh_popup_dismissed', '1');
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
      // silent fail
    } finally {
      setLoading(false);
    }
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-card shadow-card-hover max-w-md w-full p-8 relative animate-fade-in">
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="text-center">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Leaf size={28} className="text-primary" />
          </div>

          {submitted ? (
            <>
              <h3 className="font-display font-800 text-2xl text-text-primary mb-2">You're in! 🎉</h3>
              <p className="text-text-secondary">Check your email for your 10% off code. Happy shopping!</p>
            </>
          ) : (
            <>
              <h3 className="font-display font-800 text-2xl text-text-primary mb-2">
                Get 10% Off Your First Order
              </h3>
              <p className="text-text-secondary mb-6">
                Join 12,000+ wellness enthusiasts. Get exclusive deals, wellness tips, and your discount code.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-btn focus:outline-none focus:border-primary text-sm"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary text-base py-3 disabled:opacity-60"
                >
                  {loading ? 'Sending...' : 'Claim My 10% Off →'}
                </button>
              </form>

              <button
                onClick={dismiss}
                className="mt-4 text-xs text-text-secondary hover:text-text-primary transition-colors"
              >
                No thanks, I'll pay full price
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
