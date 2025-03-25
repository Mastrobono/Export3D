import { useState, useEffect } from "react";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import logo from "../assets/logo.png";
import { scrollToFn } from "../utils/utils.tsx";
import classNames from "classnames";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");

  // Handle scroll event and current section
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section]");
      let currentSection = "";
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
      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //Navbar options
  const NavbarOptions = [
    { id: "about", label: "About Us" },
    { id: "services", label: "Services" },
    { id: "featured", label: "Featured Projects" },
    { id: "all-projects", label: "All Projects" }
  ];

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <nav className="fixed w-full top-0 z-50 bg-darkgray/95 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex-shrink-0">
                <div
                  className="cursor-pointer"
                  onClick={(e) => scrollToFn(e, "hero")}
                >
                  <img
                    src={logo.src}
                    alt="Export3D Logo"
                    className="h-8 w-auto"
                  />
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex lg:items-center lg:gap-x-8">
                {NavbarOptions.map((option) => (
                  <a
                    key={option.id}
                    onClick={(e) => scrollToFn(e, option.id)}
                    className={classNames(
                      "cursor-pointer px-3 py-2 text-sm font-medium transition-colors duration-200",
                      {
                        "text-white hover:text-accent-400": activeSection !== option.id,
                        "text-accent-500": activeSection === option.id,
                      }
                    )}
                  >
                    {option.label}
                  </a>
                ))}
                <button
                  onClick={(e) => scrollToFn(e, "cta")}
                  className="ml-4 rounded-full bg-accent-500 px-6 py-2 text-sm font-medium text-white hover:bg-accent-400 transition-colors duration-200"
                >
                  Iniciar Proyecto
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="flex lg:hidden">
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-white hover:text-accent-500 focus:outline-none">
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
          <Disclosure.Panel className="lg:hidden bg-darkgray/95 backdrop-blur-sm">
            <div className="space-y-1 px-4 pb-3 pt-2">
              {NavbarOptions.map((option) => (
                <Disclosure.Button
                  key={option.id}
                  as="a"
                  onClick={(e) => scrollToFn(e, option.id)}
                  className={classNames(
                    "block rounded-md px-3 py-2 text-base font-medium cursor-pointer",
                    {
                      "text-white hover:bg-accent-500/10 hover:text-accent-500":
                        activeSection !== option.id,
                      "bg-accent-500/10 text-accent-500": activeSection === option.id,
                    }
                  )}
                >
                  {option.label}
                </Disclosure.Button>
              ))}
              <Disclosure.Button
                as="button"
                onClick={(e) => scrollToFn(e, "cta")}
                className="mt-4 w-full rounded-full bg-accent-500 px-6 py-2 text-base font-medium text-white hover:bg-accent-400 transition-colors duration-200"
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
