import { ui, defaultLang, languages } from './ui';

export { languages };

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: string): string {
    const translation = ui[lang][key as keyof typeof ui[typeof defaultLang]];
    if (typeof translation === 'string') {
      return translation;
    }
    return ui[defaultLang][key as keyof typeof ui[typeof defaultLang]] as string || key;
  }
} 