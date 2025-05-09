import { useState } from 'react';
import SubmitJSON from 'submitjson';

interface FormData {
  name: string;
  email: string;
  project_type?: string;
  message: string;
  project?: string;
}

// Initialize SubmitJSON client
const sj = new SubmitJSON({
  apiKey: import.meta.env.PUBLIC_SUBMITJSON_API_KEY,
  endpoint: 'kGNyAVdgj'
});

export const useFormSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitForm = async (data: FormData): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      if (!import.meta.env.PUBLIC_SUBMITJSON_API_KEY) {
        throw new Error('API key no configurada');
      }

      await sj.submit({
        name: data.name,
        email: data.email,
        project_type: data.project_type || 'No especificado',
        message: data.message,
        timestamp: new Date().toISOString(),
      });

      setSuccess(true);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setSuccess(false);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitForm,
    isSubmitting,
    error,
    success
  };
}; 