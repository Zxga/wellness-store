import Link from 'next/link';
import { Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 font-display font-800 text-xl text-white mb-4">
              <Leaf size={22} className="text-primary" />
              WellnessHub
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Premium wellness gadgets for your best health. From infrared therapy to deep tissue massage — your wellness journey starts here.
            </p>
            <div className="flex gap-4 mt-5">
              <a href="#" aria-label="Instagram" className="hover:text-primary transition-colors text-sm">Instagram</a>
              <a href="#" aria-label="Facebook" className="hover:text-primary transition-colors text-sm">Facebook</a>
              <a href="#" aria-label="Twitter" className="hover:text-primary transition-colors text-sm">Twitter</a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-700 text-white mb-4">Shop</h4>
            <ul className="space-y-3 text-sm">
              {['All Products', 'Heat Therapy', 'Massage', 'Skincare', 'Recovery'].map((c) => (
                <li key={c}>
                  <Link href={c === 'All Products' ? '/shop' : `/shop?category=${c}`} className="hover:text-primary transition-colors">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-700 text-white mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
                { href: '/faq', label: 'FAQ' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-primary transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-700 text-white mb-4">Customer Care</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">✅ 30-Day Returns</li>
              <li className="flex items-center gap-2">✅ Free Shipping over $50</li>
              <li className="flex items-center gap-2">✅ Secure Checkout</li>
              <li className="flex items-center gap-2">✅ 24/7 Support</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2024 WellnessHub. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {/* Payment icons represented as text badges */}
            {['Visa', 'Mastercard', 'AmEx', 'PayPal', 'Apple Pay'].map((p) => (
              <span key={p} className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
