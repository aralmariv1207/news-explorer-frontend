import React from "react";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";
import Hero from "../Hero/Hero";
import Preloader from "../Preloader/Preloader"; // Imports the Preloader component

import "./Main.css";

function Main({
  isLoading,
  newsData,
  apiError,
  hasSearched,
  onSearch,
  isLoggedIn,
  onShowMoreClick,
  showMoreButtonVisible,
  onSaveArticle,
  savedArticles,
}) {
  return (
    <main className="main">
      <Hero onSearch={onSearch} />

      {hasSearched && ( // Only show search results/loading/nothing found if a search has been initiated
        <section className="results-section">
          {isLoading ? ( // If isLoading is true, show preloader
            <div className="preloader-container">
              <Preloader /> {/* Renders the Preloader component */}
              <p className="preloader-container__text">Searching for news...</p>
            </div>
          ) : apiError && apiError !== "Nothing found" ? ( // If there's a general API error
            <div className="not-found">
              <div className="not-found__image"></div>{" "}
              {/* Image loaded via CSS */}
              <h2 className="not-found__title">Error</h2>
              <p className="not-found__text">{apiError}</p>
            </div>
          ) : newsData.length === 0 && !isLoading ? ( // If no results found after search completes
            <div className="not-found">
              <div className="not-found__image"></div>{" "}
              {/* Image loaded via CSS */}
              <h2 className="not-found__title">Nothing found</h2>
              <p className="not-found__text">
                Sorry, but nothing matched your search terms.
              </p>
            </div>
          ) : (
            // If search results are available
            <NewsCardList
              articles={newsData}
              isLoggedIn={isLoggedIn}
              onShowMoreClick={onShowMoreClick}
              showMoreButtonVisible={showMoreButtonVisible}
              isSavedNewsPage={false}
              onSaveArticle={onSaveArticle}
              savedArticles={savedArticles}
            />
          )}
        </section>
      )}

      <About />
    </main>
  );
}

export default Main;
