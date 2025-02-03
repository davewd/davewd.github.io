import React, { useState } from "react";
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
        <h2 className="text-3xl font-bold mb-6 text-gray-900">hello_world</h2>
        <p className="text-gray-600 leading-relaxed">
          I've operated as an individual contributor, a team lead and a manager
          of managers.
        </p>
        <br />
        <p>
          Teams that I collaborate with operate in highly stressful
          environments, at the intersection of computer Science, finance and
          Quantiative Engineering
        </p>
        <br />
        <p>
          Ultimately I aspire to create automated digital businesses that
          benefit from quantiative Models, computer science and aim to put data at the heart of decision making.
        </p>
      </div>
    </div>
  );
};

export default ValuesContainer;
