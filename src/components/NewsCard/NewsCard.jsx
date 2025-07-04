import React from "react";
import Preloader from "../Preloader/Preloader";
import "./NewsCard.css";

function NewsCard({ article }) {
  return (
    <div className="news-card">
      <h1>NewsCard</h1>
      <Preloader />
      <div className="news-item">
        <h2>{article.title}</h2>
        <p>{article.description}</p>
      </div>
      <img src={article.urlToImage} alt={article.title} />
      <p>{article.content}</p>
      <p>{article.publishedAt}</p>
      <p>{article.author}</p>
      <p>{article.source.name}</p>
    </div>
  );
}
export default NewsCard;
