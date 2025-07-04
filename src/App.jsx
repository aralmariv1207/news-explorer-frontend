import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import SavedNews from "./components/SavedNews/SavedNews";
import Navigation from "./components/Navigation/Navigation";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SearchForm from "./components/SearchForm/SearchForm";

import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [apiError, setApiError] = useState(null);

  const handleSearch = async (query) => {
    console.log("handleSearch: Setting isLoading to TRUE"); // Debug log
    setIsLoading(true);
    setApiError(null);
    setNewsData([]);
    try {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;

      if (
        !apiKey ||
        apiKey.trim() === "" ||
        apiKey === "YOUR_ACTUAL_API_KEY_HERE" // This check is vital for debugging .env issues
      ) {
        console.error("handleSearch: API Key check failed!"); // Debug log
        throw new Error(
          "API key is missing or not set. Please check your environment variables."
        );
      }
      console.log("handleSearch: API Key is present."); // Debug log
      const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

      const response = await fetch(url);
      console.log("handleSearch: Fetch response received."); // Debug log

      if (!response.ok) {
        console.error("handleSearch: HTTP error occurred:", response.status); // Debug log
        let errorMessage = `HTTP error! Status: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (jsonError) {
          // If parsing JSON fails, we keep the original error message
          console.error("Failed to parse error response as JSON.", jsonError); // Debug log
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("handleSearch: Data received and parsed."); // Debug log
      setNewsData(data.articles || []);
      if (data.articles && data.articles.length === 0) {
        console.log("handleSearch: No results found."); // Debug log
        setApiError(
          "No results found for your search. Please try a different query."
        );
      }
    } catch (error) {
      console.error("handleSearch: Caught an error during fetch:", error); // Debug log
      setApiError(
        error.message ||
          "Failed to fetch news. Please check your internet connection or try again."
      );
    } finally {
      console.log("handleSearch: Finally block - Setting isLoading to FALSE"); // Debug log
      setIsLoading(false);
    }
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Navigation />

        <SearchForm onSearch={handleSearch} />

        {apiError && (
          <div className="api-error-message">
            <p>{apiError}</p>
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={<Main isLoading={isLoading} newsData={newsData} />}
          />
          <Route path="/saved-news" element={<SavedNews />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
