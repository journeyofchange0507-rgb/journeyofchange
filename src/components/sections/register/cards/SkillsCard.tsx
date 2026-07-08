'use client';

import { UseFormReturn } from 'react-hook-form';
import { FullRegisterInput } from '@/lib/validations/register-schema';
import { SKILLS_LIST } from '@/constants';
import { Zap, Check, PlusCircle } from 'lucide-react';

interface SkillsCardProps {
  form: UseFormReturn<FullRegisterInput, any, any>;
}

export function SkillsCard({ form }: SkillsCardProps) {
  const { register, watch, setValue, formState: { errors } } = form;
  const selectedSkills = watch('skills') || [];

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setValue(
        'skills',
        selectedSkills.filter((s) => s !== skill),
        { shouldValidate: true }
      );
    } else {
      setValue('skills', [...selectedSkills, skill], { shouldValidate: true });
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          <span>المهارات والخبرات العملية</span>
        </h3>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          حدد المهارات التقنية، القيادية، أو التنظيمية التي تتقنها وتود توظفيها في مشاريع النادي.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {SKILLS_LIST.map((skill) => {
          const isSelected = selectedSkills.includes(skill);
          return (
            <div
              key={skill}
              onClick={() => toggleSkill(skill)}
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
                {skill}
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
      {errors.skills && (
        <p className="text-xs text-red-500 font-medium">{errors.skills.message}</p>
      )}

      {/* حقل إضافي لمهارات أخرى */}
      <div className="pt-4 space-y-2 border-t border-neutral-100 dark:border-neutral-800">
        <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
          <PlusCircle className="w-4 h-4 text-emerald-500" />
          <span>هل تتقن مهارات أخرى (لغات، برمجيات، فنون)؟ (اختياري)</span>
        </label>
        <input
          type="text"
          placeholder="اكتب أي مهارات إضافية تميزك هنا..."
          {...register('otherSkills')}
          className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-sm transition-all focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
        />
        {errors.otherSkills && (
          <p className="text-xs text-red-500 font-medium">{errors.otherSkills.message}</p>
        )}
      </div>
    </div>
  );
}
