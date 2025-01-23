import React from 'react';
import { FilterConfig } from '../../types';

interface ProjectFiltersProps {
  filters: FilterConfig;
  onFilterChange: (filters: FilterConfig) => void;
  availableTags: string[];
  availableYears: string[];
  availableStatuses: string[];
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  filters,
  onFilterChange,
  availableTags,
  availableYears,
  availableStatuses
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    onFilterChange({ ...filters, tags: newTags });
  };

  const handleStatusToggle = (status: string) => {
    const newStatuses = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    onFilterChange({ ...filters, status: newStatuses });
  };

  const handleYearToggle = (year: string) => {
    const newYears = filters.year.includes(year)
      ? filters.year.filter(y => y !== year)
      : [...filters.year, year];
    onFilterChange({ ...filters, year: newYears });
  };

  return (
    <div className="mb-6 space-y-4">
      <input
        type="text"
        placeholder="Search projects..."
        className="w-full p-2 border border-gray-300 rounded"
        value={filters.search}
        onChange={handleSearchChange}
      />
      
      <div className="space-y-2">
        <h3 className="font-medium">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {availableTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-2 py-1 rounded text-sm ${
                filters.tags.includes(tag)
                  ? 'bg-black text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Status</h3>
        <div className="flex flex-wrap gap-2">
          {availableStatuses.map(status => (
            <button
              key={status}
              onClick={() => handleStatusToggle(status)}
              className={`px-2 py-1 rounded text-sm ${
                filters.status.includes(status)
                  ? 'bg-black text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Year</h3>
        <div className="flex flex-wrap gap-2">
          {availableYears.map(year => (
            <button
              key={year}
              onClick={() => handleYearToggle(year)}
              className={`px-2 py-1 rounded text-sm ${
                filters.year.includes(year)
                  ? 'bg-black text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectFilters;