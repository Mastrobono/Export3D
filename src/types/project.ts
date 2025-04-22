import { ImageMetadata } from 'astro';

export interface Project {
  id: string;
  slug: string;
  image: ImageMetadata;
  gallery?: ImageMetadata[];
  metadata: {
    title: string;
    location: string;
    date: string;
    client: string;
    role: string;
    buildingType: string;
    featured: boolean;
    tags?: string[];
    description?: string;
  };
} 