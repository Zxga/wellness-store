'use client';
import { useState } from 'react';
import { Mail, MessageSquare, Send, MapPin } from 'lucide-react';
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
      } else {
        throw new Error('Failed');
      }
    } catch {
      setToast({ message: 'Something went wrong. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="font-display font-800 text-4xl text-text-primary mb-3">Contact Us</h1>
          <p className="text-text-secondary text-lg">We'd love to hear from you. We usually respond within 24 hours.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Info */}
          <div className="space-y-6">
            <div className="card p-5">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <Mail size={18} className="text-primary" />
              </div>
              <h3 className="font-semibold text-text-primary mb-1">Email</h3>
              <p className="text-text-secondary text-sm">hello@wellnesshub.com</p>
            </div>

            <div className="card p-5">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <MessageSquare size={18} className="text-primary" />
              </div>
              <h3 className="font-semibold text-text-primary mb-1">Live Chat</h3>
              <p className="text-text-secondary text-sm">Available Mon–Fri, 9am–6pm EST</p>
            </div>

            <div className="card p-5">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <MapPin size={18} className="text-primary" />
              </div>
              <h3 className="font-semibold text-text-primary mb-1">Response Time</h3>
              <p className="text-text-secondary text-sm">We aim to reply within 24 hours on business days</p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 card p-8">
            <h2 className="font-display font-700 text-xl text-text-primary mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    placeholder="Your name"
                    className="w-full border border-gray-200 rounded-btn px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    placeholder="your@email.com"
                    className="w-full border border-gray-200 rounded-btn px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={6}
                  placeholder="How can we help you?"
                  className="w-full border border-gray-200 rounded-btn px-4 py-2.5 text-sm focus:outline-none focus:border-primary resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex items-center gap-2 disabled:opacity-60 w-full justify-center py-3"
              >
                <Send size={16} />
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
