import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Check } from 'lucide-react';
import { type Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatToman, formatRating, toFaDigits } from '../lib/format';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, qtyOf } = useCart();
  const inCart = qtyOf(product.id);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone bg-white shadow-[var(--shadow-card)] card-hover">
      {/* Image */}
      <Link
        to={`/product/${product.id}`}
        className="relative block overflow-hidden bg-sand/40"
        aria-label={product.name}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={512}
          height={512}
          className="aspect-square w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        {product.badge && (
          <span className="absolute top-3 start-3 rounded-full bg-forest/95 px-3 py-1 text-[0.65rem] font-bold text-sand backdrop-blur-sm">
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/55 backdrop-blur-[2px]">
            <span className="rounded-full border border-stone bg-white px-4 py-1.5 text-xs font-bold text-charcoal shadow-sm">
              ناموجود — به‌زودی
            </span>
          </div>
        )}
        {product.stockLeft && product.stockLeft <= 10 && product.inStock && (
          <span className="absolute bottom-3 start-3 rounded-full bg-warning-bg px-2.5 py-1 text-[0.62rem] font-bold text-warning border border-[#E8D5B5]">
            فقط {toFaDigits(product.stockLeft)} عدد باقی‌مانده
          </span>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-1.5 p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[0.68rem] font-semibold text-olive">{product.brand}</span>
          {product.rating > 0 && (
            <span className="flex items-center gap-1 text-[0.68rem] font-semibold text-charcoal">
              <Star size={12} className="fill-amber-400 text-amber-400" aria-hidden="true" />
              {formatRating(product.rating)}
              <span className="font-normal text-olive">({toFaDigits(product.reviewCount)})</span>
            </span>
          )}
        </div>

        <Link
          to={`/product/${product.id}`}
          className="text-[0.82rem] font-bold leading-6 text-charcoal line-clamp-2 min-h-[2.6rem] hover:text-forest transition-colors"
        >
          {product.name}
        </Link>

        <div className="mt-auto pt-2">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[0.95rem] sm:text-base font-extrabold text-forest">
              {formatToman(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-[0.7rem] font-medium text-olive line-through decoration-[1.5px]">
                {formatToman(product.compareAtPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => {
              if (!product.inStock) return;
              addToCart(product.id);
            }}
            className={`mt-2.5 flex h-10 w-full items-center justify-center gap-2 rounded-xl text-[0.8rem] font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest
              ${
                product.inStock
                  ? inCart > 0
                    ? 'bg-success-bg text-success border border-[#CBDED2] hover:bg-[#DCEDE3]'
                    : 'bg-forest text-sand hover:bg-pine active:scale-[0.98]'
                  : 'cursor-not-allowed bg-stone/60 text-olive'
              }`}
          >
            {!product.inStock ? (
              'ناموجود'
            ) : inCart > 0 ? (
              <>
                <Check size={16} strokeWidth={2.5} aria-hidden="true" className="shrink-0" />
                <span className="sm:hidden">در سبد ({toFaDigits(inCart)})</span>
                <span className="hidden sm:inline">در سبد ({toFaDigits(inCart)}) — افزودن بیشتر</span>
              </>
            ) : (
              <>
                <ShoppingCart size={16} aria-hidden="true" />
                افزودن به سبد
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
