import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import thoughtsData from "../../json_data/sample_data/thoughts.json";
import ThoughtsSectionList from "./ThoughtsSectionList";
import { Section, Thought } from "../../types/thoughts";

interface ThoughtsContainerProps {
  activeSectionId?: string;
}

const ThoughtsContainer: React.FC<ThoughtsContainerProps> = ({
  activeSectionId,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedThought, setSelectedThought] = useState<Thought>(
    thoughtsData.thoughts[0]
  );
  const [selectedSection, setSelectedSection] = useState<Section>(
    selectedThought.sections[0]
  );

  useEffect(() => {
    // Find thought and section by ID from URL or default to first thought and section
    const thought =
      thoughtsData.thoughts.find((t) =>
        t.sections.some((s) => s.id === activeSectionId)
      ) || thoughtsData.thoughts[0];

    const section = activeSectionId
      ? thought.sections.find((s) => s.id === activeSectionId)
      : thought.sections[0];

    setSelectedThought(thought);
    setSelectedSection(section || thought.sections[0]);
  }, [activeSectionId]);

  const handleSectionSelect = (section: Section) => {
    // Update URL with selected section
    const currentTab = searchParams.get("tab") || "thoughts";
    setSearchParams({
      tab: currentTab,
      section: section.id,
    });

    const thought =
      thoughtsData.thoughts.find((t) =>
        t.sections.some((s) => s.id === section.id)
      ) || thoughtsData.thoughts[0];

    setSelectedThought(thought);
    setSelectedSection(section);
  };

  const handleThoughtNavigation = (direction: "prev" | "next") => {
    const currentIndex = thoughtsData.thoughts.findIndex(
      (t) => t.id === selectedThought.id
    );
    const newIndex =
      direction === "prev"
        ? (currentIndex - 1 + thoughtsData.thoughts.length) %
          thoughtsData.thoughts.length
        : (currentIndex + 1) % thoughtsData.thoughts.length;

    const newThought = thoughtsData.thoughts[newIndex];

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
        <h2 className="text-3xl font-bold text-gray-900 flex-grow text-center">
          {selectedThought.title}
        </h2>
        <button
          onClick={() => handleThoughtNavigation("next")}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          Next →
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <ThoughtsSectionList
          sections={selectedThought.sections}
          selectedSection={selectedSection}
          onSectionSelect={handleSectionSelect}
        />

        {/* Selected Section Details */}
        <div className="md:col-span-2 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {selectedSection.title}
          </h3>
          <p className="text-gray-700 mb-6">{selectedSection.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ThoughtsContainer;
