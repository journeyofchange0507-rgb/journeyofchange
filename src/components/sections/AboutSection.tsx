'use client';

import { motion } from 'framer-motion';
import { Target, Heart, Shield, Award, CheckCircle2, Zap, Users2, BookOpen } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { CLUB_INFO } from '@/constants';

const features = [
  {
    icon: <Target className="w-6 h-6 text-emerald-500" />,
    title: 'رؤيتنا الاستراتيجية',
    description: 'بناء جيل قيادي واعٍ، يمتلك أدوات العصر ومهارات المستقبل، قادر على صياغة حلول مجتمعية مبتكرة ومستدامة.',
  },
  {
    icon: <Heart className="w-6 h-6 text-red-500" />,
    title: 'رسالتنا الإنسانية',
    description: 'نشر ثقافة التطوع الحقيقي والتكافل الاجتماعي، وتوفير بيئة شبابية محفزة على الإبداع والعطاء دون قيود.',
  },
  {
    icon: <Shield className="w-6 h-6 text-blue-500" />,
    title: 'قيمنا الأساسية',
    description: 'الشفافية، الالتزام، روح الفريق، التميز المستمر، واحترام التنوع الثقافي في جميع ربوع الوطن.',
  },
];

const checklist = [
  'تطوير مهارات القيادة وإدارة المشاريع عملياً',
  'الاحتكاك بنخبة من المؤثرين وصناع التغيير في الجزائر',
  'الحصول على شهادات مشاركة معتمدة في البرامج والتدريبات',
  'المساهمة الفعلية في مبادرات خيرية وتنموية ذات أثر واسع',
  'بيئة آمنة وإيجابية تحفز على التطور الشخصي المستمر',
  'تمثيل ولايتك وبلدية إقامتك في التظاهرات الوطنية',
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="تعرف على نادي رحلة التغيير"
          subtitle="نحن لسنا مجرد نادٍ تقليدي، بل نحن منصة شبابية حية تجمع الطاقات الشاغرة وتحولها إلى أثر ملموس على أرض الواقع."
          badge="من نحن"
        />

        {/* شبكة الرؤية والرسالة والقيم */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-lg shadow-neutral-100 dark:shadow-none transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-6 shadow-sm group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/50 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span>اكتشف المزيد</span>
                <span className="transform group-hover:-translate-x-1 transition-transform">◀</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* لماذا تنضم إلينا؟ (Why Join Us Checklist) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-emerald-900 via-neutral-900 to-teal-950 text-white shadow-2xl relative overflow-hidden border border-emerald-500/20"
        >
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                مميزات العضوية
              </span>
              <h3 className="text-2xl lg:text-3xl font-extrabold leading-tight">
                لماذا يجب أن تكون جزءاً من عائلة رحلة التغيير؟
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                انضمامك إلينا يفتح أمامك أبواباً واسعة من الفرص التدريبية والتجارب الميدانية التي تصنع الفرق في مسيرتك العلمية والمهنية.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {checklist.map((point, idx) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-neutral-100">{point}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
