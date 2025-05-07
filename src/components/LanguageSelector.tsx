import * as React from "react";
import { useTranslations } from '../i18n/utils';

interface LanguageSelectorProps {
  lang: 'es' | 'en';
}

export default function LanguageSelector({ lang }: LanguageSelectorProps) {
  const t = useTranslations(lang);

  const handleLanguageChange = (newLang: 'es' | 'en') => {
    if (newLang === lang) return;
    
    // Obtener la ruta actual
    const currentPath = window.location.pathname;
    // Remover el prefijo del idioma actual
    const pathWithoutLang = currentPath.replace(`/${lang}`, '');
    // Construir la nueva URL con el nuevo idioma
    const newPath = `/${newLang}${pathWithoutLang}`;
    
    // Hacer un redirect completo
    window.location.href = newPath;
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleLanguageChange('es')}
        className={`text-sm font-medium transition-colors duration-200 ${
          lang === 'es' ? 'text-accent-500' : 'text-white/60 hover:text-white'
        }`}
      >
        ES
      </button>
      <span className="text-white/20">|</span>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`text-sm font-medium transition-colors duration-200 ${
          lang === 'en' ? 'text-accent-500' : 'text-white/60 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
} 