import { useId, useState } from 'react';
import { Truck, RotateCcw, CreditCard, Headset, ChevronDown, Phone, Mail, MapPin } from 'lucide-react';
import { toFaDigits } from '../lib/format';

const FAQ = [
  {
    q: 'سفارش من چه زمانی به دستم می‌رسد؟',
    a: 'سفارش‌های تهران، کرج و شهرستان‌های اطراف طی ۱ تا ۲ روز کاری و سایر شهرها طی ۲ تا ۵ روز کاری توسط پست پیشتاز یا باربری ارسال می‌شود. پس از ثبت سفارش، کد رهگیری برای شما پیامک خواهد شد.',
  },
  {
    q: 'شرایط بازگشت و تعویض کالا چیست؟',
    a: 'تا ۷ روز پس از تحویل، در صورت استفاده‌نکردن و سالم‌بودن بسته‌بندی، کالا قابل بازگشت یا تعویض است. هزینهٔ رفت‌وبرگشت کالاهای ناسالم یا دارای ایراد فنی بر عهدهٔ فروشگاه است؛ برای سایر موارد، هزینه بر عهدهٔ خریدار خواهد بود.',
  },
  {
    q: 'آیا می‌توانم کالا را حضوری تحویل بگیرم؟',
    a: 'بله؛ پس از ثبت سفارش، امکان هماهنگی برای تحویل حضوری از فروشگاه مرکزی تهران (با هماهنگی تلفنی) وجود دارد تا هزینهٔ ارسال پرداخت نکنید.',
  },
  {
    q: 'ضمانت اصالت کالاها چگونه اعمال می‌شود؟',
    a: 'تمام کالاها مستقیماً از نمایندگی‌های رسمی یا واردکنندگان معتبر تأمین می‌شوند و فاکتور رسمی فروشگاه به همراه هر سفارش ارسال می‌گردد.',
  },
  {
    q: 'اگر کالایی در مرحلهٔ ارسال آسیب ببیند چه می‌شود؟',
    a: 'در صورت مشاهدهٔ هرگونه آسیب هنگام تحویل، کالا را تحویل نگیرید یا در حضور مأمور حمل گزارش تنظیم کنید و ظرف ۴۸ ساعت با پشتیبانی تماس بگیرید تا کالا جایگزین یا وجه شما بازگردانده شود.',
  },
];

export default function SupportTrust() {
  const [open, setOpen] = useState<number>(0);
  const baseId = useId();

  const cards = [
    {
      id: 'shipping',
      icon: Truck,
      title: 'ارسال سفارش‌ها',
      body: 'تهران: ۱ تا ۲ روز کاری · سراسر کشور: ۲ تا ۵ روز کاری. ارسال برای سفارش‌های بالای ۳ میلیون تومان رایگان است.',
    },
    {
      id: 'returns',
      icon: RotateCcw,
      title: 'بازگشت و تعویض',
      body: '۷ روز مهلت تست و بازگشت کالا با سلامت بسته‌بندی. ایراد فنی؟ هزینهٔ رفت‌وبرگشت با ماست.',
    },
    {
      id: 'payment',
      icon: CreditCard,
      title: 'پرداخت امن',
      body: 'پرداخت آنلاین از درگاه‌های بانکی معتبر (زرین‌پال و درگاه مستقیم) یا پرداخت در محل هنگام تحویل.',
    },
    {
      id: 'support',
      icon: Headset,
      title: 'پشتیبانی تخصصی',
      body: 'شنبه تا پنج‌شنبه ۹ تا ۲۰ پاسخگوی شما هستیم؛ از انتخاب سایز کیسه‌خواب تا راه‌اندازی چادر در محل.',
    },
  ];

  return (
    <section id="support" className="bg-offwhite">
      <div className="shell py-14 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-[0.7rem] font-extrabold tracking-widest text-ember">اعتماد و پشتیبانی</p>
          <h2 className="mt-2 text-2xl font-black leading-snug text-forest sm:text-3xl">
            خرید از روکا، بی‌دغدغه
          </h2>
          <p className="mt-2 text-[0.85rem] leading-7 text-olive">
            سیاست‌های واضح، بدون تبصره‌های ریز؛ چون سفر شما از همین‌جا، از اعتماد به فروشگاه شروع می‌شود.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ id, icon: Icon, title, body }) => (
            <div
              key={id}
              id={id}
              className="scroll-mt-24 rounded-2xl border border-stone bg-white p-5 shadow-[var(--shadow-card)]"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-sand/60 text-forest">
                <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h3 className="mt-3 text-[0.9rem] font-extrabold text-charcoal">{title}</h3>
              <p className="mt-1.5 text-[0.74rem] leading-6 text-olive">{body}</p>
            </div>
          ))}
        </div>

        {/* FAQ + contact */}
        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          <div id="faq" className="scroll-mt-24 lg:col-span-3">
            <h3 className="text-base font-extrabold text-forest">سؤالات متداول</h3>
            <div className="mt-3 divide-y divide-stone overflow-hidden rounded-2xl border border-stone bg-white shadow-[var(--shadow-card)]">
              {FAQ.map((item, i) => {
                const expanded = open === i;
                const panelId = `${baseId}-faq-${i}`;
                return (
                  <div key={i}>
                    <button
                      type="button"
                      onClick={() => setOpen(expanded ? -1 : i)}
                      aria-expanded={expanded}
                      aria-controls={panelId}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start text-[0.85rem] font-bold text-charcoal transition hover:bg-sand/30"
                    >
                      {item.q}
                      <ChevronDown
                        size={18}
                        aria-hidden="true"
                        className={`shrink-0 text-olive transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {expanded && (
                      <div id={panelId} className="px-5 pb-4">
                        <p className="text-[0.78rem] leading-7 text-olive border-s-2 border-sand ps-4">{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <aside id="contact" className="scroll-mt-24 lg:col-span-2">
            <h3 className="text-base font-extrabold text-forest">ارتباط مستقیم با ما</h3>
            <div className="mt-3 flex h-full flex-col rounded-2xl bg-forest p-6 text-sand shadow-[var(--shadow-card)]">
              <p className="text-[0.82rem] leading-7 text-sand/85">
                برای مشاورهٔ انتخاب تجهیزات قبل از خرید، همین حالا تماس بگیرید؛ کارشناسان ما خود کوهنوردند.
              </p>
              <a href="tel:02191000123" dir="ltr" className="mt-4 flex items-center gap-3 text-start">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-pine">
                  <Phone size={19} className="text-ember" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-lg font-black tabular-nums tracking-wide">021-91000123</span>
                  <span className="text-[0.68rem] font-semibold text-sand/65">شنبه تا پنج‌شنبه، {toFaDigits(9)} تا {toFaDigits(20)}</span>
                </span>
              </a>
              <a href="mailto:support@rukaoutdoor.ir" dir="ltr" className="mt-3 flex items-center gap-3 text-start">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-pine">
                  <Mail size={19} className="text-ember" aria-hidden="true" />
                </span>
                <span className="text-[0.82rem] font-bold">support@rukaoutdoor.ir</span>
              </a>
              <p className="mt-3 flex items-start gap-3 border-t border-sand/15 pt-4 text-[0.74rem] leading-6 text-sand/70">
                <MapPin size={17} className="mt-0.5 shrink-0 text-ember" aria-hidden="true" />
                تهران، خیابان سهروردی شمالی، پلاک ۱۱۴ — فروشگاه مرکزی (مراجعه با هماهنگی تلفنی)
              </p>
              <p className="mt-auto pt-5 text-[0.62rem] leading-5 text-sand/45">
                * سیاست‌های ارسال و بازگشت در این نسخه، نمونه‌ای برای نمایش است و قابل جایگزینی با اطلاعات رسمی فروشگاه است.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
