import { FormEvent, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, Phone } from 'lucide-react';
import Logo from './Logo';
import { useCart } from '../context/CartContext';
import { toFaDigits } from '../lib/format';

const NAV: { label: string; to?: string; section?: string }[] = [
  { to: '/shop', label: 'فروشگاه' },
  { section: 'categories', label: 'دسته‌بندی‌ها' },
  { section: 'guide', label: 'راهنمای خرید' },
  { section: 'about', label: 'درباره ما' },
];

export default function Header() {
  const { count, openCart } = useCart();
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  const goToSection = (id: string) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/shop?search=${encodeURIComponent(q)}` : '/shop');
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40">
      {/* Announcement bar */}
      <div className="bg-pine text-sand/90 text-[0.65rem] sm:text-[0.7rem] font-medium leading-6">
        <div className="shell flex h-8 items-center justify-between gap-3">
          <p className="truncate">ارسال رایگان برای سفارش‌های بالای ۳ میلیون تومان · ۷ روز مهلت تست و بازگشت</p>
          <a href="tel:02191000123" className="hidden sm:flex items-center gap-1.5 hover:text-sand transition-colors shrink-0" dir="ltr">
            <Phone size={11} aria-hidden="true" />
            <span className="tabular-nums">021-91000123</span>
          </a>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`border-b transition-all duration-300 ${
          scrolled ? 'bg-offwhite/90 backdrop-blur-xl border-stone shadow-[0_1px_0_0_rgba(23,43,36,0.04)]' : 'bg-offwhite border-transparent'
        }`}
      >
        <div className="shell flex h-16 items-center gap-3 sm:gap-5">
          <button
            type="button"
            className="lg:hidden grid size-10 place-items-center rounded-xl text-forest hover:bg-sand/50 transition-colors"
            aria-label={mobileOpen ? 'بستن منو' : 'باز کردن منو'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Logo />

          {/* Search — desktop */}
          <form onSubmit={submitSearch} role="search" className="relative hidden md:flex flex-1 max-w-xl mx-auto">
            <Search size={18} aria-hidden="true" className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-olive" />
            <label htmlFor="site-search" className="sr-only">جستجوی کالا</label>
            <input
              id="site-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جستجوی چادر، کوله‌پشتی، کیسه‌خواب…"
              className="h-11 w-full rounded-full border border-stone bg-white ps-11 pe-4 text-sm text-charcoal placeholder:text-olive/80 shadow-sm transition focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/15"
            />
            <button
              type="submit"
              className="absolute end-1.5 top-1/2 -translate-y-1/2 h-8 rounded-full bg-forest px-4 text-xs font-bold text-sand transition hover:bg-pine"
            >
              جستجو
            </button>
          </form>

          <nav className="hidden lg:flex items-center gap-6 text-[0.83rem] font-bold text-charcoal" aria-label="ناوبری اصلی">
            {NAV.map((item) =>
              item.section ? (
                <button
                  key={item.section}
                  type="button"
                  onClick={() => goToSection(item.section!)}
                  className="hover:text-forest transition-colors py-2"
                >
                  {item.label}
                </button>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to!}
                  className={({ isActive }) =>
                    `py-2 transition-colors hover:text-forest ${isActive ? 'text-forest border-b-2 border-ember' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>

          {/* Cart */}
          <button
            type="button"
            onClick={openCart}
            aria-label={`سبد خرید، ${toFaDigits(count)} کالا`}
            className="relative flex h-11 items-center gap-2 rounded-full border border-stone bg-white ps-3 pe-3 sm:ps-4 sm:pe-2 shadow-sm transition hover:border-forest hover:shadow"
          >
            <ShoppingCart size={19} className="text-forest" aria-hidden="true" />
            <span className="hidden sm:inline text-[0.8rem] font-bold text-charcoal">سبد خرید</span>
            <span
              className="grid size-6 min-w-6 place-items-center rounded-full bg-ember px-1 text-[0.65rem] font-extrabold text-white tabular-nums"
              aria-hidden="true"
            >
              {toFaDigits(count)}
            </span>
          </button>
        </div>

        {/* Search — mobile */}
        <form onSubmit={submitSearch} role="search" className="shell md:hidden pb-2.5">
          <div className="relative">
            <Search size={17} aria-hidden="true" className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-olive" />
            <label htmlFor="site-search-mobile" className="sr-only">جستجوی کالا</label>
            <input
              id="site-search-mobile"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جستجوی تجهیزات…"
              className="h-10 w-full rounded-full border border-stone bg-white ps-10 pe-3 text-[0.82rem] placeholder:text-olive/80 focus:border-forest focus:outline-none"
            />
          </div>
        </form>

        {/* Mobile menu */}
        {mobileOpen && (
          <div ref={mobileRef} className="lg:hidden border-t border-stone bg-offwhite anim-overlay-in">
            <div className="shell py-4">
              <nav className="grid gap-1 text-[0.95rem] font-bold text-charcoal" aria-label="منوی موبایل">
                {NAV.map((item) =>
                  item.section ? (
                    <button
                      key={item.section}
                      type="button"
                      onClick={() => goToSection(item.section!)}
                      className="rounded-xl px-4 py-3 text-start hover:bg-sand/50 hover:text-forest transition-colors"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <NavLink
                      key={item.to}
                      to={item.to!}
                      className="rounded-xl px-4 py-3 hover:bg-sand/50 hover:text-forest transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  ),
                )}
              </nav>
              <a
                href="tel:02191000123"
                dir="ltr"
                className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-stone bg-white px-4 py-3 text-sm font-bold text-forest"
              >
                <Phone size={16} aria-hidden="true" />
                021-91000123
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
