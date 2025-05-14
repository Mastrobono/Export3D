import { useRef, useState, useEffect } from "react";
import Container from "../layouts/Container";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useTranslations } from "../i18n/utils";
import { ui } from "../i18n/ui";

interface Slide {
  image: {
    src: string;
  };
  metadata: {
    title: string;
    date: string;
    role: "Visualización Arquitectónica" | "Dirección de Obra";
    slug: string;
  };
}

interface FeatureProps {
  projects: Slide[];
  lang: string;
}

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-[30px]"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8.25 4.5 7.5 7.5-7.5 7.5"
      className="drop-shadow-lg stroke-[2.5px]"
    />
  </svg>
);

const Feature: React.FC<FeatureProps> = ({ projects, lang }) => {
  // Validar lang y usar fallback 'es' si es inválido
  const safeLang = lang === "en" || lang === "es" ? lang : "es";
  const featured = ui[safeLang] as any;

  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleDotClick = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    const element = slideRefs.current[index];
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      const currentIndex = slideRefs.current.findIndex((slide) => {
        if (!slide) return false;
        const rect = slide.getBoundingClientRect();
        return rect.top <= viewportCenter && rect.bottom >= viewportCenter;
      });
      if (currentIndex !== -1 && !isTransitioning) {
        setCurrentSlide(currentIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isTransitioning]);

  // Helper para mostrar fallback visual si falta la traducción
  const getLabel = (key: string, fallback: string) =>
    featured && featured[key] ? featured[key] : fallback;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-7xl md:max-w-8xl  min-[1800px]:max-w-[1800px] mx-auto py-12 my-12 bg-darkgray"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1]
          }
        }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-title-sm md:text-title-md  mb-16 font-semibold tracking-tight font-kuunari-medium text-white text-center"
      >
        {getLabel('featured.title', 'Proyectos Destacados')}
      </motion.h2>

      {projects.map((slide, index) => {
        const slideRef = useRef(null);
        const isLastSlide = index === projects.length - 1;
        const isFirstSlide = index === 0;

        return (
          <div key={index} data-section="featured" id="featured" className={`bg-transparent my-12 mx-auto rounded-md ${isLastSlide ? 'mb-0' : 'mb-8'} ${isFirstSlide ? 'mt-0' : 'mt-12'}`}>
            <motion.div
              ref={(el) => {
                slideRefs.current[index] = el;
                if (slideRef.current === null) {
                  // @ts-ignore
                  slideRef.current = el;
                }
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                  delay: 0.2 + index * 0.05,
                  ease: [0.25, 0.1, 0.25, 1]
                }
              }}
              viewport={{ once: true, margin: "-100px" }}
              className={`w-full relative rounded-md w-f overflow-hidden group h-[80vh] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.3)] transition-shadow duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)] ${isLastSlide ? 'mb-0' : 'mb-8'}`}
            >
              {/* Background Image */}
              <motion.div
                className="absolute inset-0 z-0 w-full h-full overflow-hidden group"
                initial={{ scale: 1.1, filter: "blur(6px) brightness(0.8)" }}
                whileInView={{
                  scale: 1,
                  filter: "blur(0px) brightness(1)",
                  transition: {
                    duration: 1.25,
                    ease: [0.25, 0.1, 0.25, 1],
                    filter: {
                      duration: 1.25,
                      ease: [0.25, 0.1, 0.25, 1]
                    }
                  }
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.02,
                  transition: {
                    duration: 0.8,
                    ease: [0.25, 0.1, 0.25, 1]
                  }
                }}
              >
                <motion.div
                  initial={{ scale: 1.1, filter: "blur(6px) brightness(0.8)" }}
                  whileInView={{
                    scale: 1,
                    filter: "blur(0px) brightness(1)",
                    transition: {
                      duration: 1.25,
                      ease: [0.25, 0.1, 0.25, 1],
                      filter: {
                        duration: 1.25,
                        ease: [0.25, 0.1, 0.25, 1]
                      }
                    }
                  }}
                  viewport={{ once: true }}
                  className="relative w-full h-full"
                >
                  <img
                    src={slide.image.src}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              </motion.div>

              {/* Enhanced edge vignette with hover effect */}
              <motion.div
                className="absolute inset-0 z-10 rounded-2xl pointer-events-none"
                initial={{ opacity: 0.7 }}
                whileHover={{
                  opacity: 0.5,
                  transition: { duration: 0.4 }
                }}
              >
                <div className="absolute inset-y-0 left-0 w-[20%] bg-gradient-to-r from-black/70 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-[20%] bg-gradient-to-l from-black/70 to-transparent"></div>
                <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-black/70 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
              </motion.div>

              {/* Content Container */}
              <motion.div
                className="relative z-20 h-full flex flex-col justify-between px-8 md:px-20 py-24 md:py-32"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {/* Top Content */}
                <div className="flex justify-between items-start">
                  <div className="space-y-2 drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.15 }}
                      className="text-xl md:text-xl text-white/90 font-kuunari-medium drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]"
                    >
                      {slide.metadata.date}
                    </motion.p>
                    <motion.h4
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-2xl md:text-2xl text-accent-500 font-kuunari-bold drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]"
                    >
                      {getLabel('featured.role.' + slide.metadata.role, slide.metadata.role)}
                    </motion.h4>
                  </div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    className="text-2xl md:text-3xl text-white font-kuunari-bold drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]"
                  >
                    0{index + 1} <span className="text-white/70 text-lg md:text-xl">/ 0{projects.length}</span>
                  </motion.p>
                </div>

                {/* Bottom Content */}
                <div className="space-y-6 md:space-y-8">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-[3.5rem] md:text-[5rem] text-white font-kuunari-bold leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                  >
                    {slide.metadata.title}
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex !mt-[12px]"
                  >
                    <a
                      href={`/${lang}/projects/${slide.metadata.slug}`}
                      className=" group/btn flex items-center gap-4 text-xl md:text-2xl text-white font-kuunari-medium drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)] group-hover:text-accent-500 hover:text-accent-500 transition-colors duration-300"
                    >
                      {getLabel('featured.seeProject', 'Ver Proyecto')}
                      <span className="text-inherit transition-transform duration-300 group-hover/btn:translate-x-2">
                        <ChevronRightIcon />
                      </span>
                    </a>
                  </motion.div>
                </div>
              </motion.div>

              {/* Navigation Dots */}
              <div className="absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 flex flex-col gap-3 md:gap-4 z-30">
                {projects.map((_, dotIndex) => (
                  <motion.button
                    key={dotIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: dotIndex * 0.1 }}
                    className="group relative flex items-center gap-2 md:gap-4"
                    onClick={() => handleDotClick(dotIndex)}
                  >
                    <div className="relative">
                      <div
                        className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${dotIndex === currentSlide
                            ? "bg-accent-500 shadow-[0_0_10px_rgba(255,102,0,0.5)]"
                            : "bg-white/30 hover:bg-white/50"
                          }`}
                      />
                      {dotIndex === currentSlide && (
                        <div className="absolute inset-0 rounded-full bg-accent-500 animate-ping opacity-50" />
                      )}
                    </div>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs md:text-sm whitespace-nowrap">
                      0{dotIndex + 1}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default Feature;
