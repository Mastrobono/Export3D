import { readdirSync, statSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectsDir = join(__dirname, '../public/assets/projects');
const outputFile = join(__dirname, '../src/data/galleries.json');

const galleries = {};

readdirSync(projectsDir).forEach(slug => {
  const dir = join(projectsDir, slug);
  if (statSync(dir).isDirectory()) {
    const files = readdirSync(dir);
    
    // Primero buscar la imagen principal (gallery-0)
    const mainImage = files.find(f => f.endsWith('-gallery-0-full.webp'));
    const mainThumb = files.find(f => f.endsWith('-gallery-0-thumb.webp'));
    
    // Luego buscar el resto de las imágenes
    const otherImages = files
      .filter(f => f.endsWith('-full.webp') && !f.endsWith('-gallery-0-full.webp'))
      .map(f => {
        const idx = f.match(/gallery-(\d+)-full\.webp$/)?.[1] ?? '0';
        const thumbFile = `${slug}-gallery-${idx}-thumb.webp`;
        const fullPath = join(dir, f);
        const thumbPath = join(dir, thumbFile);
        
        if (existsSync(fullPath) && existsSync(thumbPath)) {
          return {
            original: `/assets/projects/${slug}/${f}`,
            thumbnail: `/assets/projects/${slug}/${thumbFile}`
          };
        }
        return null;
      })
      .filter(Boolean);

    // Si existe la imagen principal, agregarla primero
    if (mainImage && mainThumb) {
      galleries[slug] = [
        {
          original: `/assets/projects/${slug}/${mainImage}`,
          thumbnail: `/assets/projects/${slug}/${mainThumb}`
        },
        ...otherImages
      ];
    } else {
      galleries[slug] = otherImages;
    }
  }
});

writeFileSync(outputFile, JSON.stringify(galleries, null, 2));
console.log('Galerías generadas en', outputFile); 