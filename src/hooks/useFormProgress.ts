'use client';

import { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FullRegisterInput } from '@/lib/validations/register-schema';

const STEP_FIELDS_MAP: Record<number, (keyof FullRegisterInput)[]> = {
  1: ['fullName', 'phone', 'email', 'wilaya', 'commune', 'birthDate', 'gender'],
  2: ['interests'],
  3: ['hobbies'],
  4: ['skills'],
  5: ['hoursPerWeek', 'availableDays', 'preferredTime'],
  6: ['preferredRoles'],
  7: ['motivation', 'shortTermGoals'],
};

export function useFormProgress(
  formOrValues: UseFormReturn<any, any, any> | any,
  currentStep: number = 1,
  totalSteps: number = 7
) {
  const watchFn = formOrValues?.watch;
  const values = watchFn ? watchFn() : (formOrValues || {});
  const errors = formOrValues?.formState?.errors || {};

  const stepStatuses = useMemo(() => {
    const statuses: Record<number, boolean> = {};

    for (let step = 1; step <= totalSteps; step++) {
      const fields = STEP_FIELDS_MAP[step] || [];
      let isCompleted = true;

      for (const field of fields) {
        const val = values[field];
        const hasError = !!errors[field];

        if (hasError) {
          isCompleted = false;
          break;
        }

        if (val === undefined || val === null || val === '') {
          isCompleted = false;
          break;
        }

        if (Array.isArray(val) && val.length === 0) {
          isCompleted = false;
          break;
        }
      }

      statuses[step] = isCompleted;
    }

    return statuses;
  }, [values, errors, totalSteps]);

  const completedStepsCount = useMemo(() => {
    return Object.values(stepStatuses).filter((status) => status).length;
  }, [stepStatuses]);

  const progressPercentage = useMemo(() => {
    return Math.round((completedStepsCount / totalSteps) * 100);
  }, [completedStepsCount, totalSteps]);

  const isCurrentStepValid = useMemo(() => {
    return stepStatuses[currentStep] || false;
  }, [stepStatuses, currentStep]);

  const isStepComplete = (step: number) => stepStatuses[step] || false;

  return {
    progressPercentage,
    completedStepsCount,
    stepStatuses,
    isCurrentStepValid,
    isStepComplete,
  };
}
