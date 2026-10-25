import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingCart, ArrowLeft, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT } from '../data/products';
import { formatToman, toFaDigits } from '../lib/format';

export default function CartDrawer() {
  const { isOpen, closeCart, lines, subtotal, setQty, removeFromCart, count } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeCart();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="سبد خرید">
      {/* Overlay */}
      <button
        type="button"
        aria-label="بستن سبد خرید"
        className="absolute inset-0 h-full w-full cursor-default bg-pine/55 backdrop-blur-[2px] anim-overlay-in"
        onClick={closeCart}
      />

      {/* Panel — slides from the left edge in RTL */}
      <aside className="anim-drawer-in absolute inset-y-0 left-0 flex h-full w-full max-w-md flex-col bg-offwhite shadow-2xl">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-stone px-5">
          <h2 className="flex items-center gap-2 text-base font-extrabold text-forest">
            <ShoppingCart size={19} aria-hidden="true" />
            سبد خرید شما
            {count > 0 && <span className="text-sm font-bold text-olive">({toFaDigits(count)} کالا)</span>}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="بستن"
            className="grid size-10 place-items-center rounded-xl text-charcoal transition hover:bg-sand/60"
          >
            <X size={20} />
          </button>
        </div>

        {lines.length === 0 ? (
          /* Empty state */
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <svg viewBox="0 0 120 120" className="size-28 text-sand-deep" fill="none" aria-hidden="true">
              <path d="M14 84 L44 30 L58 56 L68 42 L106 84 Z" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
              <path d="M20 96 h80" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeDasharray="2 10" />
            </svg>
            <h3 className="text-lg font-extrabold text-charcoal">سبد شما خالی است</h3>
            <p className="text-sm leading-7 text-olive max-w-[26ch]">
              هنوز چیزی برای ماجراجویی بعدی انتخاب نکرده‌اید. بیایید تجهیزات را ببینیم.
            </p>
            <button
              type="button"
              onClick={() => {
                closeCart();
                navigate('/shop');
              }}
              className="mt-1 h-11 rounded-xl bg-forest px-6 text-sm font-bold text-sand transition hover:bg-pine"
            >
              رفتن به فروشگاه
            </button>
          </div>
        ) : (
          <>
            {/* Free shipping progress */}
            <div className="border-b border-stone bg-sand/35 px-5 py-3">
              <p className="flex items-center gap-1.5 text-[0.72rem] font-bold text-forest">
                <Truck size={14} aria-hidden="true" />
                {remaining > 0 ? (
                  <span>فقط {formatToman(remaining)} تا ارسال رایگان باقی مانده</span>
                ) : (
                  <span className="text-success">تبریک! ارسال این سفارش رایگان است</span>
                )}
              </p>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-stone" role="presentation">
                <div
                  className="h-full rounded-full bg-forest transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Lines */}
            <ul className="flex-1 divide-y divide-stone overflow-y-auto px-5">
              {lines.map((line) => {
                const p = PRODUCTS.find((x) => x.id === line.id);
                if (!p) return null;
                return (
                  <li key={line.id} className="flex gap-3 py-4">
                    <Link
                      to={`/product/${p.id}`}
                      onClick={closeCart}
                      className="block size-20 shrink-0 overflow-hidden rounded-xl border border-stone bg-sand/40"
                    >
                      <img src={p.image} alt={p.name} className="size-full object-cover" loading="lazy" />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <Link
                        to={`/product/${p.id}`}
                        onClick={closeCart}
                        className="text-[0.78rem] font-bold leading-5 text-charcoal line-clamp-2 hover:text-forest"
                      >
                        {p.name}
                      </Link>
                      <span className="mt-0.5 text-[0.72rem] font-extrabold text-forest">{formatToman(p.price)}</span>
                      <div className="mt-auto flex items-center justify-between pt-1.5">
                        {/* Qty stepper */}
                        <div className="flex h-8 items-center rounded-lg border border-stone bg-white" role="group" aria-label="تعداد">
                          <button
                            type="button"
                            className="grid size-8 place-items-center rounded-s-lg text-forest hover:bg-sand/60 text-base font-bold"
                            onClick={() => setQty(p.id, line.qty - 1)}
                            aria-label="کاهش تعداد"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-[0.8rem] font-extrabold tabular-nums text-charcoal">
                            {toFaDigits(line.qty)}
                          </span>
                          <button
                            type="button"
                            className="grid size-8 place-items-center rounded-e-lg text-forest hover:bg-sand/60 text-base font-bold"
                            onClick={() => setQty(p.id, line.qty + 1)}
                            aria-label="افزایش تعداد"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(p.id)}
                          aria-label="حذف از سبد"
                          className="grid size-8 place-items-center rounded-lg text-olive transition hover:bg-danger-bg hover:text-danger"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Summary */}
            <div className="border-t border-stone bg-white px-5 py-4">
              <div className="flex items-center justify-between text-[0.8rem] text-olive">
                <span>جمع جزء</span>
                <span className="font-bold text-charcoal">{formatToman(subtotal)}</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-[0.8rem] text-olive">
                <span>ارسال</span>
                <span className="font-bold text-charcoal">
                  {subtotal >= FREE_SHIPPING_THRESHOLD ? 'رایگان' : formatToman(SHIPPING_FLAT)}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-dashed border-stone pt-2">
                <span className="text-sm font-extrabold text-charcoal">مبلغ کل</span>
                <span className="text-base font-black text-forest">
                  {formatToman(subtotal + (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT))}
                </span>
              </div>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-ember text-sm font-extrabold text-white transition hover:bg-ember-dark active:scale-[0.99]"
              >
                تکمیل سفارش و پرداخت
                <ArrowLeft size={17} aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={closeCart}
                className="mt-1.5 h-10 w-full rounded-xl text-[0.78rem] font-bold text-olive transition hover:text-forest"
              >
                ادامه خرید
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
