'use client';
import { useState } from 'react';
import { Mail, MessageSquare, Clock, Send } from 'lucide-react';
import Toast from '@/components/ui/Toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setToast({ message: "Message sent! We'll get back to you within 24 hours.", type: 'success' });
        setForm({ name: '', email: '', message: '' });
      } else throw new Error();
    } catch {
      setToast({ message: 'Something went wrong. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 glow-radial opacity-20 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h1 className="font-display font-800 text-4xl mb-3">Contact RAYLUNE</h1>
          <p className="text-text-secondary text-lg">We usually respond within 24 hours.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="space-y-5">
            {[
              { icon: Mail, label: 'Email', sub: 'hello@raylune.com' },
              { icon: MessageSquare, label: 'Live Chat', sub: 'Mon–Fri, 9am–6pm EST' },
              { icon: Clock, label: 'Response Time', sub: 'Within 24 hours' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="card p-5">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center mb-3">
                  <Icon size={17} className="text-secondary" />
                </div>
                <p className="font-semibold text-white text-sm mb-0.5">{label}</p>
                <p className="text-text-secondary text-sm">{sub}</p>
              </div>
            ))}
          </div>

          <div className="md:col-span-2 card p-8">
            <h2 className="font-display font-700 text-xl mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-1.5">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    placeholder="Your name"
                    className="input-dark w-full px-4 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1.5">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    placeholder="your@email.com"
                    className="input-dark w-full px-4 py-2.5 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1.5">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={6}
                  placeholder="How can we help?"
                  className="input-dark w-full px-4 py-2.5 text-sm resize-none"
                />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full py-3 gap-2 disabled:opacity-60">
                <Send size={16} />
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
