import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah M.',
    location: 'New York, USA',
    rating: 5,
    avatar: 'SM',
    text: "The sauna blanket is a game-changer! I use it every evening after work and my stress levels have dropped dramatically. My back pain is almost completely gone after 3 weeks. Worth every penny!",
    product: 'ProRelax Sauna Blanket',
  },
  {
    name: 'James T.',
    location: 'London, UK',
    rating: 5,
    avatar: 'JT',
    text: "I've tried many massage guns before but the NeckEase Pro is on another level. The whisper-quiet motor is incredible — I use it during calls! Delivery was super fast and packaging was premium.",
    product: 'NeckEase Massage Gun Pro',
  },
  {
    name: 'Emily R.',
    location: 'Toronto, Canada',
    rating: 5,
    avatar: 'ER',
    text: "My skin hasn't looked this good in years! The red light wand has noticeably reduced my fine lines and I get compliments constantly. I recommended it to my whole group of friends!",
    product: 'GlowRevive Red Light Face Wand',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display font-800 text-3xl sm:text-4xl text-text-primary mb-4">
            Real Results, Real People
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Join thousands of customers who've transformed their wellness routines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="card p-6">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} className="star-filled" />
                ))}
              </div>

              <p className="text-text-primary leading-relaxed mb-6 text-sm">"{t.text}"</p>

              <div className="flex items-center gap-3 border-t border-gray-50 pt-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-display font-700 text-sm shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-text-primary text-sm">{t.name}</p>
                  <p className="text-text-secondary text-xs">{t.location}</p>
                </div>
                <span className="ml-auto badge-green text-xs">{t.product.split(' ')[0]}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-pill px-5 py-2.5 text-sm text-text-secondary shadow-card">
            ⭐ <strong className="text-text-primary">4.8/5</strong> from over <strong className="text-text-primary">1,200+ verified reviews</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
