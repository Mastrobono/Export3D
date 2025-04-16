import { Project } from '../types/project';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

interface ProjectListProps {
  projects: Project[];
}

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
        <ProjectCard key={project.id} project={project} index={idx} />
      ))}
    </div>
  );
};

export default ProjectList;
