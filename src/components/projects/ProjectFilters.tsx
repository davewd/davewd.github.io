import React, { useMemo } from 'react';
import { FilterConfig } from '../../types';
import { Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

interface ProjectFiltersProps {
  filters: FilterConfig;
  onFilterChange: (filters: FilterConfig) => void;
  availableTags: string[];
  availableStatuses: string[];
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  filters,
  onFilterChange,
  availableTags,
  availableStatuses
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = (newFilters: FilterConfig) => {
    const newParams = new URLSearchParams(searchParams);

    // Preserve the tab parameter
    const tab = searchParams.get('tab');
    if (tab) {
      newParams.set('tab', tab);
    }
    
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
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, search: e.target.value };
    onFilterChange(newFilters);
    updateSearchParams(newFilters);
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    const newFilters = { ...filters, tags: newTags };
    onFilterChange(newFilters);
    updateSearchParams(newFilters);
  };

  const handleStatusToggle = (status: string) => {
    const newStatuses = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    const newFilters = { ...filters, status: newStatuses };
    onFilterChange(newFilters);
    updateSearchParams(newFilters);
  };

  // Initialize filters from URL on mount
  React.useEffect(() => {
    const search = searchParams.get('search') || '';
    const tags = searchParams.getAll('tags');
    const status = searchParams.getAll('status');

    const initialFilters = {
      search,
      tags,
      status,
      year: []
    };

    onFilterChange(initialFilters);
  }, [searchParams, onFilterChange]); // Added missing dependencies. Note: onFilterChange should be wrapped in useCallback in parent component

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search projects..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200"
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>

      {/* Filter Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tags Filter */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200
                  ${filters.tags.includes(tag)
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Status</h3>
          <div className="flex flex-wrap gap-2">
            {availableStatuses.map(status => (
              <button
                key={status}
                onClick={() => handleStatusToggle(status)}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200
                  ${filters.status.includes(status)
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFilters;