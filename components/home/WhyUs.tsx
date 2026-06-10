import { Zap, RotateCcw, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Fast Global Shipping',
    description: 'Free shipping on all orders. Express options available. We deliver to 30+ countries worldwide.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: RotateCcw,
    title: '30-Day Returns',
    description: "Not happy? Return it hassle-free within 30 days, no questions asked. Your satisfaction is our promise.",
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Guaranteed',
    description: 'Every product rigorously tested and certified. We only sell what we believe in — premium wellness devices.',
    color: 'bg-green-100 text-primary',
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display font-800 text-3xl sm:text-4xl text-text-primary mb-4">
            Why Choose WellnessHub?
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            We're obsessed with your wellness journey. Here's what sets us apart.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, description, color }) => (
            <div key={title} className="text-center p-8 rounded-card border border-gray-100 hover:shadow-card hover:-translate-y-1 transition-all duration-200">
              <div className={`w-16 h-16 rounded-full ${color} flex items-center justify-center mx-auto mb-5`}>
                <Icon size={28} />
              </div>
              <h3 className="font-display font-700 text-xl text-text-primary mb-3">{title}</h3>
              <p className="text-text-secondary leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
