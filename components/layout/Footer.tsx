import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 pt-16 pb-8 overflow-hidden">
      {/* ambient glow */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] glow-hero opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Sparkles size={20} className="text-secondary" />
              <span className="font-display font-800 text-xl tracking-[0.15em] text-white">RAYLUNE</span>
            </Link>
            <p className="text-sm leading-relaxed text-text-secondary">
              Light. Recovery. Glow. Premium red light therapy and recovery rituals — engineered for radiant results at home.
            </p>
            <div className="flex gap-5 mt-5 text-sm">
              <a href="#" className="text-text-secondary hover:text-accent transition-colors">Instagram</a>
              <a href="#" className="text-text-secondary hover:text-accent transition-colors">TikTok</a>
              <a href="#" className="text-text-secondary hover:text-accent transition-colors">Pinterest</a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-700 text-white mb-4 text-sm tracking-wide">Shop</h4>
            <ul className="space-y-3 text-sm">
              {['All Products', 'Light Therapy', 'Recovery', 'Sleep & Relax'].map((c) => (
                <li key={c}>
                  <Link
                    href={c === 'All Products' ? '/shop' : `/shop?category=${encodeURIComponent(c)}`}
                    className="text-text-secondary hover:text-accent transition-colors"
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-700 text-white mb-4 text-sm tracking-wide">Company</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
                { href: '/faq', label: 'FAQ' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-text-secondary hover:text-accent transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-700 text-white mb-4 text-sm tracking-wide">The Promise</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li>✦ 30-Day Glow Guarantee</li>
              <li>✦ Free Worldwide Shipping</li>
              <li>✦ Secure Checkout</li>
              <li>✦ Dermatologist-Approved</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-tertiary">© 2026 RAYLUNE. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {['Visa', 'Mastercard', 'AmEx', 'PayPal', 'Apple Pay'].map((p) => (
              <span key={p} className="text-xs text-text-secondary border border-white/10 px-2 py-1 rounded">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
