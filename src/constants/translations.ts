export enum FilterTranslations {
  // Categories
  buildingType = 'Tipo de Construcción',
  role = 'Rol',
  date = 'Fecha',
  
  // Building types
  RESIDENTIAL = 'Residencial',
  COMMERCIAL = 'Comercial',
  INDUSTRIAL = 'Industrial',
  PUBLIC = 'Público',
  
  // Roles
  ARCHITECT = 'Arquitecto',
  DESIGNER = 'Diseñador',
  CONSULTANT = 'Consultor',
  
  // Dates (assuming these are years)
  YEAR_2023 = '2023',
  YEAR_2022 = '2022',
  YEAR_2021 = '2021',
  // Add more years as needed
}

export const getFilterTranslation = (filter: string): string => {
  // Handle year filters specially
  if (/^\d{4}$/.test(filter)) {
    return filter;
  }
  return FilterTranslations[filter as keyof typeof FilterTranslations] || filter;
}; 