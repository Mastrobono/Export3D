import { useState, useEffect } from "react";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import logo from "../assets/logo.png";
import { scrollToFn } from "../utils/utils.tsx";
import classNames from "classnames";
import Container from "./Container.tsx";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");

  // Handle scroll event and current section
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection = "";
      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (
          window.scrollY >= sectionTop - 80 &&
          window.scrollY < sectionTop + sectionHeight - 80
        ) {
          currentSection = section.getAttribute("data-section");
          currentSection;
        }
        // Check if it's the last section and the scroll is at the bottom of the page
        if (
          index === sections.length - 1 &&
          window.innerHeight + window.scrollY >= document.body.offsetHeight
        ) {
          currentSection = section.getAttribute("data-section");
        }
      });
      setActiveSection(currentSection);
    };

    // Check scroll position on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //Navbar options
  const NavbarOptions = [
    { id: "services", label: "Servicios" },
    { id: "featured", label: "Proyectos Destacados" },
    { id: "preguntas-frecuentes", label: "All?" },
    { id: "contacto", label: "Contacto" },
  ];

  return (
    <Disclosure as="nav">
      {({ open }) => {
        const NavbarClasses = classNames(
          "fixed",
          "w-full",
          "top-0",
          "z-50",
          "px-20",
          "shadow-lg",
          { "bg-white": open },
          { "bg-darkgray": !open }
        );

        return (
          <nav className={NavbarClasses}>
            <div className="mx-auto max-w-8xl">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div
                    className="flex shrink-0 items-center flex-row gap-x-4  cursor-pointer group"
                    onClick={(e) => scrollToFn(e, "inicio")}
                  >
                    <a
                      className={classNames(" font-semibold hidden sm:block", {
                        "text-sky-50  group-hover:text-accent-500": !open,
                        "text-neutral-600": open,
                      })}
                    >
                      <img
                        alt="Export3D Logo"
                        src={logo.src}
                        className="h-8 w-auto"
                      />
                    </a>
                  </div>
                </div>
                <div className="hidden sm:ml-6 min-[1080px]:flex space-x-4   min-[1080px]:space-x-4 min-[1280px]:space-x-8">
                  {NavbarOptions.map((option) => (
                    <a
                      key={option.id}
                      onClick={(e) => scrollToFn(e, option.id)}
                      className={classNames(
                        "inline-flex items-center cursor-pointer  px-1 pt-1 md:text-[14px] lg:text-[16px] font-medium",
                        {
                          "text-sky-50  hover:text-accent-500":
                            activeSection != option.id,
                          "text-neutral-600 hover:text-accent-500":
                            activeSection != option.id,
                          "text-accent-500": activeSection == option.id,
                        }
                      )}
                    >
                      {option.label}
                    </a>
                  ))}
                </div>
                <div className="-mr-2 flex items-center min-[1080px]:hidden">
                  {/* Mobile menu button */}
                  <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:accent-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon
                      aria-hidden="true"
                      className="block h-6 w-6 group-data-[open]:hidden"
                    />
                    <XMarkIcon
                      aria-hidden="true"
                      className="hidden h-6 w-6 group-data-[open]:block"
                    />
                  </DisclosureButton>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="lg:hidden bg-white">
              <div className="space-y-1 pb-3 pt-2">
                {NavbarOptions.map((option) => (
                  <DisclosureButton
                    key={option.id}
                    as="a"
                    onClick={(e) => scrollToFn(e, option.id)}
                    className={classNames(
                      "block border-l-4 py-2 pl-3 pr-4 text-base font-medium",
                      {
                        "border-accent-500 text-accent-500":
                          activeSection === option.id,
                        "border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700":
                          activeSection !== option.id,
                      }
                    )}
                  >
                    {option.label}
                  </DisclosureButton>
                ))}
              </div>
              <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="flex items-center px-4">
                  <div>
                    <button
                      id="coordina-tu-consulta"
                      className="bg-accent-500 py-2 px-4 rounded-lg text-white"
                      data-astro-source-file="C:/Users/54115/Music/gabrielafuentes-landing/gabrielafuentes-landing/src/sections/Contact.astro"
                      data-astro-source-loc="66:12"
                    >
                      {" "}
                      <a
                        href="https://wa.link/gyupst"
                        data-astro-source-file="C:/Users/54115/Music/gabrielafuentes-landing/gabrielafuentes-landing/src/sections/Contact.astro"
                        data-astro-source-loc="67:46"
                      >
                        {" "}
                        Coordiná tu consulta{" "}
                      </a>{" "}
                    </button>
                  </div>
                  <button
                    type="button"
                    className="relative ml-auto shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:accent-500 focus:ring-offset-2"
                  >
                    <a>test</a>
                  </button>
                </div>
              </div>
            </Disclosure.Panel>
          </nav>
        );
      }}
    </Disclosure>
  );
}
