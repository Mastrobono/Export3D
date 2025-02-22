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
    <Container classNames="p-20 bg-lightgray">
      <h2 className="text-[4rem] font-semibold tracking-tight font-kuunari-medium text-accent-500 text-center mb-12">
        Más Proyectos
      </h2>

      <div className="">
        {/* Filters */}
        <div className="flex flex-col gap-y-6 items-start">
          <div className="flex flex-row gap-x-12">
            {Object.keys(tags).map((category) => (
              <div className="flex flex-col gap-y-6">
                <h4 className="text-[22px] text-white font-kuunari-bold text-bold">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h4>
                <div className="flex flex-row gap-x-4">
                  {tags[category].map((tag) => (
                    <p
                      className="text-[18px] font-kuunari-medium text-accent-500 rounded-[28px] py-2 px-8 border-accent-500 border-solid border-2 cursor-pointer filter-tag"
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
            className="text-[20px] font-kuunari-medium text-white cursor-pointer mb-8"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>

        <ProjectList projects={filteredProjects} />
        {filteredProjects.length === 0 && (
          <div id="no-projects">
            <p className="text-white text-center text-lg">
              Vaya! Todavía no contamos con ningún proyecto con dichas
              características, sé el primero!
            </p>
            <button
              type="button"
              className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Contactar
            </button>
          </div>
        )}
      </div>
    </Container>
  );
}
