import React from "react";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader"; // Assuming you will have this component
import NewsCardList from "../NewsCardList/NewsCardList";
import About from "../About/About"; // Keep About consistent across pages for layout

import "./SavedNews.css"; // You will need to create this CSS file

function SavedNews({
  savedArticles,
  isLoggedIn,
  currentUser,
  onDeleteArticle,
}) {
  // Extract unique keywords for the SavedNewsHeader
  const keywords = [
    ...new Set(savedArticles.map((article) => article.keyword)),
  ];

  return (
    <main className="saved-news">
      <SavedNewsHeader
        articlesCount={savedArticles.length}
        currentUser={currentUser}
        keywords={keywords}
      />
      {savedArticles.length > 0 ? (
        <NewsCardList
          articles={savedArticles} // Pass the saved articles to the list
          isLoggedIn={isLoggedIn}
          onDeleteArticle={onDeleteArticle} // Pass the delete handler
          isSavedNewsPage={true} // Indicate that this is the saved news page
          // No onSaveArticle, onShowMoreClick, showMoreButtonVisible needed here
        />
      ) : (
        <div className="saved-news__no-articles">
          <h2 className="saved-news__no-articles-title">
            No saved articles yet
          </h2>
          <p className="saved-news__no-articles-text">
            Bookmark articles from the main page to see them here.
          </p>
        </div>
      )}
      <About /> {/* Include About section for consistency */}
    </main>
  );
}

export default SavedNews;
