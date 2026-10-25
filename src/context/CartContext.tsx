import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { PRODUCTS } from '../data/products';

export interface CartLine {
  id: string;
  qty: number;
}

export interface Toast {
  id: number;
  message: string;
  icon?: 'cart' | 'check' | 'info';
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  toasts: Toast[];
  addToCart: (id: string, qty?: number, opts?: { silent?: boolean }) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  qtyOf: (id: string) => number;
  pushToast: (message: string, icon?: Toast['icon']) => void;
  dismissToast: (id: number) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'ruka-cart-v1';

function loadStored(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l) => l && typeof l.id === 'string' && typeof l.qty === 'number' && l.qty > 0
        && PRODUCTS.some((p) => p.id === l.id),
    );
  } catch {
    return [];
  }
}

let toastId = 0;

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    if (typeof window === 'undefined') return [];
    return loadStored();
  });
  const [isOpen, setIsOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable */
    }
  }, [lines]);

  // Lock body scroll when cart drawer is open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const dismissToast = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const pushToast = useCallback(
    (message: string, icon: Toast['icon'] = 'cart') => {
      const id = ++toastId;
      setToasts((t) => [...t.slice(-2), { id, message, icon }]);
      window.setTimeout(() => dismissToast(id), 3600);
    },
    [dismissToast],
  );

  const addToCart = useCallback(
    (id: string, qty = 1, opts?: { silent?: boolean }) => {
      setLines((prev) => {
        const existing = prev.find((l) => l.id === id);
        if (existing) {
          return prev.map((l) => (l.id === id ? { ...l, qty: Math.min(l.qty + qty, 20) } : l));
        }
        return [...prev, { id, qty }];
      });
      if (!opts?.silent) {
        const p = PRODUCTS.find((x) => x.id === id);
        if (p) pushToast(`«${p.brand}» به سبد خرید اضافه شد`, 'cart');
      }
    },
    [pushToast],
  );

  const removeFromCart = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) => {
      if (qty <= 0) return prev.filter((l) => l.id !== id);
      return prev.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, 20) } : l));
    });
  }, []);

  const clearCart = useCallback(() => setLines([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((v) => !v), []);

  const qtyOf = useCallback((id: string) => lines.find((l) => l.id === id)?.qty ?? 0, [lines]);

  const { count, subtotal } = useMemo(() => {
    let count = 0;
    let subtotal = 0;
    for (const l of lines) {
      const p = PRODUCTS.find((x) => x.id === l.id);
      if (!p) continue;
      count += l.qty;
      subtotal += l.qty * p.price;
    }
    return { count, subtotal };
  }, [lines]);

  const value: CartContextValue = {
    lines,
    count,
    subtotal,
    isOpen,
    toasts,
    addToCart,
    removeFromCart,
    setQty,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
    qtyOf,
    pushToast,
    dismissToast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
