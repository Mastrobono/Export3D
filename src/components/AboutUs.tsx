import { motion } from "framer-motion";
import Container from "../layouts/Container";
import { useTranslations } from "../i18n/utils";
import { ui } from "../i18n/ui";

interface AboutUsProps {
  lang: "es" | "en";
}

const AboutUs = ({ lang }: AboutUsProps) => {
  const t = useTranslations(lang);
  const services = ui[lang]["about.services"];

  return (
    <Container
      data-section="about"
      id="about"
      classNames="relative min-h-[max-content] overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-darkgray/50 to-darkgray"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"></div>
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 px-8 py-24 md:px-20 md:py-32"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left Column - Title */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1]
              }
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.6,
                  delay: 0.2
                }
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-white/50 text-xl font-kuunari-medium tracking-wider"
            >
              {t('about.title')}
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.6,
                  delay: 0.4
                }
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-title-sm md:text-title-md lg:text-title-lg leading-[1.1] font-semibold tracking-tight text-white font-kuunari-medium"
              dangerouslySetInnerHTML={{
                __html: t('about.heading')
                  .replace(t('about.headingHighlight'), `<span class=\"text-accent-500\">${t('about.headingHighlight')}</span>`)
                  .replace(/\n/g, '<br />')
              }}
            />
          </motion.div>

          {/* Right Column - Content */}
          <motion.div 
            className="space-y-12 lg:pt-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1]
              }
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.6,
                  delay: 0.2
                }
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-desc-sm md:text-desc-md lg:text-desc-lg leading-[1.4] text-white/90 font-kuunari-light"
              dangerouslySetInnerHTML={{
                __html: t('about.description1')
                  .replace('{visualization}', `<span class=\"font-kuunari-bold text-accent-500\">${services.visualization}</span>`)
                  .replace('{design}', `<span class=\"font-kuunari-bold text-accent-500\">${services.design}</span>`)
              }}
            />
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.6,
                  delay: 0.4
                }
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-desc-sm md:text-desc-md lg:text-desc-lg leading-[1.4] text-white/80 font-kuunari-light"
            >
              {t('about.description2')}
            </motion.p>

            {/* Stats Grid */}
            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-3 gap-8 pt-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.6,
                  delay: 0.3
                }
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.4
                  }
                }}
                viewport={{ once: true, amount: 0.3 }}
                className="space-y-4"
              >
                <div className="text-accent-500 text-4xl font-kuunari-bold">+10</div>
                <div className="text-white/70 text-xl font-kuunari-light">{t('about.stats.experience')}</div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.5
                  }
                }}
                viewport={{ once: true, amount: 0.3 }}
                className="space-y-4"
              >
                <div className="text-accent-500 text-4xl font-kuunari-bold">+200</div>
                <div className="text-white/70 text-xl font-kuunari-light">{t('about.stats.projects')}</div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.6
                  }
                }}
                viewport={{ once: true, amount: 0.3 }}
                className="space-y-4"
              >
                <div className="text-accent-500 text-4xl font-kuunari-bold">100%</div>
                <div className="text-white/70 text-xl font-kuunari-light">{t('about.stats.clients')}</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </Container>
  );
};

export default AboutUs; 