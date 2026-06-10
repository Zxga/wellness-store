import Image from 'next/image';
import { Leaf, Heart, Award } from 'lucide-react';

export const metadata = {
  title: 'About Us',
  description: 'Learn about WellnessHub — our mission to bring professional wellness therapy to your home.',
};

const team = [
  { name: 'Alex Chen', role: 'Founder & CEO', initials: 'AC', bg: 'bg-green-100 text-primary' },
  { name: 'Maya Johnson', role: 'Head of Product', initials: 'MJ', bg: 'bg-amber-100 text-amber-700' },
  { name: 'Sam Williams', role: 'Customer Experience', initials: 'SW', bg: 'bg-blue-100 text-blue-700' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Leaf size={30} className="text-white" />
          </div>
          <h1 className="font-display font-800 text-4xl sm:text-5xl text-text-primary mb-6">
            Our Story
          </h1>
          <p className="text-text-secondary text-xl leading-relaxed max-w-2xl mx-auto">
            WellnessHub was born from a simple belief: everyone deserves access to professional-grade wellness therapy without the spa price tag.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display font-700 text-3xl text-text-primary mb-5">From Idea to Your Doorstep</h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                It started in 2021 when our founder Alex was struggling with chronic back pain. After spending thousands on physio appointments, a friend recommended an infrared sauna blanket. The results were transformative — but finding quality devices at reasonable prices was nearly impossible.
              </p>
              <p>
                We spent 18 months testing hundreds of wellness devices, working directly with certified manufacturers, and building relationships with wellness experts. Today, WellnessHub curates only the best — devices that deliver real results at fair prices.
              </p>
              <p>
                Over 50,000 customers later, our mission remains unchanged: make professional wellness accessible to everyone, everywhere.
              </p>
            </div>
          </div>
          <div className="relative h-80 rounded-card overflow-hidden shadow-card">
            <Image
              src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80"
              alt="Wellness lifestyle"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display font-700 text-3xl text-text-primary mb-10">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: 'Customer First', desc: 'Every decision we make starts with the question: is this best for our customer? Your health and satisfaction drive everything we do.' },
              { icon: Award, title: 'Uncompromising Quality', desc: 'We test every product ourselves. If we wouldn\'t recommend it to our families, it doesn\'t make the cut.' },
              { icon: Leaf, title: 'Wellness for All', desc: 'Professional wellness shouldn\'t be a luxury. We\'re on a mission to democratize health technology for everyone.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-left p-6 bg-white rounded-card shadow-card">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="font-display font-700 text-lg text-text-primary mb-2">{title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display font-700 text-3xl text-text-primary mb-10">Meet the Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="card p-6 text-center">
                <div className={`w-20 h-20 ${member.bg} rounded-full flex items-center justify-center font-display font-800 text-2xl mx-auto mb-4`}>
                  {member.initials}
                </div>
                <h3 className="font-display font-700 text-text-primary">{member.name}</h3>
                <p className="text-text-secondary text-sm mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
