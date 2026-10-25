import { useState } from 'react';
import { Tent, BedDouble, Backpack, FlameKindling } from 'lucide-react';
import { Link } from 'react-router-dom';

const GUIDES = [
  {
    id: 'tent',
    icon: Tent,
    tab: 'چادر',
    title: 'انتخاب چادر بر اساس تعداد نفرات و فصل',
    points: [
      'تک‌نفره و دو‌نفره: مناسب کوهنوردی و ترک‌های سبک؛ وزن زیر ۲ کیلوگرم را هدف بگیرید.',
      'سه‌نفره گنبدی: بهترین تعادل قیمت، وزن و فضای داخل برای کمپ‌های خانوادگی و دوستانه.',
      'برای ارتفاعات بالای ۳۰۰۰ متر، چادر چهارفصل با اسکلت آلومینیوم انتخاب کنید.',
      'مقاومت آبی زیر ۲۰۰۰ میلی‌متر فقط برای تابستان خشک مناسب است.',
    ],
    cta: 'دیدن چادرهای چهارفصل',
    to: '/shop?category=tent',
  },
  {
    id: 'sleep',
    icon: BedDouble,
    tab: 'کیسه‌خواب',
    title: 'دمای آسایش مهم‌تر از عدد روی جعبه است',
    points: [
      'برای بهار و پاییز ایران: دمای آسایشی ۰ تا ۵ درجه را انتخاب کنید.',
      'کیسه‌خواب‌های دُمی (Mummy) گرمای بیشتری نسبت به نوع پتویی حفظ می‌کنند.',
      'زیرانداز یا فومت را فراموش نکنید؛ نیمی از سرمای زمین از کف منتقل می‌شود.',
      'اگر اهل برف‌کوبی هستید، پر طبیعی یا عایق R≥۵ را در اولویت بگذارید.',
    ],
    cta: 'دیدن کیسه‌خواب‌ها',
    to: '/shop?category=sleep',
  },
  {
    id: 'backpack',
    icon: Backpack,
    tab: 'کوله‌پشتی',
    title: 'حجم کوله را با طول سفر تنظیم کنید',
    points: [
      '۱ تا ۲ روزه: ۲۰ تا ۳۵ لیتر — فقط ضروریات.',
      '۳ تا ۵ روزه: ۴۵ تا ۶۵ لیتر — استاندارد ترک‌های ایران.',
      'چندروزه و زمستانی: ۶۵ تا ۸۰ لیتر — حجم لباس اضافه را فراموش نکنید.',
      'حتما کوله را با وزن واقعی (۶–۸ کیلوگرم) در فروشگاه امتحان کنید.',
    ],
    cta: 'دیدن کوله‌پشتی‌ها',
    to: '/shop?category=backpack',
  },
  {
    id: 'cooking',
    icon: FlameKindling,
    tab: 'پخت‌وپز',
    title: 'سرشعله مناسب سفر شما کدام است؟',
    points: [
      'کمپ خودرویی: سرشعله‌های توان بالا (۳۰۰۰+ وات) و قابلمه‌های بزرگ.',
      'کوله‌گردی: سرشعله تاشو زیر ۱۰۰ گرم با ظروف تیتانیومی.',
      'همیشه یک کپسول اضافه همراه داشته باشید؛ کمبود گاز بدترین همراه سفر است.',
      'ظروف با درب سیلیکونی جایگزین درپوش و آب‌گردان می‌شوند.',
    ],
    cta: 'دیدن لوازم پخت‌وپز',
    to: '/shop?category=cooking',
  },
];

export default function Guide() {
  const [active, setActive] = useState(GUIDES[0].id);
  const current = GUIDES.find((g) => g.id === active)!;
  const Icon = current.icon;

  return (
    <section id="guide" className="scroll-mt-24 bg-forest text-sand" aria-labelledby="guide-title">
      <div className="shell py-14 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-[0.7rem] font-extrabold tracking-widest text-ember">راهنمای خرید روکا</p>
          <h2 id="guide-title" className="mt-2 text-2xl font-black leading-snug sm:text-3xl">
            قبل از خرید، دو دقیقه بخوانید
          </h2>
          <p className="mt-2 text-[0.85rem] leading-7 text-sand/75">
            چک‌لیست‌های کوتاه و عملی که کارشناسان ما برای انتخاب هر دسته از تجهیزات آماده کرده‌اند.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          {/* Tabs */}
          <div role="tablist" aria-label="دسته‌بندی راهنما" className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:col-span-4 lg:grid-cols-1 lg:content-start">
            {GUIDES.map(({ id, icon: TabIcon, tab }) => {
              const selected = id === active;
              return (
                <button
                  key={id}
                  role="tab"
                  id={`guide-tab-${id}`}
                  aria-selected={selected}
                  aria-controls="guide-panel"
                  onClick={() => setActive(id)}
                  className={`flex h-14 items-center gap-2.5 rounded-2xl border px-4 text-[0.82rem] font-extrabold transition-all duration-200 lg:h-16 ${
                    selected
                      ? 'border-ember bg-ember text-white shadow-[0_8px_24px_-10px_rgba(200,117,69,0.7)]'
                      : 'border-sand/20 bg-pine/40 text-sand/85 hover:border-sand/40 hover:text-sand'
                  }`}
                >
                  <TabIcon size={20} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div
            role="tabpanel"
            id="guide-panel"
            aria-labelledby={`guide-tab-${current.id}`}
            className="rounded-3xl border border-sand/15 bg-pine/50 p-6 backdrop-blur-sm sm:p-8 lg:col-span-8"
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-ember/20 text-ember">
              <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-lg font-black leading-8 text-sand sm:text-xl">{current.title}</h3>
            <ul className="mt-4 grid gap-2.5">
              {current.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[0.82rem] leading-7 text-sand/85">
                  <span className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-ember" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              to={current.to}
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl border border-sand/30 px-5 text-[0.82rem] font-bold text-sand transition hover:border-ember hover:bg-ember hover:text-white"
            >
              {current.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
