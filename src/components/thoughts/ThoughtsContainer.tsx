import React, { useState } from 'react';
import thoughtsData from '../../json_data/sample_data/thoughts.json';

interface Thought {
  title: string;
  content: string;
  date: string;
  tags: string[];
}

const ThoughtsContainer: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState(thoughtsData.sections[0]);

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">{thoughtsData.title}</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Section List */}
        <div className="md:col-span-1 space-y-4">
          {thoughtsData.sections.map((section) => (
            <div 
              key={section.id}
              onClick={() => setSelectedSection(section)}
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

        {/* Selected Section Details */}
        <div className="md:col-span-2 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedSection.title}</h3>
          <p className="text-gray-700 mb-6">{selectedSection.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ThoughtsContainer;
