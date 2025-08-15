import React from "react";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";

import "./SavedNews.css";

function SavedNews({ currentUser, savedArticles, onDeleteArticle }) {
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
        <NewsCardList
          articles={savedArticles}
          isLoggedIn={true}
          onSaveArticle={() => {}} // Not needed on saved articles page
          onDeleteArticle={onDeleteArticle}
          isSavedNewsPage={true}
          savedArticles={savedArticles}
        />
      ) : (
        <div className="saved-news__no-articles">
          <h2 className="saved-news__no-articles-title">
            No saved articles yet
          </h2>
          <h2 className="saved-news-header__heading">
            {userName.slice(0, 1).toUpperCase() + userName.slice(1)}, you have{" "}
            {articlesCount} saved articles.
          </h2>
        </div>
      )}
    </section>
  );
}

export default SavedNews;
