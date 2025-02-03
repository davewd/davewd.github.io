import React from "react";
import thoughtsData from "../../json_data/sample_data/thoughts.json";
import quotesData from "../../json_data/quotes/quotes.json";

const ValuesContainer: React.FC = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(
    Math.floor(Math.random() * quotesData.quotes.length)
  );

  const nextQuote = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * quotesData.quotes.length);
    } while (newIndex === currentQuoteIndex && quotesData.quotes.length > 1);

    setCurrentQuoteIndex(newIndex);
  };

  const currentQuote = quotesData.quotes[currentQuoteIndex];

  return (
    <div className="space-y-12">
      <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200 relative group">
        <div className="absolute top-4 left-4 flex items-center mb-6">
          <button
            onClick={nextQuote}
            className="text-gray-500 hover:text-blue-600 transition-colors duration-200 focus:outline-none"
            aria-label="Next Quote"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 group-hover:rotate-180 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          "{currentQuote.Quote}"
        </h2>
        <p className="text-gray-600 text-right">
          {currentQuote.URL ? (
            <a
              href={currentQuote.URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-blue-600 transition-colors"
            >
              {currentQuote.Author}
            </a>
          ) : (
            currentQuote.Author
          )}
        </p>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">{thoughtsData.title}</h2>
        
        {thoughtsData.sections.map((section) => (
          <div key={section.id} className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">{section.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-4">{section.content}</p>
            
            {section.subsections && section.subsections.map((subsection) => (
              <div key={subsection.id} className="pl-4 border-l-4 border-blue-500 mb-3">
                <h4 className="text-lg font-medium text-gray-700">{subsection.title}</h4>
                <p className="text-gray-500">{subsection.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          Areas of Focus
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              Team Development
            </h3>
            <p className="text-gray-600">
              Performance Coaching, Team Dynamics, Leadership Development
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              Technical Expertise
            </h3>
            <p className="text-gray-600">
              Process Automation, Quantitative Analysis, System Architecture
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuesContainer;
