import { useState, useEffect } from "react";
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

const filters = Object.keys(tags).map((key) => ({
  id: key,
  name: key.charAt(0).toUpperCase() + key.slice(1),
  options: tags[key].map((value) => ({
    value: value,
    label: value,
  })),
}));

export const filterProjects = (
  projects,
  activeFilters,
  setFilteredProjects
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

export default function ProjectsFilter() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    filterProjects(projects, activeFilters, setFilteredProjects);
  }, [activeFilters]);

  const handleFilterChange = (filter, value, checked) => {
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
    <div className="bg-darkgray">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/50 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-darkgray py-4 pb-6 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-kuunari-medium text-white">Filtros</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex size-10 items-center justify-center p-2 text-white/60 hover:text-accent-500"
                >
                  <span className="sr-only">Cerrar menú</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4">
                {filters.map((section) => (
                  <Disclosure
                    key={section.name}
                    as="div"
                    className="border-t border-white/10 pb-4 pt-4"
                  >
                    <fieldset>
                      <legend className="w-full px-2">
                        <DisclosureButton className="group flex w-full items-center justify-between p-2 text-white/60 hover:text-accent-500">
                          <span className="text-sm font-kuunari-medium text-white">
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
                              <label
                                htmlFor={`${section.id}-${optionIdx}-mobile`}
                                className="text-sm text-white/80 font-kuunari-light"
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
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="border-b border-white/10 pb-10">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-kuunari-medium tracking-tight text-white">
                Proyectos
              </h1>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex items-center lg:hidden"
              >
                <span className="text-sm font-kuunari-medium text-white/80">
                  Filtros
                </span>
                <PlusIcon
                  aria-hidden="true"
                  className="ml-1 size-5 shrink-0 text-white/60"
                />
              </button>
            </div>
          </div>

          <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside>
              <h2 className="sr-only">Filtros</h2>

              <div className="hidden lg:block">
                <form className="divide-y divide-white/10">
                  {filters.map((section) => (
                    <div
                      key={section.name}
                      className="py-10 first:pt-0 last:pb-0"
                    >
                      <fieldset>
                        <legend className="block text-sm font-kuunari-medium text-white">
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
                              <label
                                htmlFor={`${section.id}-${optionIdx}`}
                                className="text-sm text-white/80 font-kuunari-light"
                              >
                                {option.label}
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

            {/* Project grid */}
            <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
              <ProjectList projects={filteredProjects} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
