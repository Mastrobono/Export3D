import { useState } from "react";
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
import ProjectList from "./ProjectList";
import { projects } from "../data/data";
import { useProjectFilters } from "../hooks/useProjectFilters";

const ProjectsFilter = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { filters, filteredProjects, toggleFilter, clearFilters, availableTags } = useProjectFilters(projects);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredBySearch = filteredProjects.filter((project) =>
    project.metadata.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filtros</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex size-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Cerrar menú</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4">
                {Object.entries(availableTags).map(([category, values]) => (
                  <Disclosure
                    key={category}
                    as="div"
                    className="border-t border-gray-200 pb-4 pt-4"
                  >
                    <fieldset>
                      <legend className="w-full px-2">
                        <DisclosureButton className="group flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                          <span className="text-sm font-medium text-gray-900">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
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
                          {values.map((value) => (
                            <div key={value} className="flex gap-3">
                              <div className="flex h-5 shrink-0 items-center">
                                <div className="group grid size-4 grid-cols-1">
                                  <input
                                    type="checkbox"
                                    checked={filters[category as keyof typeof filters].includes(value)}
                                    onChange={() => toggleFilter(category as keyof typeof filters, value)}
                                    className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-accent-500 checked:bg-accent-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
                                  />
                                  <svg
                                    fill="none"
                                    viewBox="0 0 14 14"
                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white"
                                  >
                                    <path
                                      d="M3 8L6 11L11 3.5"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-[:checked]:opacity-100"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <label className="text-sm text-gray-500">
                                {value}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </fieldset>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="border-b border-gray-200 pb-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Proyectos
            </h1>
            <p className="mt-4 text-base text-gray-500">
              Explora nuestra colección de proyectos arquitectónicos
            </p>
          </div>

          <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside>
              <h2 className="sr-only">Filtros</h2>

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex items-center lg:hidden"
              >
                <span className="text-sm font-medium text-gray-700">
                  Filtros
                </span>
                <PlusIcon
                  aria-hidden="true"
                  className="ml-1 size-5 shrink-0 text-gray-400"
                />
              </button>

              <div className="hidden lg:block">
                <form className="divide-y divide-gray-200">
                  {Object.entries(availableTags).map(([category, values]) => (
                    <div
                      key={category}
                      className="py-10 first:pt-0 last:pb-0"
                    >
                      <fieldset>
                        <legend className="block text-sm font-medium text-gray-900">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </legend>
                        <div className="space-y-3 pt-6">
                          {values.map((value) => (
                            <div key={value} className="flex gap-3">
                              <div className="flex h-5 shrink-0 items-center">
                                <div className="group grid size-4 grid-cols-1">
                                  <input
                                    type="checkbox"
                                    checked={filters[category as keyof typeof filters].includes(value)}
                                    onChange={() => toggleFilter(category as keyof typeof filters, value)}
                                    className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-accent-500 checked:bg-accent-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
                                  />
                                  <svg
                                    fill="none"
                                    viewBox="0 0 14 14"
                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white"
                                  >
                                    <path
                                      d="M3 8L6 11L11 3.5"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-[:checked]:opacity-100"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <label className="text-sm text-gray-600">
                                {value}
                              </label>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  ))}
                </form>
              </div>
            </aside>

            {/* Product grid */}
            <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
              {/* Barra de búsqueda */}
              <div className="relative mb-8">
                <input
                  type="text"
                  placeholder="Buscar proyectos..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full px-4 py-2 bg-accent-500/20 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>

              <ProjectList projects={filteredBySearch} />
              {filteredBySearch.length === 0 && (
                <div id="no-projects" className="text-center py-12">
                  <p className="text-lg text-gray-500">
                    No se encontraron proyectos con los filtros seleccionados
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectsFilter;
