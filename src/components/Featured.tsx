import { useRef, useState, useEffect } from "react";
import Container from "../layouts/Container";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

interface Slide {
  imageRef: HTMLImageElement;
  imageUrl: string;
  metadata: {
    title: string;
    date: string;
    role: "Visualización Arquitectónica" | "Dirección de Obra";
  };
}

interface FeatureProps {
  projects: Slide[];
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

const Feature: React.FC<FeatureProps> = ({ projects }) => {
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleDotClick = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    slideRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full py-20 bg-darkgray"
    >
      <motion.h2 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-[4rem] my-12 font-semibold tracking-tight font-kuunari-medium text-accent-500 text-center"
      >
        Proyectos Destacados
      </motion.h2>

      {projects.map((slide, index) => {
        const slideRef = useRef(null);
        const { scrollYProgress } = useScroll({
          target: slideRef,
          offset: ["start end", "end start"]
        });

        const objectPosition = useTransform(
          scrollYProgress,
          [0, 1],
          ["center 40%", "center 100%"]
        );

        return (
          <Container key={index} data-section="featured" id="featured">
            <motion.div
              ref={(el) => {
                slideRefs.current[index] = el;
                if (slideRef.current === null) {
                  // @ts-ignore
                  slideRef.current = el;
                }
              }}
              className="w-full relative rounded-2xl w-f mb-8 overflow-hidden group h-[75vh]"
            >
              {/* Background Image with object-position parallax */}
              <motion.div
                className="absolute inset-0 z-0 h-full w-full"
              >
                <motion.img
                  src={slide.imageUrl}
                  alt={`Slide ${index + 1}`}
                  style={{
                    objectPosition
                  }}
                  className="w-full h-[120%] object-cover rounded-2xl transition-transform duration-700"
                />
              </motion.div>

              {/* Enhanced edge vignette with stronger opacity */}
              <div className="absolute inset-0 z-10 rounded-2xl">
                <div className="absolute inset-y-0 left-0 w-[20%] bg-gradient-to-r from-black/70 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-[20%] bg-gradient-to-l from-black/70 to-transparent"></div>
                <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-black/70 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
              </div>

              {/* Content Container */}
              <motion.div 
                className="relative z-20 h-full flex flex-col justify-between p-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Top Content */}
                <div className="flex justify-between items-start">
                  <div className="space-y-2 drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">
                    <motion.p 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="text-xl text-white/90 font-kuunari-medium"
                    >
                      {slide.metadata.date}
                    </motion.p>
                    <motion.h4 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-2xl text-accent-500 font-kuunari-bold"
                    >
                      {slide.metadata.role}
                    </motion.h4>
                  </div>

                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-3xl text-white font-kuunari-bold drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]"
                  >
                    0{index + 1} <span className="text-white/70 text-xl">/ 0{projects.length}</span>
                  </motion.p>
                </div>

                {/* Bottom Content */}
                <div className="space-y-8">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-[5rem] text-white font-kuunari-bold leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                  >
                    {slide.metadata.title}
                  </motion.h2>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-4 text-2xl text-white font-kuunari-medium group/button drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]"
                  >
                    Ver Proyecto
                    <span className="transform transition-transform duration-300 group-hover/button:translate-x-2">
                      <ChevronRightIcon />
                    </span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Navigation Dots */}
              <div className="absolute top-1/2 right-8 transform -translate-y-1/2 flex flex-col gap-4 z-30">
                {projects.map((_, dotIndex) => (
                  <motion.button
                    key={dotIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: dotIndex * 0.1 }}
                    className="group relative flex items-center gap-4"
                    onClick={() => handleDotClick(dotIndex)}
                  >
                    <div className="relative">
                      <div 
                        className={`w-4 h-4 rounded-full transition-all duration-300 ${
                          dotIndex === currentSlide 
                            ? "bg-accent-500 shadow-[0_0_10px_rgba(255,102,0,0.5)]" 
                            : "bg-white/30 hover:bg-white/50"
                        }`}
                      />
                      {dotIndex === currentSlide && (
                        <div className="absolute inset-0 rounded-full bg-accent-500 animate-ping opacity-50" />
                      )}
                    </div>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm whitespace-nowrap">
                      0{dotIndex + 1}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </Container>
        );
      })}
    </motion.div>
  );
};

export default Feature;
