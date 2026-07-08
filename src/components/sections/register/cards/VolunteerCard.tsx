'use client';

import { UseFormReturn } from 'react-hook-form';
import { FullRegisterInput } from '@/lib/validations/register-schema';
import { VOLUNTEER_ROLES } from '@/constants';
import { ShieldAlert, Award, Check, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VolunteerCardProps {
  form: UseFormReturn<FullRegisterInput, any, any>;
}

export function VolunteerCard({ form }: VolunteerCardProps) {
  const { register, watch, setValue, formState: { errors } } = form;
  const selectedRoles = watch('preferredRoles') || [];
  const hasExp = watch('hasPreviousExperience');

  const toggleRole = (role: string) => {
    if (selectedRoles.includes(role)) {
      setValue(
        'preferredRoles',
        selectedRoles.filter((r) => r !== role),
        { shouldValidate: true }
      );
    } else {
      setValue('preferredRoles', [...selectedRoles, role], { shouldValidate: true });
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-emerald-500" />
          <span>الخبرة التطوعية والأدوار المفضلة</span>
        </h3>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          سواء كنت ذا خبرة سابقة أو تخطو خطواتك الأولى في عالم التطوع، لدينا مكان مخصص لك.
        </p>
      </div>

      {/* هل لديك خبرة سابقة؟ */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-emerald-500" />
          <span>هل سبق لك المشاركة في أعمال أو جمعيات تطوعية؟ <span className="text-red-500">*</span></span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setValue('hasPreviousExperience', true, { shouldValidate: true })}
            className={`p-4 rounded-xl border text-center font-bold text-sm transition-all ${
              hasExp === true
                ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-sm ring-2 ring-emerald-500/20'
                : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400'
            }`}
          >
            نعم، لدي خبرة سابقة
          </button>
          <button
            type="button"
            onClick={() => {
              setValue('hasPreviousExperience', false, { shouldValidate: true });
              setValue('experienceDetails', '');
            }}
            className={`p-4 rounded-xl border text-center font-bold text-sm transition-all ${
              hasExp === false
                ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-sm ring-2 ring-emerald-500/20'
                : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400'
            }`}
          >
            لا، هذه أول تجربة لي
          </button>
        </div>
      </div>

      {/* تفاصيل الخبرة السابقة (تظهر عند اختيار نعم) */}
      <AnimatePresence>
        {hasExp === true && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden space-y-2 pt-2"
          >
            <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-emerald-500" />
              <span>اذكر أهم الجمعيات أو المشاريع التي تطوعت فيها وأبرز مهامك:</span>
            </label>
            <textarea
              rows={3}
              placeholder="مثال: تطوعت في الهلال الأحمر الجزائري كمسؤول تنظيم فعاليات لمدة سنتين..."
              {...register('experienceDetails')}
              className="w-full p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-sm transition-all focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 leading-relaxed"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* الأدوار التطوعية المفضلة */}
      <div className="space-y-3 pt-2 border-t border-neutral-100 dark:border-neutral-800">
        <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
          <Briefcase className="w-4 h-4 text-emerald-500" />
          <span>الأدوار والمهام التي تفضل القيام بها داخل النادي (اختر ما يناسبك):</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {VOLUNTEER_ROLES.map((role) => {
            const isSelected = selectedRoles.includes(role.id);
            return (
              <div
                key={role.id}
                onClick={() => toggleRole(role.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between select-none ${
                  isSelected
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 font-bold shadow-2xs'
                    : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-emerald-500/50'
                }`}
              >
                <span className="text-xs sm:text-sm">{role.label}</span>
                <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-transparent border border-neutral-300 dark:border-neutral-700'
                }`}>
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              </div>
            );
          })}
        </div>
        {errors.preferredRoles && (
          <p className="text-xs text-red-500 font-medium">{errors.preferredRoles.message}</p>
        )}
      </div>
    </div>
  );
}
