import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShoppingCart,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronLeft,
  Minus,
  Plus,
  BadgeCheck,
  Store,
} from 'lucide-react';
import { getProduct, relatedProducts, CATEGORIES } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatToman, formatRating, toFaDigits } from '../lib/format';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? getProduct(id) : undefined;
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'about'>('specs');

  useEffect(() => {
    setQty(1);
    setActiveTab('specs');
    window.scrollTo(0, 0);
  }, [id]);

  const related = useMemo(() => (product ? relatedProducts(product, 4) : []), [product]);
  const category = product ? CATEGORIES.find((c) => c.id === product.category) : undefined;

  if (!product) {
    return (
      <div className="shell flex flex-col items-center py-24 text-center">
        <h1 className="text-xl font-black text-charcoal">این کالا پیدا نشد</h1>
        <p className="mt-2 text-sm text-olive">ممکن است نشانی تغییر کرده یا کالا از فروشگاه خارج شده باشد.</p>
        <Link to="/shop" className="mt-6 h-11 inline-flex items-center rounded-xl bg-forest px-6 text-sm font-bold text-sand">
          بازگشت به فروشگاه
        </Link>
      </div>
    );
  }

  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="shell py-5 lg:py-8">
      {/* Breadcrumb */}
      <nav aria-label="مسیر صفحه" className="flex flex-wrap items-center gap-1 text-[0.72rem] font-semibold text-olive">
        <Link to="/" className="hover:text-forest">خانه</Link>
        <ChevronLeft size={13} aria-hidden="true" />
        <Link to="/shop" className="hover:text-forest">فروشگاه</Link>
        {category && (
          <>
            <ChevronLeft size={13} aria-hidden="true" />
            <Link to={`/shop?category=${category.id}`} className="hover:text-forest">
              {category.name}
            </Link>
          </>
        )}
        <ChevronLeft size={13} aria-hidden="true" />
        <span className="text-charcoal line-clamp-1 max-w-[40ch]">{product.name}</span>
      </nav>

      <div className="mt-5 grid gap-6 lg:grid-cols-12">
        {/* Gallery */}
        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-3xl border border-stone bg-sand/40 shadow-[var(--shadow-card)]">
            <img
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="mt-3 hidden grid-cols-3 gap-2 sm:grid">
            {[product.image, '/images/hero-camp.jpg', category?.image ?? product.image].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                aria-hidden="true"
                width={200}
                height={150}
                className="aspect-[4/3] w-full rounded-xl border border-stone object-cover"
                loading="lazy"
              />
            ))}
          </div>
        </div>

        {/* Purchase panel */}
        <div className="lg:col-span-7">
          <div className="flex h-full flex-col">
            <p className="flex items-center gap-2 text-[0.7rem] font-extrabold tracking-wide text-olive">
              <Store size={13} aria-hidden="true" />
              برند {product.brand}
              {product.badge && (
                <span className="rounded-full bg-forest px-2.5 py-0.5 text-[0.62rem] font-extrabold text-sand">
                  {product.badge}
                </span>
              )}
            </p>

            <h1 className="mt-2 text-xl font-black leading-8 text-charcoal sm:text-2xl sm:leading-10">
              {product.name}
            </h1>

            <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.74rem] font-semibold text-olive">
              {product.rating > 0 && (
                <span className="flex items-center gap-1.5">
                  <Star size={14} className="fill-amber-400 text-amber-400" aria-hidden="true" />
                  <span className="font-extrabold text-charcoal">{formatRating(product.rating)}</span>
                  <span>از ۵ — {toFaDigits(product.reviewCount)} نظر خریدار</span>
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-success" aria-hidden="true" />
                ضمانت اصالت کالا
              </span>
            </div>

            <p className="mt-4 max-w-2xl text-[0.85rem] leading-7 text-charcoal/90">
              {product.description}
            </p>

            {/* Price + CTA card */}
            <div className="mt-5 rounded-2xl border border-stone bg-white p-5 shadow-[var(--shadow-card)]">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-black text-forest">{formatToman(product.price)}</span>
                    {discount > 0 && (
                      <span className="rounded-full bg-danger-bg px-2.5 py-0.5 text-[0.7rem] font-extrabold text-danger">
                        {toFaDigits(discount)}٪ تخفیف
                      </span>
                    )}
                  </div>
                  {product.compareAtPrice && (
                    <span className="mt-0.5 block text-[0.75rem] font-medium text-olive line-through decoration-[1.5px]">
                      قیمت قبل: {formatToman(product.compareAtPrice)}
                    </span>
                  )}
                </div>
                <span className={`flex items-center gap-1.5 text-[0.75rem] font-extrabold ${product.inStock ? 'text-success' : 'text-danger'}`}>
                  <span className={`size-2 rounded-full ${product.inStock ? 'bg-success' : 'bg-danger'}`} aria-hidden="true" />
                  {product.inStock ? 'موجود در انبار' : 'ناموجود'}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                {/* Qty */}
                <div className="flex h-12 items-center rounded-xl border border-stone bg-offwhite" role="group" aria-label="تعداد">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={!product.inStock}
                    aria-label="کاهش تعداد"
                    className="grid size-12 place-items-center rounded-s-xl text-forest transition hover:bg-sand/60 disabled:opacity-40"
                  >
                    <Minus size={17} />
                  </button>
                  <span className="w-10 text-center text-base font-extrabold tabular-nums text-charcoal" aria-live="polite">
                    {toFaDigits(qty)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(20, q + 1))}
                    disabled={!product.inStock}
                    aria-label="افزایش تعداد"
                    className="grid size-12 place-items-center rounded-e-xl text-forest transition hover:bg-sand/60 disabled:opacity-40"
                  >
                    <Plus size={17} />
                  </button>
                </div>

                <button
                  type="button"
                  disabled={!product.inStock}
                  onClick={() => addToCart(product.id, qty)}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-forest text-[0.9rem] font-extrabold text-sand transition hover:bg-pine disabled:cursor-not-allowed disabled:bg-stone disabled:text-olive"
                >
                  <ShoppingCart size={19} aria-hidden="true" />
                  {product.inStock ? 'افزودن به سبد خرید' : 'فعلاً ناموجود است'}
                </button>
                <button
                  type="button"
                  disabled={!product.inStock}
                  onClick={() => {
                    addToCart(product.id, qty, { silent: true });
                    navigate('/checkout');
                  }}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-ember text-[0.9rem] font-extrabold text-white transition hover:bg-ember-dark disabled:cursor-not-allowed disabled:bg-stone disabled:text-olive"
                >
                  خرید سریع و پرداخت
                </button>
              </div>

              <ul className="mt-4 grid grid-cols-1 gap-2 border-t border-stone pt-4 text-[0.72rem] font-semibold text-olive sm:grid-cols-3">
                <li className="flex items-center gap-1.5">
                  <Truck size={14} className="shrink-0 text-forest" aria-hidden="true" />
                  ارسال ۱ تا ۳ روز کاری
                </li>
                <li className="flex items-center gap-1.5">
                  <RotateCcw size={14} className="shrink-0 text-forest" aria-hidden="true" />
                  ۷ روز مهلت تست و بازگشت
                </li>
                <li className="flex items-center gap-1.5">
                  <BadgeCheck size={14} className="shrink-0 text-forest" aria-hidden="true" />
                  فاکتور رسمی + گارانتی فروشگاه
                </li>
              </ul>
            </div>

            {/* Tabs: specs / about */}
            <div className="mt-5">
              <div role="tablist" aria-label="اطلاعات محصول" className="flex gap-2 border-b border-stone">
                {(
                  [
                    ['specs', 'مشخصات فنی'],
                    ['about', 'دربارهٔ این کالا'],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    role="tab"
                    aria-selected={activeTab === key}
                    onClick={() => setActiveTab(key)}
                    className={`-mb-px border-b-2 px-4 pb-2.5 text-[0.85rem] font-extrabold transition-colors ${
                      activeTab === key
                        ? 'border-ember text-forest'
                        : 'border-transparent text-olive hover:text-charcoal'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="py-4">
                {activeTab === 'specs' ? (
                  <dl className="overflow-hidden rounded-2xl border border-stone">
                    {product.specs.map((s, i) => (
                      <div
                        key={i}
                        className={`grid grid-cols-5 gap-2 px-4 py-2.5 text-[0.78rem] ${i % 2 ? 'bg-white' : 'bg-sand/25'}`}
                      >
                        <dt className="col-span-2 font-bold text-olive">{s.label}</dt>
                        <dd className="col-span-3 font-semibold text-charcoal">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <div className="text-[0.82rem] leading-7 text-charcoal/90">
                    <p>{product.description}</p>
                    <p className="mt-2 text-olive">
                      تمام کالاهای روکا پیش از ارسال کنترل کیفیت می‌شوند؛ در صورت هرگونه مغایرت، تا ۷ روز امکان
                      بازگشت یا تعویض رایگان دارید. برای مشاورهٔ تخصصی دربارهٔ تناسب این کالا با مقصد سفرتان،
                      با شمارهٔ ۰۲۱-۹۱۰۰۰۱۲۳ تماس بگیرید.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      <section className="mt-12 border-t border-stone pt-10" aria-labelledby="related-title">
        <div className="flex items-center justify-between gap-4">
          <h2 id="related-title" className="text-xl font-black text-forest">کالاهای مشابه که سفر شما را کامل می‌کنند</h2>
          <Link to="/shop" className="flex shrink-0 items-center gap-1 text-[0.8rem] font-extrabold text-forest hover:text-ember">
            دیدن همه
            <ChevronLeft size={15} aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
