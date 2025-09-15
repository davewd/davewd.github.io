import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import thoughtsData from "../../json_data/sample_data/thoughts.json";
import ThoughtsSectionList from "./ThoughtsSectionList";
import { Section, Thought } from "../../types/thoughts";
import { fetchAndConvertMediumPosts } from "../../utils/medium-rss";

interface ThoughtsContainerProps {
  activeSectionId?: string;
}

const ThoughtsContainer: React.FC<ThoughtsContainerProps> = ({
  activeSectionId,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allThoughts, setAllThoughts] = useState<Thought[]>(
    thoughtsData.thoughts
  );
  const [selectedThought, setSelectedThought] = useState<Thought>(
    thoughtsData.thoughts[0]
  );
  const [selectedSection, setSelectedSection] = useState<Section>(
    selectedThought.sections[0]
  );
  const [isLoadingMedium, setIsLoadingMedium] = useState(false);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  // Load Medium posts on component mount
  useEffect(() => {
    const loadMediumPosts = async () => {
      setIsLoadingMedium(true);
      try {
        const mediumThought = await fetchAndConvertMediumPosts(
          "davewd",
          "Latest Medium Posts"
        );

        if (mediumThought.sections.length > 0) {
          setAllThoughts((prevThoughts) => [mediumThought, ...prevThoughts]);
        }
      } catch (error) {
        console.error("Failed to load Medium posts:", error);
      } finally {
        setIsLoadingMedium(false);
      }
    };

    loadMediumPosts();
  }, []);

  useEffect(() => {
    // Find thought and section by ID from URL or default to first thought and section
    const thought =
      allThoughts.find((t) =>
        t.sections.some((s) => s.id === activeSectionId)
      ) || allThoughts[0];

    const section = activeSectionId
      ? thought.sections.find((s) => s.id === activeSectionId)
      : thought.sections[0];

    setSelectedThought(thought);
    setSelectedSection(section || thought.sections[0]);
  }, [activeSectionId, allThoughts]);

  const handleSectionSelect = (section: Section) => {
    // Update URL with selected section
    const currentTab = searchParams.get("tab") || "thoughts";
    setSearchParams({
      tab: currentTab,
      section: section.id,
    });

    const thought =
      allThoughts.find((t) => t.sections.some((s) => s.id === section.id)) ||
      allThoughts[0];

    setSelectedThought(thought);
    setSelectedSection(section);
  };

  const handleThoughtNavigation = (direction: "prev" | "next") => {
    const currentIndex = allThoughts.findIndex(
      (t) => t.id === selectedThought.id
    );
    const newIndex =
      direction === "prev"
        ? (currentIndex - 1 + allThoughts.length) % allThoughts.length
        : (currentIndex + 1) % allThoughts.length;

    const newThought = allThoughts[newIndex];

    // Update URL with first section of new thought
    const currentTab = searchParams.get("tab") || "thoughts";
    setSearchParams({
      tab: currentTab,
      section: newThought.sections[0].id,
    });

    setSelectedThought(newThought);
    setSelectedSection(newThought.sections[0]);
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm space-y-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => handleThoughtNavigation("prev")}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          ← Prev
        </button>
        <div className="flex-grow text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {selectedThought.title}
          </h2>
          {isLoadingMedium && selectedThought.id === "medium-thoughts" && (
            <div className="flex items-center justify-center mt-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
              <span className="ml-2 text-sm text-gray-500">
                Loading Medium posts...
              </span>
            </div>
          )}
        </div>
        <button
          onClick={() => handleThoughtNavigation("next")}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          Next →
        </button>
      </div>

      <div
        className={`grid gap-6 ${
          isSidebarMinimized ? "md:grid-cols-1" : "md:grid-cols-3"
        }`}
      >
        {!isSidebarMinimized && (
          <ThoughtsSectionList
            sections={selectedThought.sections}
            selectedSection={selectedSection}
            onSectionSelect={handleSectionSelect}
            onMinimizeChange={(minimized) => setIsSidebarMinimized(minimized)}
          />
        )}

        {/* Selected Section Details */}
        <div
          className={`bg-gray-50 p-6 rounded-lg ${
            isSidebarMinimized ? "md:col-span-1" : "md:col-span-2"
          }`}
        >
          <div className="flex items-center mb-4">
            {isSidebarMinimized && (
              <button
                onClick={() => setIsSidebarMinimized(false)}
                className="p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 mr-3"
                title="Show section list"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            )}
            <h3 className="text-2xl font-bold text-gray-900">
              {selectedSection.title}
            </h3>
          </div>

          {/* Display full content if available, otherwise show preview */}
          {selectedSection.contentEncoded &&
          selectedSection.contentEncoded.length > 0 ? (
            <div className="medium-content mb-6">
              <div
                dangerouslySetInnerHTML={{
                  __html: selectedSection.contentEncoded,
                }}
              />
            </div>
          ) : (
            <p className="text-gray-700 mb-6">{selectedSection.content}</p>
          )}

          {/* Medium Link */}
          {selectedSection.mediumUrl && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <a
                href={selectedSection.mediumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z" />
                </svg>
                Read on Medium
              </a>
              {selectedSection.publishedDate && (
                <span className="ml-3 text-sm text-gray-500">
                  Published:{" "}
                  {new Date(selectedSection.publishedDate).toLocaleDateString()}
                </span>
              )}
              {selectedSection.readTime && (
                <span className="ml-3 text-sm text-gray-500">
                  {selectedSection.readTime} read
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThoughtsContainer;
