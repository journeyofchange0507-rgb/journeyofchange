import { z } from 'zod';

// تعبير نمطي للتحقق من أرقام الهواتف الجزائرية (05, 06, 07 أو +213)
const algeriaPhoneRegex = /^(00213|\+213|0)(5|6|7)[0-9]{8}$/;

export const personalDataSchema = z.object({
  fullName: z
    .string({ message: 'الاسم الكامل مطلوب' })
    .min(3, 'يجب أن يتكون الاسم من 3 أحرف على الأقل')
    .max(100, 'الاسم طويل جداً')
    .trim(),
  phone: z
    .string({ message: 'رقم الهاتف مطلوب' })
    .regex(algeriaPhoneRegex, 'يرجى إدخال رقم هاتف جزائري صحيح (مثال: 0612345678)'),
  email: z
    .string({ message: 'البريد الإلكتروني مطلوب' })
    .email('يرجى إدخال بريد إلكتروني صحيح')
    .trim()
    .toLowerCase(),
  wilaya: z
    .string({ message: 'يرجى اختيار الولاية' })
    .min(1, 'يرجى اختيار الولاية'),
  commune: z
    .string({ message: 'يرجى اختيار البلدية' })
    .min(1, 'يرجى اختيار البلدية'),
  birthDate: z
    .string({ message: 'تاريخ الميلاد مطلوب' })
    .min(1, 'تاريخ الميلاد مطلوب')
    .refine((val) => {
      const date = new Date(val);
      const now = new Date();
      const age = now.getFullYear() - date.getFullYear();
      return !isNaN(date.getTime()) && age >= 12 && age <= 100;
    }, 'يجب أن يكون العمر بين 12 و 100 سنة'),
  gender: z.enum(['male', 'female'], {
    message: 'يرجى تحديد الجنس',
  }),
  address: z.string().optional(),
});

export const interestsSchema = z.object({
  interests: z
    .array(z.string())
    .min(1, 'يرجى اختيار اهتمام واحد على الأقل من القائمة'),
  otherInterests: z.string().max(200, 'النص طويل جداً').optional(),
});

export const hobbiesSchema = z.object({
  hobbies: z
    .array(z.string())
    .min(1, 'يرجى اختيار هواية واحدة على الأقل أو كتابة هواياتك'),
  otherHobbies: z.string().max(200, 'النص طويل جداً').optional(),
});

export const skillsSchema = z.object({
  skills: z
    .array(z.string())
    .min(1, 'يرجى اختيار مهارة واحدة على الأقل'),
  otherSkills: z.string().max(200, 'النص طويل جداً').optional(),
});

export const availabilitySchema = z.object({
  hoursPerWeek: z
    .number({ message: 'يرجى تحديد عدد الساعات' })
    .min(1, 'يجب تخصيص ساعة واحدة على الأقل أسبوعياً')
    .max(168, 'عدد الساعات غير منطقي'),
  availableDays: z
    .array(z.string())
    .min(1, 'يرجى اختيار يوم واحد على الأقل متاح للتطوع'),
  preferredTime: z.enum(['morning', 'afternoon', 'evening', 'flexible'], {
    message: 'يرجى اختيار الوقت المفضل',
  }),
});

export const volunteerSchema = z.object({
  hasPreviousExperience: z.boolean(),
  experienceDetails: z.string().max(500, 'التفاصيل طويلة جداً').optional(),
  preferredRoles: z
    .array(z.string())
    .min(1, 'يرجى اختيار دور واحد على الأقل ترغب في المساهمة به'),
});

export const goalsSchema = z.object({
  motivation: z
    .string({ message: 'يرجى كتابة دافعك للانضمام' })
    .min(15, 'يرجى توضيح دافعك في 15 حرفاً على الأقل')
    .max(1000, 'النص طويل جداً')
    .trim(),
  shortTermGoals: z
    .string({ message: 'يرجى تحديد أهدافك قصيرة المدى' })
    .min(10, 'يرجى كتابة 10 أحرف على الأقل')
    .max(500, 'النص طويل جداً')
    .trim(),
  longTermGoals: z.string().max(500, 'النص طويل جداً').optional(),
  expectations: z.string().max(500, 'النص طويل جداً').optional(),
});

// المخطط الشامل للاستمارة كاملة
export const fullRegisterSchema = z.object({
  ...personalDataSchema.shape,
  ...interestsSchema.shape,
  ...hobbiesSchema.shape,
  ...skillsSchema.shape,
  ...availabilitySchema.shape,
  ...volunteerSchema.shape,
  ...goalsSchema.shape,
});

export type PersonalDataInput = z.infer<typeof personalDataSchema>;
export type InterestsInput = z.infer<typeof interestsSchema>;
export type HobbiesInput = z.infer<typeof hobbiesSchema>;
export type SkillsInput = z.infer<typeof skillsSchema>;
export type AvailabilityInput = z.infer<typeof availabilitySchema>;
export type VolunteerInput = z.infer<typeof volunteerSchema>;
export type GoalsInput = z.infer<typeof goalsSchema>;
export type FullRegisterInput = z.infer<typeof fullRegisterSchema>;
