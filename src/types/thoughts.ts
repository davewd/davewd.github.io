export interface Section {
  id: string;
  title: string;
  content: string;
  contentEncoded?: string;
  mediumUrl?: string;
  publishedDate?: string;
  readTime?: string;
}

export interface Thought {
  id: string;
  title: string;
  sections: Section[];
}

export interface ThoughtsData {
  thoughts: Thought[];
}
