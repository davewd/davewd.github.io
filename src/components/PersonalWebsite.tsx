import { useState } from 'react';
import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import ProjectsContainer from './projects/ProjectsContainer';

const PersonalWebsite = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header section with improved styling */}
        <header className="text-center py-16 mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Dave Dawson</h1>
          <p className="text-xl text-gray-600 mb-8 font-light">Quantitative engineer. Team coach. Relentless Growth through Automation</p>
          
          <div className="flex justify-center gap-8 mb-8">
            <a href="https://github.com/davewd" target="_blank" rel="noopener noreferrer" 
               className="transform hover:scale-110 transition-transform duration-200">
              <FaGithub className="w-6 h-6 text-gray-700 hover:text-gray-900" />
            </a>
            <a href="https://www.linkedin.com/in/davewd/" target="_blank" rel="noopener noreferrer"
               className="transform hover:scale-110 transition-transform duration-200">
              <FaLinkedin className="w-6 h-6 text-gray-700 hover:text-gray-900" />
            </a>
            <a href="https://x.com/davedawson_co" target="_blank" rel="noopener noreferrer"
               className="transform hover:scale-110 transition-transform duration-200">
              <FaXTwitter className="w-6 h-6 text-gray-700 hover:text-gray-900" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer"
               className="transform hover:scale-110 transition-transform duration-200">
              <Mail className="w-6 h-6 text-gray-700 hover:text-gray-900" />
            </a>
          </div>
        </header>

        {/* Navigation Tabs with smooth transitions */}
        <div className="mb-12">
          <div className="flex justify-center border-b border-gray-200">
            <button
              className={`px-6 py-3 font-medium transition-all duration-200 relative ${
                activeTab === "overview" 
                  ? "text-gray-900" 
                  : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
              {activeTab === "overview" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transition-all duration-200"></div>
              )}
            </button>
            <button
              className={`px-6 py-3 font-medium transition-all duration-200 relative ${
                activeTab === "projects" 
                  ? "text-gray-900" 
                  : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("projects")}
            >
              Projects
              {activeTab === "projects" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transition-all duration-200"></div>
              )}
            </button>
          </div>
        </div>

        {/* Content Section with improved spacing and card-like design */}
        <div className="mt-8">
          {activeTab === "overview" ? (
            <div className="space-y-12">
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
          ) : (
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <ProjectsContainer />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalWebsite;