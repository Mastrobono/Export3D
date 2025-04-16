import { useState, useEffect } from "react";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import logoTransparent from "../assets/logoTransparent.png";
import logo from "../assets/logo.png";
import { scrollToFn } from "../utils/utils.tsx";
import classNames from "classnames";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");

  // Handle scroll event and current section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroSection = document.getElementById("hero");

      const sections = document.querySelectorAll("[data-section]");
      let currentSection = activeSection; // Mantener la sección actual por defecto

      // Si estamos en la parte superior de la página, forzamos la sección hero
      if (scrollPosition < 100) {
        currentSection = "hero";
      } else {
        sections.forEach((section) => {
          const sectionElement = section as HTMLElement;
          const sectionTop = sectionElement.offsetTop;
          const sectionHeight = sectionElement.offsetHeight;
          if (
            window.scrollY >= sectionTop - 80 &&
            window.scrollY < sectionTop + sectionHeight - 80
          ) {
            currentSection = sectionElement.getAttribute("data-section") || "";
          }
        });
      }

      // Solo actualizamos si encontramos una sección válida
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  //Navbar options
  const NavbarOptions = [
    { id: "about", label: "Sobre Nosotros" },
    { id: "featured", label: "Proyectos Destacados" },
    { id: "all-projects", label: "Todos los Proyectos" }
  ];

  const handleNavigation = (e: React.MouseEvent, sectionId: string) => {
    const currentPath = window.location.pathname;

    if (currentPath !== '/') {
      e.preventDefault();
      window.location.href = '/';
      localStorage.setItem('scrollToSection', sectionId);
    } else {
      e.preventDefault();
      setActiveSection(sectionId);
      scrollToFn(e, sectionId);
    }
  };

  // Efecto para manejar el scroll después de la redirección
  useEffect(() => {
    const sectionToScroll = localStorage.getItem('scrollToSection');
    if (sectionToScroll) {
      const element = document.getElementById(sectionToScroll);
      if (element) {
        setActiveSection(sectionToScroll);
        element.scrollIntoView({ behavior: 'smooth' });
        localStorage.removeItem('scrollToSection');
      }
    }
  }, []);

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <nav className="fixed w-full top-0 z-50 bg-darkgray/95 backdrop-blur-sm">
          <div className={classNames(
            "mx-auto max-w-7xl lg:max-w-8xl px-0 min-2xl:px-20",
            {
              "bg-darkgray/95 backdrop-blur-sm": open
            }
          )}>
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex-shrink-0">
                <a
                  href="/"
                  onClick={(e) => handleNavigation(e, "hero")}
                  className="cursor-pointer"
                >
                  <div className="relative h-8 w-32 overflow-hidden">
                    <img
                      src={logo.src}
                      alt="Export3D Logo"
                      className={`absolute inset-0 h-8 w-auto transition-all ease-[cubic-bezier(0.4,0,0.2,1)] [transition-duration:500ms] ${activeSection === "hero"
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-[-15px]'
                        }`}
                    />
                    <img
                      src={logoTransparent.src}
                      alt="Export3D Logo"
                      className={`absolute inset-0 h-8 w-auto transition-all ease-[cubic-bezier(0.4,0,0.2,1)] [transition-duration:500ms] ${activeSection === "hero"
                          ? 'opacity-0 translate-y-[15px]'
                          : 'opacity-100 translate-y-0'
                        }`}
                    />
                  </div>
                </a>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden min-[1130px]:flex lg:items-center">
                <div className="flex items-center gap-x-8">
                  {NavbarOptions.map((option) => (
                    <a
                      key={option.id}
                      onClick={(e) => handleNavigation(e, option.id)}
                      className={classNames(
                        "cursor-pointer py-2 text-sm font-medium transition-colors duration-200 relative",
                        {
                          "text-white hover:text-accent-400": activeSection !== option.id,
                          "text-accent-500": activeSection === option.id,
                        }
                      )}
                    >
                      {option.label}
                      {activeSection === option.id && (
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-400"></span>
                      )}
                    </a>
                  ))}
                </div>
                <div className="ml-8 flex items-center gap-x-4 border-l border-gray-700 pl-8">

                  <button
                    onClick={(e) => scrollToFn(e, "cta")}
                    className="rounded-xl bg-accent-500 px-6 py-2 text-sm font-medium text-white hover:bg-accent-400 transition-colors duration-200"
                  >
                    Iniciar Proyecto
                  </button>
                  <a
                    href="/projects"
                    className="text-sm py-2 font-medium border-2 border-accent-white rounded-xl px-4 text-white hover:text-accent-400 hover:border-accent-400 transition-colors duration-200"
                  >
                    Galería
                  </a>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="flex min-[1130px]:hidden">
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-white focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

          {/* Mobile menu panel */}
          <Disclosure.Panel className="lg:hidden bg-darkgray/95 backdrop-blur-sm shadow-lg">
            <div className="space-y-1 px-4 pb-3 pt-2">
              {NavbarOptions.map((option) => (
                <Disclosure.Button
                  key={option.id}
                  as="a"
                  onClick={(e) => handleNavigation(e, option.id)}
                  className={classNames(
                    "block rounded-md px-3 py-2 text-base font-medium cursor-pointer relative",
                    {
                      "text-white hover:text-accent-400": activeSection !== option.id,
                      "text-accent-500": activeSection === option.id,
                    }
                  )}
                >
                  {option.label}
                  {activeSection === option.id && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-accent-400"></span>
                  )}
                </Disclosure.Button>
              ))}
              <Disclosure.Button
                as="a"
                href="/projects"
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:text-accent-400 cursor-pointer"
              >
                Galería
              </Disclosure.Button>
              <Disclosure.Button
                as="button"
                onClick={(e) => scrollToFn(e, "cta")}
                className="mt-4 w-full rounded-xl bg-accent-500 px-6 py-2 text-base font-medium text-white hover:bg-accent-400 transition-colors duration-200"
              >
                Iniciar Proyecto
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </nav>
      )}
    </Disclosure>
  );
}
