import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
    setSearchQuery("");
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a topic"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
