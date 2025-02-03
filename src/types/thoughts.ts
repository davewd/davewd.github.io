export interface Section {
  id: string;
  title: string;
  content: string;
}

export interface Thought {
  id: string;
  title: string;
  sections: Section[];
}

export interface ThoughtsData {
  thoughts: Thought[];
}
