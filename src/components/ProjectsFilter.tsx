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
import { contactInfo } from '../data/contact';
import Breadcrumb from "./Breadcrumb";


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

const ProjectsFilter = ({ lang }: ProjectsFilterProps) => {
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
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="py-6">
                      <div className="flex flex-col space-y-4">
                        <a
                          href={contactInfo.whatsapp.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-gray-300 hover:text-white"
                        >
                          <contactInfo.whatsapp.icon className="h-6 w-6" />
                          <span>WhatsApp</span>
                        </a>
                        <a
                          href={contactInfo.email.href}
                          className="flex items-center space-x-2 text-gray-300 hover:text-white"
                        >
                          <contactInfo.email.icon className="h-6 w-6" />
                          <span>Email</span>
                        </a>
                        <div className="flex space-x-4">
                          <a
                            href={contactInfo.social.instagram.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-white"
                          >
                            <contactInfo.social.instagram.icon className="h-6 w-6" />
                          </a>
                          <a
                            href={contactInfo.social.linkedin.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-white"
                          >
                            <contactInfo.social.linkedin.icon className="h-6 w-6" />
                          </a>
                          <a
                            href={contactInfo.social.behance.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-white"
                          >
                            <contactInfo.social.behance.icon className="h-6 w-6" />
                          </a>
                        </div>
                      </div>
                    </div>
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
              <Breadcrumb
                lang={lang}
                isGallery={true}
              />
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
                  <div className="mt-6 flow-root">
                    <div className="flex flex-col space-y-4">
                      <a
                        href={contactInfo.whatsapp.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-gray-300 hover:text-white"
                      >
                        <contactInfo.whatsapp.icon className="h-6 w-6" />
                        <span>WhatsApp</span>
                      </a>
                      <a
                        href={contactInfo.email.href}
                        className="flex items-center space-x-2 text-gray-300 hover:text-white"
                      >
                        <contactInfo.email.icon className="h-6 w-6" />
                        <span>Email</span>
                      </a>
                      <div className="flex space-x-4">
                        <a
                          href={contactInfo.social.instagram.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-white"
                        >
                          <contactInfo.social.instagram.icon className="h-6 w-6" />
                        </a>
                        <a
                          href={contactInfo.social.linkedin.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-white"
                        >
                          <contactInfo.social.linkedin.icon className="h-6 w-6" />
                        </a>
                        <a
                          href={contactInfo.social.behance.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-white"
                        >
                          <contactInfo.social.behance.icon className="h-6 w-6" />
                        </a>
                      </div>
                    </div>
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
          onClose={() => setIsContactFormOpen(false)}
          lang={lang}
        />
      </div>
    </div>
  );
};

export default ProjectsFilter;

