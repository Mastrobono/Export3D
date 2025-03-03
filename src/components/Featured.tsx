import { useRef, useState, useEffect } from "react";
import Container from "../layouts/Container";

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

  const handleDotClick = (index: number) => {
    slideRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
    setCurrentSlide(index);
  };


  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      const currentIndex = slideRefs.current.findIndex((slide) => {
        if (!slide) return false;
        const rect = slide.getBoundingClientRect();
        return rect.top <= viewportCenter && rect.bottom >= viewportCenter;
      });
      if (currentIndex !== -1) {
        setCurrentSlide(currentIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full py-20">
      <h2 className="text-[4rem] my-12 font-semibold tracking-tight font-kuunari-medium text-accent-500 text-center">
        Proyectos Destacados
      </h2>
      {projects.map((slide, index) => (
        <Container key={index} data-section="featured" id="featured">
          <div
            ref={(el) => {
              slideRefs.current[index] = el;
            }}
            className="w-full relative rounded-lg h-[90vh] "
          >
            <img
              src={slide.imageUrl}
              alt={`Slide ${index + 1}`}
              className="w-full h-[90vh] object-cover absolute z-0 rounded-lg"
            />

            {/* Overlay */}
            <div className="w-[100%] h-[100%] bg-gradientOverlayFeature absolute z-10 rounded-md"></div>

            {/* Date */}
            <p className="absolute top-[15%] left-[10%]  text-[1.5rem] text-slate-200 font-kuunari-bold text-shadow-sm shadow-black z-20 ">
              {slide.metadata.date}
            </p>

            {/* Social Medias */}
            <div className="absolute top-[80%] left-[10%]  text-[1.5rem] text-slate-200 font-kuunari-bold text-shadow-sm shadow-black z-20 flex flex-col gap-4">
              <div className="w-4 h-4 z-20 bg-white shadow-black shadow-lg rounded-lg"></div>
              <div className="w-4 h-4 z-20 bg-white shadow-black shadow-lg rounded-lg"></div>
              <div className="w-4 h-4 z-20 bg-white shadow-black shadow-lg rounded-lg"></div>
            </div>

            {/* Role */}
            <h4 className="absolute top-[15%] left-[20%] text-[1.6rem] text-slate-200 font-kuunari-bold text-shadow-sm shadow-black z-20 ">
              {slide.metadata.role}
            </h4>

            {/* Title */}
            <h2
              className="absolute top-[20%] left-[20%] text-[4.6rem]  text-slate-200 font-kuunari-bold text-shadow-default shadow-black z-20 "
              dangerouslySetInnerHTML={{
                __html: `Proyecto ${slide.metadata.title}`,
              }}
            ></h2>

            {/* See Project Button */}
            <h4 className="absolute top-[85%] left-[20%] uppercase text-[2rem] text-slate-200 font-kuunari-bold text-shadow-sm shadow-black z-20 flex flex-row justify-center items-center gap-2">
              Ver Proyecto <ChevronRightIcon />
            </h4>

            {/* Slide number count */}
            <p className="flex absolute top-[22.5%] left-[80%]  text-[3rem] text-slate-200 font-kuunari-bold text-shadow-sm shadow-black z-20 ">
              0{index + 1} /
              <span className="ml-2 text-[2rem]">0{projects.length}</span>
            </p>

            <div className="absolute top-1/2 right-5 transform -translate-y-1/2 flex flex-col gap-2  z-20">
              {projects.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ring-white shadow-[0 0 2px 1px black] ${
                    index === currentSlide ? "bg-white" : "bg-darkgray"
                  }`}
                  onClick={() => handleDotClick(index)}
                ></div>
              ))}
            </div>
          </div>
        </Container>
      ))}
    </div>
  );
};

export default Feature;
