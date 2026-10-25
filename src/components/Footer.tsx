import { Link } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Send, CheckCircle2 } from 'lucide-react';
import Logo from './Logo';
import { toFaDigits } from '../lib/format';
import { useScrollToSection } from '../lib/scroll';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState('');
  const scrollToSection = useScrollToSection();

  const submitNewsletter = (e: FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setEmailError('لطفاً یک نشانی ایمیل معتبر وارد کنید؛ مثلاً name@example.com');
      return;
    }
    setEmailError('');
    setSubscribed(true);
  };

  const shopLinks = [
    { label: 'چادر و سرپناه', to: '/shop?category=tent' },
    { label: 'کوله‌پشتی و حمل تجهیزات', to: '/shop?category=backpack' },
    { label: 'کیسه‌خواب و زیرانداز', to: '/shop?category=sleep' },
    { label: 'پخت‌وپز در طبیعت', to: '/shop?category=cooking' },
    { label: 'روشنایی و ابزار کمپ', to: '/shop?category=lighting' },
    { label: 'مبلمان و لوازم جانبی', to: '/shop?category=furniture' },
  ];

  const supportLinks: { label: string; section: string }[] = [
    { label: 'ارسال و تحویل سفارش', section: 'shipping' },
    { label: 'رویه بازگشت و تعویض کالا', section: 'returns' },
    { label: 'روش‌های پرداخت', section: 'payment' },
    { label: 'پشتیبانی و سؤالات متداول', section: 'faq' },
    { label: 'راهنمای انتخاب تجهیزات', section: 'guide' },
    { label: 'درباره روکا', section: 'about' },
  ];

  return (
    <footer className="bg-pine text-sand/80">
      {/* Adventure journal / newsletter */}
      <div className="border-b border-sand/10">
        <div className="shell grid gap-6 py-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[0.7rem] font-extrabold tracking-widest text-ember">روزنامهٔ روکا</p>
            <h2 className="mt-1.5 text-xl font-black text-sand sm:text-2xl">راهنمای ماجراجویی، هر ماه در صندوق شما</h2>
            <p className="mt-1.5 text-[0.8rem] leading-7 text-sand/65">
              گزارش مسیرها، چک‌لیست آماده‌سازی سفر و مشاورهٔ انتخاب تجهیزات؛ بدون هرزنامه.
            </p>
          </div>
          {subscribed ? (
            <div className="flex items-center gap-3 rounded-2xl border border-success/40 bg-success/15 px-5 py-4" role="status">
              <CheckCircle2 className="shrink-0 text-emerald-300" size={22} aria-hidden="true" />
              <div>
                <p className="text-sm font-extrabold text-emerald-200">عضویت شما ثبت شد</p>
                <p className="mt-0.5 text-[0.75rem] text-sand/70">از این پس راهنماهای سفر روکا برای شما ارسال می‌شود. (نمونهٔ نمایشی)</p>
              </div>
            </div>
          ) : (
            <form onSubmit={submitNewsletter} noValidate className="w-full">
              <label htmlFor="newsletter-email" className="text-[0.72rem] font-bold text-sand/80">
                نشانی ایمیل شما
              </label>
              <div className="mt-1.5 flex gap-2">
                <input
                  id="newsletter-email"
                  type="email"
                  dir="ltr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? 'newsletter-error' : undefined}
                  className="h-12 min-w-0 flex-1 rounded-xl border border-sand/20 bg-pine/60 px-4 text-left text-sm text-sand placeholder:text-sand/35 focus:border-ember focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex h-12 shrink-0 items-center gap-2 rounded-xl bg-ember px-4 text-[0.8rem] font-extrabold text-white transition hover:bg-ember-dark sm:px-5"
                >
                  <Send size={16} aria-hidden="true" />
                  <span className="hidden sm:inline">عضویت در خبرنامه</span>
                  <span className="sm:hidden">عضویت</span>
                </button>
              </div>
              {emailError && (
                <p id="newsletter-error" role="alert" className="mt-1.5 text-[0.7rem] font-bold text-red-300">
                  {emailError}
                </p>
              )}
            </form>
          )}
        </div>
      </div>

      {/* Main footer */}
      <div className="shell grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:py-14">
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-[0.78rem] leading-7 text-sand/65">
            فروشگاه تخصصی تجهیزات کمپینگ، کوهنوردی و طبیعت‌گردی؛ با ۱۵ سال تجربه در تجهیز کوهنوردان و کمپ‌بازهای ایران.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <a
              href="https://www.instagram.com/ruka.outdoor"
              target="_blank"
              rel="noreferrer"
              aria-label="اینستاگرام روکا"
              className="grid size-10 place-items-center rounded-xl border border-sand/15 text-sand/80 transition hover:border-ember hover:text-ember"
            >
              <Instagram size={18} aria-hidden="true" />
            </a>
            <a
              href="https://www.aparat.com/ruka_outdoor"
              target="_blank"
              rel="noreferrer"
              aria-label="آپارات روکا"
              className="grid size-10 place-items-center rounded-xl border border-sand/15 text-sand/80 transition hover:border-ember hover:text-ember"
            >
              <Send size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <nav aria-label="دسته‌بندی محصولات">
          <h3 className="text-[0.72rem] font-extrabold tracking-widest text-sand/50">خرید بر اساس دسته</h3>
          <ul className="mt-3 grid gap-2 text-[0.82rem] font-semibold">
            {shopLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition hover:text-sand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="خدمات مشتریان">
          <h3 className="text-[0.72rem] font-extrabold tracking-widest text-sand/50">راهنما و خدمات</h3>
          <ul className="mt-3 grid gap-2 text-[0.82rem] font-semibold">
            {supportLinks.map((l) => (
              <li key={l.section}>
                <button type="button" onClick={() => scrollToSection(l.section)} className="transition hover:text-sand">
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-[0.72rem] font-extrabold tracking-widest text-sand/50">ارتباط با روکا</h3>
          <ul className="mt-3 grid gap-3 text-[0.8rem] leading-6">
            <li className="flex items-start gap-2.5">
              <MapPin size={17} className="mt-0.5 shrink-0 text-ember" aria-hidden="true" />
              <span>تهران، خیابان سهروردی شمالی، پلاک {toFaDigits(114)}، طبقهٔ دوم</span>
            </li>
            <li className="flex items-center gap-2.5" dir="ltr">
              <Phone size={17} className="shrink-0 text-ember" aria-hidden="true" />
              <a href="tel:02191000123" className="tabular-nums font-bold text-sand hover:text-white" dir="ltr">
                021-91000123
              </a>
            </li>
            <li className="flex items-center gap-2.5" dir="ltr">
              <Mail size={17} className="shrink-0 text-ember" aria-hidden="true" />
              <a href="mailto:support@rukaoutdoor.ir" className="font-bold text-sand hover:text-white" dir="ltr">
                support@rukaoutdoor.ir
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock size={17} className="mt-0.5 shrink-0 text-ember" aria-hidden="true" />
              <span>شنبه تا پنج‌شنبه، {toFaDigits(9)} صبح تا {toFaDigits(20)} عصر</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Payment + trust note */}
      <div className="border-t border-sand/10">
        <div className="shell flex flex-col items-center justify-between gap-4 py-5 text-[0.7rem] text-sand/55 sm:flex-row">
          <p>
            پرداخت امن از درگاه‌های آنلاین معتبر بانکی انجام می‌شود. این سایت در نسخهٔ نمایشگاهی (دمو) اجرا می‌شود.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5" aria-label="روش‌های پرداخت پشتیبانی‌شده">
            {['زرین‌پال', 'درگاه مستقیم بانک', 'پرداخت در محل'].map((m) => (
              <span key={m} className="rounded-md border border-sand/15 px-2.5 py-1 font-bold text-sand/75">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-sand/10">
        <div className="shell flex flex-col items-center justify-between gap-2 py-4 text-[0.68rem] text-sand/45 sm:flex-row">
          <p>© {toFaDigits(1404)} فروشگاه روکا — تمامی حقوق محفوظ است.</p>
          <p>طراحی و توسعه با عشق به طبیعت ایران</p>
        </div>
      </div>
    </footer>
  );
}
