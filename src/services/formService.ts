import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  project_type?: string;
  message: string;
  project?: string;
}

export const useFormSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitForm = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const apiKey = import.meta.env.PUBLIC_SUBMITJSON_API_KEY;
      
      if (!apiKey) {
        throw new Error('API key no configurada');
      }

      const response = await fetch('https://api.submitjson.com/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          formId: 'contact-form',
          data: {
            ...data,
            timestamp: new Date().toISOString()
          },
          notifications: {
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
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al enviar el formulario');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
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