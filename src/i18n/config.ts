import { defineI18nConfig } from 'astro-i18n-aut/config';

export default defineI18nConfig({
  defaultLang: 'es',
  supportedLanguages: ['es', 'en'],
  showDefaultLang: false,
  translations: {
    es: {
      'hero.title': 'Export3d.',
      'hero.subtitle': 'Visualizá el futuro, construí el mañana.',
      'hero.description': 'Transformamos visiones en realidades arquitectónicas, fusionando innovación y precisión en cada proyecto.',
      'hero.service1': 'Visualización Arquitectónica',
      'hero.service2': 'Proyecto y Dirección de Obra',
      'hero.cta': 'Descubrí más'
    },
    en: {
      'hero.title': 'Export3d.',
      'hero.subtitle': 'Visualize the future, build tomorrow.',
      'hero.description': 'We transform visions into architectural realities, fusing innovation and precision in every project.',
      'hero.service1': 'Architectural Visualization',
      'hero.service2': 'Project and Construction Management',
      'hero.cta': 'Discover more'
    }
  }
}); 