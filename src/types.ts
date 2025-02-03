export interface Project {
    id: string;
    name: string;
    description: string;
    status: string;
    tags: string[];
    link_href: string;
    link_text: string;
  }
  
  export interface SortConfig {
    key: keyof Project;
    direction: 'asc' | 'desc';
  }
  
  export interface FilterConfig {
    search: string;
    status: string[];
    tags: string[];
  }