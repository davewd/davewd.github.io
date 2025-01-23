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
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th 
              className="text-left p-4 font-medium cursor-pointer hover:bg-gray-50"
              onClick={() => onSort('name')}
            >
              Project {getSortIcon('name')}
            </th>
            <th className="text-left p-4 font-medium">Description</th>
            <th 
              className="text-left p-4 font-medium cursor-pointer hover:bg-gray-50"
              onClick={() => onSort('status')}
            >
              Status {getSortIcon('status')}
            </th>
            <th 
              className="text-left p-4 font-medium cursor-pointer hover:bg-gray-50"
              onClick={() => onSort('year')}
            >
              Year {getSortIcon('year')}
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-4 font-medium">{project.name}</td>
              <td className="p-4">
                {project.description}
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-sm rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
              <td className="p-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm
                  ${project.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    project.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 
                    'bg-yellow-100 text-yellow-800'}`}>
                  {project.status}
                </span>
              </td>
              <td className="p-4">{project.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;