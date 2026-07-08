'use client';

import { UseFormReturn } from 'react-hook-form';
import { FullRegisterInput } from '@/lib/validations/register-schema';
import { INTERESTS_LIST } from '@/constants';
import { Sparkles, Check, PlusCircle } from 'lucide-react';

interface InterestsCardProps {
  form: UseFormReturn<FullRegisterInput, any, any>;
}

export function InterestsCard({ form }: InterestsCardProps) {
  const { register, watch, setValue, formState: { errors } } = form;
  const selectedInterests = watch('interests') || [];

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setValue(
        'interests',
        selectedInterests.filter((item) => item !== id),
        { shouldValidate: true }
      );
    } else {
      setValue('interests', [...selectedInterests, id], { shouldValidate: true });
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-500" />
          <span>مجالات الاهتمام والتطوير</span>
        </h3>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          اختر المجالات التي تشعر بشغف تجاهها وترغب في تطوير مهاراتك فيها أو المساهمة في أنشطتها (يمكنك اختيار أكثر من مجال).
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {INTERESTS_LIST.map((item) => {
          const isSelected = selectedInterests.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleInterest(item.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between group select-none ${
                isSelected
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 shadow-sm'
                  : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-emerald-500/60'
              }`}
            >
              <span className={`text-sm font-semibold ${
                isSelected
                  ? 'text-emerald-900 dark:text-emerald-100 font-bold'
                  : 'text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white'
              }`}>
                {item.label}
              </span>
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                isSelected
                  ? 'bg-emerald-600 text-white scale-105'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-transparent border border-neutral-300 dark:border-neutral-700 group-hover:border-emerald-400'
              }`}>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            </div>
          );
        })}
      </div>
      {errors.interests && (
        <p className="text-xs text-red-500 font-medium">{errors.interests.message}</p>
      )}

      {/* حقل إضافي لاهتمامات أخرى */}
      <div className="pt-4 space-y-2 border-t border-neutral-100 dark:border-neutral-800">
        <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
          <PlusCircle className="w-4 h-4 text-emerald-500" />
          <span>هل لديك اهتمامات أخرى غير مذكورة في القائمة؟ (اختياري)</span>
        </label>
        <input
          type="text"
          placeholder="اكتب أي اهتمامات أو مجالات أخرى ترغب فيها..."
          {...register('otherInterests')}
          className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-sm transition-all focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
        />
        {errors.otherInterests && (
          <p className="text-xs text-red-500 font-medium">{errors.otherInterests.message}</p>
        )}
      </div>
    </div>
  );
}
