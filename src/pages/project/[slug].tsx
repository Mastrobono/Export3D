import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../../layouts/Layout.astro';
import Container from '../../layouts/Container.tsx';
import ContactForm from '../../components/ContactForm.tsx';
import { projects } from '../../data/data';
import type { Project } from '../../types/project';

interface ProjectPageProps {
  slug: string;
}

export default function ProjectPage({ slug }: ProjectPageProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevProject, setPrevProject] = useState<Project | null>(null);
  const [nextProject, setNextProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);

  useEffect(() => {
    const currentProject = projects.find(p => p.slug === slug);
    if (!currentProject) {
      window.location.href = '/404';
      return;
    }

    setProject(currentProject);
    const index = projects.findIndex(p => p.slug === slug);
    setCurrentIndex(index);
    setPrevProject(index > 0 ? projects[index - 1] : null);
    setNextProject(index < projects.length - 1 ? projects[index + 1] : null);

    const related = projects.filter(p => 
      p.slug !== slug && 
      (p.metadata.buildingType === currentProject.metadata.buildingType || 
       p.metadata.role === currentProject.metadata.role)
    ).slice(0, 3);
    setRelatedProjects(related);
  }, [slug]);

  if (!project) return null;

  return (
    <Layout>
      <Container classNames="relative min-h-[max-content] overflow-hidden">
        {/* Background effects */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-darkgray/50 to-darkgray"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"></div>
        </motion.div>

        {/* Content */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10"
        >
          <div className="px-20 py-32">
            {/* Breadcrumbs */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-white/60">
                <li>
                  <a href="/" className="hover:text-accent-500 transition-colors">Inicio</a>
                </li>
                <li>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li>
                  <a href="/projects" className="hover:text-accent-500 transition-colors">Proyectos</a>
                </li>
                <li>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li className="text-white">
                  {project.metadata.title}
                </li>
              </ol>
            </nav>

            {/* Quick Navigation Menu */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <div className="flex flex-wrap gap-4">
                <a href="#overview" className="text-white/60 hover:text-accent-500 transition-colors">Vista General</a>
                <a href="#details" className="text-white/60 hover:text-accent-500 transition-colors">Detalles</a>
                <a href="#gallery" className="text-white/60 hover:text-accent-500 transition-colors">Galería</a>
                <a href="#related" className="text-white/60 hover:text-accent-500 transition-colors">Proyectos Relacionados</a>
              </div>
            </motion.div>

            {/* Back to Projects Button */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8"
            >
              <a
                href="/projects"
                className="inline-flex items-center text-white/60 hover:text-accent-500 transition-colors"
              >
                <svg
                  className="mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="font-kuunari-medium">Volver a todos los proyectos</span>
              </a>
            </motion.div>

            {/* Project Header */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              id="overview" 
              className="mb-16"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-[4.5rem] leading-[1.1] font-semibold tracking-tight text-white font-kuunari-medium">
                    {project.metadata.title}
                  </h1>
                  <p className="mt-4 text-xl text-white/80 font-kuunari-light">
                    {project.metadata.location}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsContactFormOpen(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-kuunari-medium rounded-md text-white bg-accent-500 hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
                >
                  Contactar para Proyecto Similar
                </motion.button>
              </div>
              
              {/* Project Details */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                id="details" 
                className="mt-8"
              >
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-white/60 font-kuunari-light">Cliente</dt>
                    <dd className="text-white font-kuunari-medium">{project.metadata.client}</dd>
                  </div>
                  <div>
                    <dt className="text-white/60 font-kuunari-light">Rol</dt>
                    <dd className="text-white font-kuunari-medium">{project.metadata.role}</dd>
                  </div>
                  <div>
                    <dt className="text-white/60 font-kuunari-light">Tipo</dt>
                    <dd className="text-white font-kuunari-medium">{project.metadata.buildingType}</dd>
                  </div>
                  <div>
                    <dt className="text-white/60 font-kuunari-light">Fecha</dt>
                    <dd className="text-white font-kuunari-medium">{project.metadata.date}</dd>
                  </div>
                </dl>
              </motion.div>
            </motion.div>

            {/* Main Image */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="relative aspect-[16/9] overflow-hidden rounded-lg mb-16"
            >
              <img
                src={project.image.src}
                alt={project.metadata.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Gallery Thumbnails */}
            {project.gallery && project.gallery.length > 0 && (
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                id="gallery" 
                className="mb-16"
              >
                <h2 className="text-2xl font-kuunari-medium text-white mb-6">Galería</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {project.gallery.map((image, index) => (
                    <motion.div 
                      key={index}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                      className="relative aspect-[4/3] overflow-hidden rounded-lg"
                    >
                      <img
                        src={image.src}
                        alt={`${project.metadata.title} - Imagen adicional`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                id="related" 
                className="mb-16"
              >
                <h2 className="text-2xl font-kuunari-medium text-white mb-6">Proyectos Relacionados</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedProjects.map((relatedProject, index) => (
                    <motion.a
                      key={relatedProject.slug}
                      href={`/project/${relatedProject.slug}`}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                      className="group block"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
                        <img
                          src={relatedProject.image.src}
                          alt={relatedProject.metadata.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="text-xl font-kuunari-medium text-white group-hover:text-accent-500 transition-colors">
                        {relatedProject.metadata.title}
                      </h3>
                      <p className="text-white/60 font-kuunari-light">
                        {relatedProject.metadata.buildingType}
                      </p>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Navigation */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="flex justify-between items-center border-t border-white/10 pt-8"
            >
              {prevProject && (
                <motion.a
                  whileHover={{ x: -5 }}
                  href={`/project/${prevProject.slug}`}
                  className="group flex items-center text-white/60 hover:text-accent-500 transition-colors"
                >
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span className="font-kuunari-medium">Proyecto anterior</span>
                </motion.a>
              )}
              {nextProject && (
                <motion.a
                  whileHover={{ x: 5 }}
                  href={`/project/${nextProject.slug}`}
                  className="group flex items-center text-white/60 hover:text-accent-500 transition-colors"
                >
                  <span className="font-kuunari-medium">Siguiente proyecto</span>
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.a>
              )}
            </motion.div>
          </div>
        </motion.div>
      </Container>

      <ContactForm 
        client:load 
        isOpen={isContactFormOpen} 
        onClose={() => {
          setIsContactFormOpen(false);
          document.body.style.overflow = 'auto';
        }} 
        projectTitle={project.metadata.title} 
      />
    </Layout>
  );
}

export async function getStaticPaths() {
  return projects.map((project) => ({
    params: { slug: project.slug },
    props: { project },
  }));
} 