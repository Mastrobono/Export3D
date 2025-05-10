import { slugify } from '../utils/slugify';
import type { Project } from '../types/project';
import * as path from 'path';
import * as fs from 'fs';
import type { ImageMetadata } from 'astro';
import galleries from './galleries.json';

// Import images directly
import hutchImage from "../assets/features/hutch.webp";
import hausImage from "../assets/features/haus.webp";
import arceImage from "../assets/features/arce.webp";
import frisbeeImage from "../assets/features/frisbee.webp";

// Define enums for project metadata
export enum BuildingType {
  RESIDENCIAL = "Residencial",
  COMERCIAL = "Comercial",
  INDUSTRIAL = "Industrial",
  INSTITUCIONAL = "Institucional"
}

export enum ProjectRole {
  VISUALIZACION = "Visualización Arquitectónica",
  PROYECTO_DIRECCION = "Proyecto y Dirección de Obra"
}

export enum ProjectDate {
  YEAR_2023 = "2023",
  YEAR_2024 = "2024",
  YEAR_2025 = "2025"
}

// Export tags object for filter components
export const tags = {
  buildingType: Object.values(BuildingType),
  role: Object.values(ProjectRole),
  date: Object.values(ProjectDate)
};

// Projects
export const projects: Project[] = [
  {
    id: '1',
    slug: slugify('HUTCH'),
    image: hutchImage,
    gallery: galleries[slugify('HUTCH')] || [],
    metadata: {
      title: "HUTCH",
      location: "Ciudad Jardin, Buenos Aires, Argentina",
      date: ProjectDate.YEAR_2024,
      client: "HUTCH",
      role: ProjectRole.VISUALIZACION,
      buildingType: BuildingType.COMERCIAL,
      featured: true
    }
  },
  {
    id: '3',
    slug: slugify('HAUS'),
    image: hausImage,
    gallery: galleries[slugify('HAUS')] || [],
    metadata: {
      title: "HAUS",
      location: "Buenos Aires, Argentina",
      date: ProjectDate.YEAR_2025,
      client: "Steel Tech Group",
      role: ProjectRole.VISUALIZACION,
      buildingType: BuildingType.RESIDENCIAL,
      featured: true
    }
  },
  {
    id: '4',
    slug: slugify('ARCE'),
    image: arceImage,
    gallery: galleries[slugify('ARCE')] || [],
    metadata: {
      title: "ARCE",
      location: "Buenos Aires, Argentina",
      date: ProjectDate.YEAR_2024,
      client: "ARCE Construcciones",
      role: ProjectRole.VISUALIZACION,
      buildingType: BuildingType.RESIDENCIAL,
      featured: true
    }
  },
  {
    id: '5',
    slug: slugify('Meat Frisbee'),
    image: frisbeeImage,
    gallery: galleries[slugify('Meat Frisbee')] || [],
    metadata: {
      title: "Meat Frisbee",
      location: "Buenos Aires, Argentina",
      date: ProjectDate.YEAR_2025,
      client: "Meat Frisbee",
      role: ProjectRole.PROYECTO_DIRECCION,
      buildingType: BuildingType.COMERCIAL,
      featured: true
    }
  },
  // Nuevos proyectos
  {
    id: '6',
    slug: slugify('San Isidro'),
    image: hutchImage, // Temporalmente usando una imagen existente
    gallery: [],
    metadata: {
      title: "San Isidro",
      location: "San Isidro, Buenos Aires, Argentina",
      date: ProjectDate.YEAR_2024,
      client: "Degacor",
      role: ProjectRole.VISUALIZACION,
      buildingType: BuildingType.RESIDENCIAL,
      featured: false
    }
  },
  {
    id: '7',
    slug: slugify('CF Moto'),
    image: hutchImage,
    gallery: [],
    metadata: {
      title: "CF Moto",
      location: "CABA, Buenos Aires, Argentina",
      date: ProjectDate.YEAR_2023,
      client: "CF Motos",
      role: ProjectRole.VISUALIZACION,
      buildingType: BuildingType.COMERCIAL,
      featured: false
    }
  },
  {
    id: '8',
    slug: slugify('Tuzzi'),
    image: hutchImage,
    gallery: [],
    metadata: {
      title: "Tuzzi",
      location: "Buenos Aires, Argentina",
      date: ProjectDate.YEAR_2023,
      client: "Tuzzi",
      role: ProjectRole.VISUALIZACION,
      buildingType: BuildingType.RESIDENCIAL,
      featured: false
    }
  },
  {
    id: '9',
    slug: slugify('MO'),
    image: hutchImage,
    gallery: [],
    metadata: {
      title: "MO",
      location: "Buenos Aires, Argentina",
      date: ProjectDate.YEAR_2023,
      client: "MO",
      role: ProjectRole.VISUALIZACION,
      buildingType: BuildingType.RESIDENCIAL,
      featured: false
    }
  },
  {
    id: '10',
    slug: slugify('Hold'),
    image: hutchImage,
    gallery: [],
    metadata: {
      title: "Hold",
      location: "CABA, Buenos Aires, Argentina",
      date: ProjectDate.YEAR_2024,
      client: "HOLD",
      role: ProjectRole.VISUALIZACION,
      buildingType: BuildingType.RESIDENCIAL,
      featured: false
    }
  },
  {
    id: '11',
    slug: slugify('Erza'),
    image: hutchImage,
    gallery: [],
    metadata: {
      title: "Erza",
      location: "Malaga, España",
      date: ProjectDate.YEAR_2024,
      client: "ERZA",
      role: ProjectRole.VISUALIZACION,
      buildingType: BuildingType.RESIDENCIAL,
      featured: false
    }
  },
  {
    id: '12',
    slug: slugify('Castelli'),
    image: hutchImage,
    gallery: [],
    metadata: {
      title: "Castelli",
      location: "Tandil, Buenos Aires, Argentina",
      date: ProjectDate.YEAR_2025,
      client: "Castelli",
      role: ProjectRole.VISUALIZACION,
      buildingType: BuildingType.RESIDENCIAL,
      featured: false
    }
  },
  {
    id: '13',
    slug: slugify('Avellaneda'),
    image: hutchImage,
    gallery: [],
    metadata: {
      title: "Avellaneda",
      location: "Buenos Aires, Argentina",
      date: ProjectDate.YEAR_2023,
      client: "MOT Estudio",
      role: ProjectRole.VISUALIZACION,
      buildingType: BuildingType.RESIDENCIAL,
      featured: false
    }
  },
  {
    id: '14',
    slug: slugify('Alco'),
    image: hutchImage,
    gallery: [],
    metadata: {
      title: "Alco",
      location: "Buenos Aires, Argentina",
      date: ProjectDate.YEAR_2025,
      client: "Alco",
      role: ProjectRole.VISUALIZACION,
      buildingType: BuildingType.COMERCIAL,
      featured: false
    }
  },
  {
    id: '15',
    slug: slugify('Fernandez'),
    image: hutchImage,
    gallery: [],
    metadata: {
      title: "Fernandez",
      location: "Buenos Aires, Argentina",
      date: ProjectDate.YEAR_2023,
      client: "Liliana Fernandez",
      role: ProjectRole.VISUALIZACION,
      buildingType: BuildingType.RESIDENCIAL,
      featured: false
    }
  }
].map(project => ({
  ...project,
  gallery: galleries[project.slug] || []
}));
