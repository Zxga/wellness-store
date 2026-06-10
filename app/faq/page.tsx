'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    q: 'How long does shipping take?',
    a: 'Standard shipping takes 7–14 business days. Express shipping (3–5 business days) is available for $9.99 at checkout. We ship from US and EU warehouses to 30+ countries worldwide. Free standard shipping on all orders!',
  },
  {
    q: 'What is your return policy?',
    a: 'We offer a hassle-free 30-day return policy. If you\'re not completely satisfied, simply contact our support team and we\'ll arrange a free return label. Refunds are processed within 3–5 business days of receiving the returned item.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are secured with 256-bit SSL encryption via Stripe.',
  },
  {
    q: 'Are your products safe and certified?',
    a: 'Yes! All our products are rigorously tested and hold relevant certifications (CE, RoHS, FCC where applicable). Our EMS devices are FDA-cleared. We partner only with verified manufacturers who meet international safety standards.',
  },
  {
    q: 'Do you offer a warranty?',
    a: 'All products come with a 12-month manufacturer warranty covering defects in materials and workmanship. Simply contact us with your order number and photos of the issue, and we\'ll sort it out promptly.',
  },
  {
    q: 'Can I track my order?',
    a: 'Yes! Once your order ships, you\'ll receive an email with your tracking number. You can track your package in real-time through our carrier\'s website. Most orders receive tracking within 1–2 days of purchase.',
  },
  {
    q: 'How do I use the infrared sauna blanket safely?',
    a: 'Start with 30-minute sessions at lower temperatures (40–45°C), staying well-hydrated before, during, and after. Avoid use if pregnant, have cardiovascular conditions, or are under the influence of alcohol. Always read the included instructions and consult your doctor if you have health concerns.',
  },
  {
    q: 'Do you offer discounts for bulk orders?',
    a: 'Yes! For orders of 3+ items or bulk corporate wellness purchases, please contact us at hello@wellnesshub.com for special pricing. We also offer a 10% first-order discount when you subscribe to our newsletter.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn('border border-gray-200 rounded-card overflow-hidden transition-all', open && 'shadow-card')}>
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-text-primary hover:bg-gray-50 transition-colors gap-4"
        onClick={() => setOpen(!open)}
      >
        <span>{q}</span>
        {open ? <ChevronUp size={18} className="text-primary shrink-0" /> : <ChevronDown size={18} className="text-text-secondary shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5 text-text-secondary leading-relaxed border-t border-gray-100 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="font-display font-800 text-4xl text-text-primary mb-3">Frequently Asked Questions</h1>
          <p className="text-text-secondary text-lg">Everything you need to know about WellnessHub</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-3">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>

        <div className="mt-12 text-center p-8 bg-green-50 rounded-card">
          <h3 className="font-display font-700 text-xl text-text-primary mb-2">Still have questions?</h3>
          <p className="text-text-secondary mb-4">Our team is here to help — usually responding within a few hours.</p>
          <a href="/contact" className="btn-primary inline-block">Contact Us</a>
        </div>
      </div>
    </div>
  );
}
