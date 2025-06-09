import React from "react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Mail } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import ProjectsContainer from "./projects/ProjectsContainer";
import TimelineContainer from "./timeline/TimelineContainer";
import NetworkContainer from "./network/NetworkContainer";
import ValuesContainer from "./values/ValuesContainer";
import ThoughtsContainer from "./thoughts/ThoughtsContainer";
import InputDataContainer from "./inputdata/InputDataContainer";

const PersonalWebsite: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "values";
  const activeSectionId = searchParams.get("section") || "";

  const handleTabClick = (tab: string, sectionId: string = "") => {
    const params: { tab: string; section?: string } = { tab };
    if (sectionId) {
      params.section = sectionId;
    }
    setSearchParams(params);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "values":
        return <ValuesContainer />;
      case "outcomes":
        return <TimelineContainer />;
      case "effort":
        return (
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <ProjectsContainer />
          </div>
        );
      case "network":
        return <NetworkContainer />;
      case "thoughts":
        return <ThoughtsContainer activeSectionId={activeSectionId} />;
      case "input":
        return <InputDataContainer />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto p-2 sm:p-4 md:p-8">
        <header className="text-center pt-8 sm:pt-16">
          <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-8 rounded-full overflow-hidden ring-2 ring-gray-900/10 ring-offset-2 shadow-lg">
            <img
              src="/dd.jpeg"
              alt="Dave Dawson"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Dave Dawson
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 font-light px-4">
            Quantitative engineer. Team coach. Relentless Growth through
            Automation
          </p>

          <div className="flex justify-center space-x-8 sm:space-x-16 mb-8 px-4 w-full max-w-3xl mx-auto">
            <a
              href="https://github.com/davewd"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-150 transition-all duration-300"
            >
              <FaGithub className="w-8 h-8 sm:w-12 sm:h-12 text-gray-600 hover:text-gray-900 transition-colors duration-300" />
            </a>
            <a
              href="https://www.linkedin.com/in/davewd/"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-150 transition-all duration-300"
            >
              <FaLinkedin className="w-8 h-8 sm:w-12 sm:h-12 text-gray-600 hover:text-gray-900 transition-colors duration-300" />
            </a>
            <a
              href="https://x.com/davedawson_co"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-150 transition-all duration-300"
            >
              <FaXTwitter className="w-8 h-8 sm:w-12 sm:h-12 text-gray-600 hover:text-gray-900 transition-colors duration-300" />
            </a>
            <a
              href="mailto:davedawson.co@gmail.com?subject=Contacting%20you%20via%20davedawson.co"
              className="transform hover:scale-150 transition-all duration-300"
            >
              <Mail className="w-8 h-8 sm:w-12 sm:h-12 text-gray-600 hover:text-gray-900 transition-colors duration-300" />
            </a>
          </div>

          <nav className="border-b border-gray-200 mb-8 sm:mb-12">
            <div className="flex flex-wrap justify-center gap-1 px-2">
              <button
                onClick={() => handleTabClick("values")}
                className={`px-3 py-2 text-sm sm:text-base font-medium transition-all duration-200 relative ${
                  activeTab === "values"
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Values
                {activeTab === "values" && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transition-all duration-200"></div>
                )}
              </button>
              <button
                onClick={() => handleTabClick("input")}
                className={`px-3 py-2 text-sm sm:text-base font-medium transition-all duration-200 relative ${
                  activeTab === "input"
                    ? "text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Input
              </button>
              <button
                onClick={() => handleTabClick("outcomes")}
                className={`px-3 py-2 text-sm sm:text-base font-medium transition-all duration-200 relative ${
                  activeTab === "outcomes"
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Outcomes
                {activeTab === "outcomes" && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transition-all duration-200"></div>
                )}
              </button>
              <button
                onClick={() => handleTabClick("effort")}
                className={`px-3 py-2 text-sm sm:text-base font-medium transition-all duration-200 relative ${
                  activeTab === "effort"
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Effort
                {activeTab === "effort" && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transition-all duration-200"></div>
                )}
              </button>
              <button
                onClick={() => handleTabClick("thoughts")}
                className={`px-3 py-2 text-sm sm:text-base font-medium transition-all duration-200 relative ${
                  activeTab === "thoughts"
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Thoughts
                {activeTab === "thoughts" && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transition-all duration-200"></div>
                )}
              </button>
            </div>
          </nav>
        </header>

        <main className="max-w-6xl mx-auto">{renderContent()}</main>
      </div>
      {/* Footer */}
      <div className="text-center mt-8 text-sm text-gray-500">
        Made in Sydney with <span style={{ fontSize: "1.2em" }}>❤️</span>
      </div>
    </div>
  );
};

export default PersonalWebsite;
