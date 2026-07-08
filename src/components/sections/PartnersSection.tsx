'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { CLUB_PARTNERS } from '@/constants';
import { ShieldCheck, Award } from 'lucide-react';

export function PartnersSection() {
  return (
    <section id="partners" className="py-16 lg:py-24 bg-neutral-100/40 dark:bg-neutral-900/40 border-t border-neutral-200/60 dark:border-neutral-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="شركاء النجاح والرعاية"
          subtitle="نفتخر بثقة ومرافقة أهم الهيئات الرسمية والمؤسسات الفاعلة لدعم مشاريعنا وتأطير شبابنا."
          badge="شركاؤنا"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 items-center justify-center max-w-4xl mx-auto">
          {CLUB_PARTNERS.map((partner, idx) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 lg:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 shadow-sm flex flex-col items-center justify-center text-center gap-3 group h-36"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-sm sm:text-base font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 inline-flex items-center gap-2 bg-white/60 dark:bg-neutral-900/60 px-4 py-2 rounded-full border border-neutral-200/50 dark:border-neutral-800/50 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>هل تمثل مؤسسة أو منظمة وترغب في الشراكة معنا؟ تواصل عبر البريد الرسمي للنادي.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
