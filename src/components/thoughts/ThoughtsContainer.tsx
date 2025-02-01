import React, { useState } from 'react';

interface Thought {
  title: string;
  content: string;
  date: string;
  tags: string[];
}

const ThoughtsContainer: React.FC = () => {
  const [thoughts] = useState<Thought[]>([
    {
      title: "The Power of Intentional Learning",
      content: "In a rapidly evolving world, the ability to learn quickly and adapt is more valuable than any single skill. Continuous learning isn't just about acquiring knowledge, but about developing a mindset of curiosity and openness.",
      date: "2024-01-15",
      tags: ["Learning", "Personal Development", "Growth Mindset"]
    },
    {
      title: "Automation and Human Potential",
      content: "As technology advances, our role shifts from performing tasks to designing systems. The true value of human intelligence lies not in repetitive work, but in creative problem-solving, empathy, and strategic thinking.",
      date: "2024-02-01",
      tags: ["Technology", "Automation", "Future of Work"]
    },
    {
      title: "Building Resilient Teams",
      content: "Great teams are not defined by individual brilliance, but by their collective ability to communicate, adapt, and support each other through challenges. Psychological safety is the cornerstone of high-performing teams.",
      date: "2024-02-20",
      tags: ["Leadership", "Team Dynamics", "Organizational Culture"]
    }
  ]);

  const [selectedThought, setSelectedThought] = useState<Thought | null>(thoughts[0]);

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Thoughts & Reflections</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Thought List */}
        <div className="md:col-span-1 space-y-4">
          {thoughts.map((thought, index) => (
            <div 
              key={index}
              onClick={() => setSelectedThought(thought)}
              className={`
                cursor-pointer p-4 rounded-lg transition-all duration-300
                ${selectedThought === thought 
                  ? 'bg-blue-50 border-l-4 border-blue-500' 
                  : 'hover:bg-gray-50'}
              `}
            >
              <h3 className="text-lg font-semibold text-gray-800">{thought.title}</h3>
              <p className="text-sm text-gray-500">{thought.date}</p>
            </div>
          ))}
        </div>

        {/* Selected Thought Details */}
        <div className="md:col-span-2 bg-gray-50 p-6 rounded-lg">
          {selectedThought && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedThought.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-4">{selectedThought.content}</p>
              <div className="flex flex-wrap gap-2">
                {selectedThought.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThoughtsContainer;
