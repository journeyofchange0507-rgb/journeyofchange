'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { ArrowRight, ArrowLeft, CheckCircle2, RotateCcw, Send, Sparkles, ShieldCheck } from 'lucide-react';

import { fullRegisterSchema, FullRegisterInput } from '@/lib/validations/register-schema';
import { useFormProgress } from '@/hooks/useFormProgress';
import { FormProgress } from './FormProgress';
import { PersonalCard } from './cards/PersonalCard';
import { InterestsCard } from './cards/InterestsCard';
import { HobbiesCard } from './cards/HobbiesCard';
import { SkillsCard } from './cards/SkillsCard';
import { AvailabilityCard } from './cards/AvailabilityCard';
import { VolunteerCard } from './cards/VolunteerCard';
import { GoalsCard } from './cards/GoalsCard';

const STORAGE_KEY = 'journey_of_change_register_draft';

function RegistrationFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FullRegisterInput>({
    resolver: zodResolver(fullRegisterSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      wilaya: '',
      commune: '',
      birthDate: '',
      gender: undefined,
      address: '',
      interests: [],
      otherInterests: '',
      hobbies: [],
      otherHobbies: '',
      skills: [],
      otherSkills: '',
      hoursPerWeek: 5,
      availableDays: [],
      preferredTime: 'flexible',
      hasPreviousExperience: false,
      experienceDetails: '',
      preferredRoles: [],
      motivation: '',
      shortTermGoals: '',
      longTermGoals: '',
      expectations: '',
    },
    mode: 'onChange',
  });

  const { watch, trigger, reset, getValues } = form;
  const formValues = watch();
  const { progressPercentage, stepStatuses, isStepComplete } = useFormProgress(formValues);

  // استرجاع البريد الإلكتروني من رابط التسجيل السريع في الهيرو إذا وجد
  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam && !getValues('email')) {
      form.setValue('email', emailParam, { shouldValidate: true });
    }
  }, [searchParams, form, getValues]);

  // الحفظ التلقائي في LocalStorage والاسترجاع عند العودة
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        reset(parsed);
        toast.info('تم استرجاع مسودة استمارتك المحفوظة تلقائياً', {
          icon: <RotateCcw className="w-4 h-4 text-emerald-500" />,
        });
      } catch (e) {
        console.error('Failed to parse draft', e);
      }
    }
  }, [reset]);

  useEffect(() => {
    // حفظ التغييرات تلقائياً ما عدا في حالة الإرسال النهائي
    if (!isSubmitted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formValues));
    }
  }, [formValues, isSubmitted]);

  // التحقق والتنقل بين الخطوات
  const handleNextStep = async () => {
    let fieldsToValidate: (keyof FullRegisterInput)[] = [];
    switch (currentStep) {
      case 1:
        fieldsToValidate = ['fullName', 'phone', 'email', 'wilaya', 'commune', 'birthDate', 'gender'];
        break;
      case 2:
        fieldsToValidate = ['interests'];
        break;
      case 5:
        fieldsToValidate = ['hoursPerWeek', 'availableDays', 'preferredTime'];
        break;
      case 7:
        fieldsToValidate = ['motivation'];
        break;
      default:
        break;
    }

    if (fieldsToValidate.length > 0) {
      const isValid = await trigger(fieldsToValidate);
      if (!isValid) {
        toast.error('يرجى ملء جميع الحقول المطلوبة بالشكل الصحيح قبل الانتقال.');
        return;
      }
    }

    if (currentStep < 7) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 150, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 150, behavior: 'smooth' });
    }
  };

  const onSubmit = async (data: FullRegisterInput) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('فشل إرسال الاستمارة إلى الخادم.');
      }

      console.log('Sanitized & Validated Registration Data Sent:', data);
      
      localStorage.removeItem(STORAGE_KEY);
      setIsSubmitted(true);
      toast.success('تم إرسال طلب انضمامك إلى نادي رحلة التغيير بنجاح!');
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } catch (error) {
      console.error('Submission Error:', error);
      toast.error('حدث خطأ أثناء إرسال الاستمارة، يرجى المحاولة لاحقاً.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetDraft = () => {
    if (confirm('هل أنت متأكد من رغبتك في مسح جميع البيانات والبدء من جديد؟')) {
      localStorage.removeItem(STORAGE_KEY);
      reset();
      setCurrentStep(1);
      toast.success('تم تصفير الاستمارة وبدء طلب جديد.');
    }
  };

  // شاشة النجاح بعد الإرسال
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto my-12 p-8 sm:p-12 rounded-3xl bg-white dark:bg-neutral-900 border border-emerald-500/30 shadow-2xl text-center space-y-6"
      >
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            أهلاً بك في العائلة!
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
            تم استلام طلب انضمامك بنجاح!
          </h2>
        </div>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-lg mx-auto">
          شكراً لشغفك واهتمامك بالانضمام إلى نادي رحلة التغيير. يقوم فريق الموارد البشرية والولائي حالياً بمراجعة بياناتك، وسنتواصل معك قريباً عبر البريد الإلكتروني أو الهاتف لإطلاعك على الخطوة التالية.
        </p>
        <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/')}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md transition-all"
          >
            العودة إلى الصفحة الرئيسية
          </button>
          <button
            onClick={() => {
              setIsSubmitted(false);
              reset();
              setCurrentStep(1);
            }}
            className="px-6 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-semibold text-sm transition-all"
          >
            تسجيل عضو آخر
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      {/* شريط التقدم السبعي والمراحل */}
      <FormProgress
        currentStep={currentStep}
        totalSteps={7}
        progressPercentage={progressPercentage}
        stepStatuses={stepStatuses}
        onStepClick={(step) => {
          if (step <= currentStep || stepStatuses[step]) {
            setCurrentStep(step);
          }
        }}
      />

      {/* بطاقة الاستمارة الحالية */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xl min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && <PersonalCard form={form} />}
              {currentStep === 2 && <InterestsCard form={form} />}
              {currentStep === 3 && <HobbiesCard form={form} />}
              {currentStep === 4 && <SkillsCard form={form} />}
              {currentStep === 5 && <AvailabilityCard form={form} />}
              {currentStep === 6 && <VolunteerCard form={form} />}
              {currentStep === 7 && <GoalsCard form={form} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* أزرار التحكم في الأسفل */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-4">
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold text-sm transition-all flex items-center gap-2 group"
              >
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                <span>الخطوة السابقة</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleResetDraft}
              className="p-3 rounded-xl text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all text-xs font-semibold flex items-center gap-1.5"
              title="مسح المسودة وبدء استمارة جديدة"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">تصفير</span>
            </button>
          </div>

          <div className="w-full sm:w-auto">
            {currentStep < 7 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 group"
              >
                <span>الخطوة التالية</span>
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-10 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 hover:from-emerald-500 hover:to-amber-500 text-white font-black text-base shadow-xl hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>جاري التحقق والإرسال...</span>
                  </span>
                ) : (
                  <>
                    <span>إرسال طلب الانضمام النهائي</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export function RegistrationForm() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">جاري تحميل استمارة التسجيل...</div>}>
      <RegistrationFormContent />
    </Suspense>
  );
}
