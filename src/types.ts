export interface Project {
    id: string;
    name: string;
    description: string;
    status: string;
    tags: string[];
    link_href: string;
    link_text: string;
    year_start?: number;
    year_end?: number;
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

  export interface TagConfig {
    background: string;
    text: string;
  }

  export interface ProjectTagsConfig {
    tags: {
      [key: string]: TagConfig;
    };
  }

  export interface StatusTagsConfig {
    statuses: {
      [key: string]: TagConfig;
    };
  }