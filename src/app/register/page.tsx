import { Metadata } from 'next';
import { RegistrationForm } from '@/components/sections/register/RegistrationForm';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { SEO_CONFIG, CLUB_INFO } from '@/constants';

export const metadata: Metadata = {
  title: `الانضمام والتسجيل | ${CLUB_INFO.name}`,
  description: 'استمارة انضمام الأعضاء الجدد في نادي رحلة التغيير. سجل الآن وكن جزءاً من نخبة صناع التغيير في 58 ولاية جزائرية.',
  openGraph: {
    title: `الانضمام والتسجيل | ${CLUB_INFO.name}`,
    description: 'استمارة انضمام الأعضاء الجدد في نادي رحلة التغيير. سجل الآن وكن جزءاً من نخبة صناع التغيير.',
    url: `${SEO_CONFIG.url}/register`,
  },
};

export default function RegisterPage() {
  return (
    <div className="py-12 lg:py-16 bg-neutral-50/50 dark:bg-neutral-950/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="استمارة الانضمام إلى نادي رحلة التغيير"
          subtitle="نحن سعداء برغبتك في الانضمام إلينا! تتكون هذه الاستمارة من 7 مستويات بسيطة وسريعة لتحديد اهتماماتك وتوجيهك بالشكل الأمثل."
          badge="بوابة الانضمام"
        />

        <RegistrationForm />
      </div>
    </div>
  );
}
