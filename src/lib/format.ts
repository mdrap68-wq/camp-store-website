const faDigits = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];

/** Convert Latin digits to Persian digits */
export function toFaDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => faDigits[Number(d)]);
}

/** Format price in تومان with Persian digits and thousands separators */
export function formatToman(amount: number): string {
  const grouped = Math.round(amount).toLocaleString('en-US');
  return `${toFaDigits(grouped)} تومان`;
}

/** Compact price without unit (for tight spaces) */
export function formatNumber(n: number): string {
  return toFaDigits(Math.round(n).toLocaleString('en-US'));
}

/** Persian rating display */
export function formatRating(r: number): string {
  return toFaDigits(r.toFixed(1));
}
