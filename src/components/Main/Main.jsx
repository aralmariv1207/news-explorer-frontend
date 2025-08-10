import React from "react";
import About from "../About/About"; // Only import About here
import NewsCardList from "../NewsCardList/NewsCardList";
import Hero from "../Hero/Hero"; // NEW IMPORT: Hero component

import "./Main.css";

function Main({ isLoading, newsData, apiError, hasSearched, onSearch, isLoggedIn, onShowMoreClick, showMoreButtonVisible, onSaveArticle }) {
  return (
    <main className="main">
      <Hero onSearch={onSearch} /> {/* Render Hero component first */}

      {/* Conditional rendering for results area (including loading, error, and actual results) */}
      {hasSearched && ( // Show this entire section ONLY if a search has been performed
        <section className="results-section"> {/* A single container for all search result states */}
          {isLoading ? ( // If loading, show preloader
            <div className="preloader">
              <i className="circle-preloader"></i>
              <p className="preloader__text">Searching for news...</p>
            </div>
          ) : apiError ? ( // If not loading, but there's an API error
            <div className="not-found">
              <img src="https://placehold.co/150x150/ffffff/000000?text=!?" alt="Not Found Icon" className="not-found__image" />
              <h2 className="not-found__title">Nothing found</h2>
              <p className="not-found__text">
                {apiError}
              </p>
            </div>
          ) : newsData.length === 0 ? ( // If not loading, no API error, but no news data
            <div className="not-found">
              <img src="https://placehold.co/150x150/ffffff/000000?text=!?" alt="Not Found Icon" className="not-found__image" />
              <h2 className="not-found__title">Nothing found</h2>
              <p className="not-found__text">
                Sorry, but nothing matched your search queries.
              </p>
            </div>
          ) : ( // Otherwise, if there's newsData, show the list
            <NewsCardList
              articles={newsData}
              isLoggedIn={isLoggedIn}
              onShowMoreClick={onShowMoreClick}
              showMoreButtonVisible={showMoreButtonVisible}
              isSavedNewsPage={false}
              onSaveArticle={onSaveArticle}
            />
          )}
        </section>
      )}

      {/* The About component is a distinct section that always appears after the search functionality */}
      <About />
    </main>
  );
}

export default Main;