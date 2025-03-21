import Container from "../layouts/Container.tsx";
import ProjectList from "./ProjectList.tsx";
import { tags, projects } from "../data/data.ts";
import { useState } from "react";
import { useProjectFilters } from "../hooks/useProjectFilters";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function AllProjects() {
  const [searchTerm, setSearchTerm] = useState("");
  const { filters, filteredProjects, toggleFilter, clearFilters, availableTags } = useProjectFilters(projects);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredBySearch = filteredProjects.filter((project) =>
    project.metadata.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container classNames="p-4 sm:p-8 md:p-12 lg:p-20 bg-lightgray">
      <h2 className="text-3xl sm:text-4xl md:text-[4rem] font-semibold tracking-tight font-kuunari-medium text-accent-500 text-center mb-6 sm:mb-8 md:mb-12">
        Más Proyectos
      </h2>

      <div className="w-full">
        {/* Filters */}
        <div className="flex flex-col gap-y-4 sm:gap-y-6 items-start">
          <div className="flex flex-col sm:flex-row gap-y-6 sm:gap-y-0 sm:gap-x-6 lg:gap-x-12">
            {Object.keys(tags).map((category) => (
              <div key={category} className="flex flex-col gap-y-4 sm:gap-y-6 w-full sm:w-auto">
                <h4 className="text-lg sm:text-xl lg:text-[22px] text-white font-kuunari-bold text-bold">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h4>
                <div className="flex flex-wrap gap-2 sm:gap-x-4">
                  {tags[category].map((tag) => (
                    <p
                      key={tag}
                      className="text-sm sm:text-base lg:text-[18px] font-kuunari-medium text-accent-500 rounded-[28px] py-1.5 sm:py-2 px-4 sm:px-8 border-accent-500 border-solid border-2 cursor-pointer filter-tag"
                      data-filter={tag}
                      onClick={() => toggleFilter(category as keyof typeof filters, tag)}
                    >
                      {tag}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button
            id="reset-filters"
            className="text-base sm:text-lg lg:text-[20px] font-kuunari-medium text-white cursor-pointer mb-4 sm:mb-6 lg:mb-8"
            onClick={clearFilters}
          >
            Limpiar Filtros
          </button>
        </div>

        {/* Barra de búsqueda */}
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar proyectos..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 bg-accent-500/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
        </div>

        {filteredBySearch.length > 0 ? (
          <ProjectList projects={filteredBySearch} />
        ) : (
          <div id="no-projects" className="flex flex-col items-center justify-center min-h-[800px] text-center bg-darkgray/30 rounded-2xl p-8 sm:p-12">
            <div className="w-24 h-24 mb-8 rounded-full bg-accent-500/10 flex items-center justify-center">
              <MagnifyingGlassIcon className="w-12 h-12 text-accent-500" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-kuunari-bold text-accent-500 mb-4">
              No se encontraron proyectos
            </h3>
            <p className="text-white text-base sm:text-lg mb-8 max-w-2xl">
              Vaya! Todavía no contamos con ningún proyecto con dichas
              características. ¿Te gustaría ser el primero en colaborar con nosotros?
            </p>
            <button
              type="button"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-base sm:text-lg font-kuunari-medium text-white bg-accent-500 rounded-full hover:bg-accent-400 transition-colors duration-300 shadow-lg hover:shadow-accent-500/25"
            >
              Contactar
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </div>
        )}
      </div>
    </Container>
  );
}
