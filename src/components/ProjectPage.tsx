import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Container from './Container.tsx';
import ContactForm from './ContactForm.tsx';
import { projects } from '../data/data';
import type { Project } from '../types/project';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const customStyles = `
  /* Container styles */
  .custom-image-gallery {
    width: 100% !important;
    height: 100% !important;
    position: relative !important;
  }

  .image-gallery {
    width: 100% !important;
    height: 100% !important;
    position: relative !important;
  }

  .image-gallery-content {
    width: 100% !important;
    height: 100% !important;
    position: relative !important;
  }

  .image-gallery-slide-wrapper {
    width: 100% !important;
    height: 100% !important;
    position: relative !important;
  }

  .image-gallery-slides {
    width: 100% !important;
    height: 100% !important;
    position: relative !important;
  }

  /* Main image container */
  .image-gallery-image {
    width: 100% !important;
    height: 100% !important;
    position: relative !important;
    overflow: hidden !important;
  }

  /* Main image */
  .image-gallery-image img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
  }

  /* Thumbnails container */
  .image-gallery-thumbnails {
    width: 100% !important;
    position: relative !important;
  }

  .image-gallery-thumbnails .image-gallery-thumbnails-container {
    text-align: left !important;
    width: 100% !important;
  }

  /* Navigation arrows */
  .image-gallery-left-nav,
  .image-gallery-right-nav {
    background: rgba(0, 0, 0, 0.3) !important;
    border-radius: 50% !important;
    padding: 6px !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
    transition: all 0.3s ease !important;
    margin: 0 20px !important;
    position: absolute !important;
    z-index: 10 !important;
  }

  .image-gallery-left-nav {
    left: 0 !important;
  }

  .image-gallery-right-nav {
    right: 0 !important;
  }

  .image-gallery-left-nav:hover,
  .image-gallery-right-nav:hover {
    background: rgba(0, 0, 0, 0.5) !important;
  }

  .image-gallery-left-nav:hover svg,
  .image-gallery-right-nav:hover svg {
    color: #f9c461 !important;
  }

  /* Fullscreen button */
  .image-gallery-fullscreen-button {
    opacity: 0.7;
    transition: all 0.3s ease !important;
    background: rgba(0, 0, 0, 0.3) !important;
    border-radius: 4px !important;
    margin: 10px !important;
  }

  .image-gallery-content:hover .image-gallery-fullscreen-button {
    opacity: 1;
  }

  .image-gallery-fullscreen-button:hover {
    background: rgba(0, 0, 0, 0.5) !important;
  }

  .image-gallery-fullscreen-button:hover svg {
    color: #f9c461 !important;
    stroke: #f9c461 !important;
  }

  /* Thumbnail styles */
  .image-gallery-thumbnail {
    width: 100px !important;
    height: 75px !important;
    transition: all 0.3s ease !important;
    border: 2px solid transparent !important;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }

  .image-gallery-thumbnail-image {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
  }

  .image-gallery-thumbnail.active {
    border: 3px solid #f9c461 !important;
    box-shadow: 0 0 0 2px rgba(249, 196, 97, 0.3) !important;
  }

  .image-gallery-thumbnail:hover {
    border: 2px solid rgba(249, 196, 97, 0.5) !important;
  }

  /* Ensure all images maintain aspect ratio */
  .image-gallery-slide {
    height: 700px !important;
  }

  .image-gallery-image, 
  .image-gallery-image img {
    height: 100% !important;
    object-fit: cover !important;
  }

  /* Override default styles */
  .image-gallery-thumbnail.active {
    border: 3px solid #f9c461 !important;
  }

  .image-gallery-thumbnail.active .image-gallery-thumbnail-image {
    border: 2px solid #f9c461 !important;
  }
`;

interface ProjectPageProps {
  slug: string;
}

// Example photos for the gallery
const examplePhotos = [
  {
    original: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=160&h=120&fit=crop",
  },
  {
    original: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=160&h=120&fit=crop",
  },
  {
    original: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    thumbnail: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=160&h=120&fit=crop",
  },
  {
    original: "https://images.unsplash.com/photo-1600607687644-c7171b4249b8",
    thumbnail: "https://images.unsplash.com/photo-1600607687644-c7171b4249b8?w=160&h=120&fit=crop",
  },
  {
    original: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e",
    thumbnail: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=160&h=120&fit=crop",
  },
  {
    original: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=160&h=120&fit=crop",
  }
];

export default function ProjectPage({ slug }: ProjectPageProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevProject, setPrevProject] = useState<Project | null>(null);
  const [nextProject, setNextProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Add the custom styles to the document
    const styleElement = document.createElement('style');
    styleElement.textContent = customStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

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

    // Filter related projects to avoid duplicates
    const related = projects
      .filter(p => 
        p.slug !== slug && 
        (p.metadata.buildingType === currentProject.metadata.buildingType || 
         p.metadata.role === currentProject.metadata.role)
      )
      .filter((p, i, arr) => arr.findIndex(proj => proj.slug === p.slug) === i) // Remove duplicates
      .slice(0, 3);
    setRelatedProjects(related);
  }, [slug]);

  if (!project) return null;

  const galleryImages = [
    {
      original: project.image.src,
      thumbnail: project.image.src,
    },
    ...examplePhotos
  ];

  return (
    <main className="w-full max-w-7xl md:max-w-8xl mx-auto py-12 my-12 bg-darkgray">
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

        {/* Project Header */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-12">
            {/* Left Column - Project Info */}
            <div className="lg:pr-8">
              <h1 className="text-[4.5rem] leading-[1.1] font-semibold tracking-tight text-white font-kuunari-medium">
                {project.metadata.title}
              </h1>
              <p className="mt-4 text-xl text-white/80 font-kuunari-light">
                {project.metadata.location}
              </p>
              
              {/* Project Details */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                id="details" 
                className="mt-8"
              >
                <dl className="space-y-4">
                  <div>
                    <dt className="text-white/60 font-kuunari-light">Cliente</dt>
                    <dd className="text-white font-kuunari-medium">{project.metadata.client}</dd>
                  </div>
                  <div>
                    <dt className="text-white/60 font-kuunari-light">Tipo</dt>
                    <dd className="text-white font-kuunari-medium">{project.metadata.buildingType}</dd>
                  </div>
                  <div>
                    <dt className="text-white/60 font-kuunari-light">Rol</dt>
                    <dd className="text-white font-kuunari-medium">{project.metadata.role}</dd>
                  </div>
                  <div>
                    <dt className="text-white/60 font-kuunari-light">Fecha</dt>
                    <dd className="text-white font-kuunari-medium">{project.metadata.date}</dd>
                  </div>
                </dl>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsContactFormOpen(true)}
                className="mt-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-kuunari-medium rounded-md text-white bg-accent-500 hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
              >
                Contactar para Proyecto Similar
              </motion.button>
            </div>

            {/* Right Column - Gallery */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="w-full h-full relative"
            >
              <div className="w-full h-full relative">
                <ImageGallery
                  items={galleryImages}
                  showPlayButton={false}
                  showFullscreenButton={true}
                  showNav={true}
                  thumbnailPosition="top"
                  useBrowserFullscreen={true}
                  showBullets={false}
                  slideDuration={450}
                  slideInterval={3000}
                  additionalClass="custom-image-gallery"
                  renderLeftNav={(onClick, disabled) => (
                    <button
                      type="button"
                      className="image-gallery-left-nav absolute top-1/2 -translate-y-1/2 left-0 z-10 p-2 text-white hover:text-accent-500"
                      disabled={disabled}
                      onClick={onClick}
                      aria-label="Previous Slide"
                    >
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )}
                  renderRightNav={(onClick, disabled) => (
                    <button
                      type="button"
                      className="image-gallery-right-nav absolute top-1/2 -translate-y-1/2 right-0 z-10 p-2 text-white hover:text-accent-500"
                      disabled={disabled}
                      onClick={onClick}
                      aria-label="Next Slide"
                    >
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                  renderFullscreenButton={(onClick, isFullscreen) => (
                    <button
                      type="button"
                      className="image-gallery-fullscreen-button absolute bottom-0 right-0 z-10 p-2 text-white hover:text-accent-500"
                      onClick={onClick}
                      aria-label="Toggle Fullscreen"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </button>
                  )}
                  styles={{
                    thumbnail: {
                      width: '100px',
                      height: '75px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                    },
                    thumbnailsWrapper: {
                      padding: '0 20px',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '8px',
                    },
                    thumbnails: {
                      width: 'auto',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    },
                    thumbnailContainer: {
                      width: '100px',
                      height: '75px',
                      margin: '0 4px',
                    }
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            id="related" 
            className="mb-16"
          >
            <h2 className="text-2xl font-kuunari-medium text-white mb-6">También podría interesarte</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedProjects.map((relatedProject, index) => (
                <motion.a
                  key={relatedProject.slug}
                  href={`/project/${relatedProject.slug}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                  className="group block"
                >
                  <div className="relative aspect-[3/2] overflow-hidden rounded-lg mb-2">
                    <img
                      src={relatedProject.image.src}
                      alt={relatedProject.metadata.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-accent-500/30 group-hover:bg-accent-500/0 transition-all duration-500">
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                          <span className="text-white font-kuunari-medium text-sm">Ver detalle</span>
                          <motion.svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4 text-white" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                            initial={{ x: -20, opacity: 0 }}
                            whileHover={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M9 5l7 7-7 7" 
                            />
                          </motion.svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-base font-kuunari-medium text-white group-hover:text-accent-500 transition-colors">
                    {relatedProject.metadata.title}
                  </h3>
                  <p className="text-xs text-white/60 font-kuunari-light">
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
          <motion.a
            whileHover={{ x: -5 }}
            href={`/project/${prevProject ? prevProject.slug : projects[projects.length - 1].slug}`}
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

          <motion.a
            whileHover={{ x: 5 }}
            href={`/project/${nextProject ? nextProject.slug : projects[0].slug}`}
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
        </motion.div>
      </motion.div>

      <ContactForm 
        client:load 
        isOpen={isContactFormOpen} 
        onClose={() => {
          setIsContactFormOpen(false);
          document.body.style.overflow = 'auto';
        }} 
        projectTitle={project.metadata.title} 
      />
    </main>
  );
} 