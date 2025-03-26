import { motion } from "framer-motion";
import Container from "../layouts/Container";

interface Service {
  title: string;
  description: string;
}

const services: Service[] = [
  {
    title: "Visualización Arquitectónica",
    description: "Transformamos ideas en experiencias visuales inmersivas, creando representaciones fotorrealistas que permiten visualizar proyectos antes de su construcción."
  },
  {
    title: "Proyecto y Dirección de Obra",
    description: "Desarrollamos proyectos integrales desde la concepción hasta la ejecución, garantizando la máxima calidad y eficiencia en cada fase del proceso constructivo."
  }
];

const AboutUs = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full py-20 bg-darkgray"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left Column */}
          <div className="space-y-8 md:space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-4"
            >
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-[4rem] font-semibold tracking-tight font-kuunari-medium text-accent-500"
              >
                Sobre Nosotros
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-xl text-white/90 leading-relaxed"
              >
                En <span className="text-accent-500">3D Export</span>, fusionamos la creatividad con la precisión técnica para dar vida a proyectos arquitectónicos excepcionales. Nuestro enfoque se centra en la excelencia y la innovación, ofreciendo soluciones integrales que superan las expectativas.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-4"
            >
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-2xl text-white font-kuunari-bold"
              >
                Nuestra Misión
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-lg text-white/80 leading-relaxed"
              >
                Transformar visiones arquitectónicas en realidades tangibles, combinando expertise técnico y creatividad para crear espacios que inspiren y perduren.
              </motion.p>
            </motion.div>
          </div>

          {/* Right Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8 md:space-y-12"
          >
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-2xl text-white font-kuunari-bold"
            >
              Servicios
            </motion.h3>
            <div className="space-y-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + (index * 0.1) }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="space-y-2"
                >
                  <motion.h4 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 + (index * 0.1) }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-xl text-accent-500 font-kuunari-bold"
                  >
                    {service.title}
                  </motion.h4>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 + (index * 0.1) }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-white/80 leading-relaxed"
                  >
                    {service.description}
                  </motion.p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
              <div className="space-y-4">
                <div className="text-accent-500 text-4xl font-kuunari-bold">+10</div>
                <div className="text-white/70 text-xl font-kuunari-light">Años de experiencia</div>
              </div>
              <div className="space-y-4">
                <div className="text-accent-500 text-4xl font-kuunari-bold">+200</div>
                <div className="text-white/70 text-xl font-kuunari-light">Proyectos realizados</div>
              </div>
              <div className="space-y-4">
                <div className="text-accent-500 text-4xl font-kuunari-bold">100%</div>
                <div className="text-white/70 text-xl font-kuunari-light">Clientes satisfechos</div>
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex justify-start mt-12"
            >
              <div className="overflow-visible">
                <a
                  href="/contact"
                  className="group relative inline-flex items-center gap-3 px-4 py-2"
                >
                  <span className="relative text-2xl text-accent-500 font-kuunari-medium">
                    Que tu proyecto sea el próximo
                    <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-accent-500 transition-all duration-300 group-hover:w-full group-hover:left-0"/>
                  </span>
                  <div className="overflow-hidden w-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-6 h-6 text-accent-500 transform transition-transform duration-300 ease-out group-hover:translate-x-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </div>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </motion.div>
  );
};

export default AboutUs; 