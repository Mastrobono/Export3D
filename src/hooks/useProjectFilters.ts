import { Project } from '../types/project';
import { useState, useMemo } from 'react';
import { getFilterTranslation } from '../constants/translations';

interface UseProjectFiltersResult {
  activeFilters: string[];
  filteredProjects: Project[];
  handleFilterChange: (filter: string) => void;
  resetFilters: () => void;
  getTranslatedFilter: (filter: string) => string;
}

export const useProjectFilters = (projects: Project[]) => {
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

  const getTranslatedFilter = (filter: string): string => {
    return getFilterTranslation(filter);
  };

  return {
    activeFilters,
    filteredProjects,
    handleFilterChange,
    resetFilters,
    getTranslatedFilter,
  };
}; 