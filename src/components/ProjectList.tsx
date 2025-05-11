import { Project } from '../types/project';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import NotFoundIllustration from './NotFoundIllustration';

interface ProjectListProps {
  projects: Project[];
  lang?: 'es' | 'en';
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

const ProjectList: React.FC<ProjectListProps> = ({ projects, lang }) => {
  if (projects.length === 0) {
    return (
      <div
        id="project-list"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px] place-items-center"
      >
        <motion.div 
          className="col-span-full text-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.6,
            ease: "easeOut"
          }}
        >
          <NotFoundIllustration />
          <motion.p 
            className="text-lg text-white/80 font-kuunari-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
    <motion.div
      id="project-list"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      layout
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project, idx) => (
           <motion.div
           key={project.id}
           layout
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ 
             opacity: 1, 
             y: 0,
             transition: {
               duration: 0.8,
               delay: 0.075 + idx * 0.075,
               ease: [0.25, 0.1, 0.25, 1]
             }
           }}
           viewport={{ once: true, margin: "-75px" }}
           exit={{ opacity: 0, y: 30 }}
         >
           <ProjectCard project={project} index={idx} lang={lang} />
         </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectList;
