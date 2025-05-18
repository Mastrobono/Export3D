import { motion } from 'framer-motion';
import { useTranslations } from '../i18n/utils';

interface BreadcrumbProps {
  lang: 'es' | 'en';
  currentPage?: string;
  isGallery?: boolean;
}

const Breadcrumb = ({ lang, currentPage, isGallery = false }: BreadcrumbProps) => {
  const t = useTranslations(lang);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-8"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <motion.a
            href={`/${lang}`}
            className="text-white/60 hover:text-accent-500 transition-colors"
            whileHover={{ x: -2 }}
          >
            {t('breadcrumb.home')}
          </motion.a>
        </li>
        <li className="flex items-center">
          <svg className="h-4 w-4 text-white/40" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          {isGallery ? (
            <span className="ml-2 text-white font-kuunari-medium">
              {t('breadcrumb.gallery')}
            </span>
          ) : (
            <motion.a
              href={`/${lang}/projects`}
              className="ml-2 text-white/60 hover:text-accent-500 transition-colors"
              whileHover={{ x: -2 }}
            >
              {t('breadcrumb.gallery')}
            </motion.a>
          )}
        </li>
        {currentPage && (
          <li className="flex items-center">
            <svg className="h-4 w-4 text-white/40" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="ml-2 text-white font-kuunari-medium">
              {currentPage}
            </span>
          </li>
        )}
      </ol>
    </motion.nav>
  );
};

export default Breadcrumb; 