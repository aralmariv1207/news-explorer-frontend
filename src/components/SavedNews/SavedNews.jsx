import React from "react";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import "./SavedNews.css";

function SavedNews({ currentUser, savedArticles }) {
  const keywords = savedArticles.map((article) => article.keyword);
  const uniqueKeywords = [...new Set(keywords)]; // Remove duplicate keywords

  return (
    <section className="saved-news">
      <SavedNewsHeader
        articlesCount={savedArticles.length}
        currentUser={currentUser}
        keywords={uniqueKeywords}
      />
      {savedArticles.length > 0 ? (
        <ul className="saved-news__list">
          {savedArticles.map((article) => (
            <li key={article.id} className="saved-news__item">
              <div className="saved-news__card">
                <img
                  src={article.image}
                  alt={article.title}
                  className="saved-news__image"
                />
                <div className="saved-news__content">
                  <p className="saved-news__keyword">{article.keyword}</p>
                  <h3 className="saved-news__title">{article.title}</h3>
                  <p className="saved-news__date">{article.date}</p>
                  <p className="saved-news__description">
                    {article.description}
                  </p>
                  <button
                    className="saved-news__delete-button"
                    onClick={() => article.onDelete(article.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="saved-news__no-articles">
          <h2 className="saved-news__no-articles-title">
            No saved articles yet
          </h2>
        </div>
      )}
    </section>
  );
}

export default SavedNews;
