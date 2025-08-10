import React from "react";
import "./NewsCard.css";

function NewsCard({
  article,
  isLoggedIn,
  onSaveArticle,
  onDeleteArticle,
  isSavedNewsPage,
  savedArticles,
}) {
  const { urlToImage, publishedAt, title, description, source, url, keyword } =
    article;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formattedDate = formatDate(publishedAt);

  const isBookmarked =
    isSavedNewsPage ||
    (isLoggedIn &&
      savedArticles.some((savedArticle) => savedArticle.url === article.url));

  const handleBookmarkClick = () => {
    if (!isLoggedIn && !isSavedNewsPage) {
      console.log("Please sign in to save articles.");
      return;
    }

    if (isBookmarked && !isSavedNewsPage) {
      // If bookmarked on main page, unsave it
      onDeleteArticle(url);
    } else if (isSavedNewsPage) {
      // If on saved page, clicking the button means delete
      onDeleteArticle(url);
    } else {
      // If not bookmarked and logged in (on main page), save it
      onSaveArticle(article);
    }
  };

  return (
    <div className="news-card">
      <img
        src={
          urlToImage ||
          "https://placehold.co/400x272/cccccc/333333?text=Image+Missing"
        }
        alt={title}
        className="news-card__image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/400x272/cccccc/333333?text=Image+Missing";
        }}
      />

      {isSavedNewsPage ? (
        // For Saved News page: Keyword tooltip and Delete button
        <>
          <div className="news-card__icon news-card__icon_keyword-tooltip">
            <span className="news-card__tooltip-text_category">
              {keyword || "Keyword"}
            </span>
          </div>
          <button
            type="button"
            className="news-card__icon news-card__icon_delete"
            onClick={handleBookmarkClick}
          >
            {/* Tooltip for delete button */}
            <span className="news-card__tooltip-text">Remove from saved</span>
          </button>
        </>
      ) : (
        // For Main (search results) page: Bookmark button and tooltip
        <button
          type="button"
          className={`news-card__icon news-card__icon_bookmark ${
            isBookmarked ? "news-card__icon_bookmark_active" : ""
          }`}
          onClick={handleBookmarkClick}
        >
          {/* Tooltip text depends on login status */}
          {!isLoggedIn && (
            <span className="news-card__tooltip-text">
              Sign in to save articles
            </span>
          )}
        </button>
      )}

      <div className="news-card__content">
        <p className="news-card__date">{formattedDate}</p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__text">{description}</p>
        <p className="news-card__source">{source.name}</p>
      </div>
    </div>
  );
}

export default NewsCard;
