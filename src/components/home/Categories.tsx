import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { CATEGORIES } from '../../data/products';
import { toFaDigits } from '../../lib/format';

export default function Categories() {
  return (
    <section id="categories" className="shell scroll-mt-24 py-12 lg:py-16" aria-labelledby="categories-title">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[0.7rem] font-extrabold tracking-widest text-ember">خرید بر اساس نیاز</p>
          <h2 id="categories-title" className="mt-2 text-2xl font-black text-forest sm:text-3xl">
            دسته‌بندی تجهیزات
          </h2>
        </div>
        <Link
          to="/shop"
          className="group flex shrink-0 items-center gap-1.5 text-[0.8rem] font-extrabold text-forest transition hover:text-ember"
        >
          همهٔ محصولات
          <ArrowLeft size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1" />
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            to={`/shop?category=${cat.id}`}
            className="group overflow-hidden rounded-2xl border border-stone bg-white shadow-[var(--shadow-card)] transition hover:border-forest/40 hover:shadow-[var(--shadow-lift)] focus-visible:outline-forest"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                width={400}
                height={300}
                className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pine/70 via-pine/10 to-transparent" aria-hidden="true" />
              <span className="absolute bottom-2 start-2.5 rounded-full bg-pine/70 px-2 py-0.5 text-[0.6rem] font-bold text-sand backdrop-blur-sm">
                {toFaDigits(cat.count)} کالا
              </span>
            </div>
            <div className="p-3">
              <h3 className="text-[0.78rem] font-extrabold leading-5 text-charcoal transition-colors group-hover:text-forest sm:text-[0.82rem]">
                {cat.name}
              </h3>
              <p className="mt-1 hidden text-[0.65rem] leading-5 text-olive sm:block">{cat.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
