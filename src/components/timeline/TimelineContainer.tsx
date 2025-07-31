import React, { useState, useEffect } from "react";
import timelineData from "../../json_data/sample_data/timeline.json";
import { extractOpenGraphImage } from "../../utils/og-image-extractor";
import { TimelineEvent } from "../../types";
import { Link } from "lucide-react";

// Import all images statically
import gsContentStream from "../../assets/gs_content_stream.png";
import gsRtom from "../../assets/gs_rtom.png";
import cbaLogo from "../../assets/cba_logo.svg";
import gsLogo from "../../assets/gs_logo.svg";
import tge from "../../assets/tge.png";
import nationalResources from "../../assets/natres.jpeg";
import brighterDebt from "../../assets/brighter-debt.jpeg";
import strader from "../../assets/strader.jpg";
import AWEI from "../../assets/AWEI.png";
import fintech from "../../assets/fintech.png";
import MD from "../../assets/MD.jpeg";
import soton from "../../assets/soton_transparent.png";
import ironman from "../../assets/ironman_dd.jpg";
import ironmanLogo from "../../assets/ironman_logo.png";
import ddBanner from "../../assets/dd_banner.jpg";

// Map of image paths to their imported modules
const imageMap: { [key: string]: string } = {
  "gs_content_stream.png": gsContentStream,
  "gs_rtom.png": gsRtom,
  "./gs_content_stream.png": gsContentStream,
  "./gs_rtom.png": gsRtom,
  "./cba_logo.svg": cbaLogo,
  "./gs_logo.svg": gsLogo,
  "cba_logo.svg": cbaLogo,
  "gs_logo.svg": gsLogo,
  "tge.png": tge,
  "natres.jpeg": nationalResources,
  "brighter-debt.jpeg": brighterDebt,
  "strader.jpg": strader,
  "AWEI.png": AWEI,
  "fintech.png": fintech,
  "MD.jpeg": MD,
  "soton_transparent.png": soton,
  "ironman_dd.jpg": ironman,
  "ironman_logo.png": ironmanLogo,
  "dd_banner.jpg": ddBanner,
};

const TimelineImageComponent: React.FC<{ event: TimelineEvent }> = ({
  event,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      if (event.image) {
        // Handle local image from assets
        const imagePath = event.image;
        const importedImage = imageMap[imagePath];
        if (importedImage) {
          setImageUrl(importedImage);
        } else {
          console.error("Image not found in assets:", imagePath);
          setHasError(true);
        }
      } else if (event.ogImage) {
        // Handle explicit OG image URL
        setImageUrl(event.ogImage);
      } else if (event.href) {
        try {
          // Try to fetch OG image from URL
          const ogImage = await extractOpenGraphImage(event.href);
          if (ogImage) {
            setImageUrl(ogImage);
          }
        } catch (error) {
          console.error("Failed to load OG image:", error);
          setHasError(true);
        }
      }
      setIsLoading(false);
    };

    loadImage();
  }, [event.image, event.ogImage, event.href]);

  if (!imageUrl && !isLoading) {
    return null;
  }

  return (
    <div className="relative mb-2 rounded-lg overflow-hidden shadow-sm min-h-[200px] bg-gray-50">
      {isLoading && (
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

      {imageUrl && (
        <img
          src={imageUrl}
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

const CompanyLogo: React.FC<{ event: TimelineEvent }> = ({ event }) => {
  const [hasError, setHasError] = useState(false);
  const logoUrl = imageMap[event.companyLogo];

  if (hasError || !logoUrl) {
    return (
      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-sm font-medium text-gray-500">
          {event.company.charAt(0)}
        </span>
      </div>
    );
  }

  return (
    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-white rounded-full overflow-hidden">
      <img
        src={logoUrl}
        alt={`${event.company} logo`}
        className="w-6 h-6 object-contain"
        onError={() => setHasError(true)}
      />
    </div>
  );
};

// Add this utility function above the TimelineContainer component
function sortEventsByDate(events: TimelineEvent[]) {
  return [...events].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA; // Descending (most recent first)
  });
}

const TimelineContainer: React.FC = () => {
  const [events, setEvents] = useState<TimelineEvent[]>(
    sortEventsByDate(timelineData.events)
  );
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

      setEvents(sortEventsByDate(updatedEvents));
    };

    fetchOgImages();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-4 sm:py-8 px-4">
      <div className="relative">
        {events.map((event: TimelineEvent, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center relative ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } ${index === 0 ? "mt-0" : "mt-4 md:-mt-20"} mb-4 md:mb-0`}
            style={{
              zIndex: events.length - index,
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="w-full md:w-5/12 mb-4 md:mb-0">
              <div
                className={`bg-white p-3 sm:p-4 rounded-lg shadow-sm transition-all duration-300 ${
                  hoveredIndex === index
                    ? "shadow-lg transform scale-105 z-50"
                    : ""
                }`}
                style={{
                  position: "relative",
                  zIndex: hoveredIndex === index ? 1000 : events.length - index,
                }}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                  <div className="flex items-center gap-2 mb-1 sm:mb-0">
                    <CompanyLogo event={event} />
                    <div className="text-sm font-medium text-gray-500">
                      {event.date}
                    </div>
                  </div>
                  <div className="text-gray-500 text-lg sm:text-xl">
                    {event.location}
                  </div>
                </div>

                <div className="mb-2">
                  <h3 className="text-base sm:text-lg font-semibold leading-tight">
                    {event.title}
                  </h3>
                  <div
                    className="text-sm font-medium transition-colors"
                    style={{ color: event.companyColor }}
                  >
                    {event.company}
                  </div>
                </div>

                {(event.href || event.image) && (
                  <div className="block hover:opacity-90 transition-opacity">
                    {event.href ? (
                      <a
                        href={event.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <TimelineImageComponent event={event} />
                      </a>
                    ) : (
                      <TimelineImageComponent event={event} />
                    )}
                  </div>
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

            <div className="w-0.5 h-8 md:w-2/12 md:h-auto flex justify-center relative z-10">
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
