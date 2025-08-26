import React from "react";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";
import Hero from "../Hero/Hero"; // Hero component is correctly imported and used
import Preloader from "../Preloader/Preloader";

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
      <Hero onSearch={onSearch} /> {/* Hero component is rendered here */}
      {hasSearched && (
        <section className="results-section">
          {isLoading ? (
            <div className="preloader-container">
              <Preloader />
              <p className="preloader-container__text">Searching for news...</p>
            </div>
          ) : apiError && apiError !== "Nothing found" ? (
            <div className="not-found">
              <div className="not-found__image"></div>
              <h2 className="not-found__title">Error</h2>
              <p className="not-found__text">{apiError}</p>
            </div>
          ) : newsData.length === 0 && !isLoading ? (
            <div className="not-found">
              <div className="not-found__image"></div>
              <h2 className="not-found__title">Nothing found</h2>
              <p className="not-found__text">
                Sorry, but nothing matched your search terms.
              </p>
            </div>
          ) : (
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
