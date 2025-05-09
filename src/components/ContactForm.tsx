import { useState, useEffect } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { validateForm } from '../services/validationService';
import { useTranslations } from '../i18n/utils';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle?: string;
  lang?: 'es' | 'en';
  'client:load'?: boolean;
}

interface FormData {
  name: string;
  email: string;
  project_type: string;
  message: string;
  project: string;
}

export default function ContactForm({ isOpen: initialIsOpen, onClose, projectTitle, lang = 'es', 'client:load': clientLoad }: ContactFormProps) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    project_type: '',
    message: '',
    project: projectTitle || ''
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const t = useTranslations(lang);

  useEffect(() => {
    setIsOpen(initialIsOpen);
  }, [initialIsOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    // Validate form
    const validationResult = validateForm(formData, lang);
    if (!validationResult.isValid) {
      setValidationErrors(validationResult.errors);
      setIsFormSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://submitjson.com/api/v1/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Verificar si la respuesta indica éxito
      if (result.success) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          project_type: '',
          message: '',
          project: ''
        });
        setValidationErrors({});
      } else {
        throw new Error(result.message || 'Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : 'Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo más tarde.'
      );
    } finally {
      setIsFormSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose();
    // Reset form and errors
    setFormData({
      name: '',
      email: '',
      project_type: '',
      message: '',
      project: ''
    });
    setValidationErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50 transition-opacity duration-300 ease-linear data-[closed]:opacity-0" />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <DialogPanel
          transition
          className="relative w-full max-w-2xl transform overflow-hidden rounded-lg bg-darkgray p-6 text-left shadow-xl transition duration-300 ease-in-out data-[closed]:opacity-0 data-[closed]:scale-95"
        >
          <div className="absolute right-4 top-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-md p-2 text-white/60 hover:text-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500"
            >
              <span className="sr-only">Cerrar</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-3">
            <h2 className="text-2xl font-kuunari-medium text-white mb-2">
              {projectTitle ? t('contact.form.projectTitle').replace('{project}', projectTitle) : t('contact.form.title')}
            </h2>
            <p className="text-white/60 font-kuunari-light mb-6">
              {/* Puedes agregar una traducción para la descripción si lo deseas */}
            </p>

            {submitError && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-md">
                <p className="text-red-500 text-sm">{t('contact.form.error')}</p>
              </div>
            )}

            {submitSuccess && !submitError && (
              <div className="mb-4 p-4 bg-green-500/10 border border-green-500/20 rounded-md">
                <p className="text-green-500 text-sm">{t('contact.form.success')}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-kuunari-medium text-white">
                  {t('contact.form.name.label')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-3 text-white shadow-sm ring-1 ring-inset ${
                    validationErrors.name ? 'ring-red-500' : 'ring-white/10'
                  } focus:ring-2 focus:ring-inset focus:ring-accent-500 sm:text-sm sm:leading-6`}
                  placeholder={t('contact.form.name.placeholder')}
                />
                {validationErrors.name && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-kuunari-medium text-white">
                  {t('contact.form.email.label')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-3 text-white shadow-sm ring-1 ring-inset ${
                    validationErrors.email ? 'ring-red-500' : 'ring-white/10'
                  } focus:ring-2 focus:ring-inset focus:ring-accent-500 sm:text-sm sm:leading-6`}
                  placeholder={t('contact.form.email.placeholder')}
                />
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="project_type" className="block text-sm font-kuunari-medium text-white">
                  {t('contact.form.projectType.label')}
                </label>
                <select
                  id="project_type"
                  name="project_type"
                  required
                  value={formData.project_type}
                  onChange={handleInputChange}
                  className={`mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-3 text-white shadow-sm ring-1 ring-inset ${
                    validationErrors.project_type ? 'ring-red-500' : 'ring-white/10'
                  } focus:ring-2 focus:ring-inset focus:ring-accent-500 sm:text-sm sm:leading-6 [&>option]:bg-darkgray [&>option]:text-white`}
                >
                  <option value="" disabled selected className="text-white/50">{t('contact.form.projectType.placeholder')}</option>
                  <option value="visualization">{t('contact.form.projectType.visualization')}</option>
                  <option value="project_management">{t('contact.form.projectType.project_management')}</option>
                  <option value="both">{t('contact.form.projectType.both')}</option>
                </select>
                {validationErrors.project_type && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.project_type}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-kuunari-medium text-white">
                  {t('contact.form.message.label')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-3 text-white shadow-sm ring-1 ring-inset ${
                    validationErrors.message ? 'ring-red-500' : 'ring-white/10'
                  } focus:ring-2 focus:ring-inset focus:ring-accent-500 sm:text-sm sm:leading-6`}
                  placeholder={t('contact.form.message.placeholder')}
                />
                {validationErrors.message && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.message}</p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isFormSubmitting}
                  className="inline-flex items-center justify-center rounded-md bg-accent-500 px-5 py-3.5 text-base font-semibold text-darkgray shadow-sm hover:bg-accent-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 transition-all duration-300 font-kuunari-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isFormSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                  {!isFormSubmitting && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </form>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
} 