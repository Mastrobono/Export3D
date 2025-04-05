import { Project } from '../types/project';
import { motion } from 'framer-motion';

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  if (projects.length === 0) {
    return (
      <div
        id="project-list"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px] place-items-center"
      >
        <motion.div 
          className="col-span-full text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6,
            ease: "easeOut"
          }}
        >
          <motion.p 
            className="text-lg text-white/80 font-kuunari-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6,
              delay: 0.2,
              ease: "easeOut"
            }}
          >
            Vaya! Todavía no contamos con ningún proyecto con dichas
            características, sé el primero!
          </motion.p>
          <motion.button
            type="button"
            className="rounded-md bg-accent-500 px-4 py-2 text-sm font-kuunari-medium text-darkgray shadow-sm hover:bg-accent-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6,
              delay: 0.4,
              ease: "easeOut"
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contactar
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      id="project-list"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]"
    >
      {projects.map((project, idx) => (
        <a 
          href={`/project/${project.slug}`}
          className="block group"
          key={project.id}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative project-item group"
            data-tags={[project.metadata.buildingType, project.metadata.date, project.metadata.role].join(" ")}
            whileHover={{ y: -5 }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-darkgray">
              <motion.img
                src={project.image.src}
                alt={project.metadata.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-darkgray/90 via-darkgray/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-kuunari-medium text-white group-hover:text-accent-500 transition-colors duration-300">
                {project.metadata.title.replace("<br/>", "")}
              </h3>
              <p className="text-sm text-white/60 mt-1 font-kuunari-light">{project.metadata.location}</p>
            </div>
          </motion.div>
        </a>
      ))}
    </div>
  );
};

export default ProjectList;
