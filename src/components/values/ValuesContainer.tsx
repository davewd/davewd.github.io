import React, { useState } from 'react';
import quotesData from '../../json_data/quotes/quotes.json';

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
      <div 
        className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer" 
        onClick={nextQuote}
      >
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
        <h2 className="text-3xl font-bold mb-6 text-gray-900">hello world</h2>
        <p className="text-gray-600 leading-relaxed">
          I've oeprated as an individual contributor, a team lead and a manager of managers.
        </p><p> 
          Teams that I collaborate with operate in highly stressful environments, at the intersection of computer Science, finance and Quantiative Engineering
        </p>
        <p>Ultimately I aspire to create an automated digital business that benefits from quantiative Models and computer science </p>
      </div>
      
      <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Areas of Focus</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Team Development</h3>
            <p className="text-gray-600">Performance Coaching, Team Dynamics, Leadership Development</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Technical Expertise</h3>
            <p className="text-gray-600">Process Automation, Quantitative Analysis, System Architecture</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuesContainer;
