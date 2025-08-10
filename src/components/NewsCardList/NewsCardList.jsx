import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

function NewsCardList({
  articles,
  isLoggedIn,
  onShowMoreClick,
  showMoreButtonVisible,
  isSavedNewsPage,
  onSaveArticle,
  onDeleteArticle,
}) {
  return (
    <section className="news-card-list">
      <h2 className="news-card-list__title">
        {isSavedNewsPage ? "Saved articles" : "Search results"}
      </h2>
      <div className="news-card-list__grid">
        {articles.map((article, index) => (
          <NewsCard
            key={article.url || index}
            article={article}
            isLoggedIn={isLoggedIn}
            isSavedNewsPage={isSavedNewsPage}
            onSaveArticle={onSaveArticle}
            onDeleteArticle={onDeleteArticle}
          />
        ))}
      </div>
      {showMoreButtonVisible && (
        <div className="news-card-list__button-container">
          <button
            className="news-card-list__show-more-button"
            onClick={onShowMoreClick}
          >
            Show more
          </button>
        </div>
      )}
    </section>
  );
}

export default NewsCardList;
