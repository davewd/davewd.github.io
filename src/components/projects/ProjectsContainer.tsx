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
      result = result.filter(project => {
        const status = project.status ?? '';
        return filters.status.includes(status);
      });
    }

    // Filter by tags
    if (filters.tags.length > 0) {
      result = result.filter(project => {
        const projectTags = project.tags ?? [];
        return projectTags.some(tag => filters.tags.includes(tag));
      });
    }

    // Custom sorting logic
    return result.sort((a, b) => {
      // Define status priority
      const statusPriority: { [key: string]: number } = {
        'Active': 3,
        'Future': 2,
        'Complete': 1
      };

      // First, sort by status priority
      const statusPriorityA = statusPriority[a.status] ?? 0;
      const statusPriorityB = statusPriority[b.status] ?? 0;
      if (statusPriorityA !== statusPriorityB) {
        return statusPriorityB - statusPriorityA;
      }

      // Then, sort by year started
      const yearA = a.year_start ?? Infinity;
      const yearB = b.year_start ?? Infinity;
      if (yearA !== yearB) {
        return yearB - yearA;
      }

      // Finally, sort alphabetically by name
      return a.name.localeCompare(b.name);
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