import { motion, AnimatePresence } from "framer-motion";
import Container from "../layouts/Container";
import { useProjectFilters } from "../hooks/useProjectFilters";
import { Project } from "../types/project";
import { tags } from "../data/data";

interface AllProjectsProps {
  projects: any[]; // Raw projects from data.ts
}

// Transform raw project data to match our Project type
const transformProject = (rawProject: any, index: number): Project => {
  // Generar un ID único combinando el título y el índice
  const uniqueId = `${rawProject.metadata.title.toLowerCase().replace(/\s+/g, '-')}-${index}`;
  
  return {
    id: uniqueId,
    title: rawProject.metadata.title.replace("<br/>", ""),
    description: rawProject.metadata.location,
    imageUrl: rawProject.imageUrl,
    type: rawProject.metadata.buildingType,
    date: rawProject.metadata.date,
    role: rawProject.metadata.role,
    tags: [
      rawProject.metadata.type,
      rawProject.metadata.date,
      rawProject.metadata.role,
      rawProject.metadata.buildingType,
      ...(rawProject.metadata.tags || [])
    ].filter(Boolean)
  };
};

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
    className={`relative text-[18px] font-kuunari-medium rounded-[28px] py-2 px-8 border-2 cursor-pointer transition-all duration-300
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

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      key={`card-${project.id}`}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-lg aspect-[4/3] opacity-90 hover:opacity-100 transition-opacity duration-300"
    >
      <motion.div
        key={`image-container-${project.id}`}
        className="absolute inset-0 overflow-hidden"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </motion.div>
      <motion.div
        key={`overlay-${project.id}`}
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute bottom-0 left-0 p-8 text-white w-full">
          <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
          <p className="text-sm opacity-90 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <ProjectTag 
                key={`${project.id}-tag-${index}`} 
                tag={tag} 
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AllProjects: React.FC<AllProjectsProps> = ({ projects: rawProjects }) => {
  // Transform raw projects to match our Project type, passing the index
  const projects = rawProjects.map((project, index) => transformProject(project, index));
  const { activeFilters, filteredProjects, handleFilterChange, resetFilters } = useProjectFilters(projects);

  return (
    <Container classNames="p-20 bg-lightgray">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-[4rem] font-semibold tracking-tight font-kuunari-medium text-accent-500 text-center mb-16"
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
          className="flex flex-col gap-y-8 items-start mb-16"
        >
          <div className="flex flex-row gap-x-12">
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
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h4>
                <div className="flex flex-row gap-x-4 flex-wrap">
                  {tags[category].map((tag, tagIndex) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.4, delay: 0.4 + tagIndex * 0.05 }}
                    >
                      <FilterChip
                        tag={tag}
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
              Reset Filters
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
            key="projects-grid-container"
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={`project-${project.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </Container>
  );
};

export default AllProjects;
