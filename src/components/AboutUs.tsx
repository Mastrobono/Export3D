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
          </motion.div>
        </div>
      </Container>
    </motion.div>
  );
};

export default AboutUs; 