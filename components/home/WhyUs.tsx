import { FlaskConical, ShieldCheck, Stethoscope, Sparkles, Gem } from 'lucide-react';

const points = [
  { icon: FlaskConical, label: 'Clinically Studied', sub: 'Wavelengths' },
  { icon: Sparkles, label: 'Non-Invasive', sub: 'Zero downtime' },
  { icon: Stethoscope, label: 'Dermatologist', sub: 'Approved' },
  { icon: ShieldCheck, label: 'Visible Results', sub: 'In weeks' },
  { icon: Gem, label: 'Premium', sub: 'Materials' },
];

export default function WhyUs() {
  return (
    <section className="relative py-16 border-y border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-display font-800 text-2xl sm:text-3xl mb-12 tracking-tight">
          Tested. Trusted. <span className="text-secondary text-glow">Radiant.</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {points.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-full bg-elevated border border-white/10 flex items-center justify-center mb-4 group-hover:border-[rgba(240,98,146,0.4)] group-hover:shadow-[0_0_24px_rgba(194,24,91,0.3)] transition-all duration-300">
                <Icon size={22} className="text-secondary" />
              </div>
              <p className="font-display font-700 text-white text-sm">{label}</p>
              <p className="text-text-tertiary text-xs mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
