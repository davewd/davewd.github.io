export interface Project {
    id: string;
    name: string;
    description: string;
    status: string;
    year: string;
    tags: string[];
  }
  
  export interface SortConfig {
    key: keyof Project;
    direction: 'asc' | 'desc';
  }
  
  export interface FilterConfig {
    search: string;
    status: string[];
    tags: string[];
    year: string[];
  }