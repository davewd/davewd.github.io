import React from 'react';
import { Project, SortConfig } from '../../types';

interface ProjectsTableProps {
  projects: Project[];
  sortConfig: SortConfig;
  onSort: (key: keyof Project) => void;
}

const ProjectsTable: React.FC<ProjectsTableProps> = ({
  projects,
  sortConfig,
  onSort,
}) => {
  const getSortIcon = (key: keyof Project) => {
    if (sortConfig.key !== key) return '↕';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="bg-gray-50">
            <th 
              className="text-left px-6 py-4 text-sm font-semibold text-gray-900 cursor-pointer transition-colors duration-200 hover:bg-gray-100 first:rounded-tl-lg"
              onClick={() => onSort('name')}
            >
              <div className="flex items-center gap-2">
                Project
                <span className="text-gray-400">{getSortIcon('name')}</span>
              </div>
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
              Description
            </th>
            <th 
              className="text-left px-6 py-4 text-sm font-semibold text-gray-900 cursor-pointer transition-colors duration-200 hover:bg-gray-100"
              onClick={() => onSort('status')}
            >
              <div className="flex items-center gap-2">
                Status
                <span className="text-gray-400">{getSortIcon('status')}</span>
              </div>
            </th>
            <th 
              className="text-left px-6 py-4 text-sm font-semibold text-gray-900 cursor-pointer transition-colors duration-200 hover:bg-gray-100 last:rounded-tr-lg"
              onClick={() => onSort('year')}
            >
              <div className="flex items-center gap-2">
                Year
                <span className="text-gray-400">{getSortIcon('year')}</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {projects.map((project, index) => (
            <tr 
              key={project.id} 
              className="transition-colors duration-200 hover:bg-gray-50"
            >
              <td className="px-6 py-4">
                <div className="font-medium text-gray-900">{project.name}</div>
                {project.tags && (
                  <div className="flex gap-2 mt-1 flex-wrap">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {project.description}
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'}`}>
                  {project.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {project.year}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;