declare module '*.json' {
  interface GalleryImage {
    original: string;
    thumbnail: string;
  }

  interface Galleries {
    [key: string]: GalleryImage[];
  }

  const value: Galleries;
  export default value;
} 