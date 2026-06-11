'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  { q: 'How does red light therapy actually work?', a: 'Red light therapy uses specific wavelengths of light (630nm visible red and 850nm near-infrared) that penetrate skin tissue and stimulate mitochondrial activity in cells. This boosts ATP production, accelerates collagen synthesis, and reduces inflammation — resulting in firmer, clearer skin and faster muscle recovery. All without heat or UV damage.' },
  { q: 'How often should I use the LUX-01 mask?', a: 'For best results we recommend 10 minutes daily for the first 8 weeks, then 3–4 times per week for maintenance. Consistency is key — most customers see visible improvements in skin texture and tone within 2–4 weeks of daily use.' },
  { q: 'How long does shipping take?', a: 'Free standard shipping takes 7–14 business days worldwide. Express shipping ($9.99) arrives in 3–5 business days. We ship from US and EU warehouses so most orders arrive faster than estimated. You\'ll receive a tracking number within 24 hours of dispatch.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day glow guarantee — if you\'re not seeing results or are unhappy for any reason, return it hassle-free. Contact support@raylune.com and we\'ll send a prepaid label. Refunds are processed within 3–5 business days of receiving the item.' },
  { q: 'Is the LUX-01 mask safe for all skin types?', a: 'Yes. Red light therapy is non-invasive, non-thermal, and safe for all Fitzpatrick skin types. It does not cause sunburn, pigmentation, or UV damage. We do recommend consulting your doctor if you\'re pregnant, have photosensitivity conditions, or are taking photosensitizing medications.' },
  { q: 'What payment methods do you accept?', a: 'All major credit cards (Visa, Mastercard, AmEx), PayPal, Apple Pay, and Google Pay. All transactions are encrypted via Stripe — we never store your card details.' },
  { q: 'Do your products have a warranty?', a: 'Every RAYLUNE product comes with a 12-month warranty covering manufacturing defects. If something fails, email us with your order number and a photo and we\'ll replace it — no questions asked.' },
  { q: 'Can I use the mask with other skincare products?', a: 'Absolutely. Red light therapy works synergistically with most skincare. We recommend using it on clean skin before applying serums and moisturizers — the light stimulates product absorption too. Avoid using alongside photosensitizing products like strong retinoids or AHAs in the same session.' },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn('rounded-card overflow-hidden transition-all', open && 'shadow-[0_0_24px_rgba(194,24,91,0.2)]')}
      style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${open ? 'rgba(240,98,146,0.35)' : 'rgba(255,255,255,0.08)'}` }}>
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-white hover:text-accent transition-colors gap-4"
        onClick={() => setOpen(!open)}
      >
        <span>{q}</span>
        {open ? <ChevronUp size={17} className="text-secondary shrink-0" /> : <ChevronDown size={17} className="text-text-secondary shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5 text-text-secondary leading-relaxed border-t border-white/8 pt-4 text-sm">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 glow-radial opacity-20 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h1 className="font-display font-800 text-4xl mb-3">Frequently Asked Questions</h1>
          <p className="text-text-secondary text-lg">Everything about RAYLUNE and your glow ritual</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-3">
          {faqs.map((f) => <FAQItem key={f.q} q={f.q} a={f.a} />)}
        </div>
        <div className="mt-12 text-center p-8 rounded-card" style={{ background: 'rgba(194,24,91,0.08)', border: '1px solid rgba(240,98,146,0.2)' }}>
          <h3 className="font-display font-700 text-xl mb-2">Still have questions?</h3>
          <p className="text-text-secondary mb-4 text-sm">Our team responds within a few hours on business days.</p>
          <a href="/contact" className="btn-primary inline-flex px-8 py-3">Contact Us</a>
        </div>
      </div>
    </div>
  );
}
