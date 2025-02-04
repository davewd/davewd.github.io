export interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  year_start: number | null;
  year_end: number | null;
  tags: string[];
  links?: {
    href: string;
    text: string;
  }[];
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

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  company: string;
  companyColor: string;
  companyLogo: string;
  location: string;
  tags: string[];
  href?: string;
  ogImage?: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  company: string;
  companyColor: string;
  companyLogo: string;
  location: string;
  tags: string[];
  href?: string;
  ogImage?: string;
}