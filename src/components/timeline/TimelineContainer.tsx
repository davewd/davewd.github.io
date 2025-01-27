import React from 'react';
import timelineData from '../../sample_data/timeline.json';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  tags: string[];
}

interface TimelineData {
  events: TimelineEvent[];
}

const TimelineContainer: React.FC = () => {
  const data = timelineData as TimelineData;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

        {/* Timeline events */}
        <div className="space-y-12">
          {data.events.map((event: TimelineEvent, index) => (
            <div
              key={index}
              className={`flex items-center ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className="w-5/12">
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="text-sm text-gray-500 mb-2">{event.date}</div>
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-block px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Circle marker */}
              <div className="w-2/12 flex justify-center">
                <div className="w-4 h-4 bg-gray-900 rounded-full transform transition-transform duration-200 hover:scale-150"></div>
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
