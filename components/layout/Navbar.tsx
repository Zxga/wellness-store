'use client';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useState, useEffect } from 'react';
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
  const [scrolled, setScrolled] = useState(false);
  const count = totalItems();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-300 border-b',
        scrolled
          ? 'bg-[#120308]/85 backdrop-blur-xl border-white/10'
          : 'bg-transparent border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <Sparkles size={20} className="text-secondary group-hover:text-accent transition-colors" />
            <span className="font-display font-800 text-xl tracking-[0.15em] text-white">RAYLUNE</span>
          </Link>

          <nav className="hidden md:flex items-center gap-9">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-text-secondary hover:text-accent text-sm font-medium tracking-wide transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={openCart}
              className="relative p-2 text-white hover:text-accent transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag size={21} />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center glow-shadow">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>

            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn('md:hidden border-t border-white/10 bg-[#120308]/95 backdrop-blur-xl', mobileOpen ? 'block' : 'hidden')}>
        <nav className="px-4 py-4 flex flex-col gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-white font-medium py-3 px-2 border-b border-white/5 hover:text-accent transition-colors"
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
