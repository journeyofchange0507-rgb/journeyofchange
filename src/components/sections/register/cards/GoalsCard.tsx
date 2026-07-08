'use client';

import { UseFormReturn } from 'react-hook-form';
import { FullRegisterInput } from '@/lib/validations/register-schema';
import { Target, Sparkles, Flag, Compass } from 'lucide-react';

interface GoalsCardProps {
  form: UseFormReturn<FullRegisterInput, any, any>;
}

export function GoalsCard({ form }: GoalsCardProps) {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-6">
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-500" />
          <span>الأهداف والدوافع والتطلعات المستقبلية</span>
        </h3>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          هذه هي الخطوة الأخيرة! أخبرنا عما يلهمك، وما الذي تتطلع لتحقيقه معنا لنصنع قصة نجاح مشتركة.
        </p>
      </div>

      {/* الدافع الأساسي */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>ما هو دافعك الأساسي للانضمام إلى نادي رحلة التغيير؟ <span className="text-red-500">*</span></span>
        </label>
        <textarea
          rows={3}
          placeholder="تحدث بشغف... ما الذي دفعك لاختيار نادينا تحديداً وكيف ترغب أن تؤثر في محيطك؟"
          {...register('motivation')}
          className={`w-full p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border text-sm transition-all focus:outline-none focus:ring-2 leading-relaxed ${
            errors.motivation
              ? 'border-red-500 focus:ring-red-500/30 bg-red-50/50 dark:bg-red-950/20'
              : 'border-neutral-200 dark:border-neutral-700 focus:border-emerald-500 focus:ring-emerald-500/30'
          }`}
        />
        {errors.motivation && (
          <p className="text-xs text-red-500 font-medium">{errors.motivation.message}</p>
        )}
      </div>

      {/* الأهداف على المدى القصير */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
          <Flag className="w-4 h-4 text-emerald-500" />
          <span>أهدافك على المدى القصير (خلال الأشهر الستة القادمة) - اختياري</span>
        </label>
        <textarea
          rows={2}
          placeholder="مثال: اكتساب مهارة التحدث أمام الجمهور، المشاركة في تنظيم فعالية وطنية..."
          {...register('shortTermGoals')}
          className="w-full p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-sm transition-all focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 leading-relaxed"
        />
      </div>

      {/* الأهداف على المدى الطويل */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-emerald-500" />
          <span>أهدافك ورؤيتك على المدى الطويل - اختياري</span>
        </label>
        <textarea
          rows={2}
          placeholder="مثال: قيادة مشروع مجتمعي مستدام، تأسيس فرع أو نادي شبابي محلي..."
          {...register('longTermGoals')}
          className="w-full p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-sm transition-all focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 leading-relaxed"
        />
      </div>

      {/* التوقعات من النادي */}
      <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
        <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
          <Target className="w-4 h-4 text-emerald-500" />
          <span>ما هي توقعاتك من إدارة وفريق رحلة التغيير؟ - اختياري</span>
        </label>
        <textarea
          rows={2}
          placeholder="أخبرنا كيف يمكننا مرافقتك ودعمك بأفضل شكل ممكن..."
          {...register('expectations')}
          className="w-full p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-sm transition-all focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 leading-relaxed"
        />
      </div>
    </div>
  );
}
