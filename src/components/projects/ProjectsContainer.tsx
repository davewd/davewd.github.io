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
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Project;
    direction: 'asc' | 'desc';
  }>({
    key: (searchParams.get('sortKey') as keyof Project) || 'year',
    direction: (searchParams.get('sortDir') as 'asc' | 'desc') || 'desc'
  });

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
      const newConfig = { ...prev };
      const currentKey = prev.key;
      const currentDir = prev.direction;
      
      if (currentKey === key) {
        newConfig.direction = currentDir === 'asc' ? 'desc' : 'asc';
      } else {
        newConfig.key = key;
        newConfig.direction = 'asc';
      }
      
      return newConfig;
    });
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('sortKey', key);
      newParams.set('sortDir', sortConfig.direction === 'asc' ? 'desc' : 'asc');
      return newParams;
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
    let result = [...projects];

    // Apply filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(project =>
        project.name.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters.status.length > 0) {
      result = result.filter(project => filters.status.includes(project.status));
    }

    if (filters.tags.length > 0) {
      result = result.filter(project =>
        project.tags.some(tag => filters.tags.includes(tag))
      );
    }

    // Apply sorting
    return result.sort((a, b) => {
      // Special handling for year_start and year_end
      if (sortConfig.key === 'year_start') {
        const yearA = a.year_start ?? Infinity;
        const yearB = b.year_start ?? Infinity;
        return sortConfig.direction === 'asc' 
          ? yearA - yearB 
          : yearB - yearA;
      } else if (sortConfig.key === 'year_end') {
        const yearA = a.year_end ?? -Infinity;
        const yearB = b.year_end ?? -Infinity;
        return sortConfig.direction === 'asc' 
          ? yearA - yearB 
          : yearB - yearA;
      }

      // Default sorting for other keys
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
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