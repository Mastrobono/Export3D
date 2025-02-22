interface Project {
  imageRef: string;
  imageUrl: string;
  metadata: {
    title: string;
    tags?: string[];
  };
}

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 min-h-[600px]"
      id="project-list"
    >
      {projects.map((project, idx) => (
        <li
          key={project.metadata.title + idx}
          className="relative project-item transition-all duration-500"
          data-tags={
            project.metadata.tags ? project.metadata.tags.join(" ") : ""
          }
        >
          <div className="mb-4 group overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
            <img
              src={project.imageUrl}
              alt={project.metadata.title}
              className="pointer-events-none aspect-[10/7] object-cover group-hover:opacity-75"
            />
          </div>
          <p className="pointer-events-none block text-md font-medium text-white font-kuunari-light">
            {project.metadata.title.replace("<br/>", "")}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default ProjectList;
