import { Project } from '../types/project';
import { useState, useMemo } from 'react';
import { getFilterTranslation } from '../constants/translations';
import { useTranslations } from '../i18n/utils';

interface UseProjectFiltersResult {
  activeFilters: string[];
  filteredProjects: Project[];
  handleFilterChange: (filter: string) => void;
  resetFilters: () => void;
  getTranslatedFilter: (filter: string, lang: 'es' | 'en') => string;
}

export const useProjectFilters = (projects: Project[], lang: 'es' | 'en') => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Memoize filtered projects based on active filters
  const filteredProjects = useMemo(() => {
    if (activeFilters.length === 0) {
      return projects;
    }

    return projects.filter(project => {
      return activeFilters.some(filter => 
        project.metadata.buildingType === filter ||
        project.metadata.date === filter ||
        project.metadata.role === filter
      );
    });
  }, [projects, activeFilters]);

  const handleFilterChange = (filter: string) => {
    setActiveFilters(prev => {
      if (prev.includes(filter)) {
        return prev.filter(f => f !== filter);
      } else {
        return [...prev, filter];
      }
    });
  };

  const resetFilters = () => {
    setActiveFilters([]);
  };

  const getTranslatedFilter = (filter: string, lang: 'es' | 'en'): string => {
    const t = useTranslations(lang);
    // Try to use the translation key pattern as in ProjectsFilter
    // Try category keys first
    if (t(`filters.buildingType.${filter}`) !== `filters.buildingType.${filter}`) return t(`filters.buildingType.${filter}`);
    if (t(`filters.role.${filter}`) !== `filters.role.${filter}`) return t(`filters.role.${filter}`);
    if (t(`filters.date.${filter}`) !== `filters.date.${filter}`) return t(`filters.date.${filter}`);
    // Try category itself
    if (t(`filters.${filter}`) !== `filters.${filter}`) return t(`filters.${filter}`);
    // Fallback to original filter
    return filter;
  };

  return {
    activeFilters,
    filteredProjects,
    handleFilterChange,
    resetFilters,
    getTranslatedFilter,
  };
}; 