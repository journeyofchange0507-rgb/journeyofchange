'use client';

import { motion } from 'framer-motion';
import { Compass, Laptop, BookOpen, HeartHandshake, Mic, Rocket, ArrowUpLeft } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { CLUB_PROGRAMS } from '@/constants';
import Link from 'next/link';

const iconMap: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-6 h-6 text-emerald-500" />,
  Laptop: <Laptop className="w-6 h-6 text-blue-500" />,
  BookOpen: <BookOpen className="w-6 h-6 text-amber-500" />,
  HeartHandshake: <HeartHandshake className="w-6 h-6 text-red-500" />,
  Mic: <Mic className="w-6 h-6 text-purple-500" />,
  Rocket: <Rocket className="w-6 h-6 text-teal-500" />,
};

export function ProgramsSection() {
  return (
    <section id="programs" className="py-20 lg:py-28 bg-neutral-100/50 dark:bg-neutral-900/30 border-y border-neutral-200/60 dark:border-neutral-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="برامج ومبادرات النادي"
          subtitle="نقدم باقة متنوعة من البرامج التدريبية والتنموية المصممة لتلبية تطلعات الشباب واحتياجات المجتمع المعاصر."
          badge="برامجنا النوعية"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CLUB_PROGRAMS.map((prog, index) => (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group relative"
            >
              {prog.featured && (
                <span className="absolute top-6 left-6 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  برنامج مميز
                </span>
              )}
              <div>
                <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
                  {iconMap[prog.iconName] || <Compass className="w-6 h-6 text-emerald-500" />}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {prog.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {prog.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors group/btn"
                >
                  <span>سجل في هذا البرنامج</span>
                  <ArrowUpLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" />
                </Link>
                <span className="text-xs text-neutral-400 font-mono">#{prog.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
