import * as React from "react";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import logoTransparent from "../assets/logoTransparent.png";
import logo from "../assets/logo.png";
import { scrollToFn } from "../utils/utils.tsx";
import classNames from "classnames";
import ContactForm from "../components/ContactForm.tsx";
import LanguageSelector from "../components/LanguageSelector";
import { useTranslations } from '../i18n/utils';

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

interface NavbarProps {
  lang: 'es' | 'en';
}

export default function Navbar({ lang }: NavbarProps) {
  const [activeSection, setActiveSection] = React.useState("");
  const [isContactFormOpen, setIsContactFormOpen] = React.useState(false);
  const t = useTranslations(lang);

  //Navbar options
  const NavbarOptions = [
    { id: "about", label: t('nav.about') },
    { id: "featured", label: t('nav.featured') },
    { id: "all-projects", label: t('nav.allProjects') }
  ];

  const handleNavigation = (e: React.MouseEvent, sectionId: string) => {
    const currentPath = window.location.pathname;
    if (currentPath !== `/${lang}` && currentPath !== `/${lang}/`) {
      e.preventDefault();
      window.location.href = `/${lang}`;
      localStorage.setItem('scrollToSection', sectionId);
    } else {
      e.preventDefault();
      setActiveSection(sectionId);
      scrollToFn(e, sectionId);
    }
  };

  React.useEffect(() => {
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
        <nav className="fixed w-full top-0 z-50 bg-darkgray backdrop-blur-sm shadow-[0 0 6px 1px #020202]">
          <div className={classNames(
            "mx-auto max-w-7xl lg:max-w-8xl min-[1800px]:max-w-[1800px] px-0 min-2xl:px-20",
            {
              "bg-darkgray backdrop-blur-sm": open
            }
          )}>
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex-shrink-0">
                <a
                  href={`/${lang}`}
                  className="cursor-pointer"
                >
                  <div className="relative h-8 w-32 overflow-hidden">
                    <img
                      src={logoTransparent.src}
                      alt="Export3D Logo"
                      className="h-8 w-auto"
                    />
                  </div>
                </a>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden min-[1130px]:flex lg:items-center ">
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
                    onClick={() => setIsContactFormOpen(true)}
                    className="rounded-xl bg-accent-500 px-6 py-2 text-sm font-medium text-darkgray hover:bg-accent-400 transition-colors duration-200"
                  >
                    {t('nav.cta')}
                  </button>
                  <a
                    href={`/${lang}/projects`}
                    className="text-sm py-2 font-medium border-2 border-accent-white rounded-xl px-4 text-white hover:text-accent-400 hover:border-accent-400 hover:border-t-accent-400 hover:border-r-accent-400 transition-all duration-300"
                  >
                    {t('nav.gallery')}
                  </a>
                  <LanguageSelector lang={lang} />
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
          <Disclosure.Panel className="lg:hidden bg-darkgray backdrop-blur-sm shadow-[0 0 6px 1px #020202]">
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
                href={`/${lang}/projects`}
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:text-accent-400 cursor-pointer"
              >
                {t('nav.gallery')}
              </Disclosure.Button>
              <Disclosure.Button
                as="button"
                onClick={() => setIsContactFormOpen(true)}
                className="mt-4 mx-3 my-2  w-full rounded-xl bg-accent-500 px-6 py-2 text-base font-medium text-white hover:bg-accent-400 transition-colors duration-200"
              >
                {t('nav.cta')}
              </Disclosure.Button>
              <div className="mx-3 !mt-2">
                <LanguageSelector lang={lang} />
              </div>
            </div>
          </Disclosure.Panel>

          <ContactForm
            isOpen={isContactFormOpen}
            onClose={() => setIsContactFormOpen(false)}
            lang={lang}
          />
        </nav>
      )}
    </Disclosure>
  );
}
