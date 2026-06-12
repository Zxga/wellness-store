import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, RotateCcw, Truck, FlaskConical } from 'lucide-react';
import { getProductImages } from '@/lib/utils';

const [heroImage, heroImageAlt] = getProductImages('lux-01-red-light-face-mask');

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] glow-hero pointer-events-none animate-glow-pulse" />
      <div className="absolute bottom-[-30%] left-[-10%] w-[500px] h-[500px] glow-hero opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="animate-fade-up">
            <span className="badge-rose mb-6 inline-flex items-center gap-1.5">
              <Sparkles size={12} /> RAYLUNE · Light. Recovery. Glow.
            </span>
            <h1 className="font-display font-800 text-5xl sm:text-6xl lg:text-7xl leading-[1.02] mb-6">
              Glow Starts
              <br />
              With <span className="text-secondary text-glow">Light</span>
            </h1>
            <p className="text-text-secondary text-lg sm:text-xl leading-relaxed mb-9 max-w-lg">
              Clinical-grade red light therapy, reimagined for your nightly ritual. Restore collagen, reduce fine lines, and unveil your natural radiance — in just 10 minutes a day.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/products/lux-01-red-light-face-mask" className="btn-primary text-base px-8 py-4 gap-2">
                Shop the Mask <ArrowRight size={18} />
              </Link>
              <Link href="/shop" className="btn-outline text-base px-8 py-4">
                Explore All
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-6 gap-y-3">
              {[
                { icon: FlaskConical, text: 'Clinically Studied' },
                { icon: ShieldCheck, text: 'FDA-Cleared' },
                { icon: RotateCcw, text: '30-Day Returns' },
                { icon: Truck, text: 'Free Shipping' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-text-secondary text-sm">
                  <Icon size={15} className="text-secondary" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Hero product */}
          <div className="relative flex items-center justify-center">
            {/* Ambient glow behind image */}
            <div className="absolute w-[480px] h-[480px] glow-radial animate-glow-pulse opacity-90" />

            {/* Main image card */}
            <div className="relative w-full max-w-md aspect-[3/4] rounded-card overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(194,24,91,0.45)] animate-float">
              <Image
                src={heroImage}
                alt="Woman wearing LUX-01 Red Light Face Mask"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
              {/* Rose gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#120308]/80 via-[#120308]/10 to-transparent" />
              {/* Product label */}
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-1">✦ The Hero Treatment</p>
                <p className="font-display font-700 text-white text-xl">LUX-01 Red Light Mask</p>
                <p className="text-secondary text-sm mt-0.5">630nm + 850nm · 10 min daily</p>
              </div>
            </div>

            {/* Secondary floating thumbnail */}
            {heroImageAlt && (
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-card overflow-hidden border-2 border-secondary/40 shadow-[0_0_24px_rgba(194,24,91,0.5)]">
                <Image
                  src={heroImageAlt}
                  alt="LUX-01 product glow shot"
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
