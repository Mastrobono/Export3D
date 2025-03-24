import { useState, useCallback, useMemo } from 'react';
import { Project } from '../types/project';

interface FilterState {
  activeFilters: string[];
  filteredProjects: Project[];
}

export const useProjectFilters = (projects: Project[]) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Memoize filtered projects based on active filters
  const filteredProjects = useMemo(() => {
    if (activeFilters.length === 0) {
      return projects;
    }

    return projects.filter(project => {
      return activeFilters.some(filter => {
        return (
          project.type === filter ||
          project.date === filter ||
          project.role === filter ||
          (project.tags && project.tags.some(tag => tag === filter))
        );
      });
    });
  }, [projects, activeFilters]);

  const handleFilterChange = useCallback((filter: string) => {
    setActiveFilters(prev => {
      return prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter];
    });
  }, []);

  const resetFilters = useCallback(() => {
    setActiveFilters([]);
  }, []);

  return {
    activeFilters,
    filteredProjects,
    handleFilterChange,
    resetFilters
  };
}; 