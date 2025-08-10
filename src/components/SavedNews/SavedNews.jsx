import React from "react";
import NewsCardList from "../NewsCardList/NewsCardList";
import "./SavedNews.css";

function SavedNews({
  savedArticles = [],
  isLoggedIn,
  currentUser,
  onDeleteArticle,
}) {
  const articlesToDisplay =
    savedArticles.length > 0
      ? savedArticles
      : [
          {
            urlToImage:
              "https://placehold.co/300x200/cccccc/333333?text=Saved+Art+1",
            publishedAt: "2023-01-15T10:00:00Z",
            title: "Nature's Beauty Unveiled",
            description:
              "A breathtaking journey through the untouched wilderness.",
            source: { name: "Nature Explorer" },
            keyword: "Nature",
          },
          {
            urlToImage:
              "https://placehold.co/300x200/cccccc/333333?text=Saved+Art+2",
            publishedAt: "2023-01-20T12:30:00Z",
            title: "Science Breakthroughs of the Decade",
            description:
              "Exploring the most impactful discoveries in recent years.",
            source: { name: "Science Daily" },
            keyword: "Science",
          },
          {
            urlToImage:
              "https://placehold.co/300x200/cccccc/333333?text=Saved+Art+3",
            publishedAt: "2023-01-22T12:30:00Z",
            title: "Exploring Ancient Civilizations",
            description:
              "Unearthing secrets of past empires and their legacies.",
            source: { name: "History Channel" },
            keyword: "History",
          },
        ];

  const articlesCount = articlesToDisplay.length;
  const uniqueKeywords =
    articlesCount > 0
      ? [...new Set(articlesToDisplay.map((article) => article.keyword))]
      : [];

  return (
    <section className="saved-news">
      <div className="saved-news__header">
        <h1 className="saved-news__title">Saved articles</h1>
        <p className="saved-news__count">
          {currentUser?.name || "User"}, you have {articlesCount} saved articles
        </p>
        {articlesCount > 0 && (
          <p className="saved-news__keywords">
            Keywords:{" "}
            {uniqueKeywords.map((keyword, index) => (
              <b key={keyword}>
                {keyword}
                {index < uniqueKeywords.length - 1 ? ", " : ""}
              </b>
            ))}
          </p>
        )}
      </div>
      {articlesCount > 0 ? (
        <NewsCardList
          articles={articlesToDisplay}
          isLoggedIn={isLoggedIn}
          isSavedNewsPage={true}
          showMoreButtonVisible={false}
          onDeleteArticle={onDeleteArticle} // Pass onDeleteArticle
        />
      ) : (
        <p className="saved-news__no-articles">
          You don't have any saved articles yet.
        </p>
      )}
    </section>
  );
}

export default SavedNews;
