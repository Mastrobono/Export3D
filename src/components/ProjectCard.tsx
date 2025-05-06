import { motion } from 'framer-motion';
import { Project } from '../types/project';

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

interface ProjectCardProps {
  project: Project;
  index?: number;
  withOverlay?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0, withOverlay = false }) => {
  return (
    <a 
      href={`/project/${project.slug}`}
      className="block group hover:no-underline"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative project-item group-hover:-translate-y-1 transition-transform duration-300"
        data-tags={[project.metadata.buildingType, project.metadata.date, project.metadata.role].join(" ")}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-darkgray">
          <motion.img
            src={`/assets/projects/${project.slug}/${project.slug}-gallery-0-thumb.webp`}
            alt={project.metadata.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (!target.src.includes('placeholder-image.webp')) {
                target.src = '/placeholder-image.webp';
              } else {
                target.onerror = null;
              }
            }}
          />
          {withOverlay && (
            <div
              className="absolute inset-0 bg-black/40 transition-opacity duration-500 pointer-events-none group-hover:opacity-0 opacity-100"
              style={{ background: '#0000006e' }}
            ></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-darkgray/90 via-darkgray/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <ProjectTag tag={project.metadata.buildingType} />
                <ProjectTag tag={project.metadata.date} />
                <ProjectTag tag={project.metadata.role} />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-kuunari-medium text-white group-hover:text-accent-500 transition-colors duration-300">
                {project.metadata.title.replace("<br/>", "")}
              </h3>
              <p className="text-sm text-white/60 mt-1 font-kuunari-light">{project.metadata.location}</p>
            </div>
            <div 
              className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0"
            >
              <span className="text-accent-500 font-kuunari-medium text-sm">Ver detalle</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 text-accent-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </a>
  );
};

export default ProjectCard; 