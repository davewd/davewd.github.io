import React, { useMemo } from "react";
import { FilterConfig } from "../../types";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import projectTagsConfig from "../../json_data/tag_configs/project_tags.json";
import statusTagsConfig from "../../json_data/tag_configs/status_tags.json";

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
  availableStatuses,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = (newFilters: FilterConfig) => {
    const newParams = new URLSearchParams(searchParams);

    // Preserve the tab parameter
    const tab = searchParams.get("tab");
    if (tab) {
      newParams.set("tab", tab);
    }

    // Handle search
    if (newFilters.search) {
      newParams.set("search", newFilters.search);
    } else {
      newParams.delete("search");
    }

    // Handle tags
    newParams.delete("tags");
    if (newFilters.tags.length > 0) {
      newFilters.tags.forEach((tag) => {
        newParams.append("tags", tag);
      });
    }

    // Handle status
    newParams.delete("status");
    if (newFilters.status.length > 0) {
      newFilters.status.forEach((status) => {
        newParams.append("status", status);
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
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    const newFilters = { ...filters, tags: newTags };
    onFilterChange(newFilters);
    updateSearchParams(newFilters);
  };

  const handleStatusToggle = (status: string) => {
    const newStatuses = filters.status.includes(status)
      ? filters.status.filter((s) => s !== status)
      : [...filters.status, status];
    const newFilters = { ...filters, status: newStatuses };
    onFilterChange(newFilters);
    updateSearchParams(newFilters);
  };

  const getTagStyle = (tag: string) => {
    const tagConfig = projectTagsConfig.tags[tag];
    return tagConfig
      ? {
          backgroundColor: tagConfig.background,
          color: tagConfig.text,
        }
      : {
          backgroundColor: "#E5E7EB",
          color: "#374151",
        };
  };

  const getStatusStyle = (status: string) => {
    const statusConfig = statusTagsConfig.statuses[status];
    return statusConfig
      ? {
          backgroundColor: statusConfig.background,
          color: statusConfig.text,
        }
      : {
          backgroundColor: "#E5E7EB",
          color: "#374151",
        };
  };

  // Initialize filters from URL on mount
  React.useEffect(() => {
    const search = searchParams.get("search") || "";
    const tags = searchParams.getAll("tags");
    const status = searchParams.getAll("status");

    const initialFilters = {
      search,
      tags,
      status,
      year: [],
    };

    onFilterChange(initialFilters);
  }, [searchParams, onFilterChange]); // Added missing dependencies. Note: onFilterChange should be wrapped in useCallback in parent component

  return (
    <div className="space-y-6">
      {/* Filter Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tags Filter */}
        <div className="space-y-2 text-center">
          <h3 className="text-sm font-medium text-gray-700">Tags</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {availableTags.map((tag) => {
              const tagStyle = getTagStyle(tag);
              const isSelected = filters.tags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  style={{
                    backgroundColor: isSelected ? '#000' : tagStyle.backgroundColor,
                    color: isSelected ? '#fff' : tagStyle.color,
                    borderColor: tagStyle.backgroundColor,
                  }}
                  className={`px-3 py-1 rounded-full text-xs transition-colors duration-200 border ${
                    isSelected
                      ? 'border-black'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Status Filter */}
        <div className="space-y-2 text-center">
          <h3 className="text-sm font-medium text-gray-700">Status</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {availableStatuses.map((status) => {
              const statusStyle = getStatusStyle(status);
              const isSelected = filters.status.includes(status);
              return (
                <button
                  key={status}
                  onClick={() => handleStatusToggle(status)}
                  style={{
                    backgroundColor: isSelected ? '#000' : statusStyle.backgroundColor,
                    color: isSelected ? '#fff' : statusStyle.color,
                    borderColor: statusStyle.backgroundColor,
                  }}
                  className={`px-3 py-1 rounded-full text-xs transition-colors duration-200 border ${
                    isSelected
                      ? 'border-black'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>
        </div>
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
      </div>
    </div>
  );
};

export default ProjectFilters;
