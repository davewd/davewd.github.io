import React, { useState, useEffect } from "react";
import timelineData from "../../json_data/sample_data/timeline.json";
import { extractOpenGraphImage } from "../../utils/og-image-extractor";
import { TimelineEvent } from "../../types";

const TimelineContainer: React.FC = () => {
  const [events, setEvents] = useState<TimelineEvent[]>(timelineData.events);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchOgImages = async () => {
      const updatedEvents: TimelineEvent[] = await Promise.all(
        events.map(async (event) => {
          // Only fetch OG image if href exists and ogImage is not already set
          if (event.href && !event.ogImage) {
            try {
              const ogImage = await extractOpenGraphImage(event.href);
              return { ...event, ogImage: ogImage || undefined };
            } catch (error) {
              console.error('Failed to fetch OG image:', error);
              return event;
            }
          }
          return event;
        })
      );

      setEvents(updatedEvents);
    };

    fetchOgImages();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="relative">
        {events.map((event: TimelineEvent, index) => (
          <div
            key={index}
            className={`flex items-center ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Content */}
            <div className="w-5/12">
              <div
                className={`bg-white p-3 rounded-lg shadow-sm transition-all duration-300 ${
                  hoveredIndex === index
                    ? "shadow-lg transform scale-105"
                    : ""
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="text-sm font-medium text-gray-500">
                    {event.date}
                  </div>
                  <div
                    className="text-gray-500"
                    style={{ fontSize: "1.5em" }}
                  >
                    {event.location}
                  </div>
                </div>

                <div className="mb-1">
                  <h3 className="text-lg font-semibold leading-tight">
                    {event.title}
                  </h3>
                  <div
                    className="text-sm font-medium transition-colors"
                    style={{ color: event.companyColor }}
                  >
                    {event.company}
                  </div>
                </div>

                {event.ogImage && (
                  <div className="mb-2 rounded-lg overflow-hidden shadow-sm">
                    <img
                      src={event.ogImage}
                      alt={`Open Graph image for ${event.title}`}
                      className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

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
                  hoveredIndex === index ? "transform scale-175" : ""
                }`}
                style={{
                  backgroundColor: event.companyColor,
                  filter:
                    hoveredIndex === index ? "brightness(110%)" : "none",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineContainer;
