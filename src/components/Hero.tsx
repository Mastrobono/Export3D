import { motion } from "framer-motion";
import { useTranslations } from "../i18n/utils";
import { ui } from "../i18n/ui";
import Container from "../layouts/Container";
import background from "../assets/background.webp";
import { useEffect, useRef, useState } from "react";
import { useLoader } from "./Loader";

interface HeroProps {
    lang: keyof typeof ui;
}

// Function to process text with highlighted words
function processHighlightedText(text: string, lang: keyof typeof ui) {
    const highlightedWords = ui[lang]["hero.highlighted"];
    let processedText = text;

    Object.entries(highlightedWords).forEach(([key, word]) => {
        const placeholder = `{${key}}`;
        const highlightedWord = `<span class="text-accent-500">${word}</span>`;
        processedText = processedText.replace(placeholder, highlightedWord);
    });

    return processedText;
}

export default function Hero({ lang }: HeroProps) {
    const t = useTranslations(lang);
    const subtitle = processHighlightedText(t("hero.subtitle") as string, lang);
    const heroContainerRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);



    useEffect(() => {
        const img = imgRef.current;
        if (!img) return;
        const handleLoad = () => {
            window.dispatchEvent(new CustomEvent("hero-image-loaded"));
        };
        img.addEventListener("load", handleLoad);
        if (img.complete) handleLoad();
        return () => img.removeEventListener("load", handleLoad);
    }, []);

    const handleScrollToAbout = () => {
        const servicesSection = document.getElementById("about");
        if (servicesSection) {
            const rect = servicesSection.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const offset = -120;
            window.scrollTo({
                top: rect.top + scrollTop + offset,
                behavior: "smooth",
            });
        }
    };

    return (
        <Container
            id="hero"
            classNames="mt-12 mb-12 relative max-w-7xl lg:max-w-8xl min-[1800px]:max-w-[1800px] rounded-md"
        >
            <div
                ref={heroContainerRef}
                id="hero-container"
                className="relative h-[90vh] overflow-hidden rounded-md"
            >
                {/* Background with effects */}
                <div className="absolute inset-0 z-0">
                    <div id="parallax-image" className="relative w-full h-full">
                        <img
                            ref={imgRef}
                            className="w-full h-full object-cover object-[center_65%] rounded-md"
                            src={background.src}
                            alt="Architectural visualization"
                            fetchPriority="high"
                        />
                    </div>

                    {/* Dark overlay with radial transparency */}
                    <div className="absolute inset-0 radial-dark-overlay"></div>
                    <div className="mobile-vertical-overlay"></div>

                    <div
                        className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-darkgray via-darkgray/80 to-transparent z-[5]"
                    >
                    </div>
                    {/* Overlay superior solo en mobile */}
                    <div
                        className="absolute top-0 left-0 right-0 h-80 z-20 pointer-events-none md:hidden"
                        style={{
                            background: `linear-gradient(
                                to bottom,
                                rgba(16,16,16,0.95) 0%,
                                rgba(16,16,16,0.7) 25%,
                                rgba(16,16,16,0.3) 50%,
                                rgba(10, 10, 10, 0.12) 80%,
                                rgba(8, 8, 8, 0.05) 90%,
                                rgba(0, 0, 0, 0) 100%
                            )`
                        }}
                    />
                    {/* Overlay inferior solo en mobile */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none"
                        style={{
                            background: `linear-gradient(
                                to top,
                                rgba(16,16,16,0.95) 0%,
                                rgba(16,16,16,0.85) 20%,
                                rgba(16,16,16,0.1) 35%,
                                rgba(16,16,16,0.0) 100%
                            )`
                        }}
                    />
                </div>

                {/* Main Content */}
                <main className="relative z-10 h-[90vh]">
                    {/* Content container for better mobile layout */}
                    <div className="absolute inset-0 flex flex-col lg:block w-full">
                        {/* Left-aligned content */}
                        <div className="relative min-[1130px]:absolute bottom-auto min-[1130px]:bottom-32 left-0 sm:left-4 min-[1130px]:left-12 px-6 min-[1130px]:px-0 text-left z-20 mt-16 min-[1130px]::mt-0">
                            {/* Main title */}
                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                className="text-[6rem] sm:text-[8rem] min-[1130px]:text-[12rem] text-white leading-[1] font-kuunari-bold tracking-[-6px] sm:tracking-[-10px] min-[1130px]:tracking-[-12px] drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)] main-title ml-[-6px] sm:ml-[-8px] relative overflow-visible"
                            >
                                <motion.span
                                    initial={{ opacity: 0, x: -100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                >
                                    Export
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0, y: -30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 1.2}}
                                    className="text-accent-500 inline-block"
                                >
                                    3d
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={ { opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 1.8 }}
                                    className="period"
                                >
                                    .
                                </motion.span>
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 2 }}
                                className="mt-6 text-[24px] sm:text-[28px] lg:text-[32px] tracking-[.7px] font-kuunari-light text-white/90 max-w-2xl subtitle-text mt-[-2px] min-[1130px]:mt-0"
                                dangerouslySetInnerHTML={{ __html: subtitle }}
                            />
                        </div>

                        {/* Right column with marketing text */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 2.2 }}
                            className="absolute bottom-10 min-[1130px]:bottom-32 left-0 sm:left-4 min-[1130px]:right-12 min-[1130px]:left-auto px-6 min-[1130px]:px-0 text-left min-[1130px]:text-right max-w-full lg:max-w-md marketing-text flex flex-col justify-start z-20 mt-12 lg:mt-0"
                        >
                            <div className="space-y-6">
                                <motion.p
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 2.4 }}
                                    className="text-[20px] sm:text-[24px] lg:text-[28px] leading-[1.1] font-kuunari-medium text-white/90"
                                >
                                    {t("hero.description")}
                                </motion.p>

                                <div className="space-y-4">
                                    <motion.div
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8, delay: 2.6 }}
                                        className="flex items-center min-[1130px]:justify-end gap-3"
                                    >
                                        <span className="text-accent-500 text-lg">01</span>
                                        <p className="text-white/60 text-lg">{t("hero.service1")}</p>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8, delay: 2.8 }}
                                        className="flex items-center min-[1130px]:justify-end gap-3"
                                    >
                                        <span className="text-accent-500 text-lg">02</span>
                                        <p className="text-white/60 text-lg">{t("hero.service2")}</p>
                                    </motion.div>
                                </div>

                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 3 }}
                                    whileHover={{ scale: 1.05 }}
                                    onClick={handleScrollToAbout}
                                    className="mt-8 inline-flex items-center gap-2 text-accent-500 hover:text-white transition-colors duration-300 group descubrimas-btn relative overflow-visible"
                                    type="button"
                                >
                                    <span className="text-base uppercase tracking-widest font-kuunari-regular relative z-10 pb-1">
                                        {t("hero.cta")}
                                    </span>
                                    <svg
                                        className="w-5 h-5 transform group-hover:translate-y-1 transition-transform rotate-90 relative z-10"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M5 12H19M19 12L12 5M19 12L12 19"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>
                                    </svg>
                                    {/* Animated underline */}
                                    <motion.span
                                        className="absolute left-0 right-0 bottom-[-2px] h-[2px] bg-accent-500 rounded origin-left"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 0.5, delay: 3.8, ease: 'easeInOut' }}
                                        style={{ zIndex: 1 }}
                                    />
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </main>
            </div>
        </Container>
    );
}