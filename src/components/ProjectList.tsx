import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "../data/data";

interface ProjectListProps {
  projects: Project[];
}

const ProjectList = ({ projects }: ProjectListProps) => {
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/<br\/>/g, '') // Removemos <br/>
      .replace(/[^a-z0-9]+/g, '-') // Reemplazamos caracteres especiales con guiones
      .replace(/^-+|-+$/g, ''); // Removemos guiones al inicio y final
  };

  return (
    <AnimatePresence mode="wait">
      <motion.ul
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
      >
        <AnimatePresence mode="popLayout">
          {projects.map((project, index) => {
            const slug = generateSlug(project.metadata.title);
            return (
              <motion.li
                key={project.metadata.title}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 },
                  layout: { duration: 0.2, ease: "easeOut" }
                }}
                className="group cursor-pointer"
              >
                <a href={`/projects/${slug}`} className="block">
                  <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                    <img
                      src={project.imageUrl}
                      alt={project.metadata.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-kuunari-bold text-white mb-2">
                          {project.metadata.title.replace("<br/>", "")}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.metadata.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-accent-500/20 text-accent-500 rounded-full text-sm font-kuunari-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </AnimatePresence>
  );
};

export default ProjectList;
