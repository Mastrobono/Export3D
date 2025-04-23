export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateForm = (data: Record<string, any>): ValidationResult => {
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
    errors.name = 'El nombre es requerido';
  } else if (sanitizedData.name.length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres';
  }

  // Validate email
  if (!sanitizedData.email?.trim()) {
    errors.email = 'El email es requerido';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedData.email)) {
      errors.email = 'Por favor ingresa un email válido';
    }
  }

  // Validate project type
  if (!sanitizedData.project_type?.trim()) {
    errors.project_type = 'El tipo de proyecto es requerido';
  }

  // Validate message
  if (!sanitizedData.message?.trim()) {
    errors.message = 'El mensaje es requerido';
  } else if (sanitizedData.message.length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}; 