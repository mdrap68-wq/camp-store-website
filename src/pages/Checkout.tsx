import { FormEvent, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Wallet,
  Truck,
  Banknote,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ShoppingCart,
  Lock,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, SHIPPING_FLAT, FREE_SHIPPING_THRESHOLD } from '../data/products';
import { formatToman, toFaDigits } from '../lib/format';

type PaymentMethod = 'online' | 'cod';

interface FormState {
  fullName: string;
  mobile: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  payment: PaymentMethod;
  note: string;
}

const PROVINCES = [
  'تهران', 'اصفهان', 'فارس', 'خراسان رضوی', 'آذربایجان شرقی', 'البرز', 'خوزستان', 'مازندران',
  'گیلان', 'همدان', 'کرمان', 'سیستان و بلوچستان', 'یزد', 'اردبیل', 'زنجان', 'مرکزی',
  'قزوین', 'کردستان', 'آذربایجان غربی', 'کرمانشاه', 'بوشهر', 'هرمزگان', 'لرستان', 'گلستان',
  'سمنان', 'چهارمحال و بختیاری', 'کهگیلویه و بویراحمد', 'ایلام', 'خراسان جنوبی', 'خراسان شمالی', 'قم',
];

const initialForm: FormState = {
  fullName: '',
  mobile: '',
  province: 'تهران',
  city: '',
  address: '',
  postalCode: '',
  payment: 'online',
  note: '',
};

export default function Checkout() {
  const { lines, subtotal, clearCart, count } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(initialForm);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<{ code: string; total: number; payment: PaymentMethod } | null>(null);

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || lines.length === 0 ? 0 : SHIPPING_FLAT;
  const total = subtotal + shipping;

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 3) {
      e.fullName = 'نام و نام خانوادگی را کامل وارد کنید (حداقل ۳ حرف).';
    }
    const mobile = form.mobile.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))).replace(/\D/g, '');
    if (!/^09\d{9}$/.test(mobile)) {
      e.mobile = 'شمارهٔ موبایل معتبر وارد کنید؛ مثلاً 09123456789';
    }
    if (!form.city.trim()) {
      e.city = 'شهر را وارد کنید.';
    }
    if (!form.address.trim() || form.address.trim().length < 12) {
      e.address = 'نشانی کامل پستی را بنویسید (حداقل ۱۲ حرف)؛ مثال: خیابان، کوچه، پلاک، واحد.';
    }
    if (form.postalCode.trim() && !/^\d{10}$/.test(form.postalCode.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))).trim())) {
      e.postalCode = 'کد پستی باید ۱۰ رقم باشد.';
    }
    return e;
  }, [form]);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const blur = (key: keyof FormState) => setTouched((t) => ({ ...t, [key]: true }));

  const fieldError = (key: keyof FormState) => (touched[key] ? errors[key] : undefined);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({ fullName: true, mobile: true, city: true, address: true, postalCode: true });
    if (Object.keys(errors).length > 0) {
      const first = document.querySelector('[aria-invalid="true"]');
      (first as HTMLElement | null)?.focus();
      return;
    }
    setSubmitting(true);
    // Simulate gateway round-trip — honest demo, no real payment is processed.
    window.setTimeout(() => {
      setPlacedOrder({
        code: `RU-${toFaDigits(Math.floor(100000 + Math.random() * 900000))}`,
        total,
        payment: form.payment,
      });
      clearCart();
      setSubmitting(false);
      window.scrollTo(0, 0);
    }, 1400);
  };

  /* ── Empty cart guard ─────────────────────────────── */
  if (lines.length === 0 && !placedOrder) {
    return (
      <div className="shell flex flex-col items-center gap-4 py-24 text-center">
        <ShoppingCart size={46} strokeWidth={1.4} className="text-sand-deep" aria-hidden="true" />
        <h1 className="text-xl font-black text-charcoal">سبد خرید شما خالی است</h1>
        <p className="max-w-xs text-[0.85rem] leading-7 text-olive">
          برای تکمیل سفارش ابتدا محصولی به سبد اضافه کنید.
        </p>
        <button
          type="button"
          onClick={() => navigate('/shop')}
          className="mt-2 inline-flex h-12 items-center gap-2 rounded-xl bg-forest px-7 text-sm font-extrabold text-sand transition hover:bg-pine"
        >
          رفتن به فروشگاه
          <ArrowLeft size={17} aria-hidden="true" />
        </button>
      </div>
    );
  }

  /* ── Order placed (demo) ──────────────────────────── */
  if (placedOrder) {
    return (
      <div className="shell flex flex-col items-center py-16 text-center sm:py-20">
        <span className="grid size-20 place-items-center rounded-full bg-success-bg">
          <CheckCircle2 size={44} className="text-success" strokeWidth={1.6} aria-hidden="true" />
        </span>
        <h1 className="mt-6 text-2xl font-black text-forest">سفارش شما ثبت شد</h1>
        <p className="mt-2 max-w-md text-[0.85rem] leading-7 text-olive">
          کد سفارش: <span className="font-black tabular-nums text-charcoal">{placedOrder.code}</span>
          {' · '}مبلغ: <span className="font-black text-charcoal">{formatToman(placedOrder.total)}</span>
          <br />
          روش پرداخت: {placedOrder.payment === 'online' ? 'درگاه اینترنتی (نمایشی)' : 'پرداخت در محل'}
        </p>
        <div className="mt-6 max-w-md rounded-2xl border border-warning bg-warning-bg px-5 py-4 text-start" role="note">
          <p className="flex items-start gap-2 text-[0.78rem] leading-6 text-warning">
            <AlertCircle size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
            این یک نمونهٔ نمایشی است؛ هیچ پرداخت واقعی انجام نشده و سفارشی در سیستم فروشگاه ثبت نشده است.
            در نسخهٔ اصلی، اینجا به درگاه پرداخت بانکی (مثلاً زرین‌پال یا به‌پرداخت) متصل می‌شود.
          </p>
        </div>
        <Link
          to="/"
          className="mt-7 inline-flex h-12 items-center gap-2 rounded-xl bg-forest px-8 text-sm font-extrabold text-sand transition hover:bg-pine"
        >
          بازگشت به روکا
          <ArrowLeft size={17} aria-hidden="true" />
        </Link>
      </div>
    );
  }

  const inputClass = (invalid?: string) =>
    `h-12 w-full rounded-xl border bg-white px-4 text-[0.85rem] text-charcoal placeholder:text-olive/70 transition focus:outline-none focus:ring-2 ${
      invalid
        ? 'border-danger focus:border-danger focus:ring-danger/15'
        : 'border-stone focus:border-forest focus:ring-forest/15'
    }`;

  return (
    <div className="shell py-6 lg:py-10">
      {/* Heading */}
      <p className="text-[0.68rem] font-extrabold tracking-widest text-ember">تکمیل سفارش</p>
      <h1 className="mt-1.5 text-2xl font-black text-forest sm:text-3xl">اطلاعات ارسال و پرداخت</h1>
      <p className="mt-1 flex items-center gap-1.5 text-[0.75rem] font-semibold text-olive">
        <Lock size={13} aria-hidden="true" />
        اطلاعات شما صرفاً برای ارسال همین سفارش استفاده می‌شود.
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-6 grid gap-6 lg:grid-cols-12">
        {/* ── Form column ─────────────────────────────── */}
        <div className="lg:col-span-7">
          {/* Contact */}
          <fieldset className="rounded-2xl border border-stone bg-white p-5 shadow-[var(--shadow-card)] sm:p-6">
            <legend className="sr-only">اطلاعات گیرنده</legend>
            <h2 className="flex items-center gap-2 text-[0.95rem] font-extrabold text-forest">
              <span className="grid size-6 place-items-center rounded-full bg-forest text-[0.7rem] font-black text-sand">۱</span>
              مشخصات گیرنده
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="mb-1.5 block text-[0.74rem] font-bold text-charcoal">
                  نام و نام خانوادگی <span className="text-danger">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={(e) => setField('fullName', e.target.value)}
                  onBlur={() => blur('fullName')}
                  aria-invalid={!!fieldError('fullName')}
                  aria-describedby={fieldError('fullName') ? 'err-fullName' : undefined}
                  placeholder="مثلاً: علی رضایی"
                  className={inputClass(fieldError('fullName'))}
                />
                {fieldError('fullName') && (
                  <p id="err-fullName" role="alert" className="mt-1.5 text-[0.7rem] font-bold text-danger">
                    {fieldError('fullName')}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="mobile" className="mb-1.5 block text-[0.74rem] font-bold text-charcoal">
                  شمارهٔ موبایل <span className="text-danger">*</span>
                </label>
                <input
                  id="mobile"
                  type="tel"
                  dir="ltr"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  value={form.mobile}
                  onChange={(e) => setField('mobile', e.target.value)}
                  onBlur={() => blur('mobile')}
                  aria-invalid={!!fieldError('mobile')}
                  aria-describedby={fieldError('mobile') ? 'err-mobile' : 'hint-mobile'}
                  placeholder="09123456789"
                  className={`${inputClass(fieldError('mobile'))} text-left tabular-nums`}
                />
                {fieldError('mobile') ? (
                  <p id="err-mobile" role="alert" className="mt-1.5 text-[0.7rem] font-bold text-danger">
                    {fieldError('mobile')}
                  </p>
                ) : (
                  <p id="hint-mobile" className="mt-1.5 text-[0.68rem] text-olive">کد رهگیری سفارش به این شماره پیامک می‌شود.</p>
                )}
              </div>

              <div className="grid grid-cols-5 gap-3">
                <div className="col-span-2">
                  <label htmlFor="province" className="mb-1.5 block text-[0.74rem] font-bold text-charcoal">
                    استان
                  </label>
                  <select
                    id="province"
                    value={form.province}
                    onChange={(e) => setField('province', e.target.value)}
                    className={inputClass()}
                  >
                    {PROVINCES.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-3">
                  <label htmlFor="city" className="mb-1.5 block text-[0.74rem] font-bold text-charcoal">
                    شهر <span className="text-danger">*</span>
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={form.city}
                    onChange={(e) => setField('city', e.target.value)}
                    onBlur={() => blur('city')}
                    aria-invalid={!!fieldError('city')}
                    aria-describedby={fieldError('city') ? 'err-city' : undefined}
                    placeholder="مثلاً: تهران"
                    className={inputClass(fieldError('city'))}
                  />
                  {fieldError('city') && (
                    <p id="err-city" role="alert" className="mt-1.5 text-[0.7rem] font-bold text-danger">
                      {fieldError('city')}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address" className="mb-1.5 block text-[0.74rem] font-bold text-charcoal">
                  نشانی کامل <span className="text-danger">*</span>
                </label>
                <textarea
                  id="address"
                  rows={2}
                  autoComplete="street-address"
                  value={form.address}
                  onChange={(e) => setField('address', e.target.value)}
                  onBlur={() => blur('address')}
                  aria-invalid={!!fieldError('address')}
                  aria-describedby={fieldError('address') ? 'err-address' : undefined}
                  placeholder="خیابان، کوچه، پلاک، طبقه و واحد…"
                  className={`${inputClass(fieldError('address'))} h-auto py-3 leading-7 resize-none`}
                />
                {fieldError('address') && (
                  <p id="err-address" role="alert" className="mt-1.5 text-[0.7rem] font-bold text-danger">
                    {fieldError('address')}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="postalCode" className="mb-1.5 block text-[0.74rem] font-bold text-charcoal">
                  کد پستی <span className="font-medium text-olive">(اختیاری)</span>
                </label>
                <input
                  id="postalCode"
                  type="text"
                  inputMode="numeric"
                  dir="ltr"
                  value={form.postalCode}
                  onChange={(e) => setField('postalCode', e.target.value)}
                  onBlur={() => blur('postalCode')}
                  aria-invalid={!!fieldError('postalCode')}
                  aria-describedby={fieldError('postalCode') ? 'err-postalCode' : undefined}
                  placeholder="1234567890"
                  className={`${inputClass(fieldError('postalCode'))} text-left tabular-nums`}
                />
                {fieldError('postalCode') && (
                  <p id="err-postalCode" role="alert" className="mt-1.5 text-[0.7rem] font-bold text-danger">
                    {fieldError('postalCode')}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="note" className="mb-1.5 block text-[0.74rem] font-bold text-charcoal">
                  توضیحات سفارش <span className="font-medium text-olive">(اختیاری)</span>
                </label>
                <input
                  id="note"
                  type="text"
                  value={form.note}
                  onChange={(e) => setField('note', e.target.value)}
                  placeholder="مثلاً: تحویل فقط عصرها"
                  className={inputClass()}
                />
              </div>
            </div>
          </fieldset>

          {/* Payment */}
          <fieldset className="mt-5 rounded-2xl border border-stone bg-white p-5 shadow-[var(--shadow-card)] sm:p-6">
            <legend className="sr-only">روش پرداخت</legend>
            <h2 className="flex items-center gap-2 text-[0.95rem] font-extrabold text-forest">
              <span className="grid size-6 place-items-center rounded-full bg-forest text-[0.7rem] font-black text-sand">۲</span>
              روش پرداخت
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {(
                [
                  {
                    value: 'online' as PaymentMethod,
                    icon: Wallet,
                    title: 'پرداخت آنلاین',
                    desc: 'درگاه اینترنتی — دموی نمایشی؛ بدون برداشت واقعی',
                  },
                  {
                    value: 'cod' as PaymentMethod,
                    icon: Banknote,
                    title: 'پرداخت در محل',
                    desc: 'پرداخت نقدی یا کارت‌خوان هنگام تحویل کالا',
                  },
                ]
              ).map(({ value, icon: Icon, title, desc }) => {
                const selected = form.payment === value;
                return (
                  <label
                    key={value}
                    className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition ${
                      selected ? 'border-forest bg-sand/30' : 'border-stone hover:border-forest/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={value}
                      checked={selected}
                      onChange={() => setField('payment', value)}
                      className="mt-1 size-4 accent-[#233D32]"
                    />
                    <span>
                      <Icon size={20} className="text-forest" aria-hidden="true" />
                      <span className="mt-1.5 block text-[0.85rem] font-extrabold text-charcoal">{title}</span>
                      <span className="mt-0.5 block text-[0.68rem] leading-5 text-olive">{desc}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>

        {/* ── Summary column ──────────────────────────── */}
        <aside className="lg:col-span-5">
          <div className="sticky top-24 overflow-hidden rounded-2xl border border-stone bg-white shadow-[var(--shadow-card)]">
            <div className="border-b border-stone bg-sand/35 px-5 py-4">
              <h2 className="text-[0.95rem] font-extrabold text-forest">خلاصهٔ سفارش</h2>
              <p className="mt-0.5 text-[0.72rem] font-semibold text-olive">{toFaDigits(count)} کالا در سبد شماست</p>
            </div>
            <ul className="max-h-64 divide-y divide-stone overflow-y-auto px-5">
              {lines.map((line) => {
                const p = PRODUCTS.find((x) => x.id === line.id);
                if (!p) return null;
                return (
                  <li key={p.id} className="flex items-center gap-3 py-3">
                    <img
                      src={p.image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="size-14 shrink-0 rounded-lg border border-stone object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-[0.74rem] font-bold text-charcoal">{p.name}</p>
                      <p className="mt-0.5 text-[0.7rem] font-semibold tabular-nums text-olive">
                        {toFaDigits(line.qty)} × {formatToman(p.price)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <dl className="border-t border-stone px-5 py-4 text-[0.8rem]">
              <div className="flex items-center justify-between">
                <dt className="text-olive">جمع جزء</dt>
                <dd className="font-bold text-charcoal">{formatToman(subtotal)}</dd>
              </div>
              <div className="mt-1.5 flex items-center justify-between">
                <dt className="text-olive">هزینهٔ ارسال</dt>
                <dd className="font-bold text-charcoal">{shipping === 0 ? 'رایگان' : formatToman(shipping)}</dd>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-dashed border-stone pt-3">
                <dt className="text-[0.9rem] font-extrabold text-charcoal">مبلغ قابل پرداخت</dt>
                <dd className="text-lg font-black text-forest">{formatToman(total)}</dd>
              </div>
            </dl>
            <div className="border-t border-stone px-5 py-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-ember text-[0.9rem] font-extrabold text-white transition hover:bg-ember-dark disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <span className="anim-spin-ring block size-5 rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
                    در حال انتقال به درگاه…
                  </>
                ) : (
                  <>
                    <ShieldCheck size={18} aria-hidden="true" />
                    {form.payment === 'online' ? 'پرداخت و ثبت سفارش (دمو)' : 'ثبت سفارش با پرداخت در محل'}
                  </>
                )}
              </button>
              <p className="mt-2.5 flex items-start gap-1.5 text-[0.66rem] leading-5 text-olive">
                <Truck size={13} className="mt-0.5 shrink-0" aria-hidden="true" />
                ارسال ۱ تا ۳ روز کاری (تهران و کرج) و ۲ تا ۵ روز کاری (سایر شهرها) با کد رهگیری پیامکی.
              </p>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}
