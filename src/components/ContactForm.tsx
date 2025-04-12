import { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle?: string;
  'client:load'?: boolean;
}

export default function ContactForm({ isOpen: initialIsOpen, onClose, projectTitle, 'client:load': clientLoad }: ContactFormProps) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project_type: '',
    message: '',
    project: projectTitle || ''
  });

  useEffect(() => {
    setIsOpen(initialIsOpen);
  }, [initialIsOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Form data:', formData);
    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/50 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
      />

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
              {projectTitle ? `Contactar sobre ${projectTitle}` : 'Contacto'}
            </h2>
            <p className="text-white/60 font-kuunari-light mb-6">
              Completa el formulario y nos pondremos en contacto contigo lo antes posible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-kuunari-medium text-white">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent-500 sm:text-sm sm:leading-6"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-kuunari-medium text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent-500 sm:text-sm sm:leading-6"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="project_type" className="block text-sm font-kuunari-medium text-white">
                  Tipo de Proyecto
                </label>
                <select
                  id="project_type"
                  name="project_type"
                  required
                  value={formData.project_type}
                  onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                  className="mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent-500 sm:text-sm sm:leading-6 [&>option]:bg-darkgray [&>option]:text-white"
                >
                  <option value="" disabled selected className="text-white/50">Selecciona una opción</option>
                  <option value="visualization">Visualización Arquitectónica</option>
                  <option value="project_management">Dirección de Obra</option>
                  <option value="both">Ambos Servicios</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-kuunari-medium text-white">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-accent-500 sm:text-sm sm:leading-6"
                  placeholder="Cuéntanos sobre tu proyecto..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md bg-accent-500 px-5 py-3.5 text-base font-semibold text-darkgray shadow-sm hover:bg-accent-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 transition-all duration-300 font-kuunari-medium"
                >
                  Iniciar Proyecto
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
                </button>
              </div>
            </form>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
} 