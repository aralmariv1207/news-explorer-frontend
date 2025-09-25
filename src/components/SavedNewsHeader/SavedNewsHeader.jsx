import React from "react";
import "./SavedNewsHeader.css";

function SavedNewsHeader({ articlesCount, currentUser, keywords }) {
  const userName = currentUser?.name || "User";

  // Function to format the keywords string based on the number of keywords
  const getKeywordsText = () => {
    if (keywords.length === 0) {
      return "no keywords";
    }

    // Sort keywords alphabetically for consistent display
    const sortedKeywords = [...keywords].sort();

    if (sortedKeywords.length === 1) {
      return sortedKeywords[0];
    }
    if (sortedKeywords.length === 2) {
      return `${sortedKeywords[0]} and ${sortedKeywords[1]}`;
    }
    if (sortedKeywords.length === 3) {
      return `${sortedKeywords[0]}, ${sortedKeywords[1]}, and ${sortedKeywords[2]}`;
    }
    // For more than 3 keywords, show the top 2 and then "+ X others"
    return `${sortedKeywords[0]}, ${sortedKeywords[1]}, and ${
      sortedKeywords.length - 2
    } other${sortedKeywords.length - 2 > 1 ? "s" : ""}`; // Correct pluralization
  };

  return (
    <div className="saved-news-header">
      <p className="saved-news-header__title">Saved articles</p>
      <h2 className="saved-news-header__heading">
        {userName.slice(0, 1).toUpperCase() + userName.slice(1)}, you have{" "}
        {articlesCount} saved articles.
      </h2>
      <p className="saved-news-header__keywords">
        By keywords:{" "}
        <span className="saved-news-header__keywords-bold">
          {getKeywordsText()}
        </span>
      </p>
    </div>
  );
}

export default SavedNewsHeader;
