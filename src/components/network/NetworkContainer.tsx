import React from 'react';

const NetworkContainer: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Professional Network</h2>
      <p className="text-gray-600 mb-4">
        Connecting and collaborating with professionals across various domains.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Professional Connections</h3>
          <ul className="space-y-2 text-gray-600">
            <li>LinkedIn Network: 500+ Connections</li>
            <li>Cross-Industry Collaborations</li>
            <li>Tech and Leadership Communities</li>
          </ul>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Networking Platforms</h3>
          <ul className="space-y-2 text-gray-600">
            <li>Active on LinkedIn</li>
            <li>GitHub Open Source Contributions</li>
            <li>Tech Conferences and Meetups</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NetworkContainer;
