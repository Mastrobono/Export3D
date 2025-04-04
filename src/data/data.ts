import { slugify } from '../utils/slugify';
import type { Project } from '../types/project';

// Import images directly
import hutchImage from "../assets/features/hutch.webp";
import hausImage from "../assets/features/haus.webp";
import arceImage from "../assets/features/arce.webp";
import frisbeeImage from "../assets/features/frisbee.webp";

//Filters
// Define enums for tags
const TagType = {
  EXTERIOR: "Exterior",
  INTERIOR: "Interior",
  AEREO: "Aereo",
  PLANTA: "Planta",
};

const TagDate = {
  YEAR_2024: "2024",
  YEAR_2025: "2025",
};

const TagRole = {
  VISUALIZACION: "Visualización Arquitectónica",
  DIRECCION: "Dirección de Obra",
};

export const tags = {
  buildingType: ['Residencial', 'Comercial', 'Industrial', 'Institucional'],
  role: ['Visualización Arquitectónica', 'Diseño', 'Dirección de Obra'],
  date: ['2023', '2022', '2021'],
  status: ['Completado', 'En Progreso', 'Planificado']
};

// Projects
export const projects: Project[] = [
  {
    id: '1',
    slug: slugify('HUTCH'),
    image: hutchImage,
    gallery: [hutchImage],
    metadata: {
      title: "HUTCH",
      location: "Ciudad Jardin, Buenos Aires, Argentina",
      date: "2024",
      client: "HUTCH",
      role: "Visualización",
      buildingType: "Comercial",
      status: "Finalizado",
      featured: true,
      description: "Un espacio comercial moderno y versátil diseñado para maximizar la experiencia del cliente.",
      tags: ['comercial', 'moderno', 'versatil']
    }
  },
  {
    id: '3',
    slug: slugify('HAUS'),
    image: hausImage,
    gallery: [hausImage],
    metadata: {
      title: "HAUS",
      location: "Buenos Aires, Argentina",
      date: TagDate.YEAR_2025,
      client: "Steel Tech Group",
      role: TagRole.VISUALIZACION,
      buildingType: "Residencial",
      status: "En construcción",
      featured: true,
    },
  },
  {
    id: '4',
    slug: slugify('ARCE'),
    image: arceImage,
    gallery: [arceImage],
    metadata: {
      title: "ARCE",
      location: "Buenos Aires, Argentina",
      date: TagDate.YEAR_2024,
      client: "ARCE Construcciones",
      role: TagRole.VISUALIZACION,
      buildingType: "Residencial",
      status: "En construcción",
      featured: true,
    },
  },
  {
    id: '5',
    slug: slugify('Meat Frisbee'),
    image: frisbeeImage,
    gallery: [frisbeeImage],
    metadata: {
      title: "<br/> Meat Frisbee",
      location: "Buenos Aires, Argentina",
      date: TagDate.YEAR_2025,
      client: "Meat Frisbee",
      role: "Proyecto, Dirección y Ejecuución de Obra",
      buildingType: "Comercial",
      status: "Finalizado",
      featured: true,
    },
  },
  {
    id: '6',
    slug: slugify('HUTCH 2'),
    image: hutchImage,
    gallery: [hutchImage],
    metadata: {
      title: "HUTCH",
      location: "Ciudad Jardin, Buenos Aires, Argentina",
      date: TagDate.YEAR_2024,
      client: "HUTCH",
      role: TagRole.VISUALIZACION,
      buildingType: "Comercial",
      status: "Finalizado",
      featured: false,
    },
  },
  {
    id: '7',
    slug: slugify('HAUS 2'),
    image: hausImage,
    gallery: [hausImage],
    metadata: {
      title: "HAUS",
      location: "Buenos Aires, Argentina",
      date: TagDate.YEAR_2025,
      client: "Steel Tech Group",
      role: TagRole.VISUALIZACION,
      buildingType: "Residencial",
      status: "En construcción",
      featured: false,
    },
  },
  {
    id: '8',
    slug: slugify('ARCE 2'),
    image: arceImage,
    gallery: [arceImage],
    metadata: {
      title: "ARCE",
      location: "Buenos Aires, Argentina",
      date: TagDate.YEAR_2024,
      client: "ARCE Construcciones",
      role: TagRole.VISUALIZACION,
      buildingType: "Residencial",
      status: "En construcción",
      featured: false,
      tags: [TagType.INTERIOR],
    },
  },
  {
    id: '9',
    slug: slugify('Meat Frisbee 2'),
    image: frisbeeImage,
    gallery: [frisbeeImage],
    metadata: {
      title: "<br/> Meat Frisbee",
      location: "Buenos Aires, Argentina",
      date: TagDate.YEAR_2025,
      client: "Meat Frisbee",
      role: "Proyecto, Dirección y Ejecuución de Obra",
      buildingType: "Comercial",
      status: "Finalizado",
      featured: false,
      tags: [TagType.EXTERIOR],
    },
  },
];
