import React from "react";
import NewsCard from "./NewsCard"; // Adjust path if your NewsCard is elsewhere
import "./NewsCardList.css"; // You'll create this CSS file

function NewsCardList({ articles, savedArticles }) {
  return (
    <div className="news-card-list">
      {articles.map((article, index) => (
        // It's good practice to use a unique key for list items.
        // If articles have a unique ID, use that. Otherwise, index is acceptable for static lists.

        <NewsCard key={index} article={article} savedArticles={savedArticles} />
      ))}
    </div>
  );
}

export default NewsCardList;
