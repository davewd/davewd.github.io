import React, { useState } from 'react';
import timelineData from '../../json_data/sample_data/timeline.json';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  company: string;
  companyColor: string;
  location: string;
  tags: string[];
}

interface TimelineData {
  events: TimelineEvent[];
}

const TimelineContainer: React.FC = () => {
  const data = timelineData as TimelineData;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 z-0"></div>

        {/* Timeline events */}
        <div className="space-y-3">
          {data.events.map((event: TimelineEvent, index) => (
            <div
              key={index}
              className={`flex items-center ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Content */}
              <div className="w-5/12">
                <div 
                  className={`bg-white p-3 rounded-lg shadow-sm transition-all duration-300 ${
                    hoveredIndex === index ? 'shadow-lg transform scale-105' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="text-sm font-medium text-gray-500">{event.date}</div>
                    <div className="text-sm text-gray-500 text-lg" style={{ fontSize: '1.5em' }}>{event.location}</div>
                  </div>
                  
                  <div className="mb-1">
                    <h3 className="text-lg font-semibold leading-tight">{event.title}</h3>
                    <div 
                      className="text-sm font-medium transition-colors"
                      style={{ color: event.companyColor }}
                    >
                      {event.company}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2 hover:line-clamp-none">
                    {event.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {event.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Circle marker */}
              <div className="w-2/12 flex justify-center relative z-10">
                <div 
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    hoveredIndex === index ? 'transform scale-175' : ''
                  }`}
                  style={{ 
                    backgroundColor: event.companyColor,
                    filter: hoveredIndex === index ? 'brightness(110%)' : 'none'
                  }}
                ></div>
              </div>

              {/* Empty space for alignment */}
              <div className="w-5/12"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineContainer;
