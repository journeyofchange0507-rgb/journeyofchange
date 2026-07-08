'use client';

import { motion } from 'framer-motion';
import { Check, User, Sparkles, Heart, Zap, Clock, ShieldAlert, Target } from 'lucide-react';

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
  progressPercentage: number;
  stepStatuses: Record<number, boolean>;
  onStepClick: (step: number) => void;
}

const stepLabels = [
  { id: 1, label: 'البيانات الشخصية', icon: <User className="w-4 h-4" /> },
  { id: 2, label: 'مجالات الاهتمام', icon: <Sparkles className="w-4 h-4" /> },
  { id: 3, label: 'الهوايات والشغف', icon: <Heart className="w-4 h-4" /> },
  { id: 4, label: 'المهارات والخبرات', icon: <Zap className="w-4 h-4" /> },
  { id: 5, label: 'التفرغ والجاهزية', icon: <Clock className="w-4 h-4" /> },
  { id: 6, label: 'العمل التطوعي', icon: <ShieldAlert className="w-4 h-4" /> },
  { id: 7, label: 'الأهداف والدافع', icon: <Target className="w-4 h-4" /> },
];

export function FormProgress({
  currentStep,
  totalSteps,
  progressPercentage,
  stepStatuses,
  onStepClick,
}: FormProgressProps) {
  return (
    <div className="mb-10 p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-md">
      {/* رأس شريط التقدم */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/50">
            الخطوة {currentStep} من {totalSteps}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mt-2">
            {stepLabels[currentStep - 1]?.label}
          </h3>
        </div>
        <div className="text-left">
          <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            {progressPercentage}%
          </div>
          <span className="text-xs text-neutral-500">نسبة الاكتمال</span>
        </div>
      </div>

      {/* شريط النسبة المئوية */}
      <div className="w-full h-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden mb-8">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 rounded-full"
        />
      </div>

      {/* أزرار ومراحل الاستمارة السبع */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
        {stepLabels.map((step) => {
          const isCurrent = step.id === currentStep;
          const isCompleted = stepStatuses[step.id];
          const isAccessible = step.id <= currentStep || isCompleted;

          return (
            <button
              key={step.id}
              type="button"
              disabled={!isAccessible}
              onClick={() => isAccessible && onStepClick(step.id)}
              className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between h-24 ${
                isCurrent
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-100 shadow-sm ring-2 ring-emerald-500/20'
                  : isCompleted
                  ? 'bg-neutral-50 dark:bg-neutral-800/60 border-emerald-500/50 text-neutral-700 dark:text-neutral-300 hover:border-emerald-500'
                  : 'bg-neutral-50/50 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 text-neutral-400 dark:text-neutral-600 cursor-not-allowed opacity-70'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-emerald-600 text-white'
                      : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.id}
                </span>
                <span
                  className={`${
                    isCurrent
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : isCompleted
                      ? 'text-emerald-500 dark:text-emerald-500'
                      : 'text-neutral-400'
                  }`}
                >
                  {step.icon}
                </span>
              </div>
              <span className="text-xs font-bold leading-tight line-clamp-2 mt-2">
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
