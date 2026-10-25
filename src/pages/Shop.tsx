import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  X,
  Star,
  ArrowDownUp,
  PackageSearch,
  ChevronDown,
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';
import { toFaDigits } from '../lib/format';

type SortKey = 'featured' | 'cheapest' | 'priciest' | 'rating' | 'newest';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'پیشنهاد روکا' },
  { value: 'cheapest', label: 'ارزان‌ترین' },
  { value: 'priciest', label: 'گران‌ترین' },
  { value: 'rating', label: 'بالاترین امتیاز' },
  { value: 'newest', label: 'جدیدترین' },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') ?? '');
  const [category, setCategory] = useState<string>(searchParams.get('category') ?? 'all');
  const [sort, setSort] = useState<SortKey>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Sync state when URL changes (header search / category links)
  useEffect(() => {
    setQuery(searchParams.get('search') ?? '');
    setCategory(searchParams.get('category') ?? 'all');
  }, [searchParams]);

  const updateParams = (next: { search?: string; category?: string }) => {
    const params = new URLSearchParams(searchParams);
    if (next.search !== undefined) {
      if (next.search) params.set('search', next.search);
      else params.delete('search');
    }
    if (next.category !== undefined) {
      if (next.category && next.category !== 'all') params.set('category', next.category);
      else params.delete('category');
    }
    setSearchParams(params, { replace: true });
  };

  const commitSearch = (value: string) => {
    setQuery(value);
    updateParams({ search: value.trim() });
  };

  const activeCategory = CATEGORIES.find((c) => c.id === category);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (inStockOnly && !p.inStock) return false;
      if (!q) return true;
      const haystack = `${p.name} ${p.brand} ${p.description} ${CATEGORIES.find((c) => c.id === p.category)?.name ?? ''}`.toLowerCase();
      return q.split(/\s+/).every((token) => haystack.includes(token));
    });
    switch (sort) {
      case 'cheapest':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'priciest':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case 'newest':
        list = [...list].sort((a, b) => Number(!!b.badge) - Number(!!a.badge));
        break;
      default:
        list = [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || b.rating - a.rating);
    }
    return list;
  }, [query, category, sort, inStockOnly]);

  const hasActiveFilters = category !== 'all' || inStockOnly || query.trim() !== '';

  const clearAll = () => {
    setQuery('');
    setCategory('all');
    setSort('featured');
    setInStockOnly(false);
    setSearchParams({}, { replace: true });
  };

  const FilterPanel = (
    <div className="grid gap-6">
      {/* Category filter */}
      <fieldset>
        <legend className="text-[0.72rem] font-extrabold tracking-widest text-olive">دسته‌بندی</legend>
        <div className="mt-2 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
          <button
            type="button"
            onClick={() => updateParams({ category: 'all' })}
            aria-pressed={category === 'all'}
            className={`rounded-full border px-3.5 py-2 text-[0.75rem] font-bold transition lg:rounded-xl lg:px-4 lg:py-2.5 lg:text-start ${
              category === 'all'
                ? 'border-forest bg-forest text-sand'
                : 'border-stone bg-white text-charcoal hover:border-forest hover:text-forest'
            }`}
          >
            همهٔ محصولات <span className="tabular-nums opacity-80">({toFaDigits(PRODUCTS.length)})</span>
          </button>
          {CATEGORIES.map((c) => {
            const count = PRODUCTS.filter((p) => p.category === c.id).length;
            const selected = category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => updateParams({ category: c.id })}
                aria-pressed={selected}
                className={`rounded-full border px-3.5 py-2 text-[0.75rem] font-bold transition lg:rounded-xl lg:px-4 lg:py-2.5 lg:text-start ${
                  selected
                    ? 'border-forest bg-forest text-sand'
                    : 'border-stone bg-white text-charcoal hover:border-forest hover:text-forest'
                }`}
              >
                {c.name} <span className="tabular-nums opacity-80">({toFaDigits(count)})</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Availability */}
      <fieldset>
        <legend className="text-[0.72rem] font-extrabold tracking-widest text-olive">موجودی</legend>
        <label className="mt-2 flex cursor-pointer items-center gap-2.5 rounded-xl border border-stone bg-white px-4 py-3 transition hover:border-forest">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="size-4 accent-[#233D32]"
          />
          <span className="text-[0.8rem] font-bold text-charcoal">فقط کالاهای موجود</span>
        </label>
      </fieldset>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearAll}
          className="flex h-10 items-center justify-center gap-1.5 rounded-xl border border-stone text-[0.76rem] font-bold text-olive transition hover:border-danger hover:text-danger"
        >
          <X size={14} aria-hidden="true" />
          حذف همهٔ فیلترها
        </button>
      )}
    </div>
  );

  return (
    <div>
      {/* Page header */}
      <div className="border-b border-stone bg-sand/25">
        <div className="shell py-7 lg:py-9">
          <p className="text-[0.68rem] font-extrabold tracking-widest text-ember">فروشگاه روکا</p>
          <h1 className="mt-1.5 text-2xl font-black text-forest sm:text-3xl">
            {activeCategory ? activeCategory.name : 'همهٔ تجهیزات کمپ و طبیعت‌گردی'}
          </h1>
          <p className="mt-1.5 text-[0.8rem] text-olive">
            {toFaDigits(filtered.length)} کالا {query.trim() && <>برای «<span className="font-bold text-charcoal">{query.trim()}</span>»</>}
          </p>
        </div>
      </div>

      <div className="shell grid gap-6 py-6 lg:grid-cols-12 lg:py-10">
        {/* Desktop sidebar */}
        <aside className="hidden lg:col-span-3 xl:col-span-2 lg:block" aria-label="فیلتر محصولات">
          <div className="sticky top-24 rounded-2xl border border-stone bg-offwhite p-5">
            <p className="flex items-center gap-2 text-[0.85rem] font-extrabold text-forest">
              <SlidersHorizontal size={17} aria-hidden="true" />
              فیلترها
            </p>
            <div className="mt-4">{FilterPanel}</div>
          </div>
        </aside>

        <div className="lg:col-span-9 xl:col-span-10">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                commitSearch(query);
              }}
              role="search"
              className="relative min-w-0 flex-1"
            >
              <Search size={17} aria-hidden="true" className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-olive" />
              <label htmlFor="shop-search" className="sr-only">جستجو در محصولات</label>
              <input
                id="shop-search"
                type="text"
                value={query}
                onChange={(e) => commitSearch(e.target.value)}
                placeholder="جستجو در نام، برند یا توضیح کالا…"
                className="h-11 w-full rounded-xl border border-stone bg-white ps-10 pe-9 text-[0.82rem] placeholder:text-olive/75 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/15"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => commitSearch('')}
                  aria-label="پاک‌کردن جستجو"
                  className="absolute end-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-lg text-olive hover:bg-sand/60 hover:text-charcoal"
                >
                  <X size={16} />
                </button>
              )}
            </form>

            {/* Sort */}
            <div className="relative">
              <ArrowDownUp size={16} aria-hidden="true" className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-olive" />
              <label htmlFor="shop-sort" className="sr-only">مرتب‌سازی</label>
              <select
                id="shop-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-11 appearance-none rounded-xl border border-stone bg-white ps-9 pe-8 text-[0.8rem] font-bold text-charcoal focus:border-forest focus:outline-none"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={15} aria-hidden="true" className="pointer-events-none absolute end-2.5 top-1/2 -translate-y-1/2 text-olive" />
            </div>

            {/* Mobile filter toggle */}
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
              aria-controls="mobile-filters"
              className="flex h-11 items-center gap-2 rounded-xl border border-stone bg-white px-4 text-[0.8rem] font-bold text-charcoal transition hover:border-forest lg:hidden"
            >
              <SlidersHorizontal size={16} aria-hidden="true" />
              فیلترها
              {hasActiveFilters && <span className="size-2 rounded-full bg-ember" aria-hidden="true" />}
            </button>
          </div>

          {/* Mobile filter panel */}
          {filtersOpen && (
            <div id="mobile-filters" className="mt-3 rounded-2xl border border-stone bg-offwhite p-4 lg:hidden anim-overlay-in">
              {FilterPanel}
            </div>
          )}

          {/* Result count + rating hint */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-[0.75rem] font-bold text-olive" aria-live="polite">
              <span className="text-charcoal">{toFaDigits(filtered.length)}</span> کالا یافت شد
            </p>
            <p className="hidden items-center gap-1 text-[0.7rem] font-semibold text-olive sm:flex">
              <Star size={12} className="fill-amber-400 text-amber-400" aria-hidden="true" />
              امتیازها بر اساس نظر خریداران روکا ثبت شده‌اند
            </p>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 sm:gap-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="mt-6 flex flex-col items-center rounded-3xl border border-dashed border-stone bg-white px-6 py-16 text-center">
              <PackageSearch size={44} strokeWidth={1.5} className="text-sand-deep" aria-hidden="true" />
              <h2 className="mt-4 text-lg font-extrabold text-charcoal">نتیجه‌ای پیدا نشد</h2>
              <p className="mt-1.5 max-w-xs text-[0.8rem] leading-6 text-olive">
                برای «{query}» کالایی در فروشگاه نداریم. عبارت دیگری امتحان کنید یا فیلترها را پاک کنید.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="mt-5 h-11 rounded-xl bg-forest px-6 text-[0.85rem] font-bold text-sand transition hover:bg-pine"
              >
                پاک‌کردن جستجو و فیلترها
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
