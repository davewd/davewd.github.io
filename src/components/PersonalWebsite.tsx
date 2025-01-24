import { useState } from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import ProjectsContainer from './projects/ProjectsContainer';

const PersonalWebsite = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-white text-black p-8 max-w-4xl mx-auto">
      {/* Header and Tab Navigation remain the same as previous version */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Dave Dawson</h1>
        <p className="text-xl mb-6">Quantitative engineer. Team coach.  Growth through Relentless Automation</p>
        
        <div className="flex justify-center gap-6 mb-8">
          <a href="#" className="hover:opacity-70">
            <Github size={24} />
          </a>
          <a href="#" className="hover:opacity-70">
            <Linkedin size={24} />
          </a>
          <a href="#" className="hover:opacity-70">
            <Twitter size={24} />
          </a>
          <a href="#" className="hover:opacity-70">
            <Mail size={24} />
          </a>
        </div>
      </header>

      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "overview" 
                ? "border-b-2 border-black" 
                : "text-gray-500 hover:text-black"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "projects" 
                ? "border-b-2 border-black" 
                : "text-gray-500 hover:text-black"
            }`}
            onClick={() => setActiveTab("projects")}
          >
            Projects
          </button>
        </div>
      </div>

      <div className="mt-6">
        {activeTab === "overview" ? (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">About Me</h2>
              <p className="mb-4">
                I combine team coaching expertise with quantitative engineering skills to drive organizational excellence. 
                My passion lies in automating processes and creating data-driven solutions that enhance team performance 
                and operational efficiency.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Areas of Focus</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold mb-2">Team Development</h3>
                  <p>Performance Coaching, Team Dynamics, Leadership Development</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Technical Expertise</h3>
                  <p>Process Automation, Quantitative Analysis, System Architecture</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ProjectsContainer />
        )}
      </div>
    </div>
  );
};

export default PersonalWebsite;