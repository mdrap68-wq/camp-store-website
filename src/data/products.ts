export interface Category {
  id: string;
  name: string;
  tagline: string;
  image: string;
  count: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockLeft?: number;
  featured?: boolean;
  badge?: string;
  description: string;
  specs: { label: string; value: string }[];
}

export const CATEGORIES: Category[] = [
  { id: 'tent', name: 'چادر و سرپناه', tagline: 'چادرهای چهارفصل و سفری', image: '/images/cat-tent.jpg', count: 34 },
  { id: 'backpack', name: 'کوله‌پشتی و حمل تجهیزات', tagline: 'کوله‌های کوهنوردی و سفری', image: '/images/cat-backpack.jpg', count: 41 },
  { id: 'sleep', name: 'کیسه‌خواب و زیرانداز', tagline: 'خواب آسایش در هر دما', image: '/images/cat-sleeping.jpg', count: 28 },
  { id: 'cooking', name: 'پخت‌وپز در طبیعت', tagline: 'سرشعله، ظروف و لوازم پخت', image: '/images/cat-cooking.jpg', count: 36 },
  { id: 'lighting', name: 'روشنایی و ابزار کمپ', tagline: 'چراغ‌قوه، فانوس و چندابزار', image: '/images/cat-light.jpg', count: 52 },
  { id: 'furniture', name: 'مبلمان و لوازم جانبی', tagline: 'صندلی، میز و لوازم سفر', image: '/images/cat-furniture.jpg', count: 23 },
];

export const PRODUCTS: Product[] = [
  {
    id: 'tent-koomeh',
    name: 'چادر ۳ نفره کوهِمه پرو ۳ | ضدباران و چهارفصل',
    brand: 'کوهِمه',
    category: 'tent',
    price: 8450000,
    compareAtPrice: 9800000,
    image: '/images/prod-tent.jpg',
    rating: 4.8,
    reviewCount: 126,
    inStock: true,
    featured: true,
    badge: 'پرفروش',
    description: 'چادر گنبدی سه‌نفرهٔ چهارفصل با دو پوش لایه، اسکلت آلومینیومی و ضدآب تا ۴۰۰۰ میلی‌متر؛ انتخاب اول کمپ‌های کوهستانی و جنگلی.',
    specs: [
      { label: 'ظرفیت', value: '۳ نفر + فضای پیش‌چادر' },
      { label: 'وزن', value: '۳٫۱ کیلوگرم (همراه حمل‌کیسه)' },
      { label: 'اسکلت', value: 'آلومینیوم ۷۰۰۱-T6 خودروان' },
      { label: 'مقاومت آبی', value: '۴۰۰۰ mm (پوش بیرونی) / ۶۰۰۰ mm (کف)' },
      { label: 'ابعاد نصب‌شده', value: '۲۲۰ × ۲۱۰ × ۱۳۰ سانتی‌متر' },
    ],
  },
  {
    id: 'backpack-Alborz',
    name: 'کوله‌پشتی ۶۵ لیتری البرز | بدنه ارگونومیک تروپیک',
    brand: 'البرز',
    category: 'backpack',
    price: 6280000,
    image: '/images/prod-backpack.jpg',
    rating: 4.9,
    reviewCount: 214,
    inStock: true,
    featured: true,
    badge: 'انتخاب روکا',
    description: 'کوله‌پشتی ۶۵ لیتری چندروزه با سیستم تهویه‌پشتی تروپیک، کمربند فومی و دوخت ریب‌استاپ؛ ساخته‌شده برای ترک‌های ۴ تا ۷ روزه.',
    specs: [
      { label: 'حجم', value: '۶۵ لیتر (قابل افزایش تا ۷۲)' },
      { label: 'وزن', value: '۲٫۴ کیلوگرم' },
      { label: 'بدنه', value: 'نایلون ریب‌استاپ ۴۲۰D با روکش PU' },
      { label: 'سیستم پشتی', value: 'شبکه تهویه‌دار تروپیک با کمربند فومی' },
      { label: 'مناسب برای', value: 'ترک‌های ۴ تا ۷ روزه' },
    ],
  },
  {
    id: 'sleepingbag-sibalan',
    name: 'کیسه‌خواب دُمی سیبالان -۵° | پر مصنوعی ضدحساسیت',
    brand: 'سیبالان',
    category: 'sleep',
    price: 4950000,
    image: '/images/prod-sleepingbag.jpg',
    rating: 4.7,
    reviewCount: 158,
    inStock: true,
    featured: true,
    description: 'کیسه‌خواب دُمی (Mummy) تا دمای حدی ۵- درجه با پر مصنوعی هلیک‌اولفیلا؛ گرم، سبک و قابل شستشو در ماشین لباسشویی.',
    specs: [
      { label: 'دمای حدی', value: '۵- درجه سانتی‌گراد' },
      { label: 'دمای آسایشی', value: '۲ درجه سانتی‌گراد' },
      { label: 'وزن', value: '۱٫۴ کیلوگرم' },
      { label: 'عایق', value: 'پر مصنوعی هالوفیلا ۳×۷ ضدحساسیت' },
      { label: 'اندازه', value: '۲۱۵ × ۸۵ × ۵۵ سانتی‌متر' },
    ],
  },
  {
    id: 'stove-zagros',
    name: 'سرشعله گاز سفری زاگرس | تاشو با جرقه‌زن پیزو',
    brand: 'زاگرس',
    category: 'cooking',
    price: 1890000,
    image: '/images/prod-stove.jpg',
    rating: 4.6,
    reviewCount: 342,
    inStock: true,
    featured: true,
    description: 'سرشعله تک‌شعلهٔ تاشو با جرقه‌زن پیزو و توان ۳۰۰۰ وات؛ جوشیدن ۱ لیتر آب در کمتر از ۳ دقیقه با کپسول‌های استاندارد.',
    specs: [
      { label: 'توان', value: '۳۰۰۰ وات' },
      { label: 'وزن', value: '۳۲۰ گرم (همراه کیف)' },
      { label: 'جرقه‌زن', value: 'پیزو داخلی — بدون باتری' },
      { label: 'مصرف', value: 'حدود ۱۸۰ گرم در ساعت' },
      { label: 'سازگار با', value: 'کپسول‌های استاندارد ان‌فیلتر و ان‌استال' },
    ],
  },
  {
    id: 'lantern-damavand',
    name: 'چراغ فانوس شارژی دماوند | ۱۲۰۰ لومن با پاوربانک داخلی',
    brand: 'دماوند',
    category: 'lighting',
    price: 2450000,
    image: '/images/prod-lantern.jpg',
    rating: 4.8,
    reviewCount: 187,
    inStock: true,
    featured: true,
    badge: 'جدید',
    description: 'فانوس LED شارژی با ۳ سطح نوردهی تا ۱۲۰۰ لومن، پاوربانک داخلی ۱۰٬۰۰۰ میلی‌آمپر و بدنهٔ آلومینیومی ضدضربه.',
    specs: [
      { label: 'نوردهی', value: 'تا ۱۲۰۰ لومن (۳ حالت)' },
      { label: 'باتری', value: '۱۰٬۰۰۰ میلی‌آمپر — شارژ USB-C' },
      { label: 'دوام باتری', value: 'تا ۳۶ ساعت (حالت کم‌نور)' },
      { label: 'بدنه', value: 'آلومینیوم آنودایز — IPX5' },
      { label: 'وزن', value: '۴۸۰ گرم' },
    ],
  },
  {
    id: 'chair-dandeh',
    name: 'صندلی تاشوی دن!ده | چوب بامبو و برزنت',
    brand: 'دن!ده',
    category: 'furniture',
    price: 3150000,
    image: '/images/prod-chair.jpg',
    rating: 4.5,
    reviewCount: 96,
    inStock: true,
    featured: true,
    description: 'صندلی کمپینگ سبک با دسته‌های بامبو طبیعی و نشیمن برزنت ضخیم؛ تاشو و قابل‌حمل با ظرفیت تحمل ۱۲۰ کیلوگرم.',
    specs: [
      { label: 'ظرفیت', value: 'تا ۱۲۰ کیلوگرم' },
      { label: 'وزن', value: '۲٫۱ کیلوگرم' },
      { label: 'بدنه', value: 'استیل و بامبو طبیعی' },
      { label: 'نشیمن', value: 'برزنت پلی‌استر ۶۰۰D' },
      { label: 'ابعاد باز', value: '۵۸ × ۵۵ × ۸۰ سانتی‌متر' },
    ],
  },
  {
    id: 'pad-alvand',
    name: 'زیرانداز فومی خودنفر آلوَند | ضخامت ۸ سانتی‌متر',
    brand: 'آلوَند',
    category: 'sleep',
    price: 2680000,
    image: '/images/prod-pad.jpg',
    rating: 4.4,
    reviewCount: 88,
    inStock: true,
    description: 'زیرانداز خودنفر با عایق‌کاری R-value ۵٫۲ برای خواب راحت در هر فصل؛ پک‌شده با بند فشاری و کیف حمل.',
    specs: [
      { label: 'ضخامت', value: '۸ سانتی‌متر' },
      { label: 'عایق حرارتی', value: 'R-value ۵٫۲ (چهارفصل)' },
      { label: 'وزن', value: '۱٫۱ کیلوگرم' },
      { label: 'بدنه', value: 'پارچه TPU لایه‌لایه ضدسایش' },
      { label: 'ابعاد', value: '۱۸۵ × ۵۵ سانتی‌متر' },
    ],
  },
  {
    id: 'headlamp-haraz',
    name: 'هدلامپ شارژی هراز | ۹۰۰ لومن با حالت قرمز',
    brand: 'هراز',
    category: 'lighting',
    price: 1350000,
    compareAtPrice: 1650000,
    image: '/images/prod-headlamp.jpg',
    rating: 4.7,
    reviewCount: 264,
    inStock: true,
    description: 'هدلامپ سبک با پرتاب نور ۱۲۰ متری، حالت نور قرمز برای حفظ دید شبانه و شارژ مستقیم USB-C.',
    specs: [
      { label: 'نوردهی', value: '۹۰۰ لومن — پرتاب ۱۲۰ متر' },
      { label: 'حالت‌ها', value: '۳ سطح سفید + قرمز' },
      { label: 'شارژ', value: 'USB-C مستقیم' },
      { label: 'وزن', value: '۹۵ گرم' },
      { label: 'استاندارد', value: 'IPX6 ضدآب' },
    ],
  },
  {
    id: 'bottle-khersan',
    name: 'ماگ حرارتی خرّسان ۷۵۰ml | استیل دوجداره با درِ بامبو',
    brand: 'خرّسان',
    category: 'furniture',
    price: 980000,
    image: '/images/prod-bottle.jpg',
    rating: 4.6,
    reviewCount: 131,
    inStock: true,
    description: 'بطری دوجدارهٔ استیل ۷۵۰ میلی‌لیتری با نگهداری ۱۸ ساعتهٔ دما، درِ بامبو و بدنهٔ ضدزنگ مات.',
    specs: [
      { label: 'ظرفیت', value: '۷۵۰ میلی‌لیتر' },
      { label: 'نگهداری دما', value: '۱۸ ساعت گرم / ۲۴ ساعت سرد' },
      { label: 'بدنه', value: 'استیل ضدزنگ ۳۱۶ — بدون BPA' },
      { label: 'در', value: 'بامبو طبیعی با حلقه سیلیکونی' },
      { label: 'وزن', value: '۳۴۵ گرم' },
    ],
  },
  {
    id: 'cookware-aras',
    name: 'ست ظروف سفری ارس | تیتانیوم ۳ تکه با دسته تاشو',
    brand: 'ارس',
    category: 'cooking',
    price: 2750000,
    image: '/images/prod-cookware.jpg',
    rating: 4.7,
    reviewCount: 109,
    inStock: true,
    description: 'ست قابلمه و دو ماهیتابهٔ تیتانیوم با دسته‌های تاشو و کیف حمل مِش؛ وزن فقط ۶۸۰ گرم برای کوهنوردی‌های طولانی.',
    specs: [
      { label: 'تعداد', value: '۳ تکه (قابلمه ۱ لیتر + ۲ ماهیتابه)' },
      { label: 'جنس', value: 'تیتانیوم درجه ۱' },
      { label: 'وزن کل', value: '۶۸۰ گرم' },
      { label: 'دسته', value: 'تاشو مقاوم تا دمای ۲۵۰°' },
      { label: 'شامل', value: 'کیف حمل مش + درب' },
    ],
  },
  {
    id: 'tarp-tashvash',
    name: 'سایبان سفری تاشواش ۳×۳ | ضدباران ۳۰۰۰mm',
    brand: 'تاشواش',
    category: 'tent',
    price: 1650000,
    image: '/images/prod-tarp.jpg',
    rating: 4.3,
    reviewCount: 74,
    inStock: true,
    stockLeft: 7,
    description: 'سایبان چندکارهٔ ۳×۳ متری با ۱۲ حلقهٔ ثابت‌کننده، ریسمان و میخ‌های فولادی؛ سایبان روز، چادر اضطراری یا سایه‌بان پیک‌نیک.',
    specs: [
      { label: 'ابعاد', value: '۳ × ۳ متر' },
      { label: 'مقاومت آبی', value: '۳۰۰۰ mm' },
      { label: 'حلقه‌ها', value: '۱۲ حلقه فلزی ضدزنگ' },
      { label: 'وزن', value: '۱٫۲ کیلوگرم' },
      { label: 'شامل', value: 'ریسمان ۲ متری ×۶ + میخ ×۱۲' },
    ],
  },
  {
    id: 'table-dozdab',
    name: 'میز سفری تاشوی دوزداب | چوب اقاقیا و آلومینیوم',
    brand: 'دوزداب',
    category: 'furniture',
    price: 3480000,
    image: '/images/prod-table.jpg',
    rating: 4.5,
    reviewCount: 63,
    inStock: false,
    description: 'میز کمپینگ تاشو با صفحه چوب اقاقیای طبیعی و پایه‌های آلومینیومی آنودایز؛ تحمل ۳۰ کیلوگرم و جمع‌شدن به ضخامت ۵ سانتی‌متر.',
    specs: [
      { label: 'ابعاد باز', value: '۹۰ × ۶۰ × ۷۰ سانتی‌متر' },
      { label: 'تحمل وزن', value: '۳۰ کیلوگرم' },
      { label: 'وزن', value: '۳٫۶ کیلوگرم' },
      { label: 'صفحه', value: 'چوب اقاقیای طبیعی با روکش محافظ' },
      { label: 'جمع‌شدن', value: 'تا ضخامت ۵ سانتی‌متر' },
    ],
  },
];

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function relatedProducts(p: Product, n = 4) {
  const same = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id);
  const rest = PRODUCTS.filter((x) => x.category !== p.category && x.id !== p.id);
  return [...same, ...rest].slice(0, n);
}

export const SHIPPING_FLAT = 85000;
export const FREE_SHIPPING_THRESHOLD = 3000000;
