import { readdirSync, statSync, writeFileSync } from 'fs';
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
    const gallery = files
      .filter(f => f.endsWith('-full.webp'))
      .map(f => {
        const idx = f.match(/gallery-(\d+)-full\.webp$/)?.[1] ?? '0';
        return {
          original: `/assets/projects/${slug}/${f}`,
          thumbnail: `/assets/projects/${slug}/${slug}-gallery-${idx}-thumb.webp`
        };
      });
    galleries[slug] = gallery;
  }
});

writeFileSync(outputFile, JSON.stringify(galleries, null, 2));
console.log('Galerías generadas en', outputFile); 