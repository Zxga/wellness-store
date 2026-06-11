import { Star } from 'lucide-react';

const reviews = [
  { name: 'Sarah M.', initials: 'SM', text: 'My skin has never looked better! The glow after two weeks is unreal.', tag: 'LUX-01' },
  { name: 'Jessica L.', initials: 'JL', text: 'Cancelled my facialist. 10 minutes a night and I look brighter, plumper, rested.', tag: 'LUX-01' },
  { name: 'Amara K.', initials: 'AK', text: 'Feels genuinely luxury — the packaging, the glow, the results. Obsessed.', tag: 'LUX-01' },
  { name: 'Priya R.', initials: 'PR', text: 'The FROST-01 ice bath is my favorite morning ritual. Puffiness gone instantly.', tag: 'FROST-01' },
  { name: 'Maya T.', initials: 'MT', text: 'PULSE-01 lives in my gym bag. Whisper quiet, seriously powerful.', tag: 'PULSE-01' },
  { name: 'Chloe B.', initials: 'CB', text: 'DREAM-01 mask = the deepest sleep of my life. The pressure is so calming.', tag: 'DREAM-01' },
  { name: 'Olivia R.', initials: 'OR', text: 'Dermatologist recommended the red light and I finally caved. No regrets at all.', tag: 'LUX-01' },
  { name: 'Hannah W.', initials: 'HW', text: 'The whole RAYLUNE ritual feels like a spa I keep in my bathroom. Worth it.', tag: 'Ritual' },
  { name: 'Sofia D.', initials: 'SD', text: 'Bought as a gift, ended up buying two more for myself. Everyone is obsessed.', tag: 'LUX-01' },
];

export default function Testimonials() {
  return (
    <section className="py-20 border-t border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-secondary text-xs uppercase tracking-[0.25em] mb-3">Loved By Thousands</p>
          <h2 className="font-display font-800 text-3xl sm:text-4xl mb-4">Real Glow, Real People</h2>
          <div className="inline-flex items-center gap-2 text-text-secondary text-sm">
            <span className="flex">
              {[...Array(5)].map((_, i) => <Star key={i} size={15} className="star-filled" />)}
            </span>
            <strong className="text-white">4.9/5</strong> from <strong className="text-white">9,600+</strong> verified reviews
          </div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:balance]">
          {reviews.map((r) => (
            <div key={r.name} className="card p-6 mb-6 break-inside-avoid">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="star-filled" />)}
              </div>
              <p className="text-white/90 leading-relaxed mb-5 text-sm">“{r.text}”</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/20 border border-[rgba(240,98,146,0.3)] text-accent flex items-center justify-center font-display font-700 text-xs shrink-0">
                  {r.initials}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{r.name}</p>
                  <p className="text-text-tertiary text-xs">Verified Buyer</p>
                </div>
                <span className="ml-auto badge-rose">{r.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
