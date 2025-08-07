import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import "./Main.css";

function Main({ onSearch }) {
  return (
    <main className="hero">
      <div className="hero__content">
        <h1 className="hero__title">What's going on in the world?</h1>
        <p className="hero__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <SearchForm onSearch={onSearch} />
      </div>
      {/* News results and preloader would go here in later stages */}
    </main>
  );
}

export default Main;
