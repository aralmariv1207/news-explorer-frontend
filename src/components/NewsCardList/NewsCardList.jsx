import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

function NewsCardList({
  articles,
  isLoggedIn,
  onShowMoreClick,
  showMoreButtonVisible,
  onSaveArticle,
  savedArticles,
  isSavedNewsPage,
  onDeleteArticle,
}) {
  // NEW: added onDeleteArticle prop
  return (
    <div
      className={`news-card-list ${
        isSavedNewsPage ? "news-card-list--saved-news" : ""
      }`}
    >
      {/* Conditionally show "Search results" title only on main page */}
      {!isSavedNewsPage && articles.length > 0 && (
        <h2 className="news-card-list__title">Search results</h2>
      )}
      <div className="news-card-list__grid">
        {articles.map((article, index) => (
          <NewsCard
            key={article.url + index} // Use URL + index for unique key if URL might repeat
            article={article}
            isLoggedIn={isLoggedIn}
            onSaveArticle={onSaveArticle}
            // Pass onDeleteArticle for both pages, NewsCard will decide when to use it
            onDeleteArticle={onDeleteArticle}
            isSavedNewsPage={isSavedNewsPage}
            savedArticles={savedArticles}
          />
        ))}
      </div>
      {showMoreButtonVisible && (
        <div className="news-card-list__button-container">
          <button
            type="button"
            className="news-card-list__show-more-button"
            onClick={onShowMoreClick}
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
}

export default NewsCardList;
