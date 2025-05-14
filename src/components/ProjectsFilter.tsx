import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/20/solid";
import { projects, tags } from "../data/data"; // Import
import ProjectList from "./ProjectList";
import ContactForm from "./ContactForm";
import { getFilterTranslation } from "../constants/translations";
import { Project } from "../types/project";
import { Dispatch, SetStateAction } from "react";
import { useTranslations } from '../i18n/utils';
import { useProjectFilters } from '../hooks/useProjectFilters';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSection {
  id: keyof typeof tags;
  name: string;
  options: FilterOption[];
}

interface ProjectsFilterProps {
  lang: 'es' | 'en';
}

export const filterProjects = (
  projects: Project[],
  activeFilters: string[],
  setFilteredProjects: Dispatch<SetStateAction<Project[]>>
) => {
  if (activeFilters.length === 0) {
    setFilteredProjects(projects);
  } else {
    const filtered = projects.filter((project) =>
      activeFilters.some((filter) =>
        project.metadata.tags?.includes(filter) ||
        project.metadata.buildingType === filter ||
        project.metadata.role === filter ||
        project.metadata.date === filter
      )
    );
    setFilteredProjects(filtered);
  }
};

// Utilidad para normalizar los valores de los filtros a key de traducción
function normalizeKey(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/\p{Diacritic}/gu, '') // quita acentos
    .replace(/ /g, '.')
    .replace(/&/g, 'y')
    .replace(/[^a-z0-9.]/g, ''); // solo minúsculas, números y puntos
}

// Utilidad para poner en Title Case excepto artículos y preposiciones
function toTitleCase(str: string) {
  const exceptions = ['y', 'de', 'del', 'la', 'el', 'los', 'las', 'a', 'en', 'the', 'of', 'and', 'for', 'to', 'with', 'by', 'on', 'at', 'from', 'as', 'but', 'or', 'nor', 'so', 'yet', 'in'];
  return str.split(' ').map((word, i) => {
    if (i === 0 || !exceptions.includes(word.toLowerCase())) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      return word.toLowerCase();
    }
  }).join(' ');
}

export default function ProjectsFilter({ lang }: ProjectsFilterProps) {
  const t = useTranslations(lang);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const { getTranslatedFilter } = useProjectFilters(projects, lang);

  // Filtros traducidos
  const filters: FilterSection[] = Object.keys(tags).map((key) => ({
    id: key as keyof typeof tags,
    name: t(`filters.${key}` as any),
    options: tags[key as keyof typeof tags].map((value) => ({
      value: value,
      label: toTitleCase(getTranslatedFilter(value, lang)),
    })),
  }));

  useEffect(() => {
    filterProjects(projects, activeFilters, setFilteredProjects);
  }, [activeFilters]);

  const handleFilterChange = (filter: string, value: string, checked: boolean) => {
    setActiveFilters((prevFilters) => {
      if (checked) {
        return [...prevFilters, value];
      } else {
        return prevFilters.filter((f) => f !== value);
      }
    });
  };

  const resetFilters = () => {
    setActiveFilters([]);
  };

  return (
    <div
      data-section="projects"
      id="projects"
      className="relative min-h-[max-content] my-24 mx-auto max-w-7xl md:max-w-8xl min-[1800px]:max-w-[1800px] rounded-md bg-lightgray shadow-xl"
    >
      {/* Background effects (igual que AboutUs) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-darkgray/50 to-darkgray"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10">
        <div>
          {/* Mobile filter dialog */}
          <Dialog
            open={mobileFiltersOpen}
            onClose={setMobileFiltersOpen}
            className="relative z-50 lg:hidden"
          >
            <DialogBackdrop
              transition
              className="fixed top-16 inset-x-0 bottom-0 bg-black/50 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
            />

            <div className="fixed top-16 inset-x-0 bottom-0 z-50 flex">
              <DialogPanel
                transition
                className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-[#101010] py-4 pb-6 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
              >
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-2xl font-kuunari-bold text-white">{t('filters.title')}</h2>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="-mr-2 flex size-10 items-center justify-center p-2 text-white/60 hover:text-accent-500"
                  >
                    <span className="sr-only">{t('filters.close')}</span>
                    <XMarkIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>

                {/* Reiniciar Filtros button for mobile */}
                {activeFilters.length > 0 ? (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mb-4 mx-4 text-[18px] font-kuunari-medium text-white cursor-pointer flex items-center gap-2 hover:text-accent-500 transition-colors"
                  >
                    {t('filters.reset')}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                ) : (
                  <div className="mb-4 mx-4 h-[27px]" aria-hidden="true"></div>
                )}

                {/* Filters */}
                <form className="mt-2">
                  {filters.map((section) => (
                    <Disclosure
                      key={section.name}
                      as="div"
                      className="border-t border-white/10 pb-4 pt-4"
                    >
                      <fieldset>
                        <legend className="w-full px-2">
                          <DisclosureButton className="group flex w-full items-center justify-between p-2 text-lg font-kuunari-medium text-white/80 hover:text-accent-500">
                            <span className="text-lg font-kuunari-medium text-white">
                              {section.name}
                            </span>
                            <span className="ml-6 flex h-7 items-center">
                              <ChevronDownIcon
                                aria-hidden="true"
                                className="size-5 rotate-0 transform group-data-[open]:-rotate-180"
                              />
                            </span>
                          </DisclosureButton>
                        </legend>
                        <DisclosurePanel className="px-4 pb-2 pt-4">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex gap-3">
                                <div className="flex h-5 shrink-0 items-center">
                                  <div className="group grid size-4 grid-cols-1">
                                    <input
                                      defaultValue={option.value}
                                      id={`${section.id}-${optionIdx}-mobile`}
                                      name={`${section.id}[]`}
                                      type="checkbox"
                                      data-filter={section.id}
                                      data-value={option.value}
                                      onChange={(e) =>
                                        handleFilterChange(
                                          section.id,
                                          option.value,
                                          e.target.checked
                                        )
                                      }
                                      className="col-start-1 row-start-1 appearance-none rounded border border-white/20 bg-darkgray checked:border-accent-500 checked:bg-accent-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
                                    />
                                    <svg
                                      fill="none"
                                      viewBox="0 0 14 14"
                                      className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white"
                                      style={{ display: 'block' }}
                                    >
                                      <path
                                        d="M3 8L6 11L11 3.5"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="transition-opacity duration-150 opacity-0 group-has-[:checked]:opacity-100"
                                      />
                                    </svg>
                                  </div>
                                </div>
                                <label
                                  htmlFor={`${section.id}-${optionIdx}-mobile`}
                                  className="text-sm text-white/60 hover:text-white cursor-pointer"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </DisclosurePanel>
                      </fieldset>
                    </Disclosure>
                  ))}
                </form>

                {/* Contact Section in Mobile Drawer */}
                <div className="mt-auto pt-8 border-t border-white/10 px-4">
                  <h3 className="text-lg font-kuunari-medium text-white mb-4">
                    {t('contact.ctaTitle')}
                  </h3>
                  <button
                    onClick={() => setIsContactFormOpen(true)}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-base font-kuunari-medium rounded-md text-darkgray bg-accent-500 hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 mb-6"
                  >
                    {t('contact.ctaButton')}
                  </button>

                  {/* Contact and Social Media Links */}
                  <div className="flex items-center space-x-6">
                    {/* Contact Links */}
                    <a
                      href="https://wa.me/5491112345678?text=Hola!%20Me%20interesaría%20consultar%20sobre%20sus%20servicios%20de%20render%20y%20proyecto%20y%20dirección%20de%20obra."
                      className="text-white/60 hover:text-accent-500 transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">WhatsApp</span>
                      <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </a>
                    <a
                      href="mailto:info@export3d.com"
                      className="text-white/60 hover:text-accent-500 transition-colors duration-300"
                    >
                      <span className="sr-only">Email</span>
                      <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                      </svg>
                    </a>

                    {/* Separator */}
                    <div className="h-6 w-px bg-white/20"></div>

                    {/* Social Media Links */}
                    <a
                      href="#"
                      className="text-white/60 hover:text-accent-500 transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">Instagram</span>
                      <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-white/60 hover:text-accent-500 transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">LinkedIn</span>
                      <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-white/60 hover:text-accent-500 transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">Behance</span>
                      <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                        <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </Dialog>

          <main className="w-full max-w-7xl md:max-w-8xl mx-auto py-12 my-12">
            <motion.div
              className="border-b border-white/10 pb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between">
                <motion.h1
                  className="text-title-md md:text-title-lg font-kuunari-bold tracking-tight text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                >
                  {t('projects.heading')}
                </motion.h1>
                <motion.button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="inline-flex items-center lg:hidden"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                >
                  <span className="text-base font-kuunari-medium text-white/80">
                    Filtros
                  </span>
                  <PlusIcon
                    aria-hidden="true"
                    className="ml-1 size-5 shrink-0 text-white/60"
                  />
                </motion.button>
              </div>
            </motion.div>

            <div className="lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="hidden lg:flex lg:flex-col sticky top-8 self-start h-fit pt-12"
              >
                <h2 className="sr-only">Filtros</h2>

                <div className="hidden lg:block relative">
                  {/* Reiniciar Filtros button (desktop, absolute) */}
                  {activeFilters.length > 0 && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="absolute -top-6 right-0 z-10 text-xs px-2 py-1 rounded bg-darkgray border border-accent-500 text-accent-500 flex items-center gap-1 shadow hover:bg-accent-500 hover:text-darkgray transition-colors"
                      style={{ minWidth: 'fit-content' }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Reiniciar
                    </button>
                  )}
                  <form className="divide-y divide-white/10">
                    {filters.map((section, index) => (
                      <motion.div
                        key={section.name}
                        className="py-10 first:pt-0 last:pb-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      >
                        <fieldset>
                          <legend className="block text-lg font-kuunari-medium text-white">
                            {section.name}
                          </legend>
                          <div className="space-y-3 pt-6">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex gap-3">
                                <div className="flex h-5 shrink-0 items-center">
                                  <div className="group grid size-4 grid-cols-1">
                                    <input
                                      defaultValue={option.value}
                                      id={`${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      type="checkbox"
                                      data-filter={section.id}
                                      data-value={option.value}
                                      onChange={(e) =>
                                        handleFilterChange(
                                          section.id,
                                          option.value,
                                          e.target.checked
                                        )
                                      }
                                      className="col-start-1 row-start-1 appearance-none rounded border border-white/20 bg-darkgray checked:border-accent-500 checked:bg-accent-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
                                    />
                                    <svg
                                      fill="none"
                                      viewBox="0 0 14 14"
                                      className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white"
                                      style={{ display: 'block' }}
                                    >
                                      <path
                                        d="M3 8L6 11L11 3.5"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="transition-opacity duration-150 opacity-0 group-has-[:checked]:opacity-100"
                                      />
                                    </svg>
                                  </div>
                                </div>
                                <label
                                  htmlFor={`${section.id}-${optionIdx}`}
                                  className="text-base text-white/80 font-kuunari-light select-none"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </fieldset>
                      </motion.div>
                    ))}
                  </form>
                </div>

                {/* Contact Section - Moved to bottom */}
                <div className="mt-10 pt-8 border-t border-white/10 hidden lg:block">
                  <h3 className="text-lg font-kuunari-medium text-white mb-4">
                    {t('contact.ctaTitle')}
                  </h3>
                  <button
                    onClick={() => setIsContactFormOpen(true)}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-base font-kuunari-medium rounded-md text-darkgray bg-accent-600 hover:bg-accent-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 mb-6"
                  >
                    {t('contact.ctaButton')}
                  </button>

                  {/* Contact and Social Media Links */}
                  <div className="flex items-center space-x-6">
                    {/* Contact Links */}
                    <a
                      href="https://wa.me/5491112345678?text=Hola!%20Me%20interesaría%20consultar%20sobre%20sus%20servicios%20de%20render%20y%20proyecto%20y%20dirección%20de%20obra."
                      className="text-white/60 hover:text-accent-500 transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">WhatsApp</span>
                      <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </a>
                    <a
                      href="mailto:info@export3d.com"
                      className="text-white/60 hover:text-accent-500 transition-colors duration-300"
                    >
                      <span className="sr-only">Email</span>
                      <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                      </svg>
                    </a>

                    {/* Separator */}
                    <div className="h-6 w-px bg-white/20"></div>

                    {/* Social Media Links */}
                    <a
                      href="#"
                      className="text-white/60 hover:text-accent-500 transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">Instagram</span>
                      <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-white/60 hover:text-accent-500 transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">LinkedIn</span>
                      <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-white/60 hover:text-accent-500 transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">Behance</span>
                      <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                        <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.aside>

              {/* Project grid */}
              <motion.div
                className="pt-12 mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              >
                <ProjectList projects={filteredProjects} lang={lang} />
              </motion.div>
            </div>
          </main>
        </div>

        {/* Contact Form Modal */}
        <ContactForm
          isOpen={isContactFormOpen}
          onClose={() => setIsContactFormOpen(false)}        lang={lang}
          />
        </div>
      </div>
    );
  }
  
