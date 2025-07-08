import React from "react";
import "./NewsCard.css";

function NewsCard({ article }) {
  const { urlToImage, publishedAt, title, description, source, url } = article;

  // Formatting date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formattedDate = formatDate(publishedAt);

  return (
    <div className="news-card">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="news-card__link"
      >
        <img className="news-card__image" src={urlToImage} alt={title} />
        <div className="news-card__content">
          <p className="news-card__date">{formattedDate}</p>
          <h3 className="news-card__title">{title}</h3>
          <p className="news-card__text">{description}</p>
          <p className="news-card__source">{source.name}</p>
        </div>
      </a>
      <button
        className="news-card__bookmark-button"
        aria-label="Bookmark article"
      ></button>
    </div>
  );
}

export default NewsCard;
