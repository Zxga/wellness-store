'use client';
import { useState, useEffect } from 'react';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { FALLBACK_PRODUCTS } from '@/lib/fallback';
import { Product } from '@/types';
import { cn } from '@/lib/utils';

const CATEGORIES = ['All', 'Heat Therapy', 'Massage', 'Skincare', 'Recovery'];
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
  const [priceMax, setPriceMax] = useState(120);
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch(`/api/products?category=${category === 'All' ? '' : category}&sort=${sort}`)
      .then((r) => r.json())
      .then((data) => { if (data?.products) setProducts(data.products); })
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

  function resetFilters() {
    setCategory('All');
    setPriceMax(120);
    setSort('best_selling');
    setPage(1);
  }

  const Sidebar = () => (
    <aside className="space-y-6">
      <div>
        <h3 className="font-display font-700 text-text-primary mb-3">Category</h3>
        <div className="space-y-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => { setCategory(c); setPage(1); }}
              className={cn(
                'w-full text-left px-3 py-2 rounded-btn text-sm font-medium transition-colors',
                category === c ? 'bg-primary text-white' : 'text-text-secondary hover:bg-gray-50'
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display font-700 text-text-primary mb-3">Max Price: ${priceMax}</h3>
        <input
          type="range"
          min={20}
          max={120}
          value={priceMax}
          onChange={(e) => { setPriceMax(Number(e.target.value)); setPage(1); }}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-text-secondary mt-1">
          <span>$20</span><span>$120</span>
        </div>
      </div>

      <button
        onClick={resetFilters}
        className="text-sm text-danger hover:underline flex items-center gap-1"
      >
        <X size={14} /> Reset Filters
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
            className="flex items-center gap-2 text-sm font-medium text-text-secondary border border-gray-200 px-3 py-2 rounded-btn hover:border-primary hover:text-primary transition-colors lg:hidden"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
          <span className="text-text-secondary text-sm">{filtered.length} products</span>
        </div>

        <div className="relative">
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1); }}
            className="appearance-none bg-white border border-gray-200 text-text-primary text-sm px-4 py-2 pr-8 rounded-btn focus:outline-none focus:border-primary"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
        </div>
      </div>

      {/* Mobile filters overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/40" onClick={() => setSidebarOpen(false)}>
          <div
            className="absolute left-0 top-0 h-full w-72 bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
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
        <div className="hidden lg:block w-56 shrink-0">
          <Sidebar />
        </div>

        {/* Products */}
        <div className="flex-1 min-w-0">
          {paginated.length === 0 ? (
            <div className="text-center py-20 text-text-secondary">
              <p className="text-lg font-medium">No products found</p>
              <button onClick={resetFilters} className="btn-primary mt-4 text-sm">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginated.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={cn(
                    'w-9 h-9 rounded-btn text-sm font-semibold transition-colors',
                    page === i + 1 ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-text-secondary hover:border-primary hover:text-primary'
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
