import React, { useState, useEffect } from 'react';
import { Project, SortConfig, FilterConfig } from '../../types';
import { fetchProjects, getAllTags, getAllYears, getAllStatuses } from '../../api';
import ProjectsTable from './ProjectsTable';
import ProjectFilters from './ProjectFilters';

const ProjectsContainer: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'year',
    direction: 'desc'
  });
  const [filters, setFilters] = useState<FilterConfig>({
    search: '',
    status: [],
    tags: [],
    year: []
  });

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects');
        console.error('Error loading projects:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleSort = (key: keyof Project) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const filteredAndSortedProjects = React.useMemo(() => {
    let result = [...projects];

    // Apply filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(project =>
        project.name.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    if (filters.status.length > 0) {
      result = result.filter(project => filters.status.includes(project.status));
    }

    if (filters.tags.length > 0) {
      result = result.filter(project =>
        filters.tags.some(tag => project.tags.includes(tag))
      );
    }

    if (filters.year.length > 0) {
      result = result.filter(project => filters.year.includes(project.year));
    }

    // Apply sorting
    result.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [projects, sortConfig, filters]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-pulse text-gray-500">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <div>
      <ProjectFilters
        filters={filters}
        onFilterChange={setFilters}
        availableTags={getAllTags(projects)}
        availableYears={getAllYears(projects)}
        availableStatuses={getAllStatuses(projects)}
      />
      <ProjectsTable
        projects={filteredAndSortedProjects}
        sortConfig={sortConfig}
        onSort={handleSort}
      />
    </div>
  );
};

export default ProjectsContainer;