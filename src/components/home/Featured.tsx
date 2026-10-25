import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import ProductCard from '../ProductCard';

export default function Featured() {
  const featured = PRODUCTS.filter((p) => p.featured);

  return (
    <section id="featured" className="border-y border-stone bg-sand/30" aria-labelledby="featured-title">
      <div className="shell py-12 lg:py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-1.5 text-[0.7rem] font-extrabold tracking-widest text-ember">
              <Sparkles size={13} aria-hidden="true" />
              منتخب توسط کارشناسان روکا
            </p>
            <h2 id="featured-title" className="mt-2 text-2xl font-black text-forest sm:text-3xl">
              تجهیزات پیشنهادی این هفته
            </h2>
            <p className="mt-1.5 max-w-md text-[0.8rem] leading-6 text-olive">
              پربازدیدترین و خوش‌نظرترین کالاهای فروشگاه؛ انتخاب حرفه‌ای‌ها برای همین فصل.
            </p>
          </div>
          <Link
            to="/shop"
            className="group flex shrink-0 items-center gap-1.5 text-[0.8rem] font-extrabold text-forest transition hover:text-ember"
          >
            همهٔ محصولات
            <ArrowLeft size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1" />
          </Link>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
