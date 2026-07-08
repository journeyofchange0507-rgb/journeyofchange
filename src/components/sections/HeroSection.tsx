'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, ShieldCheck, Users, Globe } from 'lucide-react';
import { CLUB_INFO, CLUB_STATS } from '@/constants';

export function HeroSection() {
  const [quickEmail, setQuickEmail] = useState('');
  const router = useRouter();

  const handleQuickRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickEmail.trim()) {
      router.push(`/register?email=${encodeURIComponent(quickEmail.trim())}`);
    } else {
      router.push('/register');
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 lg:py-28">
      {/* خلفية متوهجة وحركات ألوان ديكورية (Background Glow & Gradients) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 dark:from-emerald-500/15 dark:to-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* شريط علوي تحفيزي (Badge) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 shadow-sm mb-8 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span className="text-xs sm:text-sm font-semibold">
            باب الانضمام مفتوح لصناع التغيير في 58 ولاية جزائرية
          </span>
        </motion.div>

        {/* العنوان الرئيسي (Main Headline) */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-7xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight max-w-4xl mx-auto"
        >
          اصنع أثرك، وابدأ{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500">
            رحلة التغيير
          </span>{' '}
          الحقيقية اليوم
        </motion.h1>

        {/* الوصف (Subtitle) */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 sm:mt-8 text-base sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed"
        >
          {CLUB_INFO.slogan}. انضم إلى نخبة الشباب الجزائري الطموح في أكبر منصة لتطوير القدرات، القيادة، والعمل الاجتماعي التطوعي.
        </motion.p>

        {/* خانة التسجيل السريع في الهيرو (Quick Registration Form - User Request #3) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 max-w-md mx-auto"
        >
          <form
            onSubmit={handleQuickRegister}
            className="p-2 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl flex flex-col sm:flex-row items-center gap-2"
          >
            <input
              type="email"
              value={quickEmail}
              onChange={(e) => setQuickEmail(e.target.value)}
              placeholder="أدخل بريدك الإلكتروني للبدء السريع..."
              className="w-full px-4 py-3 text-sm rounded-xl bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              aria-label="البريد الإلكتروني للتسجيل السريع"
            />
            <button
              type="submit"
              className="w-full sm:w-auto shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 group"
            >
              <span>انضم الآن</span>
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </button>
          </form>
          <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400 flex items-center justify-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>تسجيل مجاني وبدون رسوم</span>
            </span>
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-emerald-500" />
              <span>تغطية وطنية شاملة</span>
            </span>
          </p>
        </motion.div>

        {/* العدادات والإحصائيات (Animated Stats Ticker) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 sm:mt-20 pt-10 border-t border-neutral-200/60 dark:border-neutral-800/60 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto"
        >
          {CLUB_STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className="p-4 sm:p-6 rounded-2xl bg-white/50 dark:bg-neutral-900/40 border border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-sm shadow-sm hover:border-emerald-500/50 transition-colors"
            >
              <div className="text-2xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">
                {stat.value}
              </div>
              <div className="mt-1.5 text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
