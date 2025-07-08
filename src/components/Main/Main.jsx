import React from "react";
import Preloader from "../Preloader/Preloader"; // Adjust if Preloader is in a different path
import NewsCardList from "../NewsCardList/NewsCardList"; // Adjust if NewsCardList is in a different path
import "./Main.css"; // Your Main component's CSS

// Main now receives the already sliced newsData from App.jsx
function Main({ newsData, isLoading, apiError, hasSearched, savedArticles }) {
  // The showResultsSection logic now simply checks if there's any data to display
  const showResultsSection = newsData.length > 0;

  return (
    <main className="main">
      {isLoading && <Preloader />}

      {/* Message when no results found */}
      {!isLoading && hasSearched && apiError === "Nothing found" && (
        <div className="message-container message-container_type_nothing-found">
          <p className="message-title">Nothing found</p>
          <p className="message-text">
            Sorry, but nothing matched your search queries.
          </p>
        </div>
      )}

      {/* Message for server errors */}
      {!isLoading &&
        hasSearched &&
        apiError ===
          "Server error: Could not connect the News API. Please try again later." && (
          <div className="message-container message-container_type_server-error">
            <p className="message-title">Server error</p>
            <p className="message-text">
              During the request, an error occurred. It may be that the server
              is down or there are no network connections. Please try again
              later.
            </p>
          </div>
        )}

      {/* Section to display search results */}
      {!isLoading && showResultsSection && (
        <section className="results">
          <h2 className="results__title">Search results</h2>
          {/* NewsCardList now directly uses the newsData prop (which is already sliced) */}
          <NewsCardList articles={newsData} savedArticles={savedArticles} />
          {/* REMOVED: "Show more" button moved to App.jsx */}
        </section>
      )}

      {/* Initial state: nothing displayed until a search is performed */}
      {
        !isLoading && !hasSearched && null // Or you could add a "Please search for news" message here
      }
    </main>
  );
}

export default Main;
