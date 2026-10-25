import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollToSection } from '../lib/scroll';
import {
  ArrowLeft,
  ChevronDown,
  Star,
  ShoppingCart,
  CloudRainWind,
  Users,
  Truck,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProduct } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatToman, formatRating, toFaDigits } from '../lib/format';

gsap.registerPlugin(ScrollTrigger);

const HERO_PRODUCT = getProduct('tent-koomeh')!;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const scrollToSection = useScrollToSection();

  // useLayoutEffect so GSAP's cleanup (pin-spacer restoration) runs before
  // React removes DOM nodes on unmount — prevents removeChild NotFoundError.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { reduceMotion, isDesktop } = context.conditions as {
          reduceMotion: boolean;
          isDesktop: boolean;
        };

        if (reduceMotion) {
          // Accessible static alternative: hide cinematic layer entirely
          gsap.set([stageRef.current, cueRef.current], { autoAlpha: 0, display: 'none' });
          return;
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: isDesktop ? '+=85%' : '+=42%',
            scrub: 0.6,
            pin: isDesktop,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
          defaults: { ease: 'none' },
        });

        // 1) Scene breathes and darkens as scroll begins
        tl.to(sceneRef.current, { scale: 1.13, duration: 1 }, 0);
        tl.to(dimRef.current, { opacity: 0.66, duration: 0.7 }, 0.12);

        // 2) Headline yields — promise of adventure makes way for the gear
        tl.to(headlineRef.current, { yPercent: -16, autoAlpha: 0, duration: 0.4, ease: 'power2.in' }, 0);
        tl.to(cueRef.current, { autoAlpha: 0, duration: 0.18 }, 0);

        // 3) Product stage emerges
        tl.to(stageRef.current, { autoAlpha: 1, duration: 0.3 }, 0.34);
        tl.fromTo(
          wordRef.current,
          { autoAlpha: 0, scale: 0.92 },
          { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
          0.36,
        );
        tl.fromTo(
          cardRef.current,
          { y: 96, scale: 0.86, rotate: -1.6 },
          { y: 0, scale: 1, rotate: 0, duration: 0.6, ease: 'power3.out' },
          0.4,
        );
        tl.fromTo(
          chipsRef.current?.children ?? [],
          { autoAlpha: 0, y: 26 },
          { autoAlpha: 1, y: 0, stagger: 0.14, duration: 0.34, ease: 'power2.out' },
          0.58,
        );
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[620px] overflow-hidden bg-pine"
      aria-label="روکا — تجهیزات کمپینگ و طبیعت‌گردی"
    >
      {/* ── Cinematic scene layer ─────────────────────────── */}
      <div ref={sceneRef} className="absolute inset-0 will-change-transform">
        <img
          src="/images/hero-camp.jpg"
          alt="کمپ‌سایت دنج کنار دریاچه با چادر روشن، صندلی و میز کمپینگ هنگام غروب"
          className="size-full object-cover object-[30%_center]"
          fetchPriority="high"
          width={1536}
          height={1024}
        />
        {/* Graded gradients for legibility — right side carries the RTL headline over the bright sky */}
        <div className="absolute inset-0 bg-gradient-to-l from-pine/90 via-pine/45 to-pine/10" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-pine/75 via-transparent to-pine/25" aria-hidden="true" />
        <div ref={dimRef} className="absolute inset-0 bg-pine opacity-0" aria-hidden="true" />
      </div>

      {/* ── Layer A: editorial headline ───────────────────── */}
      <div className="absolute inset-0">
        <div className="shell flex h-full flex-col justify-center pb-20 pt-24">
          <div ref={headlineRef} className="max-w-[34rem] will-change-transform">
            <p className="flex items-center gap-2 text-[0.72rem] sm:text-[0.78rem] font-bold tracking-wide text-sand/90">
              <span className="inline-block size-1.5 rounded-full bg-ember" aria-hidden="true" />
              کالکشن طبیعت‌گردی و کمپینگ
            </p>
            <h1 className="mt-4 text-[2.6rem] font-black leading-[1.22] text-sand sm:text-6xl sm:leading-[1.18] xl:text-[4.1rem]">
              کوه،
              <br />
              چشم به راهِ <span className="text-ember">تو</span>ست.
            </h1>
            <p className="mt-5 max-w-md text-[0.85rem] leading-7 text-sand/85 sm:text-[0.95rem] sm:leading-8">
              چادر، کوله‌پشتی، کیسه‌خواب و هر آنچه برای سفر لازم دارید؛ با ضمانت اصالت،
              ارسال سریع به سراسر کشور و مهلت تست ۷ روزه.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/shop"
                className="group inline-flex h-12 items-center gap-2 rounded-xl bg-ember px-6 text-[0.9rem] font-extrabold text-white shadow-[0_10px_30px_-8px_rgba(200,117,69,0.55)] transition hover:bg-ember-dark"
              >
                مشاهده تجهیزات
                <ArrowLeft size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1" />
              </Link>
              <button
                type="button"
                onClick={() => scrollToSection('categories')}
                className="inline-flex h-12 items-center gap-1.5 rounded-xl border border-sand/35 bg-pine/25 px-5 text-[0.85rem] font-bold text-sand backdrop-blur-sm transition hover:border-sand/60 hover:bg-pine/45"
              >
                کاوش دسته‌بندی‌ها
                <ChevronDown size={17} aria-hidden="true" />
              </button>
            </div>
            {/* Micro trust stats */}
            <dl className="mt-9 flex items-center gap-5 sm:gap-7 text-sand/85">
              {[
                ['۱۲٬۰۰۰+', 'سفارش موفق'],
                ['۹۸٪', 'رضایت خریداران'],
                ['۷ روز', 'مهلت تست و بازگشت'],
              ].map(([n, l]) => (
                <div key={l as string} className="border-s border-sand/20 ps-4 first:border-s-0 first:ps-0">
                  <dt className="sr-only">{l}</dt>
                  <dd className="text-base font-black text-sand sm:text-xl tabular-nums">{n}</dd>
                  <dd className="mt-0.5 text-[0.62rem] sm:text-[0.7rem] font-medium text-sand/70">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* ── Layer B: product stage (revealed by scroll) ───── */}
      <div
        ref={stageRef}
        className="hero-stage pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ opacity: 0, visibility: 'hidden' }}
        aria-hidden="false"
      >
        {/* Giant editorial word */}
        <div
          ref={wordRef}
          className="pointer-events-none absolute inset-0 flex select-none items-center justify-center"
          aria-hidden="true"
        >
          <span className="text-[10rem] font-black leading-none text-sand/[0.12] lg:text-[15rem]">
            روکا
          </span>
        </div>

        {/* Product card + floating spec chips */}
        <div className="relative mt-6 w-[min(92vw,400px)] sm:w-[420px]">
          {/* Floating chips */}
          <div ref={chipsRef} className="pointer-events-none absolute inset-0 z-10 hidden sm:block" aria-hidden="true">
            <span className="absolute -top-4 -start-24 flex items-center gap-1.5 rounded-2xl border border-sand/25 bg-pine/75 px-3 py-2 text-[0.68rem] font-bold text-sand backdrop-blur-md shadow-lg">
              <CloudRainWind size={14} className="text-ember" />
              ضدباران ۴۰۰۰ میلی‌متر
            </span>
            <span className="absolute top-1/3 -end-24 flex items-center gap-1.5 rounded-2xl border border-sand/25 bg-pine/75 px-3 py-2 text-[0.68rem] font-bold text-sand backdrop-blur-md shadow-lg">
              <Users size={14} className="text-ember" />
              ۳ نفره · چهارفصل
            </span>
            <span className="absolute -bottom-4 -start-20 flex items-center gap-1.5 rounded-2xl border border-sand/25 bg-pine/75 px-3 py-2 text-[0.68rem] font-bold text-sand backdrop-blur-md shadow-lg">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              {toFaDigits('4.8')} از ۵ · {toFaDigits(126)} نظر
            </span>
          </div>

          {/* Card */}
          <div
            ref={cardRef}
            className="pointer-events-auto overflow-hidden rounded-3xl border border-sand/40 bg-offwhite shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)]"
          >
            <div className="relative bg-sand/40">
              <img
                src={HERO_PRODUCT.image}
                alt={HERO_PRODUCT.name}
                className="aspect-[4/3] w-full object-cover object-center"
                loading="lazy"
                width={800}
                height={600}
              />
              <span className="absolute top-3 start-3 rounded-full bg-forest px-3 py-1 text-[0.65rem] font-extrabold text-sand shadow">
                پرفروش این فصل
              </span>
            </div>
            <div className="p-4 sm:p-5">
              <p className="text-[0.65rem] font-extrabold tracking-wide text-ember">پیشنهاد روکا این هفته</p>
              <h2 className="mt-1 text-[0.92rem] font-extrabold leading-6 text-charcoal">
                {HERO_PRODUCT.name}
              </h2>
              <div className="mt-1.5 flex items-center gap-1.5 text-[0.7rem] font-semibold text-olive">
                <Star size={12} className="fill-amber-400 text-amber-400" aria-hidden="true" />
                {formatRating(HERO_PRODUCT.rating)}
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Truck size={12} aria-hidden="true" />
                  ارسال ۱ تا ۳ روز کاری
                </span>
              </div>
              <div className="mt-2.5 flex items-end justify-between gap-3">
                <div>
                  <span className="block text-lg font-black text-forest">{formatToman(HERO_PRODUCT.price)}</span>
                  {HERO_PRODUCT.compareAtPrice && (
                    <span className="text-[0.68rem] font-medium text-olive line-through">
                      {formatToman(HERO_PRODUCT.compareAtPrice)}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => addToCart(HERO_PRODUCT.id)}
                  aria-label="افزودن چادر کوهِمه به سبد خرید"
                  className="grid size-11 place-items-center rounded-xl border border-forest/25 bg-sand/50 text-forest transition hover:border-forest hover:bg-sand active:scale-95"
                >
                  <ShoppingCart size={19} aria-hidden="true" />
                </button>
              </div>
              <Link
                to={`/product/${HERO_PRODUCT.id}`}
                className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-forest text-[0.85rem] font-extrabold text-sand transition hover:bg-pine"
              >
                مشاهده و خرید محصول
                <ArrowLeft size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll cue ────────────────────────────────────── */}
      <button
        ref={cueRef}
        type="button"
        onClick={() => scrollToSection('categories')}
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-sand/75 transition hover:text-sand md:flex"
        aria-label="رفتن به دسته‌بندی‌ها"
      >
        <span className="text-[0.65rem] font-bold tracking-widest">برای دیدن تجهیزات اسکرول کنید</span>
        <ChevronDown size={20} className="anim-cue" aria-hidden="true" />
      </button>
    </section>
  );
}
