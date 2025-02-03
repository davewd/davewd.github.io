import React from 'react';
import { Section } from '../../types/thoughts';

interface ThoughtsSectionListProps {
  sections: Section[];
  selectedSection: Section;
  onSectionSelect: (section: Section) => void;
}

const ThoughtsSectionList: React.FC<ThoughtsSectionListProps> = ({ 
  sections, 
  selectedSection, 
  onSectionSelect 
}) => {
  return (
    <div className="md:col-span-1 space-y-4">
      {sections.map((section) => (
        <div 
          key={section.id}
          onClick={() => onSectionSelect(section)}
          className={`
            cursor-pointer p-4 rounded-lg transition-all duration-300
            ${selectedSection === section 
              ? 'bg-blue-50 border-l-4 border-blue-500' 
              : 'hover:bg-gray-50'}
          `}
        >
          <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
          <p className="text-sm text-gray-500 truncate">{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ThoughtsSectionList;
