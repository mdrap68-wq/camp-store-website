import { BadgeCheck, ClipboardList, Headset, Truck, ShieldCheck, Wallet } from 'lucide-react';

const PROMISES = [
  {
    icon: BadgeCheck,
    title: 'انتخاب دستی، نه هر کالایی',
    body: 'هر کالا قبل از ورود به ویترین روکا، از نظر کیفیت ساخت و کاربرد واقعی در طبیعت بررسی و تست می‌شود.',
  },
  {
    icon: ClipboardList,
    title: 'مشخصات شفاف و کامل',
    body: 'وزن، دمای آسایش، مقاومت آبی و ابعاد دقیق؛ چیزی را قایم نمی‌کنیم چون می‌دانیم کیفیت یعنی جزئیات.',
  },
  {
    icon: Headset,
    title: 'مشاورهٔ قبل از خرید',
    body: 'بین دو چادر مردد مانده‌اید؟ کارشناسان ما خودشان کوهنوردند و با تجربهٔ واقعی راهنمایی‌تان می‌کنند.',
  },
  {
    icon: Truck,
    title: 'ارسال سریع و پیگیری‌پذیر',
    body: 'ارسال ۱ تا ۵ روز کاری با کد رهگیری پیامکی؛ سفارش‌های بالای ۳ میلیون تومان با ارسال رایگان.',
  },
  {
    icon: ShieldCheck,
    title: 'اصالت و سلامت کالا',
    body: 'تأمین مستقیم از نمایندگی‌های رسمی؛ فاکتور معتبر فروشگاه همراه هر سفارش تحویل داده می‌شود.',
  },
  {
    icon: Wallet,
    title: 'پرداخت امن و انعطاف‌پذیر',
    body: 'پرداخت آنلاین از درگاه‌های معتبر بانکی یا پرداخت در محل هنگام تحویل؛ هر دو به دلخواه شماست.',
  },
];

export default function Promise() {
  return (
    <section id="about" className="shell scroll-mt-24 py-14 lg:py-20" aria-labelledby="promise-title">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-[0.7rem] font-extrabold tracking-widest text-ember">چرا روکا</p>
          <h2 id="promise-title" className="mt-2 text-2xl font-black leading-snug text-forest sm:text-3xl">
            قول‌های ساده،<br />
            عمل به آن‌ها.
          </h2>
          <p className="mt-3 text-[0.85rem] leading-7 text-olive">
            ما نه بزرگ‌ترین فروشگاهیم و نه پرزرق‌وبرق‌ترین؛ فقط ویترینی از تجهیزاتی که خودمان در کوه و جنگل
            با آن‌ها سفر کرده‌ایم.
          </p>
          <div className="mt-6 rounded-2xl border border-sand-deep bg-sand/40 p-5">
            <p className="text-3xl font-black text-forest tabular-nums">۱۵</p>
            <p className="mt-1 text-[0.78rem] font-bold leading-6 text-charcoal">
              سال همراهی با طبیعت‌گردان ایران؛ از دماوند تا ارسباران
            </p>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {PROMISES.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="rounded-2xl border border-stone bg-white p-5 shadow-[var(--shadow-card)] transition hover:border-forest/30"
            >
              <Icon size={22} strokeWidth={1.8} className="text-ember" aria-hidden="true" />
              <h3 className="mt-3 text-[0.88rem] font-extrabold text-charcoal">{title}</h3>
              <p className="mt-1.5 text-[0.74rem] leading-6 text-olive">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
