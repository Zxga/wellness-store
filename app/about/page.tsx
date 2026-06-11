import Image from 'next/image';
import { Sparkles, Heart, Gem } from 'lucide-react';

export const metadata = {
  title: 'About RAYLUNE',
  description: 'We believe glow starts with light. Learn the story behind RAYLUNE.',
};

const team = [
  { name: 'Alex Chen', role: 'Founder & CEO', initials: 'AC' },
  { name: 'Maya Johnson', role: 'Head of Product', initials: 'MJ' },
  { name: 'Sam Williams', role: 'Customer Experience', initials: 'SW' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden border-b border-white/10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] glow-hero opacity-50 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles size={18} className="text-secondary" />
            <span className="text-secondary text-xs uppercase tracking-[0.3em]">RAYLUNE</span>
          </div>
          <h1 className="font-display font-800 text-4xl sm:text-5xl mb-6">
            We Believe Glow Starts With <span className="text-secondary text-glow">Light</span>
          </h1>
          <p className="text-text-secondary text-xl leading-relaxed max-w-2xl mx-auto">
            Founded on the science of red light therapy, RAYLUNE brings clinical-grade recovery rituals home — at a price that makes radiant skin accessible to everyone.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-secondary text-xs uppercase tracking-[0.25em] mb-3">Our Story</p>
            <h2 className="font-display font-700 text-3xl mb-6">From Research to Your Ritual</h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>RAYLUNE began in 2022 when our founder spent months researching why expensive spa treatments worked while at-home alternatives failed. The answer was always the same: clinical wavelength precision.</p>
              <p>We spent 18 months working directly with photobiologists and dermatologists to source only devices that deliver the exact 630nm and 850nm wavelengths proven in peer-reviewed studies to stimulate collagen and accelerate recovery.</p>
              <p>Today, thousands of customers have replaced expensive spa appointments with 10-minute RAYLUNE rituals. Our mission stays the same: make clinical wellness beautifully simple.</p>
            </div>
          </div>
          <div className="relative h-80 rounded-card overflow-hidden border border-white/10"
            style={{ boxShadow: '0 0 60px rgba(194,24,91,0.25)' }}>
            <Image
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80"
              alt="RAYLUNE product"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120308]/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-700 text-3xl text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Heart, title: 'Science First', desc: 'Every product we sell is backed by peer-reviewed research. We do not compromise on clinical efficacy.' },
              { icon: Gem, title: 'Premium, Not Pretentious', desc: 'Luxury packaging and materials — but accessible pricing. You should not need a $500 membership to glow.' },
              { icon: Sparkles, title: 'Rituals Over Products', desc: 'We design for habit formation. Our products work better together as a ritual than as individual tools.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6">
                <div className="w-11 h-11 rounded-full bg-primary/15 border border-[rgba(240,98,146,0.25)] flex items-center justify-center mb-4">
                  <Icon size={20} className="text-secondary" />
                </div>
                <h3 className="font-display font-700 text-lg mb-2">{title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display font-700 text-3xl mb-10">The Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((m) => (
              <div key={m.name} className="card p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/15 border border-[rgba(240,98,146,0.3)] text-accent font-display font-800 text-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_24px_rgba(194,24,91,0.2)]">
                  {m.initials}
                </div>
                <p className="font-display font-700 text-white">{m.name}</p>
                <p className="text-text-secondary text-sm mt-1">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
