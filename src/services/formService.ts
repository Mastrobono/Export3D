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

  const submitForm = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      if (!import.meta.env.PUBLIC_SUBMITJSON_API_KEY) {
        throw new Error('API key no configurada');
      }

      const response = await sj.submit({
        name: data.name,
        email: data.email,
        project_type: data.project_type || 'No especificado',
        project: data.project || 'No especificado',
        message: data.message,
        timestamp: new Date().toISOString(),
        _notify: {
          email: {
            to: 'mastrobonoleandro@gmail.com',
            subject: 'Nuevo mensaje de contacto',
            template: `
              <h2>Nuevo mensaje de contacto</h2>
              <p><strong>Nombre:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Tipo de Proyecto:</strong> ${data.project_type || 'No especificado'}</p>
              <p><strong>Proyecto:</strong> ${data.project || 'No especificado'}</p>
              <p><strong>Mensaje:</strong></p>
              <p>${data.message}</p>
            `
          }
        }
      });

      setSuccess(true);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      throw err;
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