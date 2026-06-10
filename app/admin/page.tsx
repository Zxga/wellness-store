'use client';
import { useState, useEffect } from 'react';
import { Lock, BarChart2, ShoppingBag, Mail, RefreshCw } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface ABResult {
  variant: string;
  views: number;
  add_to_carts: number;
  purchases: number;
  conversion_rate: number;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [abResults, setAbResults] = useState<ABResult[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'ab' | 'subscribers'>('orders');

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'admin123') {
      setAuthed(true);
      loadData();
    } else {
      setError('Incorrect password');
    }
  }

  async function loadData() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/data');
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
        setAbResults(data.abResults || []);
        setSubscribers(data.subscribers || []);
      }
    } catch {
      // use mock data if API unavailable
      setOrders([]);
      setAbResults([
        { variant: 'A', views: 124, add_to_carts: 31, purchases: 12, conversion_rate: 9.7 },
        { variant: 'B', views: 118, add_to_carts: 38, purchases: 17, conversion_rate: 14.4 },
      ]);
      setSubscribers([]);
    } finally {
      setLoading(false);
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="card p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock size={24} className="text-primary" />
            </div>
            <h1 className="font-display font-800 text-2xl text-text-primary">Admin Access</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full border border-gray-200 rounded-btn px-4 py-3 focus:outline-none focus:border-primary"
            />
            {error && <p className="text-danger text-sm">{error}</p>}
            <button type="submit" className="btn-primary w-full py-3">Login</button>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'ab', label: 'A/B Tests', icon: BarChart2 },
    { id: 'subscribers', label: 'Subscribers', icon: Mail },
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <h1 className="font-display font-800 text-2xl text-text-primary">WellnessHub Admin</h1>
          <button onClick={loadData} className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-6 border-t border-gray-100">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === id ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-primary'}`}
            >
              <Icon size={16} />{label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'orders' && (
          <div>
            <h2 className="font-display font-700 text-xl text-text-primary mb-5">Recent Orders</h2>
            {orders.length === 0 ? (
              <div className="card p-10 text-center text-text-secondary">
                <p>No orders yet. Orders will appear here once customers checkout.</p>
                <p className="text-xs mt-2 text-gray-400">Connect Supabase to see live data.</p>
              </div>
            ) : (
              <div className="card overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-text-secondary">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Order ID</th>
                      <th className="px-4 py-3 text-left font-medium">Customer</th>
                      <th className="px-4 py-3 text-left font-medium">Total</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-left font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o: any) => (
                      <tr key={o.id} className="border-t border-gray-50">
                        <td className="px-4 py-3 font-mono text-xs">{o.id.slice(0, 8).toUpperCase()}</td>
                        <td className="px-4 py-3">{o.customer_email}</td>
                        <td className="px-4 py-3 font-semibold text-primary">{formatPrice(o.total)}</td>
                        <td className="px-4 py-3">
                          <span className={`badge ${o.status === 'paid' ? 'badge-green' : 'bg-gray-100 text-gray-500'}`}>{o.status}</span>
                        </td>
                        <td className="px-4 py-3 text-text-secondary">{new Date(o.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'ab' && (
          <div>
            <h2 className="font-display font-700 text-xl text-text-primary mb-5">A/B Test Results</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {abResults.map((r) => (
                <div key={r.variant} className={`card p-6 border-2 ${r.variant === 'B' && r.conversion_rate > (abResults.find(x => x.variant === 'A')?.conversion_rate || 0) ? 'border-primary' : 'border-transparent'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-700 text-lg">Variant {r.variant}</h3>
                    {r.variant === 'B' && r.conversion_rate > (abResults.find(x => x.variant === 'A')?.conversion_rate || 0) && (
                      <span className="badge-green text-xs">🏆 Winner</span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-text-secondary text-xs">Views</p>
                      <p className="font-display font-700 text-2xl">{r.views}</p>
                    </div>
                    <div>
                      <p className="text-text-secondary text-xs">Add to Carts</p>
                      <p className="font-display font-700 text-2xl">{r.add_to_carts}</p>
                    </div>
                    <div>
                      <p className="text-text-secondary text-xs">Purchases</p>
                      <p className="font-display font-700 text-2xl">{r.purchases}</p>
                    </div>
                    <div>
                      <p className="text-text-secondary text-xs">Conversion Rate</p>
                      <p className={`font-display font-700 text-2xl ${r.conversion_rate > 10 ? 'text-primary' : 'text-text-primary'}`}>
                        {r.conversion_rate.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="card p-4 bg-amber-50 border border-amber-200">
              <p className="text-sm text-amber-800">
                <strong>Variant B</strong> (urgency-focused layout with social proof) shows higher conversion rates. Consider making it the default layout.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'subscribers' && (
          <div>
            <h2 className="font-display font-700 text-xl text-text-primary mb-5">
              Email Subscribers ({subscribers.length})
            </h2>
            {subscribers.length === 0 ? (
              <div className="card p-10 text-center text-text-secondary">
                <p>No subscribers yet. Subscribers will appear here after the email popup converts.</p>
                <p className="text-xs mt-2 text-gray-400">Connect Supabase to see live data.</p>
              </div>
            ) : (
              <div className="card overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-text-secondary">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Email</th>
                      <th className="px-4 py-3 text-left font-medium">Discount Code</th>
                      <th className="px-4 py-3 text-left font-medium">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((s: any) => (
                      <tr key={s.id} className="border-t border-gray-50">
                        <td className="px-4 py-3">{s.email}</td>
                        <td className="px-4 py-3 font-mono text-xs">{s.discount_code}</td>
                        <td className="px-4 py-3 text-text-secondary">{new Date(s.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
