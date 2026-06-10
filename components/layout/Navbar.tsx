'use client';
import Link from 'next/link';
import { ShoppingCart, Menu, X, Leaf } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { totalItems, openCart } = useCartStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const count = totalItems();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-display font-800 text-xl text-primary">
            <Leaf size={24} className="text-primary" />
            WellnessHub
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-text-secondary hover:text-primary font-medium transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={openCart}
              className="relative p-2 text-text-secondary hover:text-primary transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart size={22} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>

            <button
              className="md:hidden p-2 text-text-secondary"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn('md:hidden border-t border-gray-100 bg-white', mobileOpen ? 'block' : 'hidden')}>
        <nav className="px-4 py-4 flex flex-col gap-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-text-primary font-medium py-2 border-b border-gray-50"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
