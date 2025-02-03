import React from 'react';
import { Project, SortConfig, TagConfig } from '../../types';
import projectTagsConfig from '../../json_data/tag_configs/project_tags.json';
import statusTagsConfig from '../../json_data/tag_configs/status_tags.json';

interface ProjectsTableProps {
  projects: Project[];
  sortConfig: SortConfig;
  setSortConfig: React.Dispatch<React.SetStateAction<SortConfig>>;
}

const ProjectsTable: React.FC<ProjectsTableProps> = ({
  projects,
  sortConfig,
  setSortConfig,
}) => {
  const getSortIcon = (key: keyof Project) => {
    if (sortConfig.key !== key) return '↕';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const handleSort = (columnKey: keyof Project) => {
    setSortConfig(prevConfig => ({
      key: columnKey,
      direction: prevConfig.key === columnKey && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getTagStyle = (tag: string, type: 'project' | 'status'): TagConfig => {
    const config = type === 'project' ? projectTagsConfig.tags : statusTagsConfig.statuses;
    const style = config[tag] || { background: '#E5E7EB', text: '#374151' }; // Default gray style
    
    // Debugging log
    console.log(`Tag: ${tag}, Type: ${type}, Style:`, style);
    
    return style;
  };

  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="bg-gray-50">
            <th 
              className="text-left px-6 py-4 text-sm font-semibold text-gray-900 cursor-pointer transition-colors duration-200 hover:bg-gray-100 first:rounded-tl-lg"
              onClick={() => handleSort('name')}
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
              onClick={() => handleSort('status')}
            >
              <div className="flex items-center gap-2">
                Status
                <span className="text-gray-400">{getSortIcon('status')}</span>
              </div>
            </th>
            <th 
              className="text-left px-6 py-4 text-sm font-semibold text-gray-900 cursor-pointer transition-colors duration-200 hover:bg-gray-100"
              onClick={() => handleSort('year_start')}
            >
              <div className="flex items-center gap-2">
                Years
                <span className="text-gray-400">{getSortIcon('year_start')}</span>
              </div>
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 last:rounded-tr-lg">
              Link
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {projects.map((project) => (
            <tr 
              key={project.id} 
              className="transition-colors duration-200 hover:bg-gray-50"
            >
              <td className="px-6 py-4">
                <div className="font-medium text-gray-900 text-left">{project.name}</div>
                {project.tags && (
                  <div className="flex gap-2 mt-1 flex-wrap">
                    {project.tags.map((tag, tagIndex) => {
                      const tagStyle = getTagStyle(tag, 'project');
                      return (
                        <span 
                          key={tagIndex}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: tagStyle.background,
                            color: tagStyle.text
                          }}
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {project.description}
              </td>
              <td className="px-6 py-4">
                {project.status && (
                  <span 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: getTagStyle(project.status, 'status').background,
                      color: getTagStyle(project.status, 'status').text
                    }}
                  >
                    {project.status}
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {project.year_start && project.year_end 
                  ? `${project.year_start} - ${project.year_end}`
                  : project.year_start 
                    ? `${project.year_start}`
                    : 'N/A'}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {project.link_href && (
                  <a 
                    href={project.link_href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {project.link_text || project.link_href}
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;