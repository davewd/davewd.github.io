import React, { useState } from 'react';
import './InputDataContainer.css';

import booksData from '../../json_data/input_data/books.json';
import linksData from '../../json_data/input_data/links.json';
import mediaData from '../../json_data/input_data/media.json';
import podcastsData from '../../json_data/input_data/podcasts.json';

type InputDataTab = 'Books' | 'Links' | 'Media' | 'Podcasts';

const InputDataContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<InputDataTab>('Books');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Books':
        return <BooksTab />;
      case 'Links':
        return <LinksTab />;
      case 'Media':
        return <MediaTab />;
      case 'Podcasts':
        return <PodcastsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="input-data-container">
      <div className="input-data-tabs">
        {(['Books', 'Links', 'Media', 'Podcasts'] as InputDataTab[]).map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="input-data-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

const BooksTab: React.FC = () => {
  return (
    <div className="books-tab">
      <table className="input-data-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Start Date</th>
            <th>Finish Date</th>
          </tr>
        </thead>
        <tbody>
          {booksData.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.startDate}</td>
              <td>{book.finishDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const LinksTab: React.FC = () => {
  return (
    <div className="links-tab">
      <table className="input-data-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Link</th>
            <th>Consumed Date</th>
            <th>Overview</th>
          </tr>
        </thead>
        <tbody>
          {linksData.map((link) => (
            <tr key={link.id}>
              <td>{link.title}</td>
              <td>{link.description}</td>
              <td>
                <a 
                  href={link.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline"
                >
                  {link.link}
                </a>
              </td>
              <td>{link.consumedDate}</td>
              <td>{link.overview}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const MediaTab: React.FC = () => {
  return (
    <div className="media-tab">
      <table className="input-data-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Link</th>
            <th>Consumed Date</th>
            <th>Overview</th>
          </tr>
        </thead>
        <tbody>
          {mediaData.map((media) => (
            <tr key={media.id}>
              <td>{media.title}</td>
              <td>{media.description}</td>
              <td>
                <a 
                  href={media.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline"
                >
                  {media.link}
                </a>
              </td>
              <td>{media.consumedDate}</td>
              <td>{media.overview}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PodcastsTab: React.FC = () => {
  return (
    <div className="podcasts-tab">
      <table className="input-data-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {podcastsData.map((podcast) => (
            <tr key={podcast.id}>
              <td>{podcast.title}</td>
              <td>{podcast.description}</td>
              <td>
                <a 
                  href={podcast.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline"
                >
                  {podcast.link}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InputDataContainer;
