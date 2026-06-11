'use client';
import { useState, useEffect } from 'react';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { FALLBACK_PRODUCTS } from '@/lib/fallback';
import { Product } from '@/types';
import { cn } from '@/lib/utils';

const CATEGORIES = ['All', 'Light Therapy', 'Recovery', 'Sleep & Relax'];
const SORT_OPTIONS = [
  { value: 'best_selling', label: 'Best Selling' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
];
const PER_PAGE = 12;

export default function ShopClient() {
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('best_selling');
  const [priceMax, setPriceMax] = useState(150);
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch(`/api/products?category=${category === 'All' ? '' : category}&sort=${sort}`)
      .then((r) => r.json())
      .then((data) => { if (data?.products?.length) setProducts(data.products); })
      .catch(() => {});
  }, [category, sort]);

  const filtered = products
    .filter((p) => (category === 'All' || p.category === category) && p.price <= priceMax)
    .sort((a, b) => {
      if (sort === 'price_asc') return a.price - b.price;
      if (sort === 'price_desc') return b.price - a.price;
      if (sort === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      return b.review_count - a.review_count;
    });

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const Sidebar = () => (
    <aside className="space-y-7">
      <div>
        <h3 className="font-display font-700 text-white text-sm uppercase tracking-wider mb-4">Category</h3>
        <div className="space-y-1">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => { setCategory(c); setPage(1); }}
              className={cn(
                'w-full text-left px-3 py-2.5 rounded-btn text-sm font-medium transition-all',
                category === c
                  ? 'bg-primary/20 text-accent border border-[rgba(240,98,146,0.3)] shadow-[0_0_12px_rgba(194,24,91,0.2)]'
                  : 'text-text-secondary hover:text-white hover:bg-white/5'
              )}
            >{c}</button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display font-700 text-white text-sm uppercase tracking-wider mb-4">
          Max Price: ${priceMax}
        </h3>
        <input
          type="range"
          min={25}
          max={150}
          value={priceMax}
          onChange={(e) => { setPriceMax(Number(e.target.value)); setPage(1); }}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-text-tertiary mt-1"><span>$25</span><span>$150</span></div>
      </div>

      <button
        onClick={() => { setCategory('All'); setPriceMax(150); setSort('best_selling'); setPage(1); }}
        className="text-sm text-danger hover:text-danger/70 flex items-center gap-1 transition-colors"
      >
        <X size={13} /> Reset Filters
      </button>
    </aside>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-2 text-sm font-medium text-text-secondary border border-white/15 px-3 py-2 rounded-btn hover:border-secondary hover:text-accent transition-all lg:hidden"
          >
            <SlidersHorizontal size={15} /> Filters
          </button>
          <span className="text-text-secondary text-sm">{filtered.length} products</span>
        </div>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1); }}
            className="appearance-none bg-elevated border border-white/15 text-white text-sm px-4 py-2 pr-8 rounded-btn focus:outline-none focus:border-secondary cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}>
          <div className="absolute left-0 top-0 h-full w-72 border-r border-white/10 p-6 shadow-2xl"
            style={{ background: '#1F0810' }}
            onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display font-700 text-lg">Filters</h2>
              <button onClick={() => setSidebarOpen(false)}><X size={20} /></button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <div className="hidden lg:block w-52 shrink-0">
          <Sidebar />
        </div>

        {/* Products grid */}
        <div className="flex-1 min-w-0">
          {paginated.length === 0 ? (
            <div className="text-center py-20 text-text-secondary">
              <p className="text-lg font-medium">No products found</p>
              <button onClick={() => { setCategory('All'); setPriceMax(150); }} className="btn-primary mt-4 text-sm px-6 py-2.5">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginated.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={cn(
                    'w-9 h-9 rounded-btn text-sm font-semibold transition-all',
                    page === i + 1
                      ? 'bg-primary text-white shadow-[0_0_16px_rgba(194,24,91,0.4)]'
                      : 'border border-white/15 text-text-secondary hover:border-secondary hover:text-white'
                  )}
                >{i + 1}</button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
