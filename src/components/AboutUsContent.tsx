import { motion } from "framer-motion";

export default function AboutUsContent() {
  return (
    <div className="relative z-10 px-20 py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Left Column - Title */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-white/50 text-xl font-kuunari-medium tracking-wider"
          >
            SOBRE NOSOTROS
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-[4.5rem] leading-[1.1] font-semibold tracking-tight text-white font-kuunari-medium"
          >
            Innovación<br />
            arquitectónica,<br />
            <span className="text-accent-500">inspirada por vos</span>
          </motion.h2>
        </div>

        {/* Right Column - Content */}
        <div className="space-y-12 lg:pt-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-[2rem] leading-[1.4] text-white/90 font-kuunari-light"
          >
            Somos un estudio especializado en <span className="font-kuunari-bold text-accent-500">
              Visualización Arquitectónica</span> y <span className="font-kuunari-bold text-accent-500">
              Diseño y Dirección de Obra</span>.
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-[2rem] leading-[1.4] text-white/80 font-kuunari-light"
          >
            Nos destacamos por la calidad excepcional de nuestras imágenes, tiempos de
            entrega eficientes y un firme compromiso con cada proyecto.
          </motion.p>

          {/* Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 lg:grid-cols-3 gap-8 pt-8"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-4"
            >
              <div className="text-accent-500 text-4xl font-kuunari-bold">+10</div>
              <div className="text-white/70 text-xl font-kuunari-light">Años de experiencia</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-4"
            >
              <div className="text-accent-500 text-4xl font-kuunari-bold">+200</div>
              <div className="text-white/70 text-xl font-kuunari-light">Proyectos realizados</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-4"
            >
              <div className="text-accent-500 text-4xl font-kuunari-bold">100%</div>
              <div className="text-white/70 text-xl font-kuunari-light">Clientes satisfechos</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 