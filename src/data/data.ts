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
  type: TagType ? Object.values(TagType) : [],
  date: TagDate ? Object.values(TagDate) : [],
  role: TagRole ? Object.values(TagRole) : [],
};

// Projects
export const projects = [
  {
    image: hutchImage,
    metadata: {
      title: "HUTCH",
      location: "Ciudad Jardin, Buenos Aires, Argentina",
      date: TagDate.YEAR_2024,
      client: "HUTCH",
      role: TagRole.VISUALIZACION,
      buildingType: "Comercial",
      status: "Finalizado",
      featured: true,
    },
  },
  {
    image: hausImage,
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
    image: arceImage,
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
    image: frisbeeImage,
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
    image: hutchImage,
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
    image: hausImage,
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
    image: arceImage,
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
    image: frisbeeImage,
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
