import { motion } from "framer-motion";
import Container from "../layouts/Container";
import { useFormSubmit } from "../services/formService";
import { validateForm } from "../services/validationService";
import { useState } from "react";
import { useTranslations } from "../i18n/utils";

interface CTAProps {
  lang: 'es' | 'en';
}

const CTA = ({ lang }: CTAProps) => {
  const t = useTranslations(lang);
  const { submitForm, isSubmitting, error, success } = useFormSubmit();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project_type: '',
    message: ''
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateForm(formData, lang);
    setValidationErrors(validation.errors);
    
    if (!validation.isValid) {
      return;
    }

    try {
      const wasSuccessful = await submitForm(formData);
      if (!wasSuccessful) {
        // No mostrar mensaje de éxito si hubo error
        return;
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    }
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
    <Container
      data-section="cta"
      classNames="relative min-h-[max-content] overflow-hidden bg-darkgray"
    >
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-darkgray/50 to-darkgray"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"></div>
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1]
              }
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  delay: 0.2
                }
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-title-xs md:text-title-sm font-semibold tracking-tight text-white font-kuunari-medium"
            >
              {t('cta.title')}
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.4
                  }
                }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-desc-lg md:text-desc-lg text-accent-500 block"
              >
                {t('cta.subtitle')}
              </motion.span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  delay: 0.6
                }
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="mt-6 text-desc-xs md:text-desc-xs leading-8 text-white/80"
            >
              {t('cta.description')}
            </motion.p>
          </motion.div>

          {/* Right side - Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-darkgray/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            noValidate
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1]
              }
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {error && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-md">
                <p className="text-red-500 text-sm">{t('cta.form.error')}</p>
              </div>
            )}

            {success && (
              <div className="mb-4 p-4 bg-green-500/10 border border-green-500/20 rounded-md">
                <p className="text-green-500 text-sm">{t('cta.form.success')}</p>
              </div>
            )}

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.2
                  }
                }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <label htmlFor="name" className="block text-sm font-kuunari-medium text-white">{t('cta.form.name.label')}</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-3 text-white shadow-sm ring-1 ring-inset ${
                    validationErrors.name ? 'ring-red-500' : 'ring-white/10'
                  } focus:ring-2 focus:ring-inset focus:ring-accent-500 sm:text-sm sm:leading-6`}
                  placeholder={t('cta.form.name.placeholder')}
                />
                {validationErrors.name && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.name}</p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.4
                  }
                }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <label htmlFor="email" className="block text-sm font-kuunari-medium text-white">{t('cta.form.email.label')}</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-3 text-white shadow-sm ring-1 ring-inset ${
                    validationErrors.email ? 'ring-red-500' : 'ring-white/10'
                  } focus:ring-2 focus:ring-inset focus:ring-accent-500 sm:text-sm sm:leading-6`}
                  placeholder={t('cta.form.email.placeholder')}
                />
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.email}</p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.6
                  }
                }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <label htmlFor="project_type" className="block text-sm font-kuunari-medium text-white">{t('cta.form.projectType.label')}</label>
                <select
                  id="project_type"
                  name="project_type"
                  value={formData.project_type}
                  onChange={handleInputChange}
                  className={`mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-3 text-white shadow-sm ring-1 ring-inset ${
                    validationErrors.project_type ? 'ring-red-500' : 'ring-white/10'
                  } focus:ring-2 focus:ring-inset focus:ring-accent-500 sm:text-sm sm:leading-6 [&>option]:bg-darkgray [&>option]:text-white`}
                >
                  <option value="" disabled selected className="text-white/50">{t('cta.form.projectType.placeholder')}</option>
                  <option value="visualization">{t('cta.form.projectType.visualization')}</option>
                  <option value="project_management">{t('cta.form.projectType.project_management')}</option>
                  <option value="both">{t('cta.form.projectType.both')}</option>
                </select>
                {validationErrors.project_type && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.project_type}</p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.8
                  }
                }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <label htmlFor="message" className="block text-sm font-kuunari-medium text-white">{t('cta.form.message.label')}</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-3 text-white shadow-sm ring-1 ring-inset ${
                    validationErrors.message ? 'ring-red-500' : 'ring-white/10'
                  } focus:ring-2 focus:ring-inset focus:ring-accent-500 sm:text-sm sm:leading-6`}
                  placeholder={t('cta.form.message.placeholder')}
                ></textarea>
                {validationErrors.message && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.message}</p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    delay: 0.6
                  }
                }}
                viewport={{ once: true, margin: "-75px" }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center rounded-md bg-accent-500 px-5 py-3.5 text-base font-semibold text-darkgray shadow-sm hover:bg-accent-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 transition-all duration-300 font-kuunari-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t('cta.form.submitting') : t('cta.form.submit')}
                  {!isSubmitting && (
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
              </motion.div>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </Container>
  );
};

export default CTA;

/*

Pongámonos en Contacto.
Transforma tu visión en realidad.
Tu próxima obra maestra arquitectónica te espera. Ya sea que necesites visualizaciones impactantes o dirección experta de obra, estamos aquí para dar vida a tus ideas.

*/