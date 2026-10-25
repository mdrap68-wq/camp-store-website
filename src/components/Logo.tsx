import { Link } from 'react-router-dom';

function Mark({ variant }: { variant: 'dark' | 'light' }) {
  const plate = variant === 'dark' ? '#233D32' : '#1A2E26';
  const peak = variant === 'dark' ? '#E9DFC9' : '#F0E8D6';
  const facet = variant === 'dark' ? '#D5C8A8' : '#E2D6BA';
  const ember = '#C87545';

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
    >
      <rect width="64" height="64" rx="14" fill={plate} />
      {/* Mountain with inner facet */}
      <path d="M12 44 L32 10 L52 44 Z" fill={peak} />
      <path d="M32 10 L40 24 L32 44 Z" fill={facet} />
      {/* Ember sun */}
      <circle cx="48" cy="15" r="5.5" fill={ember} />
      {/* A-frame tent */}
      <path d="M22 48 L32 30 L42 48 Z" fill={peak} />
      <path d="M32 30 L38 48 H26 Z" fill={plate} />
      {/* Ground */}
      <path d="M14 50 H50" stroke={ember} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const wordColor = variant === 'dark' ? 'text-forest' : 'text-sand';
  const tagColor = variant === 'dark' ? 'text-olive' : 'text-sand/70';

  return (
    <Link to="/" aria-label="روکا — خانه" className="group flex shrink-0 items-center gap-2.5">
      <Mark variant={variant} />
      <span className="flex flex-col leading-none">
        <span className={`text-[1.7rem] font-black tracking-tight ${wordColor}`}>روکا</span>
        <span className={`mt-1 hidden text-[0.6rem] font-medium tracking-wide sm:block ${tagColor}`}>
          تجهیزات کمپ و طبیعت‌گردی
        </span>
      </span>
    </Link>
  );
}
