import Container from "../layouts/Container.tsx";
import ProjectList from "./ProjectList.tsx";
import { tags, projects } from "../data/data.ts";
import { useState, useEffect } from "react";
import { filterProjects } from "./ProjectsFilter.tsx";

export default function AllProjects() {
  const [activeFilters, setActiveFilters] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    filterProjects(projects, activeFilters, setFilteredProjects);
  }, [activeFilters]);

  const handleFilterChange = (filter) => {
    setActiveFilters((prevFilters) => {
      if (prevFilters.includes(filter)) {
        return prevFilters.filter((f) => f !== filter);
      } else {
        return [...prevFilters, filter];
      }
    });
  };

  const resetFilters = () => {
    setActiveFilters([]);
  };

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
                      onClick={() => handleFilterChange(tag)}
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
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>

        <ProjectList projects={filteredProjects} />
        {filteredProjects.length === 0 && (
          <div id="no-projects" className="text-center py-8">
            <p className="text-white text-base sm:text-lg mb-4">
              Vaya! Todavía no contamos con ningún proyecto con dichas
              características, sé el primero!
            </p>
            <button
              type="button"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm sm:text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Contactar
            </button>
          </div>
        )}
      </div>
    </Container>
  );
}
