import React from "react";
import "./NewsCard.css";

function NewsCard({
  article,
  isLoggedIn,
  isSavedNewsPage,
  onSaveArticle,
  onDeleteArticle,
}) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleBookmarkClick = () => {
    if (onSaveArticle) {
      onSaveArticle(article);
    }
    console.log("Bookmark clicked for article:", article.title);
  };

  const handleDeleteClick = () => {
    if (onDeleteArticle) {
      // Pass article URL to identify which article to delete from saved list
      onDeleteArticle(article.url);
    }
    console.log("Delete clicked for article:", article.title);
  };

  return (
    <div className="news-card">
      <img
        src={
          article.urlToImage ||
          "https://placehold.co/300x200/cccccc/333333?text=Image+Not+Found"
        }
        alt={article.title}
        className="news-card__image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/300x200/cccccc/333333?text=Image+Not+Found";
        }}
      />

      {isSavedNewsPage ? (
        <>
          {/* Keyword tooltip for saved articles */}
          <button
            className="news-card__icon news-card__icon_keyword-tooltip"
            aria-label="Article Category"
          >
            <span className="news-card__tooltip-text news-card__tooltip-text_category">
              {article.keyword || "Category"}
            </span>
          </button>
          {/* Delete button for saved articles */}
          <button
            className="news-card__icon news-card__icon_delete"
            onClick={handleDeleteClick}
            aria-label="Delete article"
          ></button>
        </>
      ) : isLoggedIn ? (
        // Bookmark button for logged-in users on main page
        <button
          className="news-card__icon news-card__icon_bookmark"
          onClick={handleBookmarkClick}
          aria-label="Bookmark article"
        ></button>
      ) : (
        // Tooltip button for non-logged-in users on main page
        <button
          className="news-card__icon news-card__icon_tooltip"
          aria-label="Sign in to save articles"
        >
          <span className="news-card__tooltip-text">
            Sign in to save articles
          </span>
        </button>
      )}

      <div className="news-card__content">
        <p className="news-card__date">{formatDate(article.publishedAt)}</p>
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__text">{article.description}</p>
        <p className="news-card__source">{article.source.name}</p>
      </div>
    </div>
  );
}

export default NewsCard;
