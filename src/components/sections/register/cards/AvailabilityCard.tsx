'use client';

import { UseFormReturn } from 'react-hook-form';
import { FullRegisterInput } from '@/lib/validations/register-schema';
import { AVAILABLE_DAYS_LIST } from '@/constants';
import { Clock, Calendar, Check, Sun, Sunset, Moon, Sparkles } from 'lucide-react';

interface AvailabilityCardProps {
  form: UseFormReturn<FullRegisterInput, any, any>;
}

export function AvailabilityCard({ form }: AvailabilityCardProps) {
  const { register, watch, setValue, formState: { errors } } = form;
  const selectedDays = watch('availableDays') || [];
  const hours = watch('hoursPerWeek') || 5;

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setValue(
        'availableDays',
        selectedDays.filter((d) => d !== day),
        { shouldValidate: true }
      );
    } else {
      setValue('availableDays', [...selectedDays, day], { shouldValidate: true });
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-500" />
          <span>التفرغ والجاهزية للأنشطة</span>
        </h3>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          تحديد أوقات تفرغك يساعدنا في تنظيم الاجتماعات وورش العمل في الأوقات التي تناسب الأغلبية.
        </p>
      </div>

      {/* عدد ساعات التفرغ الأسبوعية */}
      <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-500" />
            <span>عدد ساعات التفرغ الأسبوعية:</span>
          </label>
          <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-3 py-1 rounded-xl font-mono">
            {hours} {hours === 1 ? 'ساعة' : 'ساعات'} / أسبوعياً
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={30}
          step={1}
          {...register('hoursPerWeek', { valueAsNumber: true })}
          className="w-full h-2.5 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
        <div className="flex justify-between text-xs text-neutral-400 font-medium">
          <span>1 ساعة (الحد الأدنى)</span>
          <span>15 ساعة (متوسط)</span>
          <span>30 ساعة (تفرغ عالي)</span>
        </div>
        {errors.hoursPerWeek && (
          <p className="text-xs text-red-500 font-medium">{errors.hoursPerWeek.message}</p>
        )}
      </div>

      {/* الأيام المتاحة */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-emerald-500" />
          <span>الأيام المفضلة لحضور الأنشطة والاجتماعات <span className="text-red-500">*</span></span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {AVAILABLE_DAYS_LIST.map((day) => {
            const isSelected = selectedDays.includes(day.id);
            return (
              <div
                key={day.id}
                onClick={() => toggleDay(day.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between select-none ${
                  isSelected
                    ? 'bg-emerald-50/90 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold shadow-2xs'
                    : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-emerald-500/50'
                }`}
              >
                <span className="text-xs sm:text-sm">{day.label}</span>
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
        {errors.availableDays && (
          <p className="text-xs text-red-500 font-medium">{errors.availableDays.message}</p>
        )}
      </div>

      {/* الوقت المفضل خلال اليوم */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>الفترة الزمنية المفضلة خلال اليوم <span className="text-red-500">*</span></span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { value: 'morning', label: 'صباحاً', icon: <Sun className="w-4 h-4 text-amber-500" /> },
            { value: 'afternoon', label: 'بعد الظهر', icon: <Sunset className="w-4 h-4 text-orange-500" /> },
            { value: 'evening', label: 'مساءً', icon: <Moon className="w-4 h-4 text-indigo-400" /> },
            { value: 'flexible', label: 'مرن / أي وقت', icon: <Sparkles className="w-4 h-4 text-emerald-500" /> },
          ].map((time) => (
            <label
              key={time.value}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold ${
                watch('preferredTime') === time.value
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-sm'
                  : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400'
              }`}
            >
              <input type="radio" value={time.value} {...register('preferredTime')} className="hidden" />
              {time.icon}
              <span>{time.label}</span>
            </label>
          ))}
        </div>
        {errors.preferredTime && (
          <p className="text-xs text-red-500 font-medium">{errors.preferredTime.message}</p>
        )}
      </div>
    </div>
  );
}
