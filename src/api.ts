import projectData from './sample_data/projects.json';
import { Project } from './types';

// Simulating API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchProjects = async (): Promise<Project[]> => {
  await delay(500);
  return projectData.projects;
};

export const getAllTags = (projects: Project[]): string[] => {
  const tagsSet = new Set<string>();
  projects.forEach(project => {
    project.tags.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};

export const getAllYears = (projects: Project[]): string[] => {
  const yearsSet = new Set<string>();
  projects.forEach(project => yearsSet.add(project.year));
  return Array.from(yearsSet).sort().reverse();
};

export const getAllStatuses = (projects: Project[]): string[] => {
  const statusSet = new Set<string>();
  projects.forEach(project => statusSet.add(project.status));
  return Array.from(statusSet).sort();
};