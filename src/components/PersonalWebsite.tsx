import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { Mail } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import ProjectsContainer from './projects/ProjectsContainer';
import TimelineContainer from './timeline/TimelineContainer';
import quotesData from '../json_data/quotes/quotes.json';

const PersonalWebsite: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'values';
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(
    Math.floor(Math.random() * quotesData.quotes.length)
  );

  const handleTabClick = (tab: string) => {
    setSearchParams({ tab });
  };

  const nextQuote = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * quotesData.quotes.length);
    } while (newIndex === currentQuoteIndex && quotesData.quotes.length > 1);
    
    setCurrentQuoteIndex(newIndex);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'values':
        return (
          <div className="space-y-12">
                        <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer" onClick={nextQuote}>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                "{quotesData.quotes[currentQuoteIndex].Quote}"
              </h2>
              <p className="text-gray-600 text-right">- {quotesData.quotes[currentQuoteIndex].Author}</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">About Me</h2>
              <p className="text-gray-600 leading-relaxed">
                I combine team coaching expertise with quantitative engineering skills to drive organizational excellence. 
                My passion lies in automating processes and creating data-driven solutions that enhance team performance 
                and operational efficiency.
              </p>
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
      case 'outcomes':
        return <TimelineContainer />;
      case 'effort':
        return (
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <ProjectsContainer />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        <header className="text-center py-16 mb-12">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden ring-2 ring-gray-900/10 ring-offset-2 shadow-lg">
            <img 
              src="/dd.jpeg"
              alt="Dave Dawson" 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Dave Dawson</h1>
          <p className="text-xl text-gray-600 mb-8 font-light">Quantitative engineer. Team coach. Relentless Growth through Automation</p>
          
          <div className="flex justify-center space-x-16 mb-8 px-4 w-full max-w-3xl mx-auto">
            <a href="https://github.com/davewd" target="_blank" rel="noopener noreferrer" 
               className="transform hover:scale-150 transition-all duration-300">
              <FaGithub className="w-12 h-12 text-gray-600 hover:text-gray-900 transition-colors duration-300" />
            </a>
            <a href="https://www.linkedin.com/in/davewd/" target="_blank" rel="noopener noreferrer"
               className="transform hover:scale-150 transition-all duration-300">
              <FaLinkedin className="w-12 h-12 text-gray-600 hover:text-gray-900 transition-colors duration-300" />
            </a>
            <a href="https://x.com/davedawson_co" target="_blank" rel="noopener noreferrer"
               className="transform hover:scale-150 transition-all duration-300">
              <FaXTwitter className="w-12 h-12 text-gray-600 hover:text-gray-900 transition-colors duration-300" />
            </a>
            <a href="mailto:davedawson.co@gmail.com?subject=Contacting%20you%20via%20davedawson.co"
               className="transform hover:scale-150 transition-all duration-300">
              <Mail className="w-12 h-12 text-gray-600 hover:text-gray-900 transition-colors duration-300" />
            </a>
          </div>

          <nav className="flex justify-center border-b border-gray-200 mb-12">
            <button
              onClick={() => handleTabClick('values')}
              className={`px-6 py-3 font-medium transition-all duration-200 relative ${
                activeTab === 'values'
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Values
              {activeTab === 'values' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transition-all duration-200"></div>
              )}
            </button>
            <button
              onClick={() => handleTabClick('outcomes')}
              className={`px-6 py-3 font-medium transition-all duration-200 relative ${
                activeTab === 'outcomes'
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Outcomes
              {activeTab === 'outcomes' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transition-all duration-200"></div>
              )}
            </button>
            <button
              onClick={() => handleTabClick('effort')}
              className={`px-6 py-3 font-medium transition-all duration-200 relative ${
                activeTab === 'effort'
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Effort
              {activeTab === 'effort' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transition-all duration-200"></div>
              )}
            </button>
          </nav>
        </header>

        <main className="max-w-6xl mx-auto">
          {renderContent()}
        </main>
      </div>
            {/* Footer */}
            <div className="text-center mt-8 text-sm text-gray-500">
        Made in Sydney with <span style={{ fontSize: '1.2em' }}>❤️</span>
      </div>
    </div>
  );
};

export default PersonalWebsite;