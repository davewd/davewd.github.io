import React, { useState, useEffect } from "react";
import timelineData from "../../json_data/sample_data/timeline.json";
import { extractOpenGraphImage } from "../../utils/og-image-extractor";
import { TimelineEvent } from "../../types";
import { Link } from "lucide-react";

const TimelineImageComponent: React.FC<{ event: TimelineEvent }> = ({
  event,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative mb-2 rounded-lg overflow-hidden shadow-sm min-h-[200px] bg-gray-50">
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-200 h-10 w-10"></div>
          </div>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-gray-400 text-sm">Failed to load preview</div>
        </div>
      )}

      {event.ogImage && (
        <img
          src={event.ogImage}
          alt={`Preview for ${event.title}`}
          className={`w-full object-cover transition-all duration-300 ${
            isLoading ? "opacity-0" : "opacity-100 hover:scale-105"
          }`}
          style={{ minHeight: "200px", maxHeight: "300px" }}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      )}
    </div>
  );
};

const TimelineContainer: React.FC = () => {
  const [events, setEvents] = useState<TimelineEvent[]>(timelineData.events);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchOgImages = async () => {
      const updatedEvents: TimelineEvent[] = await Promise.all(
        events.map(async (event) => {
          if (event.href && !event.ogImage) {
            try {
              const ogImage = await extractOpenGraphImage(event.href);
              return { ...event, ogImage: ogImage || undefined };
            } catch (error) {
              console.error("Failed to fetch OG image:", error);
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
            <div className="w-5/12">
              <div
                className={`bg-white p-3 rounded-lg shadow-sm transition-all duration-300 ${
                  hoveredIndex === index ? "shadow-lg transform scale-105" : ""
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="text-sm font-medium text-gray-500">
                    {event.date}
                  </div>
                  <div className="text-gray-500" style={{ fontSize: "1.5em" }}>
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

                {event.href && (
                  <a
                    href={event.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <TimelineImageComponent event={event} />
                  </a>
                )}

                <p className="text-sm text-gray-600 mb-2 line-clamp-2 hover:line-clamp-none">
                  {event.description}
                </p>

                {event.href && (
                  <div className="flex justify-end mb-2">
                    <a
                      href={event.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      title="Open article"
                    >
                      <Link size={16} />
                    </a>
                  </div>
                )}

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

            <div className="w-2/12 flex justify-center relative z-10">
              <div
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  hoveredIndex === index ? "transform scale-175" : ""
                }`}
                style={{
                  backgroundColor: event.companyColor,
                  filter: hoveredIndex === index ? "brightness(110%)" : "none",
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
