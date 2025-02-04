import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Project, SortConfig, FilterConfig } from '../../types';
import { fetchProjects, getAllTags, getAllStatuses } from '../../api';
import ProjectsTable from './ProjectsTable';
import ProjectFilters from './ProjectFilters';

const ProjectsContainer: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Memoize sortConfig to prevent unnecessary re-renders
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: (searchParams.get('sortKey') as keyof Project) || 'year',
    direction: (searchParams.get('sortDirection') as 'asc' | 'desc') || 'desc'
  } as SortConfig);

  // Memoize filters to prevent unnecessary re-renders
  const filters = useMemo((): FilterConfig => ({
    search: searchParams.get('search') || '',
    status: searchParams.getAll('status'),
    tags: searchParams.getAll('tags')
  }), [searchParams]);

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
    setSortConfig(prev => {
      const newConfig: SortConfig = {
        key,
        direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
      };
      
      // Update URL params for sorting
      const newParams = new URLSearchParams(searchParams);
      newParams.set('sortKey', String(newConfig.key));
      newParams.set('sortDirection', newConfig.direction);
      setSearchParams(newParams);
      
      return newConfig;
    });
  };

  const handleFilterChange = useCallback((newFilters: FilterConfig) => {
    const newParams = new URLSearchParams(searchParams);
    
    // Handle search
    if (newFilters.search) {
      newParams.set('search', newFilters.search);
    } else {
      newParams.delete('search');
    }

    // Handle tags
    newParams.delete('tags');
    if (newFilters.tags.length > 0) {
      newFilters.tags.forEach(tag => {
        newParams.append('tags', tag);
      });
    }

    // Handle status
    newParams.delete('status');
    if (newFilters.status.length > 0) {
      newFilters.status.forEach(status => {
        newParams.append('status', status);
      });
    }

    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  const filteredAndSortedProjects = useMemo(() => {
    let result = projects;

    // Filter by search
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(project => {
        const name = project.name?.toLowerCase() ?? '';
        const description = project.description?.toLowerCase() ?? '';
        return name.includes(searchTerm) || description.includes(searchTerm);
      });
    }

    // Filter by status
    if (filters.status.length > 0) {
      result = result.filter(project => 
        filters.status.includes(project.status)
      );
    }

    // Filter by tags
    if (filters.tags.length > 0) {
      result = result.filter(project => 
        project.tags.some(tag => filters.tags.includes(tag))
      );
    }

    // Sort projects
    return result.sort((a, b) => {
      const key = sortConfig.key;
      const direction = sortConfig.direction;

      // Safely handle sorting with null checks
      const valueA = a[key] ?? '';
      const valueB = b[key] ?? '';

      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [projects, filters, sortConfig]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-8">
      <ProjectFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        availableTags={getAllTags(projects)}
        availableStatuses={getAllStatuses(projects)}
        sortConfig={sortConfig}
        onSortChange={handleSort}
      />
      <ProjectsTable
        projects={filteredAndSortedProjects}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
      />
    </div>
  );
};

export default ProjectsContainer;