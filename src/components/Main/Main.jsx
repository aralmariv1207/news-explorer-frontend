import React from "react";
import About from "../About/About";
import Preloader from "../Preloader/Preloader";
import NewsCardList from "../NewsCardList/NewsCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Main.css";

function Main({
  newsData,
  isLoading,
  apiError,
  hasSearched,
  savedArticles,
  onSearch,
}) {
  const showResultsSection = newsData.length > 0;

  return (
    <main className="main">
      {/* Hero Section with background image */}
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">What's going on in the world?</h1>
          <p className="hero__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <SearchForm onSearch={onSearch} />
        </div>
      </section>

      {/* Rest of your existing code */}
      {isLoading && <Preloader />}

      {!isLoading && hasSearched && apiError === "Nothing found" && (
        <div className="message-container message-container_type_nothing-found">
          <p className="message-title">Nothing found</p>
          <p className="message-text">
            Sorry, but nothing matched your search queries.
          </p>
        </div>
      )}

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

      {!isLoading && showResultsSection && (
        <section className="results">
          <h2 className="results__title">Search results</h2>
          <NewsCardList articles={newsData} savedArticles={savedArticles} />
        </section>
      )}
      <About />
    </main>
  );
}

export default Main;
