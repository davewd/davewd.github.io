import React, { useState } from "react";
import "./InputDataContainer.css";

import booksData from "../../json_data/input_data/books.json";
import linksData from "../../json_data/input_data/links.json";
import mediaData from "../../json_data/input_data/media.json";
import podcastsData from "../../json_data/input_data/podcasts.json";

type InputDataTab = "Books" | "Links" | "Media" | "Podcasts";

const InputDataContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<InputDataTab>("Books");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Books":
        return <BooksTab />;
      case "Links":
        return <LinksTab />;
      case "Media":
        return <MediaTab />;
      case "Podcasts":
        return <PodcastsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="input-data-container">
      <div className="input-data-tabs">
        {(["Books", "Podcasts", "Links", "Media"] as InputDataTab[]).map(
          (tab) => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          )
        )}
      </div>
      <div className="input-data-content">{renderTabContent()}</div>
    </div>
  );
};

const BooksTab: React.FC = () => {
  // Sort books by theme, then by title
  const sortedBooks = [...booksData].sort((a, b) => {
    // First, compare by theme
    const themeComparison = a.theme.localeCompare(b.theme);

    // If themes are the same, compare by title
    if (themeComparison === 0) {
      return a.title.localeCompare(b.title);
    }

    return themeComparison;
  });

  return (
    <div className="books-tab">
      <table className="input-data-table w-full table-fixed">
        <thead>
          <tr>
            <th className="w-1/4">Theme</th>
            <th className="w-1/2">Title</th>
            <th className="w-1/4">Author</th>
            <th className="w-0">Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedBooks.map((book) => (
            <tr key={book.id} className="text-sm">
              <td className="truncate">{book.theme}</td>
              <td className="truncate">{book.title}</td>
              <td className="truncate">{book.author}</td>
              <td className="truncate">{book.status}</td>
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
      <table className="input-data-table w-full table-fixed">
        <thead>
          <tr>
            <th className="w-1/4">Title</th>
            <th className="w-1/2">Description</th>
            <th className="w-1/4">Link</th>
            <th className="w-0">Overview</th>
          </tr>
        </thead>
        <tbody>
          {linksData.map((link) => (
            <tr key={link.id} className="text-sm">
              <td className="truncate">{link.title}</td>
              <td className="whitespace-normal break-words">{link.description}</td>
              <td className="truncate">
                <a
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {link.link}
                </a>
              </td>
              <td className="truncate">{link.overview}</td>
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
      <table className="input-data-table w-full table-fixed">
        <thead>
          <tr>
            <th className="w-1/4">Title</th>
            <th className="w-1/2">Description</th>
            <th className="w-1/4">Link</th>
            <th className="w-0">Overview</th>
          </tr>
        </thead>
        <tbody>
          {mediaData.map((media) => (
            <tr key={media.id} className="text-sm">
              <td className="truncate">{media.title}</td>
              <td className="whitespace-normal break-words">{media.description}</td>
              <td className="truncate">
                <a
                  href={media.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {media.link}
                </a>
              </td>
              <td className="truncate">{media.overview}</td>
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
      <table className="input-data-table w-full table-fixed">
        <thead>
          <tr>
            <th className="w-1/4">Title</th>
            <th className="w-1/2">Description</th>
            <th className="w-1/4">Link</th>
          </tr>
        </thead>
        <tbody>
          {podcastsData.map((podcast) => (
            <tr key={podcast.id} className="text-sm">
              <td className="truncate">{podcast.title}</td>
              <td className="whitespace-normal break-words">{podcast.description}</td>
              <td className="truncate">
                <span className="text-blue-600 hover:underline">
                  {podcast.link}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InputDataContainer;
