import React from "react";
import Preloader from "../Preloader/Preloader";
import NewsCard from "../NewsCard/NewsCard";

import "./Main.css";

function Main({ isLoading, newsData }) {
  return (
    <main>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="news-list">
          {newsData && newsData.length > 0 ? (
            newsData.map((article, index) => (
              <NewsCard key={article.url || index} article={article} />
            ))
          ) : (
            <p>No news to display. Please search for something!</p>
          )}
        </div>
      )}
    </main>
  );
}

export default Main;
