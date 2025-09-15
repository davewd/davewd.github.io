import React, { useState } from "react";
import { Section } from "../../types/thoughts";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ThoughtsSectionListProps {
  sections: Section[];
  selectedSection: Section;
  onSectionSelect: (section: Section) => void;
  onMinimizeChange: (minimized: boolean) => void;
}

const ThoughtsSectionList: React.FC<ThoughtsSectionListProps> = ({
  sections,
  selectedSection,
  onSectionSelect,
  onMinimizeChange,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const handleMinimizeToggle = () => {
    const newMinimizedState = !isMinimized;
    setIsMinimized(newMinimizedState);
    onMinimizeChange(newMinimizedState);
  };

  return (
    <div
      className={`md:col-span-1 transition-all duration-300 ${
        isMinimized ? "w-12" : "space-y-4"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleMinimizeToggle}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          title={isMinimized ? "Expand section list" : "Minimize section list"}
        >
          {isMinimized ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Section List */}
      {!isMinimized && (
        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.id}
              onClick={() => onSectionSelect(section)}
              className={`
                cursor-pointer p-4 rounded-lg transition-all duration-300
                ${
                  selectedSection === section
                    ? "bg-blue-50 border-l-4 border-blue-500"
                    : "hover:bg-gray-50"
                }
              `}
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {section.title}
              </h3>
              <p className="text-sm text-gray-500 truncate">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Minimized State - Empty sidebar */}
      {isMinimized && <div className="w-full h-full"></div>}
    </div>
  );
};

export default ThoughtsSectionList;
