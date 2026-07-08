import { NavItem, ProgramItem, ActivityItem, PartnerItem } from '@/types';

export const CLUB_INFO = {
  name: 'نادي رحلة التغيير',
  nameEn: 'Journey of Change Club',
  slogan: 'نحو تغيير إيجابي ومستدام في المجتمع والذات',
  description:
    'نادي شبابي تطوعي يهدف إلى تنمية قدرات الشباب وصقل مهاراتهم القيادية والعلمية والثقافية من خلال برامج نوعية ومبادرات مجتمعية هادفة في مختلف ولايات الجزائر.',
  email: 'journeyofchange0507@gmail.com',
  address: 'الجزائر، تلمسان',
  foundedYear: 2023,
};

export const NAV_LINKS: NavItem[] = [
  { label: 'الرئيسية', href: '/' },
  { label: 'من نحن', href: '/#about' },
  { label: 'برامجنا', href: '/#programs' },
  { label: 'شركاؤنا', href: '/#partners' },
  { label: 'انضم إلينا', href: '/register', isCTA: true },
];

export const SOCIAL_LINKS = [
  { name: 'تيك توك', href: 'https://www.tiktok.com/@journeyof.change', icon: 'Tiktok', color: 'hover:text-black dark:hover:text-white' },
  { name: 'إنستغرام', href: 'https://www.instagram.com/journeyof.change/', icon: 'Instagram', color: 'hover:text-pink-500' },
];

export const CLUB_STATS = [
  { label: 'عضو نشط', value: '+500', iconName: 'Users' },
  { label: 'برنامج ومبادرة', value: '+35', iconName: 'Award' },
  { label: 'ولاية مغطاة', value: '58', iconName: 'MapPin' },
  { label: 'ساعة تطوعية', value: '+12,000', iconName: 'Clock' },
];

export const CLUB_PROGRAMS: ProgramItem[] = [
  {
    id: 'prog-1',
    title: 'أكاديمية القيادة الشبابية',
    description: 'برنامج تدريبي مكثف لإعداد قادة التغيير وتطوير التفكير الاستراتيجي ومهارات إدارة الفرق والمشاريع.',
    iconName: 'Compass',
    category: 'leadership',
    featured: true,
  },
  {
    id: 'prog-2',
    title: 'مبادرة التميز التقني والرقمي',
    description: 'ورشات عمل وتدريبات تطبيقية في مجالات البرمجة، الذكاء الاصطناعي، والتسويق الرقمي الحديث.',
    iconName: 'Laptop',
    category: 'tech',
    featured: true,
  },
  {
    id: 'prog-3',
    title: 'صالون الفكر والثقافة',
    description: 'لقاءات دورية ومناظرات فكرية ومناقشات للكتب الهادفة لتوسيع المدارك وتعزيز ثقافة الحوار بناءً.',
    iconName: 'BookOpen',
    category: 'culture',
    featured: true,
  },
  {
    id: 'prog-4',
    title: 'قوافل التغيير الاجتماعي والتطوع',
    description: 'حملات تضامنية ومبادرات بيئية واجتماعية تستهدف مختلف مناطق الوطن لنشر قيم التكافل.',
    iconName: 'HeartHandshake',
    category: 'social',
  },
  {
    id: 'prog-5',
    title: 'نادي التحدث والخطابة العامة',
    description: 'تدريبات عملية لكسر حاجز الخوف وتطوير مهارات العرض والإقناع والتواصل الفعال أمام الجمهور.',
    iconName: 'Mic',
    category: 'educational',
  },
  {
    id: 'prog-6',
    title: 'حاضنة المبادرات والمشاريع الصغرى',
    description: 'مرافقة الشباب أصحاب الأفكار الريادية وتحويلها إلى مشاريع مجتمعية ناجحة ذات أثر مستدام.',
    iconName: 'Rocket',
    category: 'leadership',
  },
];

export const RECENT_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'القمة الشبابية السنوية لصناع التغيير',
    date: '15 مارس 2026',
    location: 'قصر المؤتمرات - الجزائر العاصمة',
    image: '/assets/images/activity1.jpg',
    summary: 'تجمع وطني شهد حضور أكثر من 300 شاب وشابة لمناقشة تحديات المستقبل وطرح حلول ابتكارية للمجتمع.',
  },
  {
    id: 'act-2',
    title: 'معسكر القيادة والتحدي الصيفي',
    date: '20 أوت 2025',
    location: 'تيكجدة - البويرة',
    image: '/assets/images/activity2.jpg',
    summary: 'مخيم تدريبي دام 5 أيام ركز على بناء العمل الجماعي وتحمل المسؤولية في ظروف طبيعية ملهمة.',
  },
  {
    id: 'act-3',
    title: 'حملة التشجير الوطنية "غابة التغيير"',
    date: '1 نوفمبر 2025',
    location: 'غابة باينام - الجزائر',
    image: '/assets/images/activity3.jpg',
    summary: 'مبادرة بيئية كبرى تم خلالها غرس أكثر من 2000 شجرة بمشاركة أعضاء النادي وعائلاتهم.',
  },
];

export const CLUB_PARTNERS: PartnerItem[] = [
  { id: 'part-1', name: 'وزارة الشباب والرياضة', logo: '/assets/icons/partner1.png' },
  { id: 'part-2', name: 'Dz Young Leaders', logo: '/assets/icons/partner2.png' },
  { id: 'part-3', name: 'دار الشباب لبلدية بني مستار', logo: '/assets/icons/partner3.png' },
];

export const INTERESTS_LIST = [
  { id: 'leadership', label: 'القيادة وإدارة الفرق', icon: 'Users' },
  { id: 'tech', label: 'التكنولوجيا والذكاء الاصطناعي', icon: 'Cpu' },
  { id: 'culture', label: 'الثقافة والأدب والمطالعة', icon: 'BookOpen' },
  { id: 'environment', label: 'البيئة والاستدامة', icon: 'TreePine' },
  { id: 'charity', label: 'العمل الخيري والتضامن الاجتماعي', icon: 'HeartHandshake' },
  { id: 'media', label: 'الإعلام، التصوير وصناعة المحتوى', icon: 'Camera' },
  { id: 'entrepreneurship', label: 'ريادة الأعمال والمشاريع الناشئة', icon: 'TrendingUp' },
  { id: 'public_speaking', label: 'الخطابة والتحدث أمام الجمهور', icon: 'Mic' },
];

export const HOBBIES_LIST = [
  'المطالعة والقراءة',
  'الكتابة والتدوين',
  'التصوير الفوتوغرافي والفيديو',
  'التصميم الجرافيكي والمونتاج',
  'البرمجة وتطوير الويب',
  'الرياضة والرحلات الخلوية (Hiking)',
  'الرسم والفنون التشكيليّة',
  'الشطرنج والألعاب الفكرية',
  'التطوع وتنظيم الفعاليات',
  'تعلم اللغات الحية',
];

export const SKILLS_LIST = [
  'إدارة المشاريع والتخطيط',
  'التواصل الفعال والإقناع',
  'العمل الجماعي والتعاون',
  'حل المشكلات والتفكير النقدي',
  'إدارة الوقت والأولويات',
  'التصميم (Photoshop / Illustrator / Canva)',
  'صناعة وتحرير الفيديو (Premiere / CapCut)',
  'التسويق الرقمي وإدارة حسابات التواصل',
  'التحدث باللغتين الإنجليزية والفرنسية بطلاقة',
  'الإسعافات الأولية والسلامة العامة',
];

export const VOLUNTEER_ROLES = [
  { id: 'organizer', label: 'تنظيم وإدارة الفعاليات والمؤتمرات', icon: 'Calendar' },
  { id: 'designer', label: 'التصميم الجرافيكي والمونتاج', icon: 'Palette' },
  { id: 'marketer', label: 'التسويق الرقمي وكتابة المحتوى', icon: 'Share2' },
  { id: 'trainer', label: 'تقديم ورشات تدريبية وتعليمية', icon: 'Presentation' },
  { id: 'field_worker', label: 'العمل الميداني والإغاثي والتطوعي', icon: 'Heart' },
  { id: 'it_support', label: 'الدعم التقني وتطوير الموقع والأنظمة', icon: 'Code' },
  { id: 'pr', label: 'العلاقات العامة والتواصل مع الشركاء', icon: 'Briefcase' },
];

export const AVAILABLE_DAYS_LIST = [
  { id: 'saturday', label: 'السبت' },
  { id: 'sunday', label: 'الأحد' },
  { id: 'monday', label: 'الإثنين' },
  { id: 'tuesday', label: 'الثلاثاء' },
  { id: 'wednesday', label: 'الأربعاء' },
  { id: 'thursday', label: 'الخميس' },
  { id: 'friday', label: 'الجمعة' },
];

export const SEO_CONFIG = {
  titleDefault: 'نادي رحلة التغيير | منصة الشباب وصناع التغيير في الجزائر',
  titleTemplate: '%s | نادي رحلة التغيير',
  description: 'نادي رحلة التغيير هو فضاء شبابي جزائري رائد يهدف إلى تطوير المهارات، القيادة، والعمل التطوعي لإحداث أثر إيجابي ومستدام في المجتمع.',
  keywords: ['نادي رحلة التغيير', 'تطوع في الجزائر', 'شباب الجزائر', 'تطوير المهارات', 'قيادة شبابية', 'أنشطة شبابية الجزائر', 'Journey of Change'],
  url: 'https://journeyofchange.dz',
  ogImage: '/assets/logo.png',
};
