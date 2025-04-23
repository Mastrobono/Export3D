import { motion, AnimatePresence } from "framer-motion";
import Container from "../layouts/Container";
import { useProjectFilters } from "../hooks/useProjectFilters";
import { Project } from "../types/project";
import { tags } from "../data/data";
import ProjectCard from './ProjectCard';

interface AllProjectsProps {
  projects: Project[];
}

const FilterChip = ({ 
  tag, 
  isActive, 
  onClick 
}: { 
  tag: string; 
  isActive: boolean; 
  onClick: () => void;
}) => (
  <motion.button
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`relative text-[17px] font-kuunari-medium rounded-[28px] py-1 px-6 border-2 cursor-pointer transition-all duration-300 text-left
      ${isActive 
        ? 'bg-accent-500 text-white border-accent-500' 
        : 'text-accent-500 border-accent-500 hover:bg-accent-500/10'
      }`}
    onClick={onClick}
  >
    {tag}
    {isActive && (
      <motion.span
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 text-accent-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </motion.span>
    )}
  </motion.button>
);

const ProjectTag = ({ tag }: { tag: string }) => (
  <span
    style={{
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)'
    }}
    className="text-[14px] font-kuunari-medium text-accent-500 rounded-[20px] py-1 px-4 border-accent-500 border-solid border-2"
  >
    {tag}
  </span>
);

const AllProjects: React.FC<AllProjectsProps> = ({ projects }) => {
  const { activeFilters, filteredProjects, handleFilterChange, resetFilters, getTranslatedFilter } = useProjectFilters(projects);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1]
        }
      }}
      viewport={{ once: true }}
      className="mx-auto max-w-7xl md:max-w-8xl rounded-md bg-lightgray shadow-xl px-8 py-24 md:px-20 md:py-32"
      data-section="all-projects"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-title-sm md:text-title-md font-semibold tracking-tight font-kuunari-medium text-accent-500 text-center mb-16"
      >
        Más Proyectos
      </motion.h2>

      <div className="max-w-[1400px] mx-auto">
        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-y-8 items-start mb-14"
        >
          <div className="flex flex-col md:flex-row gap-x-12 gap-y-6">
            {Object.keys(tags).map((category, index) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="flex flex-col gap-y-4"
              >
                <h4 className="text-[22px] text-white font-kuunari-bold">
                  {getTranslatedFilter(category)}
                </h4>
                <div className="flex flex-row gap-x-4 gap-y-2 flex-wrap">
                  {tags[category].map((tag, tagIndex) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.4, delay: 0.4 + tagIndex * 0.05 }}
                    >
                      <FilterChip
                        tag={getTranslatedFilter(tag)}
                        isActive={activeFilters.includes(tag)}
                        onClick={() => handleFilterChange(tag)}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
          {activeFilters.length > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-[20px] font-kuunari-medium text-white cursor-pointer flex items-center gap-2"
              onClick={resetFilters}
            >
              Reiniciar Filtros
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
            </motion.button>
          )}
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <motion.div
            key="no-projects-message"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <p className="text-white text-lg mb-4">
              Vaya! Todavía no contamos con ningún proyecto con dichas características, sé el primero!
            </p>
            <button
              type="button"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Contactar
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      duration: 0.8,
                      delay: 0.4 + index * 0.1,
                      ease: [0.25, 0.1, 0.25, 1]
                    }
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  exit={{ opacity: 0, y: 30 }}
                >
                  <ProjectCard project={project} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Explore Full Gallery Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 + filteredProjects.length * 0.05 + 0.3 }}
          className="flex justify-center mt-8"
        >
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "auto", opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.8,
              delay: 0.2 + filteredProjects.length * 0.05 + 0.3,
              width: {
                duration: 0.4,
                ease: "easeOut"
              },
              opacity: {
                duration: 0.6,
                delay: 0.2 + filteredProjects.length * 0.05 + 0.5
              }
            }}
            className="overflow-visible"
          >
            <motion.a
              href="/projects"
              className="group relative inline-flex items-center gap-3 px-4 py-2"
            >
              <span className="relative text-2xl text-accent-500 font-kuunari-medium">
                Explorar Galería Completa
                <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-accent-500 transition-all duration-300 group-hover:w-full group-hover:left-0"/>
              </span>
              <div className="overflow-hidden w-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-accent-500 transform transition-transform duration-300 ease-out group-hover:translate-x-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </div>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AllProjects;
