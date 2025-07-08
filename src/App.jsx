import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import SavedNews from "./components/SavedNews/SavedNews";
import Navigation from "./components/Navigation/Navigation";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SearchForm from "./components/SearchForm/SearchForm";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import LoginModal from "./components/LoginModal/LoginModal";

import { searchNews } from "./api/newsApi"; // Your newsApi utility
import newsData from "./api/newsData.js"; // REMINDER: Import your mock data here with .js extension for debugging UI
console.log("Value of newsData in App.jsx:", newsData);

import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [newsData, setNewsData] = useState([]); // This will hold ALL fetched articles
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [apiError, setApiError] = useState(null); // Will store specific error messages
  const [hasSearched, setHasSearched] = useState(false); // To know if a search has been attempted
  const [articlesToShow, setArticlesToShow] = useState(3); // State for "Show more" functionality
  const [savedArticles, setSavedArticles] = useState([]); // State for saved articles

  const handleSearch = async (query) => {
    setIsLoading(true);
    setApiError(null); // Clear previous errors
    setNewsData([]); // Clear previous results
    setHasSearched(true); // Indicate a search has started
    setArticlesToShow(3); // Reset articlesToShow when a new search begins
    setSavedArticles([]); // Reset saved articles when a new search begins
    try {
      const articles = await searchNews(query); // Your newsApi utility

      if (articles.length === 0) {
        setApiError("Nothing found"); // No articles returned for the query
      } else {
        setNewsData(articles); // Set data only if articles are found
      }
    } catch (error) {
      console.error("API Error:", error);
      setApiError(
        "Server error: Could not connect the News API. Please try again later."
      ); // General server error
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterClick = () => {
    closeAllModals();
    setIsRegisterModalOpen(true);
  };

  const handleLoginClick = () => {
    closeAllModals();
    setIsLoginModalOpen(true);
  };

  const closeAllModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  // --- NEW: Logic for data to display and "Show more" functionality in App.jsx ---
  // Temporarily use mockData if no API data and a search has occurred.
  // We'll replace this with actual newsData once the API key issue is resolved.
  const dataToProcess =
    newsData.length > 0 ? newsData : hasSearched ? newsData : [];

  // Slice the articles based on articlesToShow state
  const articlesForDisplay = dataToProcess.slice(0, articlesToShow);

  // Condition to show the "Show more" button
  const showMoreButtonVisible =
    articlesForDisplay.length > 0 &&
    articlesForDisplay.length < dataToProcess.length;
  // --- END NEW LOGIC ---

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Navigation />

        <SearchForm onSearch={handleSearch} />

        {/* Temporary buttons to open specific modals for testing (keep for now) */}
        <button
          onClick={handleLoginClick}
          style={{
            position: "fixed",
            bottom: "60px",
            right: "20px",
            zIndex: 1000,
            padding: "10px",
            backgroundColor: "lightblue",
          }}
        >
          Sign in
        </button>
        <button
          onClick={handleRegisterClick}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
            padding: "10px",
            backgroundColor: "lightgreen",
          }}
        >
          Sign up
        </button>
        {/* END OF ADDED BUTTONS */}

        {/* Render the specific modals */}
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={closeAllModals}
          onLogin={() => {
            console.log("Login attempt");
            closeAllModals();
          }}
        />

        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={closeAllModals}
          onRegister={() => {
            console.log("Register attempt");
            closeAllModals();
          }}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                isLoading={isLoading}
                newsData={articlesForDisplay} // Pass the SLICED articles
                apiError={apiError}
                hasSearched={hasSearched}
                savedArticles={savedArticles} // Pass saved articles state
              />
            }
          />
          <Route path="/saved-news" element={<SavedNews />} />
        </Routes>

        {/* NEW: "Show more" button in App.jsx */}
        {!isLoading && hasSearched && showMoreButtonVisible && (
          <section className="results__button-container">
            {" "}
            {/* Optional: Add a container for styling */}
            <button
              className="results__show-more-button"
              onClick={() => setArticlesToShow(articlesToShow + 3)}
              // Disable if all articles are already shown or if there are no more to show
              disabled={articlesToShow >= dataToProcess.length}
            >
              Show more
            </button>
          </section>
        )}

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
