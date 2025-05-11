import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Container from './Container.tsx';
import ContactForm from './ContactForm.tsx';
import { projects } from '../data/data';
import type { Project } from '../types/project';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import ProjectCard from './ProjectCard';
import { useTranslations } from '../i18n/utils';

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
    position: absolute !important;
    bottom: 1rem !important;
    right: 1rem !important;
    z-index: 20 !important;
    background: rgba(0,0,0,0.7) !important;
    border-radius: 4px !important;
    margin: 0 !important;
    opacity: 0.85;
    transition: bottom 0.3s, opacity 0.3s, all 0.3s ease !important;
    width: 40px !important;
    height: 40px !important;
    display: flex !important;
    align-items: center;
    justify-content: center;
    padding: 0 !important;
    overflow: visible !important;
  }

  .image-gallery-fullscreen-button svg {
    width: 24px !important;
    height: 24px !important;
    color: #fff !important;
    stroke: #fff !important;
    fill: none !important;
    display: block !important;
  }

  .image-gallery-content:hover .image-gallery-fullscreen-button {
    opacity: 1;
  }

  .image-gallery-fullscreen-button:hover {
    background: #f9c461 !important;
  }

  .image-gallery-fullscreen-button:hover svg {
    color: #121212 !important;
    stroke: #121212 !important;
  }

  /* Thumbnail styles */
  .image-gallery-thumbnail {
    width: 100px !important;
    height: 75px !important;
    transition: all 0.3s ease !important;
    border: 2px solid transparent !important;
    border-radius: 4px !important;
    overflow: hidden !important;
    position: relative;
  }

  .image-gallery-thumbnail-image {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
  }

  .image-gallery-thumbnail.active {
    border: 2px solid #f9c461 !important;
    box-shadow: none !important;
  }

  .image-gallery-thumbnail.active .image-gallery-thumbnail-image {
    border: none !important;
    box-shadow: none !important;
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

  /* --- REGLAS FINALES PARA FORZAR PRIORIDAD --- */
  @media (min-width: 768px) {
    .image-gallery-slide-wrapper,
    .image-gallery-slide,
    .image-gallery-image,
    .image-gallery-image img {
      height: 700px !important;
      min-height: 700px !important;
      max-height: 700px !important;
    }
  }

  /* Borde visible en los thumbnails */
  .image-gallery-thumbnail {
    border: 2px solid transparent !important;
    box-shadow: none !important;
    border-radius: 4px !important;
    overflow: hidden !important;
  }

  .image-gallery-thumbnail.active {
    border: 2px solid #f9c461 !important;
    box-shadow: none !important;
  }

  .image-gallery-thumbnail.active .image-gallery-thumbnail-image {
    border: none !important;
    box-shadow: none !important;
  }

  /* Centrar thumbnails horizontalmente en fullscreen */
  .image-gallery.fullscreen .image-gallery-thumbnails-wrapper,
  .image-gallery:fullscreen .image-gallery-thumbnails-wrapper,
  .image-gallery:-webkit-full-screen .image-gallery-thumbnails-wrapper {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }

  .image-gallery.fullscreen .image-gallery-thumbnails,
  .image-gallery:fullscreen .image-gallery-thumbnails,
  .image-gallery:-webkit-full-screen .image-gallery-thumbnails {
    justify-content: center !important;
  }

  /* Centrar thumbnails container en fullscreen */
  .image-gallery.fullscreen .image-gallery-thumbnails-container,
  .image-gallery:fullscreen .image-gallery-thumbnails-container,
  .image-gallery:-webkit-full-screen .image-gallery-thumbnails-container {
    display: flex !important;
    justify-content: center !important;
  }

  /* Bajar el fullscreen button a top: 96% en fullscreen */
  .image-gallery.fullscreen .image-gallery-fullscreen-button,
  .image-gallery:fullscreen .image-gallery-fullscreen-button,
  .image-gallery:-webkit-full-screen .image-gallery-fullscreen-button {
    bottom: 2.5rem !important;
  }

  /* Transición suave de opacidad para el botón de fullscreen al entrar/salir de fullscreen */
  .image-gallery-fullscreen-button {
    transition: opacity 0.3s, all 0.3s ease !important;
  }
  .image-gallery:not(.fullscreen) .image-gallery-fullscreen-button {
    opacity: 1 !important;
  }
  .image-gallery.fullscreen .image-gallery-fullscreen-button,
  .image-gallery:fullscreen .image-gallery-fullscreen-button,
  .image-gallery:-webkit-full-screen .image-gallery-fullscreen-button {
    opacity: 1 !important;
  }
  /* Ocultar el botón durante la transición (opcional, para evitar parpadeo) */
  .image-gallery.transitioning .image-gallery-fullscreen-button {
    opacity: 0 !important;
  }

  /* Thumbnails responsive en fullscreen mobile */
  @media (max-width: 768px) {
    .image-gallery-thumbnails-wrapper {
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      overflow-x: auto !important;
      overflow-y: hidden !important;
      -webkit-overflow-scrolling: touch;
      gap: 6px !important;
      padding: 0 8px !important;
      scrollbar-width: thin;
      scrollbar-color: #f9c461 #121212;
      margin-bottom: 24px !important;
    }

    .image-gallery-thumbnails {
      flex-wrap: nowrap !important;
      min-width: max-content;
      justify-content: center !important;
      gap: 6px !important;
      padding: 0 !important;
      margin: 0 !important;
    }

    .image-gallery-thumbnail {
      width: 60px !important;
      height: 45px !important;
      min-width: 60px !important;
      min-height: 45px !important;
      max-width: 60px !important;
      max-height: 45px !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    .image-gallery-thumbnails-container {
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      width: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
    }

    .image-gallery-thumbnails-wrapper::-webkit-scrollbar {
      height: 8px;
      background: #121212;
    }

    .image-gallery-thumbnails-wrapper::-webkit-scrollbar-thumb {
      background: #f9c461;
      border-radius: 10px;
    }

    .image-gallery-thumbnails-wrapper::-webkit-scrollbar-track {
      background: #121212;
      border-radius: 10px;
    }
  }
`;

interface ProjectPageProps {
  slug: string;
  galleryImages: { original: string; thumbnail: string }[];
  lang: 'es' | 'en';
  project: Project;
}

export default function ProjectPage({ slug, galleryImages, lang, project }: ProjectPageProps) {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevProject, setPrevProject] = useState<Project | null>(null);
  const [nextProject, setNextProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const t = useTranslations(lang);

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
    const index = projects.findIndex(p => p.slug === slug);
    setCurrentIndex(index);
    setPrevProject(index > 0 ? projects[index - 1] : null);
    setNextProject(index < projects.length - 1 ? projects[index + 1] : null);

    // Filter related projects to avoid duplicates
    const related = projects
      .filter(p =>
        p.slug !== slug &&
        (p.metadata.buildingType === project.metadata.buildingType ||
          p.metadata.role === project.metadata.role)
      )
      .filter((p, i, arr) => arr.findIndex(proj => proj.slug === p.slug) === i) // Remove duplicates
      .slice(0, 3);
    setRelatedProjects(related);
  }, [slug, project]);

  if (!project) return null;

  return (
    <main className="w-full max-w-7xl md:max-w-8xl min-[1800px]:max-w-[1800px] mx-auto py-12 my-12 bg-darkgray">
      {/* Background effects (igual que AboutUs) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-darkgray/50 to-darkgray"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"></div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10"
      >
        {/* Project Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[.7fr_3.3fr] gap-8 items-start rounded-2xl overflow-hidden relative">

            {/* Left Column - Project Info */}
            <div
              className="lg:mt-[75px] lg:pr-8 flex flex-col h-full"
              style={{ height: '100%' }}
            >
              {/* Botón Volver a galería */}
              <motion.a
                href={`/${lang}/projects`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center mb-2 text-white/40 hover:text-accent-400 transition-colors text-base group"
                whileHover="hovered"
                variants={{ hovered: {} }}
              >
                <motion.span
                  className="mr-1 h-4 w-4 flex items-center"
                  variants={{ hovered: { x: -4 }, initial: { x: 0 } }}
                  initial="initial"
                  animate="initial"
                >
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </motion.span>
                <span>
                  {t('project.backToGallery')}
                </span>
              </motion.a>
              <h1 className="text-[5rem] leading-[1.1] font-semibold tracking-tight text-white font-kuunari-medium">
                {project.metadata.title}
              </h1>
              <p className="mt-4 text-2xl text-white/80 font-kuunari-light">
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
                    <dt className="text-white/60 font-kuunari-light text-lg">{t('project.client')}</dt>
                    <dd className="text-white font-kuunari-medium text-xl">{project.metadata.client}</dd>
                  </div>
                  <div>
                    <dt className="text-white/60 font-kuunari-light text-lg">{t('project.type')}</dt>
                    <dd className="text-white font-kuunari-medium text-xl">{project.metadata.buildingType}</dd>
                  </div>
                  <div>
                    <dt className="text-white/60 font-kuunari-light text-lg">{t('project.role')}</dt>
                    <dd className="text-white font-kuunari-medium text-xl">{project.metadata.role}</dd>
                  </div>
                  <div>
                    <dt className="text-white/60 font-kuunari-light text-lg">{t('project.date')}</dt>
                    <dd className="text-white font-kuunari-medium text-xl">{project.metadata.date}</dd>
                  </div>
                </dl>
              </motion.div>

              <motion.button
                onClick={() => setIsContactFormOpen(true)}
                className="mt-8 self-start px-4 py-2 border border-transparent text-sm font-kuunari-medium rounded-md text-darkgray bg-accent-500 hover:bg-accent-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
              >
                {t('project.start')}
              </motion.button>
            </div>

            {/* Right Column - Gallery */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="w-full h-full relative"
            >

              <div className="relative z-10">
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
                      onClick={e => {
                        const gal = document.querySelector('.image-gallery');
                        // Fallback: siempre agrega la clase fullscreen
                        if (gal) gal.classList.toggle('fullscreen');
                        // Intentar fullscreen nativo si está disponible
                        if (gal && gal.requestFullscreen) {
                          if (!document.fullscreenElement) {
                            gal.requestFullscreen();
                          } else {
                            document.exitFullscreen();
                          }
                        }
                        // Ejecutar el callback original por compatibilidad
                        if (onClick) onClick(e);
                      }}
                      aria-label="Toggle Fullscreen"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </button>
                  )}
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
            <h2 className="text-2xl font-kuunari-medium text-white mb-6">{t('project.related')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedProjects.map((relatedProject, index) => (
                <ProjectCard key={relatedProject.slug} project={relatedProject} index={index} withOverlay={true} lang={lang} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Navigation (debajo de 'También podría interesarte') */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex justify-between items-center border-t border-white/10 pt-8 mt-8"
        >
          <motion.a
            whileHover={{ x: -5 }}
            href={`/${lang}/projects/${prevProject ? prevProject.slug : projects[projects.length - 1].slug}`}
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
            <span className="font-kuunari-medium">{t('project.previous')}</span>
          </motion.a>

          <motion.a
            whileHover={{ x: 5 }}
            href={`/${lang}/projects/${nextProject ? nextProject.slug : projects[0].slug}`}
            className="group flex items-center text-white/60 hover:text-accent-500 transition-colors"
          >
            <span className="font-kuunari-medium">{t('project.next')}</span>
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
        lang={lang}
      />
      {/* Forzar scroll horizontal en thumbnails de react-image-gallery en mobile y aplicar estilos de scrollbar */}
      <style>{`
        /* Eliminar borders, box-shadow y padding en la galería para evitar micro-movimientos */
        .image-gallery-content,
        .image-gallery-slide-wrapper,
        .image-gallery-slides,
        .image-gallery-slide,
        .image-gallery-image {
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        .image-gallery-slides,
        .image-gallery-slide,
        .image-gallery-slide-wrapper {
          height: 100% !important;
          min-height: 100% !important;
          max-height: 100% !important;
        }
        /* Eliminar border y box-shadow de thumbnails activos */
        .image-gallery-thumbnail.active,
        .image-gallery-thumbnail.active .image-gallery-thumbnail-image {
          border: none !important;
          box-shadow: none !important;
        }
        /* Altura mínima para la imagen principal fuera de fullscreen */
        .image-gallery-slide-wrapper,
        .image-gallery-image {
          min-height: 400px !important;
          position: relative !important;
        }
        @media (min-width: 768px) {
          .image-gallery-slide-wrapper,
          .image-gallery-image {
            min-height: 600px !important;
          }
        }
        /* Botón fullscreen: posición fija en esquina inferior derecha, más abajo en fullscreen */
        .image-gallery-fullscreen-button {
          position: absolute !important;
          bottom: 1rem !important;
          right: 1rem !important;
          z-index: 20 !important;
          background: rgba(0,0,0,0.7) !important;
          border-radius: 4px !important;
          margin: 0 !important;
          opacity: 0.85;
          transition: bottom 0.3s, opacity 0.3s, all 0.3s ease !important;
          width: 40px !important;
          height: 40px !important;
          display: flex !important;
          align-items: center;
          justify-content: center;
          padding: 0 !important;
          overflow: visible !important;
        }
        .image-gallery.fullscreen .image-gallery-fullscreen-button,
        .image-gallery:fullscreen .image-gallery-fullscreen-button,
        .image-gallery:-webkit-full-screen .image-gallery-fullscreen-button {
          bottom: 1rem !important;
        }
        .image-gallery-fullscreen-button svg {
          width: 24px !important;
          height: 24px !important;
          color: #fff !important;
          stroke: #fff !important;
          fill: none !important;
          display: block !important;
        }
        .image-gallery-content:hover .image-gallery-fullscreen-button {
          opacity: 1;
        }
        .image-gallery-fullscreen-button:hover {
          background: #f9c461 !important;
        }
        .image-gallery-fullscreen-button:hover svg {
          color: #121212 !important;
          stroke: #121212 !important;
        }
        @media (max-width: 768px) {
          .image-gallery.fullscreen,
          .image-gallery.fullscreen .image-gallery-content,
          .image-gallery.fullscreen .image-gallery-swipe,
          .image-gallery.fullscreen .image-gallery-slide-wrapper,
          .image-gallery.fullscreen .image-gallery-slide,
          .image-gallery.fullscreen .image-gallery-image,
          .image-gallery.fullscreen .image-gallery-slide .image-gallery-image img {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            min-height: 100vh !important;
            max-height: 100vh !important;
            object-fit: contain !important;
            background: #121212 !important;
            z-index: 9999 !important;
          }
          body {
            overflow: hidden !important;
          }
        }
        /* FULLSCREEN: fuerza altura y object-fit en todos los modos de fullscreen */
        body .image-gallery.fullscreen,
        body .image-gallery.fullscreen .image-gallery-content,
        body .image-gallery.fullscreen .image-gallery-swipe,
        body .image-gallery.fullscreen .image-gallery-slide-wrapper,
        body .image-gallery.fullscreen .image-gallery-slide,
        body .image-gallery.fullscreen .image-gallery-image,
        body .image-gallery.fullscreen .image-gallery-slide .image-gallery-image img,
        body .image-gallery:fullscreen,
        body .image-gallery:fullscreen .image-gallery-content,
        body .image-gallery:fullscreen .image-gallery-swipe,
        body .image-gallery:fullscreen .image-gallery-slide-wrapper,
        body .image-gallery:fullscreen .image-gallery-slide,
        body .image-gallery:fullscreen .image-gallery-image,
        body .image-gallery:fullscreen .image-gallery-slide .image-gallery-image img,
        body .image-gallery:-webkit-full-screen,
        body .image-gallery:-webkit-full-screen .image-gallery-content,
        body .image-gallery:-webkit-full-screen .image-gallery-swipe,
        body .image-gallery:-webkit-full-screen .image-gallery-slide-wrapper,
        body .image-gallery:-webkit-full-screen .image-gallery-slide,
        body .image-gallery:-webkit-full-screen .image-gallery-image,
        body .image-gallery:-webkit-full-screen .image-gallery-slide .image-gallery-image img {
          height: 90vh !important;
          min-height: 90vh !important;
          max-height: 90vh !important;
          object-fit: contain !important;
          background: #121212 !important;
        }
        /* Botón salir de fullscreen */
        .custom-exit-fullscreen {
          display: none;
        }
        .image-gallery.fullscreen .custom-exit-fullscreen {
          display: block;
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 30;
          background: rgba(0,0,0,0.7);
          color: #fff;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          font-size: 1.5rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .image-gallery.fullscreen .custom-exit-fullscreen:hover {
          background: #f9c461;
          color: #121212;
        }
        /* --- REGLAS FINALES PARA FORZAR PRIORIDAD --- */
        @media (min-width: 768px) {
          .image-gallery-slide-wrapper,
          .image-gallery-slide,
          .image-gallery-image,
          .image-gallery-image img {
            height: 700px !important;
            min-height: 700px !important;
            max-height: 700px !important;
          }
        }
        /* Borde visible en los thumbnails */
        .image-gallery-thumbnail {
          border: 2px solid transparent !important;
          box-shadow: none !important;
          border-radius: 4px !important;
          overflow: hidden !important;
        }
        .image-gallery-thumbnail.active {
          border: 2px solid #f9c461 !important;
          box-shadow: none !important;
        }
        .image-gallery-thumbnail.active .image-gallery-thumbnail-image {
          border: none !important;
          box-shadow: none !important;
        }
          @media (max-width: 768px) {
          .image-gallery.fullscreen .image-gallery-thumbnails-wrapper,
          .image-gallery:fullscreen .image-gallery-thumbnails-wrapper,
          .image-gallery:-webkit-full-screen .image-gallery-thumbnails-wrapper {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            overflow-x: auto !important;
            overflow-y: hidden !important;
            -webkit-overflow-scrolling: touch;
            gap: 6px !important;
            padding: 0 8px !important;
            scrollbar-width: thin;
            scrollbar-color: #f9c461 #121212;
          }
          .image-gallery.fullscreen .image-gallery-thumbnails,
          .image-gallery:fullscreen .image-gallery-thumbnails,
          .image-gallery:-webkit-full-screen .image-gallery-thumbnails {
            flex-wrap: nowrap !important;
            min-width: max-content;
            justify-content: center !important;
            gap: 6px !important;
          }
          .image-gallery.fullscreen .image-gallery-thumbnail,
          .image-gallery:fullscreen .image-gallery-thumbnail,
          .image-gallery:-webkit-full-screen .image-gallery-thumbnail {
            width: 60px !important;
            height: 45px !important;
            min-width: 60px !important;
            min-height: 45px !important;
            max-width: 60px !important;
            max-height: 45px !important;
          }
          .image-gallery-thumbnails-wrapper::-webkit-scrollbar {
            height: 8px;
            background: #121212;
          }
          .image-gallery-thumbnails-wrapper::-webkit-scrollbar-thumb {
            background: #f9c461;
            border-radius: 10px;
          }
          .image-gallery-thumbnails-wrapper::-webkit-scrollbar-track {
            background: #121212;
            border-radius: 10px;
          }
        }
      `}</style>
      {/* Botón salir de fullscreen (solo visible en fullscreen) */}
      <button
        className="custom-exit-fullscreen"
        type="button"
        aria-label="Salir de pantalla completa"
        onClick={() => {
          // Intenta salir de fullscreen nativo
          if (document.fullscreenElement) {
            document.exitFullscreen();
          }
          // Quita la clase fullscreen de la galería si react-image-gallery la usa
          const gal = document.querySelector('.image-gallery.fullscreen');
          if (gal) gal.classList.remove('fullscreen');
        }}
      >
        ×
      </button>
    </main>
  );
} 