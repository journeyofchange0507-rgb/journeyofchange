'use client';

import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FullRegisterInput } from '@/lib/validations/register-schema';
import { useAlgeriaCities } from '@/hooks/useAlgeriaCities';
import { User, Phone, Mail, MapPin, Calendar, Users, Home, Send, Camera, Upload } from 'lucide-react';

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

        {/* معرف التلغرام */}
        <div className="space-y-2 sm:col-span-2">
          <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
            <Send className="w-4 h-4 text-blue-500" />
            <span>معرف تلغرام الخاص بك <span className="text-red-500">*</span></span>
          </label>
          <input
            type="text"
            placeholder="@username"
            dir="ltr"
            {...register('telegram')}
            className={`w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border text-sm text-right transition-all focus:outline-none focus:ring-2 ${
              errors.telegram
                ? 'border-red-500 focus:ring-red-500/30 bg-red-50/50 dark:bg-red-950/20'
                : 'border-neutral-200 dark:border-neutral-700 focus:border-emerald-500 focus:ring-emerald-500/30'
            }`}
          />
          {errors.telegram && (
            <p className="text-xs text-red-500 font-medium">{errors.telegram.message}</p>
          )}
        </div>

        {/* الصورة الشخصية */}
        <div className="space-y-2 sm:col-span-2">
          <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
            <Camera className="w-4 h-4 text-emerald-500" />
            <span>الصورة الشخصية <span className="text-red-500">*</span></span>
          </label>
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-full border-2 border-dashed border-neutral-300 dark:border-neutral-700 overflow-hidden flex-shrink-0 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
              {watch('profilePicture') ? (
                <img src={watch('profilePicture')} alt="Profile Preview" className="w-full h-full object-cover" />
              ) : (
                <User className="w-8 h-8 text-neutral-400" />
              )}
            </div>
            <div className="flex-1">
              <label className={`flex flex-col items-center justify-center w-full h-20 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                errors.profilePicture ? 'border-red-500 bg-red-50/50 dark:bg-red-950/20' : 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/80 hover:border-emerald-500'
              }`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-5 h-5 text-neutral-500 dark:text-neutral-400 mb-1" />
                  <p className="text-xs text-neutral-500 dark:text-neutral-400"><span className="font-semibold text-emerald-600 dark:text-emerald-400">اضغط لرفع صورة</span> أو اسحبها هنا</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setValue('profilePicture', reader.result as string, { shouldValidate: true });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
              {errors.profilePicture && (
                <p className="text-xs text-red-500 font-medium mt-1">{errors.profilePicture.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
