import { useState, useMemo } from 'react';
import type { Project } from '../data/data';
import { tags } from '../data/data';

interface FilterState {
  type: string[];
  date: string[];
  role: string[];
}

export function useProjectFilters(projects: Project[]) {
  const [filters, setFilters] = useState<FilterState>({
    type: [],
    date: [],
    role: [],
  });

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Si no hay filtros activos, mostrar todos los proyectos
      if (!filters.type.length && !filters.date.length && !filters.role.length) {
        return true;
      }

      // Verificar filtros de tipo
      if (filters.type.length > 0) {
        const hasMatchingType = project.metadata.tags?.some((tag) =>
          filters.type.includes(tag)
        );
        if (!hasMatchingType) return false;
      }

      // Verificar filtros de fecha
      if (filters.date.length > 0) {
        if (!filters.date.includes(project.metadata.date)) return false;
      }

      // Verificar filtros de rol
      if (filters.role.length > 0) {
        if (!filters.role.includes(project.metadata.role)) return false;
      }

      return true;
    });
  }, [projects, filters]);

  const toggleFilter = (category: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const currentFilters = prev[category];
      const newFilters = currentFilters.includes(value)
        ? currentFilters.filter((f) => f !== value)
        : [...currentFilters, value];

      return {
        ...prev,
        [category]: newFilters,
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      type: [],
      date: [],
      role: [],
    });
  };

  return {
    filters,
    filteredProjects,
    toggleFilter,
    clearFilters,
    availableTags: tags,
  };
} 