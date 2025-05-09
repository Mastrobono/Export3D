import { useTranslations } from '../i18n/utils';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateForm = (data: Record<string, any>, lang: 'es' | 'en'): ValidationResult => {
  const t = useTranslations(lang);
  const errors: Record<string, string> = {};

  // Sanitize inputs
  const sanitizedData = Object.entries(data).reduce((acc, [key, value]) => {
    if (typeof value === 'string') {
      // Remove potentially dangerous characters
      acc[key] = value.replace(/[<>]/g, '');
    } else {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);

  // Validate name
  if (!sanitizedData.name?.trim()) {
    errors.name = t('cta.form.validation.name.required');
  } else if (sanitizedData.name.length < 2) {
    errors.name = t('cta.form.validation.name.minLength');
  }

  // Validate email
  if (!sanitizedData.email?.trim()) {
    errors.email = t('cta.form.validation.email.required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedData.email)) {
      errors.email = t('cta.form.validation.email.invalid');
    }
  }

  // Validate project type
  if (!sanitizedData.project_type?.trim()) {
    errors.project_type = t('cta.form.validation.projectType.required');
  }

  // Validate message
  if (!sanitizedData.message?.trim()) {
    errors.message = t('cta.form.validation.message.required');
  } else if (sanitizedData.message.length < 10) {
    errors.message = t('cta.form.validation.message.minLength');
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}; 