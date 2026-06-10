import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, RotateCcw, Zap } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-green-50 via-white to-amber-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <span className="badge-green text-xs font-semibold mb-4 inline-flex">
              ✨ Trusted by 50,000+ Customers
            </span>
            <h1 className="font-display font-800 text-4xl sm:text-5xl lg:text-6xl text-text-primary leading-tight mb-6">
              Your Home{' '}
              <span className="text-primary">Wellness</span>{' '}
              Studio
            </h1>
            <p className="text-text-secondary text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
              Professional-grade therapy devices at home prices. Sauna blankets, massage guns, red light wands — feel your absolute best every day.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="/shop"
                className="btn-primary flex items-center justify-center gap-2 text-base px-8 py-4"
              >
                Shop Now <ArrowRight size={18} />
              </Link>
              <Link
                href="/about"
                className="btn-outline flex items-center justify-center gap-2 text-base px-8 py-4"
              >
                Our Story
              </Link>
            </div>

            <div className="flex flex-wrap gap-6">
              {[
                { icon: Zap, text: 'Fast Shipping' },
                { icon: RotateCcw, text: '30-Day Returns' },
                { icon: ShieldCheck, text: 'Quality Guaranteed' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-text-secondary text-sm">
                  <Icon size={16} className="text-primary" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Image grid */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative h-56 rounded-card overflow-hidden shadow-card">
                <Image
                  src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80"
                  alt="Sauna blanket therapy"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="relative h-36 rounded-card overflow-hidden shadow-card">
                <Image
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80"
                  alt="Skincare device"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative h-36 rounded-card overflow-hidden shadow-card">
                <Image
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80"
                  alt="Massage therapy"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-56 rounded-card overflow-hidden shadow-card">
                <Image
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80"
                  alt="Recovery device"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
