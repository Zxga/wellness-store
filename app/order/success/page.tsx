import { CheckCircle, Package, Mail, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface Props { searchParams: { session_id?: string }; }

export const metadata = { title: 'Order Confirmed!' };

export default function OrderSuccessPage({ searchParams }: Props) {
  const sessionId = searchParams.session_id || '';
  const orderNumber = sessionId ? sessionId.slice(-8).toUpperCase() : 'RL' + Date.now().toString(36).toUpperCase().slice(-6);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] glow-hero opacity-60 pointer-events-none" />
      <div className="relative max-w-lg w-full text-center">
        <div className="w-20 h-20 rounded-full bg-primary/20 border border-[rgba(240,98,146,0.3)] flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(194,24,91,0.4)]">
          <CheckCircle size={38} className="text-secondary" />
        </div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles size={16} className="text-secondary" />
          <span className="text-secondary text-xs uppercase tracking-[0.25em]">RAYLUNE</span>
        </div>
        <h1 className="font-display font-800 text-3xl sm:text-4xl mb-3">Thank You!</h1>
        <p className="text-text-secondary text-lg mb-1">Your glow ritual is confirmed.</p>
        <p className="text-text-tertiary mb-8 text-sm">Order #{orderNumber}</p>

        <div className="card p-6 text-left mb-8 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary/15 rounded-full flex items-center justify-center shrink-0">
              <Mail size={17} className="text-secondary" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Confirmation Email Sent</p>
              <p className="text-text-secondary text-sm">Check your inbox for order details.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary/15 rounded-full flex items-center justify-center shrink-0">
              <Package size={17} className="text-secondary" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Estimated Delivery</p>
              <p className="text-text-secondary text-sm">Standard: 7–14 business days · Express: 3–5 days</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop" className="btn-primary gap-2">Continue Shopping <ArrowRight size={16} /></Link>
          <Link href="/contact" className="btn-outline">Need Help?</Link>
        </div>
      </div>
    </div>
  );
}
