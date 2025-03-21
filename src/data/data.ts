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

export interface Project {
  imageRef: any; // Using any for ImageMetadata type
  imageUrl: string;
  metadata: {
    title: string;
    tags?: string[];
    location?: string;
    client?: string;
    date?: string;
    role?: string;
    buildingType?: string;
    status?: string;
    featured?: boolean;
  };
}

// Projects
export const projects: Project[] = [
  {
    imageRef: hutchImage,
    imageUrl: hutchImage.src,
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
    imageRef: hausImage,
    imageUrl: hausImage.src,
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
    imageRef: arceImage,
    imageUrl: arceImage.src,
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
    imageRef: frisbeeImage,
    imageUrl: frisbeeImage.src,
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
    imageRef: hutchImage,
    imageUrl: hutchImage.src,
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
    imageRef: hausImage,
    imageUrl: hausImage.src,
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
    imageRef: arceImage,
    imageUrl: arceImage.src,
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
    imageRef: frisbeeImage,
    imageUrl: frisbeeImage.src,
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
