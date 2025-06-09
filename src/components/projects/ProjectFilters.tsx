import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

type TagStyle = {
  background: string;
  text: string;
};

const getTagStyle = (tag: string): TagStyle => ({
  background: tag ? "#E5E7EB" : "#D1D5DB",
  text: "#374151",
});

const getStatusStyle = (status: string): TagStyle => ({
  background: status ? "#E5E7EB" : "#D1D5DB",
  text: "#374151",
});

type ProjectFiltersProps = {
  filters: {
    search: string;
    tags: string[];
    status: string[];
  };
  onFilterChange: (
    type: "search" | "tags" | "status",
    value: string | string[]
  ) => void;
  availableTags: string[];
  availableStatuses: string[];
};

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  filters,
  onFilterChange,
  availableTags,
  availableStatuses,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = (newFilters: typeof filters) => {
    const params = new URLSearchParams();
    if (newFilters.search) params.set("search", newFilters.search);
    newFilters.tags.forEach((tag) => params.append("tags", tag));
    newFilters.status.forEach((status) => params.append("status", status));
    setSearchParams(params);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, search: e.target.value };
    onFilterChange("search", e.target.value);
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags?.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...(filters.tags ?? []), tag];
    onFilterChange("tags", newTags);
  };

  const handleStatusToggle = (status: string) => {
    const newStatuses = filters.status?.includes(status)
      ? filters.status.filter((s) => s !== status)
      : [...(filters.status ?? []), status];
    onFilterChange("status", newStatuses);
  };

  // Initialize filters from URL on mount
  useEffect(() => {
    const search = searchParams.get("search") || "";
    const tags = searchParams.getAll("tags");
    const status = searchParams.getAll("status");

    onFilterChange("search", search);
    onFilterChange("tags", tags);
    onFilterChange("status", status);
  }, [searchParams, onFilterChange]);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Filter Groups */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Tags Filter */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700 text-center sm:text-left">
            Tags
          </h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center sm:justify-start">
            {(availableTags ?? []).map((tag) => {
              const isSelected = filters.tags?.includes(tag) ?? false;
              return (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs transition-colors duration-200 border ${
                    isSelected
                      ? "bg-black text-white border-black"
                      : "bg-gray-100 text-gray-700 border-transparent hover:border-gray-300"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700 text-center sm:text-left">
            Status
          </h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center sm:justify-start">
            {(availableStatuses ?? []).map((status) => {
              const statusStyle = getStatusStyle(status);
              const isSelected = filters.status?.includes(status) ?? false;
              return (
                <button
                  key={status}
                  onClick={() => handleStatusToggle(status)}
                  style={{
                    backgroundColor: isSelected
                      ? "#000"
                      : statusStyle.background,
                    color: isSelected ? "#fff" : statusStyle.text,
                    borderColor: statusStyle.background,
                  }}
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs transition-colors duration-200 border ${
                    isSelected
                      ? "border-black"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md mx-auto sm:max-w-none">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search projects..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200 text-sm sm:text-base"
          value={filters.search ?? ""}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default ProjectFilters;
