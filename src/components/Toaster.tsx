import { ShoppingCart, CheckCircle2, Info, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Toaster() {
  const { toasts, dismissToast, openCart } = useCart();
  if (toasts.length === 0) return null;

  return (
    <div aria-live="polite" className="pointer-events-none fixed bottom-4 inset-x-0 z-50 flex flex-col items-center gap-2 px-4 sm:bottom-6">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="anim-toast-in pointer-events-auto flex w-full max-w-md items-center gap-3 rounded-2xl border border-pine bg-pine py-2.5 ps-3 pe-2 text-sand shadow-[var(--shadow-lift)]"
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-forest">
            {toast.icon === 'check' ? (
              <CheckCircle2 size={17} className="text-sand" aria-hidden="true" />
            ) : toast.icon === 'info' ? (
              <Info size={17} className="text-sand" aria-hidden="true" />
            ) : (
              <ShoppingCart size={17} className="text-sand" aria-hidden="true" />
            )}
          </span>
          <p className="flex-1 text-[0.78rem] font-semibold leading-6 line-clamp-2">{toast.message}</p>
          <button
            type="button"
            onClick={() => {
              dismissToast(toast.id);
              openCart();
            }}
            className="shrink-0 rounded-lg bg-forest/70 px-3 h-8 text-[0.7rem] font-bold text-sand transition hover:bg-forest"
          >
            مشاهده سبد
          </button>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            aria-label="بستن پیام"
            className="grid size-8 shrink-0 place-items-center rounded-lg text-sand/70 transition hover:bg-forest hover:text-sand"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
