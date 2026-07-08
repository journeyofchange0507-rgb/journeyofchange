'use client';

import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FullRegisterInput } from '@/lib/validations/register-schema';
import { useAlgeriaCities } from '@/hooks/useAlgeriaCities';
import { User, Phone, Mail, MapPin, Calendar, Users, Home } from 'lucide-react';

interface PersonalCardProps {
  form: UseFormReturn<FullRegisterInput, any, any>;
}

export function PersonalCard({ form }: PersonalCardProps) {
  const { register, watch, setValue, formState: { errors } } = form;
  const { wilayas, getCommunesByWilayaCode, loading: citiesLoading } = useAlgeriaCities();

  const selectedWilaya = watch('wilaya');
  const availableCommunes = getCommunesByWilayaCode(selectedWilaya);

  // عند تغيير الولاية، قمنا بتصفير قيمة البلدية إذا لم تكن موجودة في قائمة بلديات الولاية الجديدة
  useEffect(() => {
    if (selectedWilaya) {
      const currentCommune = watch('commune');
      const exists = availableCommunes.some((c) => c.name === currentCommune);
      if (!exists && currentCommune) {
        setValue('commune', '', { shouldValidate: true });
      }
    }
  }, [selectedWilaya, availableCommunes, watch, setValue]);

  return (
    <div className="space-y-6">
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
          <User className="w-5 h-5 text-emerald-500" />
          <span>البيانات الشخصية والمعلومات الأساسية</span>
        </h3>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          يرجى إدخال معلوماتك بدقة للتواصل معك لاحقاً وإدراجك في قائمة أعضاء ولايتك.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* الاسم الكامل */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
            <User className="w-4 h-4 text-emerald-500" />
            <span>الاسم الكامل <span className="text-red-500">*</span></span>
          </label>
          <input
            type="text"
            placeholder="مثال: محمد علي"
            {...register('fullName')}
            className={`w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border text-sm transition-all focus:outline-none focus:ring-2 ${
              errors.fullName
                ? 'border-red-500 focus:ring-red-500/30 bg-red-50/50 dark:bg-red-950/20'
                : 'border-neutral-200 dark:border-neutral-700 focus:border-emerald-500 focus:ring-emerald-500/30'
            }`}
          />
          {errors.fullName && (
            <p className="text-xs text-red-500 font-medium">{errors.fullName.message}</p>
          )}
        </div>

        {/* رقم الهاتف */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-emerald-500" />
            <span>رقم الهاتف (الجزائر) <span className="text-red-500">*</span></span>
          </label>
          <input
            type="tel"
            placeholder="مثال: 0612345678 أو 0550000000"
            dir="ltr"
            {...register('phone')}
            className={`w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border text-sm text-right transition-all focus:outline-none focus:ring-2 ${
              errors.phone
                ? 'border-red-500 focus:ring-red-500/30 bg-red-50/50 dark:bg-red-950/20'
                : 'border-neutral-200 dark:border-neutral-700 focus:border-emerald-500 focus:ring-emerald-500/30'
            }`}
          />
          {errors.phone && (
            <p className="text-xs text-red-500 font-medium">{errors.phone.message}</p>
          )}
        </div>

        {/* البريد الإلكتروني */}
        <div className="space-y-2 sm:col-span-2">
          <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-emerald-500" />
            <span>البريد الإلكتروني <span className="text-red-500">*</span></span>
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            dir="ltr"
            {...register('email')}
            className={`w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border text-sm text-right transition-all focus:outline-none focus:ring-2 ${
              errors.email
                ? 'border-red-500 focus:ring-red-500/30 bg-red-50/50 dark:bg-red-950/20'
                : 'border-neutral-200 dark:border-neutral-700 focus:border-emerald-500 focus:ring-emerald-500/30'
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>
          )}
        </div>

        {/* الولاية (Wilaya Dropdown - User Request #4) */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-500" />
            <span>الولاية <span className="text-red-500">*</span></span>
          </label>
          <select
            {...register('wilaya')}
            disabled={citiesLoading}
            className={`w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border text-sm transition-all focus:outline-none focus:ring-2 ${
              errors.wilaya
                ? 'border-red-500 focus:ring-red-500/30 bg-red-50/50 dark:bg-red-950/20'
                : 'border-neutral-200 dark:border-neutral-700 focus:border-emerald-500 focus:ring-emerald-500/30'
            }`}
          >
            <option value="">اختر ولايتك (58 ولاية)...</option>
            {wilayas.map((w) => (
              <option key={w.code} value={w.code}>
                {w.code} - {w.name} ({w.nameAscii})
              </option>
            ))}
          </select>
          {errors.wilaya && (
            <p className="text-xs text-red-500 font-medium">{errors.wilaya.message}</p>
          )}
        </div>

        {/* البلدية (Commune Dropdown - Dynamic based on selected Wilaya) */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
            <Home className="w-4 h-4 text-emerald-500" />
            <span>البلدية <span className="text-red-500">*</span></span>
          </label>
          <select
            {...register('commune')}
            disabled={!selectedWilaya || availableCommunes.length === 0}
            className={`w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border text-sm transition-all focus:outline-none focus:ring-2 ${
              !selectedWilaya
                ? 'opacity-60 cursor-not-allowed'
                : errors.commune
                ? 'border-red-500 focus:ring-red-500/30 bg-red-50/50 dark:bg-red-950/20'
                : 'border-neutral-200 dark:border-neutral-700 focus:border-emerald-500 focus:ring-emerald-500/30'
            }`}
          >
            <option value="">
              {!selectedWilaya ? 'اختر الولاية أولاً...' : 'اختر بلديتك...'}
            </option>
            {availableCommunes.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name} ({c.nameAscii}) - دائرة {c.dairaName}
              </option>
            ))}
          </select>
          {errors.commune && (
            <p className="text-xs text-red-500 font-medium">{errors.commune.message}</p>
          )}
        </div>

        {/* تاريخ الميلاد */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-emerald-500" />
            <span>تاريخ الميلاد <span className="text-red-500">*</span></span>
          </label>
          <input
            type="date"
            {...register('birthDate')}
            className={`w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border text-sm transition-all focus:outline-none focus:ring-2 ${
              errors.birthDate
                ? 'border-red-500 focus:ring-red-500/30 bg-red-50/50 dark:bg-red-950/20'
                : 'border-neutral-200 dark:border-neutral-700 focus:border-emerald-500 focus:ring-emerald-500/30'
            }`}
          />
          {errors.birthDate && (
            <p className="text-xs text-red-500 font-medium">{errors.birthDate.message}</p>
          )}
        </div>

        {/* الجنس */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-emerald-500" />
            <span>الجنس <span className="text-red-500">*</span></span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
              watch('gender') === 'male'
                ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold shadow-sm'
                : 'bg-neutral-50 dark:bg-neutral-800/80 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400'
            }`}>
              <input type="radio" value="male" {...register('gender')} className="hidden" />
              <span>ذكر</span>
            </label>
            <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
              watch('gender') === 'female'
                ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold shadow-sm'
                : 'bg-neutral-50 dark:bg-neutral-800/80 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400'
            }`}>
              <input type="radio" value="female" {...register('gender')} className="hidden" />
              <span>أنثى</span>
            </label>
          </div>
          {errors.gender && (
            <p className="text-xs text-red-500 font-medium">{errors.gender.message}</p>
          )}
        </div>

        {/* العنوان التفصيلي (اختياري) */}
        <div className="space-y-2 sm:col-span-2">
          <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
            <Home className="w-4 h-4 text-neutral-400" />
            <span>العنوان التفصيلي (اختياري)</span>
          </label>
          <input
            type="text"
            placeholder="الشارع، الحي أو المعالم القريبة..."
            {...register('address')}
            className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-sm transition-all focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>
      </div>
    </div>
  );
}
