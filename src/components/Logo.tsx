import { Link } from 'react-router-dom';

export default function Logo({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const wordColor = variant === 'dark' ? 'text-forest' : 'text-sand';
  return (
    <Link to="/" aria-label="روکا — خانه" className="flex items-center gap-2.5 shrink-0 group">
      <svg width="38" height="38" viewBox="0 0 64 64" aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5">
        <rect width="64" height="64" rx="14" fill="#233D32" />
        <path d="M10 44 L26 16 L34 30 L39 22 L54 44 Z" fill="#E9DFC9" />
        <circle cx="46" cy="14" r="5" fill="#C87545" />
        <path d="M14 44 h36" stroke="#C87545" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`text-[1.7rem] font-black tracking-tight ${wordColor}`}>
          روکا
        </span>
        <span className={`text-[0.6rem] font-medium tracking-wide mt-1 ${variant === 'dark' ? 'text-olive' : 'text-sand/70'}`}>
          تجهیزات کمپ و طبیعت‌گردی
        </span>
      </span>
    </Link>
  );
}
