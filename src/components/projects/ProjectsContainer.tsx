import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Project, SortConfig, FilterConfig } from '../../types';
import { fetchProjects, getAllTags, getAllYears, getAllStatuses } from '../../api';
import ProjectsTable from './ProjectsTable';
import ProjectFilters from './ProjectFilters';

const ProjectsContainer: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Memoize sortConfig to prevent unnecessary re-renders
  const sortConfig = useMemo((): SortConfig => ({
    key: (searchParams.get('sortKey') as keyof Project) || 'year',
    direction: (searchParams.get('sortDir') as 'asc' | 'desc') || 'desc'
  }), [searchParams]);

  // Memoize filters to prevent unnecessary re-renders
  const filters = useMemo((): FilterConfig => ({
    search: searchParams.get('search') || '',
    status: searchParams.getAll('status'),
    tags: searchParams.getAll('tags'),
    year: searchParams.getAll('year')
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
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      const currentKey = prev.get('sortKey');
      const currentDir = prev.get('sortDir');
      
      if (currentKey === key) {
        newParams.set('sortDir', currentDir === 'asc' ? 'desc' : 'asc');
      } else {
        newParams.set('sortKey', key);
        newParams.set('sortDir', 'asc');
      }
      
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

    // Handle year
    newParams.delete('year');
    if (newFilters.year.length > 0) {
      newFilters.year.forEach(year => {
        newParams.append('year', year);
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

    if (filters.year.length > 0) {
      result = result.filter(project => filters.year.includes(project.year.toString()));
    }

    // Apply sorting
    result.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      // Handle cases where values might be undefined
      if (!aValue && !bValue) return 0;
      if (!aValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (!bValue) return sortConfig.direction === 'asc' ? 1 : -1;

      // Compare string values case-insensitively
      const aString = String(aValue).toLowerCase();
      const bString = String(bValue).toLowerCase();
      
      if (aString < bString) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aString > bString) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [projects, filters, sortConfig]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-8">
      <ProjectFilters
        filters={filters}
        onFilterChange={handleFilterChange}
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